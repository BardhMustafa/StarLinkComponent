"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { submitRfq } from "@/app/actions/rfq";
import { Dropzone } from "@/components/ui/dropzone";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Link } from "@/i18n/navigation";
import { takePendingBom } from "@/lib/pending-bom";
import {
  HONEYPOT_FIELD,
  RFQ_TEXT_FIELDS,
  rfqSchema,
  type RfqErrorKey,
  type RfqField,
  type RfqInput,
} from "@/lib/rfq-schema";
import { normalizePartNumber, parseQuantity } from "@/lib/search";
import { cn } from "@/lib/utils";

type RfqFormProps = {
  variant: "quick" | "full";
  /** Read ?part=&qty=&bom= from the URL after hydration (keeps the page static). */
  prefillFromUrl?: boolean;
  className?: string;
};

const EMPTY = {
  partNumber: "",
  manufacturer: "",
  quantity: "",
  targetPrice: "",
  fullName: "",
  company: "",
  email: "",
  notes: "",
};

export function RfqForm({ variant, prefillFromUrl = false, className }: RfqFormProps) {
  const t = useTranslations("rfqForm");
  const tc = useTranslations("common");
  const locale = useLocale();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const full = variant === "full";

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    defaultValues: { ...EMPTY, form: variant, locale: locale as RfqInput["locale"], bom: null },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!prefillFromUrl) return;
    const params = new URLSearchParams(window.location.search);
    const part = normalizePartNumber(params.get("part") ?? "");
    const qty = parseQuantity(params.get("qty"));
    if (part) setValue("partNumber", part);
    if (qty) setValue("quantity", String(qty));
    const pending = takePendingBom();
    if (pending) setValue("bom", pending, { shouldValidate: true });
    if (part && !qty) setFocus("quantity");
  }, [prefillFromUrl, setValue, setFocus]);

  const errorText = (field: RfqField) => {
    const key = errors[field]?.message as RfqErrorKey | undefined;
    return key ? t(`errors.${key}`) : undefined;
  };

  const a11y = (field: RfqField) => ({
    id: id(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id(field)}-error` : undefined,
  });

  const onSubmit = handleSubmit(async (values) => {
    const data = new FormData();
    data.set("form", variant);
    data.set("locale", locale);
    for (const field of RFQ_TEXT_FIELDS) data.set(field, values[field] ?? "");
    if (values.bom) data.set("bom", values.bom);
    data.set(HONEYPOT_FIELD, honeypotRef.current?.value ?? "");

    try {
      const result = await submitRfq(data);
      if (result.ok) {
        toast.success(t("toast.success"));
        setSentTo(values.email.trim());
        return;
      }
      if (result.error === "validation" && result.fieldErrors) {
        for (const [field, key] of Object.entries(result.fieldErrors)) {
          setError(field as RfqField, { message: key }, { shouldFocus: true });
        }
        return;
      }
      toast.error(t(result.error === "rateLimited" ? "errors.rateLimited" : "toast.error"));
    } catch {
      toast.error(t("toast.error"));
    }
  });

  if (sentTo) {
    return (
      <div
        role="status"
        className={cn(
          "flex min-w-0 flex-col items-start gap-5 rounded-3xl bg-panel p-7 text-ink",
          className,
        )}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-signal">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-[32px] leading-none font-semibold tracking-[-0.04em]">
          {t("success.title")}
        </h3>
        <p className="max-w-[46ch] text-base leading-relaxed text-text-2">
          {t("success.body", { email: sentTo })}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSentTo(null);
          }}
          className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-accent"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  const req = { required: true, requiredLabel: tc("required") };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={t("label")}
      className={cn(
        "relative grid min-w-0 gap-3.5 rounded-3xl bg-panel p-5 text-ink sm:grid-cols-2 sm:p-7",
        className,
      )}
    >
      <Field
        id={id("partNumber")}
        label={t("fields.partNumber")}
        error={errorText("partNumber")}
        {...req}
      >
        <Input
          {...register("partNumber")}
          {...a11y("partNumber")}
          placeholder={t("placeholders.partNumber")}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="font-mono font-medium uppercase placeholder:normal-case"
        />
      </Field>

      {full && (
        <Field
          id={id("manufacturer")}
          label={t("fields.manufacturer")}
          error={errorText("manufacturer")}
        >
          <Input
            {...register("manufacturer")}
            {...a11y("manufacturer")}
            placeholder={t("placeholders.manufacturer")}
            autoComplete="off"
          />
        </Field>
      )}

      <Field
        id={id("quantity")}
        label={t("fields.quantity")}
        error={errorText("quantity")}
        {...req}
      >
        <Input
          {...register("quantity")}
          {...a11y("quantity")}
          placeholder={t("placeholders.quantity")}
          inputMode="numeric"
          autoComplete="off"
          className="font-mono font-medium"
        />
      </Field>

      {full && (
        <Field
          id={id("targetPrice")}
          label={t("fields.targetPrice")}
          error={errorText("targetPrice")}
        >
          <Input
            {...register("targetPrice")}
            {...a11y("targetPrice")}
            placeholder={t("placeholders.targetPrice")}
            inputMode="decimal"
            autoComplete="off"
            className="font-mono font-medium"
          />
        </Field>
      )}

      {full && (
        <>
          <Field
            id={id("fullName")}
            label={t("fields.fullName")}
            error={errorText("fullName")}
            {...req}
          >
            <Input
              {...register("fullName")}
              {...a11y("fullName")}
              placeholder={t("placeholders.fullName")}
              autoComplete="name"
            />
          </Field>
          <Field id={id("company")} label={t("fields.company")} error={errorText("company")}>
            <Input
              {...register("company")}
              {...a11y("company")}
              placeholder={t("placeholders.company")}
              autoComplete="organization"
            />
          </Field>
        </>
      )}

      <Field
        id={id("email")}
        label={t("fields.email")}
        error={errorText("email")}
        className="sm:col-span-2"
        {...req}
      >
        <Input
          {...register("email")}
          {...a11y("email")}
          type="email"
          placeholder={t("placeholders.email")}
          autoComplete="email"
          spellCheck={false}
        />
      </Field>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        {full && <span className="label-mono-sm text-muted">{t("fields.bom")}</span>}
        <Controller
          control={control}
          name="bom"
          render={({ field }) => (
            <Dropzone
              title={t("bomDrop")}
              hint={t("bomTypes")}
              browseLabel={t("browse")}
              removeLabel={t("removeFile")}
              file={field.value ?? null}
              onFile={(file) => field.onChange(file)}
              invalid={Boolean(errors.bom)}
              describedBy={errors.bom ? `${id("bom")}-error` : undefined}
            />
          )}
        />
        {errors.bom && (
          <p id={`${id("bom")}-error`} className="text-[13px] text-danger">
            {errorText("bom")}
          </p>
        )}
      </div>

      {full && (
        <Field
          id={id("notes")}
          label={t("fields.notes")}
          error={errorText("notes")}
          className="sm:col-span-2"
        >
          <Textarea
            {...register("notes")}
            {...a11y("notes")}
            placeholder={t("placeholders.notes")}
            rows={4}
          />
        </Field>
      )}

      {/* Honeypot — off-screen, skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id(HONEYPOT_FIELD)}>{t("honeypot")}</label>
        <input
          ref={honeypotRef}
          id={id(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink text-base font-semibold text-white transition-[transform,background-color] hover:bg-ink-3 active:scale-[0.98] disabled:opacity-70 sm:col-span-2"
      >
        {isSubmitting ? t("sending") : t("submit")}
        {!isSubmitting && <ArrowRight className="size-[18px]" aria-hidden="true" />}
      </button>

      <p className="text-[13px] leading-relaxed text-muted sm:col-span-2">
        <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
          {t("consent")}
        </Link>
      </p>
    </form>
  );
}
