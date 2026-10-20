import "server-only";
import { getTranslations } from "next-intl/server";
import { COMPANY, SITE_URL } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import type { RfqData } from "@/lib/rfq-schema";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Header-safe single line (no CR/LF), for subjects. */
export const oneLine = (value: string, max = 120) => value.replace(/[\r\n]+/g, " ").slice(0, max);

type Row = [label: string, value: string, mono?: boolean];

function table(rows: Row[]) {
  return rows
    .filter(([, value]) => value !== "")
    .map(
      ([label, value, mono]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;border-top:1px solid #D9DCE3;font:12px/1.4 'JetBrains Mono',Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#5B6275;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-top:1px solid #D9DCE3;font:${mono ? "15px/1.5 'JetBrains Mono',Menlo,monospace" : "15px/1.5 Inter,Arial,sans-serif"};color:#0A0E1A;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

function layout(title: string, body: string) {
  return `<!doctype html>
<html><body style="margin:0;background:#F2F3F5;padding:24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:20px">
    <tr><td style="background:#0A0E1A;border-radius:20px 20px 0 0;padding:20px 28px;font:12px 'JetBrains Mono',Menlo,monospace;letter-spacing:.12em;color:#D4FF3A">STARLINK COMPONENTS</td></tr>
    <tr><td style="padding:28px">
      <h1 style="margin:0 0 20px;font:600 28px/1.1 'Inter Tight',Inter,Arial,sans-serif;letter-spacing:-.03em;color:#0A0E1A">${escapeHtml(title)}</h1>
      ${body}
    </td></tr>
  </table>
</body></html>`;
}

function rowsFor(data: RfqData, labels: Record<string, string>, bomName?: string): Row[] {
  return [
    [labels.partNumber, data.partNumber, true],
    [labels.manufacturer, data.manufacturer],
    [labels.quantity, data.quantity, true],
    [labels.targetPrice, data.targetPrice, true],
    [labels.fullName, data.fullName],
    [labels.company, data.company],
    [labels.email, data.email],
    [labels.bom, bomName ?? ""],
    [labels.notes, data.notes],
  ];
}

const asText = (rows: Row[]) =>
  rows
    .filter(([, v]) => v !== "")
    .map(([l, v]) => `${l}: ${v}`)
    .join("\n");

/** Internal notification to the sales inbox — always in English. */
export async function salesEmail(data: RfqData, meta: { bomName?: string; ip: string }) {
  const t = await getTranslations({ locale: "en", namespace: "email.sales" });
  const tf = await getTranslations({ locale: "en", namespace: "rfqForm.fields" });
  const labels = Object.fromEntries(
    (
      [
        "partNumber",
        "manufacturer",
        "quantity",
        "targetPrice",
        "fullName",
        "company",
        "email",
        "bom",
        "notes",
      ] as const
    ).map((k) => [k, tf(k)]),
  );
  const rows: Row[] = [
    ...rowsFor(data, labels, meta.bomName),
    [t("locale"), data.locale.toUpperCase()],
    ["IP", meta.ip, true],
  ];
  const who = data.company || data.fullName || data.email;
  const subject = oneLine(
    data.partNumber
      ? t("subject", { part: data.partNumber, qty: data.quantity || "—", company: who })
      : t("subjectBom", { company: who }),
  );

  return {
    subject,
    html: layout(
      t("heading"),
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table(rows)}</table>`,
    ),
    text: `${t("heading")}\n\n${asText(rows)}`,
  };
}

/** Localized confirmation to the customer. */
export async function autoReplyEmail(data: RfqData, locale: Locale, bomName?: string) {
  const t = await getTranslations({ locale, namespace: "email.autoreply" });
  const tf = await getTranslations({ locale, namespace: "rfqForm.fields" });
  const labels = Object.fromEntries(
    (
      [
        "partNumber",
        "manufacturer",
        "quantity",
        "targetPrice",
        "fullName",
        "company",
        "email",
        "bom",
        "notes",
      ] as const
    ).map((k) => [k, tf(k)]),
  );
  // The recipient address is user-supplied, so echo only constrained fields
  // (no names, notes or company) — the form can't be used to relay free text.
  const echoed = new Set([labels.partNumber, labels.quantity, labels.targetPrice, labels.bom]);
  const rows = rowsFor(data, labels, bomName).filter(([label]) => echoed.has(label));
  const greeting = t("greeting");
  const footer = `${COMPANY.email} · ${COMPANY.phone.display} · ${SITE_URL.replace(/^https?:\/\//, "")}`;

  const body = `
    <p style="margin:0 0 12px;font:16px/1.6 Inter,Arial,sans-serif;color:#3A4152">${escapeHtml(greeting)}</p>
    <p style="margin:0 0 24px;font:16px/1.6 Inter,Arial,sans-serif;color:#3A4152">${escapeHtml(t("body"))}</p>
    <p style="margin:0 0 4px;font:12px 'JetBrains Mono',Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#5B6275">${escapeHtml(t("summary"))}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table(rows)}</table>
    <p style="margin:28px 0 4px;font:15px/1.6 Inter,Arial,sans-serif;color:#0A0E1A">${escapeHtml(t("signoff"))}</p>
    <p style="margin:0;font:13px/1.6 'JetBrains Mono',Menlo,monospace;color:#5B6275">${escapeHtml(footer)}</p>`;

  return {
    subject: oneLine(t("subject")),
    html: layout(t("subject"), body),
    text: `${greeting}\n\n${t("body")}\n\n${t("summary")}\n${asText(rows)}\n\n${t("signoff")}\n${footer}`,
  };
}
