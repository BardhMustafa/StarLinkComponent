"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { COMPANY } from "@/content/site";
import { autoReplyEmail, salesEmail } from "@/lib/email/templates";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  RFQ_TEXT_FIELDS,
  rfqSchema,
  type RfqActionResult,
  type RfqErrorKey,
  type RfqField,
} from "@/lib/rfq-schema";
import { normalizePartNumber, parseQuantity } from "@/lib/search";

/** Keep attachment names boring: letters, digits, dot, dash, underscore. */
const safeFilename = (name: string) =>
  name
    .replace(/[^\w.\-]+/g, "_")
    .replace(/^\.+/, "")
    .slice(-80) || "bom";

async function clientIp() {
  const h = await headers();
  // Netlify sets x-nf-client-connection-ip; Vercel sets x-real-ip.
  return (
    h.get("x-nf-client-connection-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function submitRfq(formData: FormData): Promise<RfqActionResult> {
  // 1. Honeypot: pretend success so bots learn nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { ok: true };
  }

  // 2. Validate with the same schema as the client.
  const raw: Record<string, unknown> = {
    form: formData.get("form"),
    locale: formData.get("locale"),
  };
  for (const field of RFQ_TEXT_FIELDS) raw[field] = String(formData.get(field) ?? "");
  const bom = formData.get("bom");
  raw.bom = bom instanceof File && bom.size > 0 ? bom : null;

  const parsed = rfqSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<RfqField, RfqErrorKey>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as RfqField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message as RfqErrorKey;
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  // 3. Rate limit per client IP.
  const ip = await clientIp();
  if (!(await checkRateLimit(ip))) {
    return { ok: false, error: "rateLimited" };
  }

  const data = {
    ...parsed.data,
    partNumber: normalizePartNumber(parsed.data.partNumber),
    quantity: parsed.data.quantity ? String(parseQuantity(parsed.data.quantity)) : "",
    email: parsed.data.email.toLowerCase(),
  };
  const file = data.bom;
  const bomName = file ? safeFilename(file.name) : undefined;

  // 4. Send.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[rfq] RESEND_API_KEY not set — submission accepted but not emailed", {
        ...data,
        bom: bomName,
      });
      return { ok: true };
    }
    console.error("[rfq] RESEND_API_KEY missing in production");
    return { ok: false, error: "server" };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RFQ_FROM_EMAIL || "StarLink Components <onboarding@resend.dev>";
  const to = process.env.RFQ_TO_EMAIL || COMPANY.email;

  try {
    const sales = await salesEmail(data, { bomName, ip });
    const attachments = file
      ? [{ filename: bomName!, content: Buffer.from(await file.arrayBuffer()) }]
      : undefined;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: sales.subject,
      html: sales.html,
      text: sales.text,
      attachments,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
  } catch (error) {
    console.error("[rfq] sales email failed", error);
    return { ok: false, error: "server" };
  }

  // The request reached sales; a failed confirmation shouldn't fail the submission.
  try {
    const reply = await autoReplyEmail(data, data.locale, bomName);
    const { error } = await resend.emails.send({
      from,
      to: data.email,
      replyTo: to,
      subject: reply.subject,
      html: reply.html,
      text: reply.text,
    });
    if (error) console.warn("[rfq] auto-reply failed", error);
  } catch (error) {
    console.warn("[rfq] auto-reply failed", error);
  }

  return { ok: true };
}
