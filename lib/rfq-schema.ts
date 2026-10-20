import { z } from "zod";
import { routing } from "@/i18n/routing";
import { checkBomFile } from "./bom";
import { PART_NUMBER_MAX, PART_NUMBER_PATTERN, parseQuantity } from "./search";

/**
 * One schema for client (React Hook Form) and server (Server Action).
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

const text = (max: number) => z.string().trim().max(max, "tooLong");

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

export const rfqSchema = z
  .object({
    /** "quick" = homepage block (no name field), "full" = /rfq page. */
    form: z.enum(["quick", "full"]),
    locale: z.enum(routing.locales),
    partNumber: text(PART_NUMBER_MAX).refine(
      (v) => v === "" || PART_NUMBER_PATTERN.test(v),
      "partNumberFormat",
    ),
    manufacturer: text(80),
    quantity: text(12).refine((v) => v === "" || parseQuantity(v) !== undefined, "quantity"),
    targetPrice: text(16).refine(
      (v) => v === "" || /^\d{1,9}([.,]\d{1,6})?$/.test(v),
      "targetPrice",
    ),
    fullName: text(120),
    company: text(120),
    email: z.string().trim().max(254, "tooLong").pipe(z.email("email")),
    notes: text(2000),
    bom: z.custom<File | null>((v) => v === null || isFile(v)),
  })
  .superRefine((v, ctx) => {
    const hasBom = v.bom !== null;

    if (v.bom) {
      const check = checkBomFile(v.bom);
      if (check !== "ok") {
        ctx.addIssue({
          code: "custom",
          path: ["bom"],
          message: check === "type" ? "fileType" : "fileSize",
        });
      }
    }
    // A single part needs a number and a quantity; a BOM carries its own.
    if (!hasBom && v.partNumber === "") {
      ctx.addIssue({ code: "custom", path: ["partNumber"], message: "partNumber" });
    }
    if (!hasBom && v.quantity === "") {
      ctx.addIssue({ code: "custom", path: ["quantity"], message: "quantity" });
    }
    if (v.form === "full" && v.fullName === "") {
      ctx.addIssue({ code: "custom", path: ["fullName"], message: "fullName" });
    }
  });

export type RfqInput = z.input<typeof rfqSchema>;
export type RfqData = z.output<typeof rfqSchema>;
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
