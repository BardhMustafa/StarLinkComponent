import type { Locale } from "@/i18n/routing";

/**
 * Field names, types and constants for the RFQ form. Kept free of zod so the
 * client bundle only loads the schema (lib/rfq-schema.ts) when validating.
 * Error messages are keys under messages.rfqForm.errors.
 */
export type RfqErrorKey =
  | "partNumber"
  | "partNumberFormat"
  | "quantity"
  | "targetPrice"
  | "fullName"
  | "email"
  | "fileType"
  | "fileSize"
  | "tooLong";

export type RfqInput = {
  form: "quick" | "full";
  locale: Locale;
  partNumber: string;
  manufacturer: string;
  quantity: string;
  targetPrice: string;
  fullName: string;
  company: string;
  email: string;
  notes: string;
  bom: File | null;
};

export type RfqField = keyof RfqInput;

export const RFQ_TEXT_FIELDS = [
  "partNumber",
  "manufacturer",
  "quantity",
  "targetPrice",
  "fullName",
  "company",
  "email",
  "notes",
] as const satisfies readonly RfqField[];

/** Name of the honeypot input. Bots fill it; people never see it. */
export const HONEYPOT_FIELD = "website";

export type RfqActionResult =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "rateLimited" | "server";
      fieldErrors?: Partial<Record<RfqField, RfqErrorKey>>;
    };
