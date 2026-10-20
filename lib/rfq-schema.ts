import { z } from "zod";
import { routing } from "@/i18n/routing";
import { checkBomFile } from "./bom";
import type { RfqInput } from "./rfq-fields";
import { PART_NUMBER_MAX, PART_NUMBER_PATTERN, parseQuantity } from "./search";

export * from "./rfq-fields";

const text = (max: number) => z.string().trim().max(max, "tooLong");

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

/**
 * One schema for client (React Hook Form) and server (Server Action).
 * Error messages are keys under messages.rfqForm.errors.
 */
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

export type RfqData = z.output<typeof rfqSchema>;

// Keep the hand-written RfqInput (rfq-fields.ts) in sync with the schema.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const inputMatches: Same<z.input<typeof rfqSchema>, RfqInput> = true;
void inputMatches;
