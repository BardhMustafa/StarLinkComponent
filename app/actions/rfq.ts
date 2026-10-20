"use server";

import {
  RFQ_TEXT_FIELDS,
  rfqSchema,
  type RfqActionResult,
  type RfqErrorKey,
  type RfqField,
} from "@/lib/rfq-schema";

/** Parse and validate an RFQ submission. Email delivery is added in the RFQ milestone. */
export async function submitRfq(formData: FormData): Promise<RfqActionResult> {
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

  return { ok: true };
}
