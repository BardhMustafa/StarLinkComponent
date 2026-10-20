"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { Dropzone } from "@/components/ui/dropzone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EXAMPLE_PARTS } from "@/content/parts";
import { Link, useRouter } from "@/i18n/navigation";
import { checkBomFile } from "@/lib/bom";
import { setPendingBom } from "@/lib/pending-bom";
import { normalizePartNumber, rfqSearchParams } from "@/lib/search";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex flex-col gap-1.5 rounded-2xl border border-ink-3 bg-ink-2 px-4 py-3 transition-colors focus-within:border-signal";
const inputClass =
  "w-full min-w-0 bg-transparent font-mono text-[22px] font-medium text-white outline-none placeholder:text-[#5E6680]";

export function SearchConsole({ className }: { className?: string }) {
  const t = useTranslations("home.console");
  const tf = useTranslations("rfqForm");
  const tc = useTranslations("common");
  const router = useRouter();
  const errorId = useId();
  const [part, setPart] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bom, setBom] = useState<File | null>(null);
  const [bomError, setBomError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizePartNumber(part)) {
      setError(t("partRequired"));
      return;
    }
    const params = rfqSearchParams({ partNumber: part, quantity: Number(qty) || undefined });
    router.push(`/rfq?${params}`);
  };

  const onBom = (file: File | null) => {
    setBomError(null);
    if (!file) return setBom(null);
    const check = checkBomFile(file);
    if (check !== "ok") {
      setBom(null);
      setBomError(tf(check === "type" ? "errors.fileType" : "errors.fileSize"));
      return;
    }
    setBom(file);
  };

  const continueWithBom = () => {
    if (!bom) return;
    setPendingBom(bom);
    router.push("/rfq?bom=1");
  };

  return (
    <section
      aria-label={t("label")}
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-[28px] surface-ink p-5 shadow-[0_40px_80px_-40px_rgba(10,14,26,0.6)] sm:p-7",
        className,
      )}
    >
      <Tabs defaultValue="part" className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList aria-label={t("tablist")}>
            <TabsTrigger value="part">{t("partTab")}</TabsTrigger>
            <TabsTrigger value="bom">{t("bomTab")}</TabsTrigger>
          </TabsList>
          <span className="flex items-center gap-2 font-mono text-[12px] text-on-ink-muted uppercase">
            <span className="size-[7px] rounded-full bg-signal" aria-hidden="true" />
            {t("online")}
          </span>
        </div>

        <TabsContent value="part" className="outline-none">
          <form onSubmit={onSubmit} noValidate className="flex flex-wrap gap-2.5">
            <label className={cn(fieldClass, "flex-[1_1_240px]", error && "border-[#FF8A80]")}>
              <span className="label-mono-sm text-on-ink-muted">{t("partLabel")}</span>
              <input
                name="part"
                value={part}
                onChange={(e) => {
                  setPart(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={t("partPlaceholder")}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={64}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className={inputClass}
              />
            </label>
            <label className={cn(fieldClass, "flex-[1_1_120px] sm:max-w-[160px]")}>
              <span className="label-mono-sm text-on-ink-muted">{t("qtyLabel")}</span>
              <input
                name="qty"
                value={qty}
                onChange={(e) => setQty(e.target.value.replace(/[^\d]/g, ""))}
                placeholder={t("qtyPlaceholder")}
                inputMode="numeric"
                autoComplete="off"
                maxLength={9}
                className={inputClass}
              />
            </label>
            {error && (
              <p id={errorId} role="alert" className="basis-full text-sm text-[#FF8A80]">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="inline-flex min-h-14 basis-full items-center justify-center gap-2 rounded-2xl bg-accent text-base font-semibold text-white transition-[transform,background-color] hover:bg-[#3d50ff] active:scale-[0.98]"
            >
              {t("submit")} <ArrowRight className="size-[18px]" aria-hidden="true" />
            </button>
          </form>
        </TabsContent>

        <TabsContent value="bom" className="flex flex-col gap-2.5 outline-none">
          <Dropzone
            tone="ink"
            title={t("bomDrop")}
            hint={t("bomHint")}
            browseLabel={t("bomBrowse")}
            removeLabel={tf("removeFile")}
            file={bom}
            onFile={onBom}
            invalid={Boolean(bomError)}
            className="min-h-[126px]"
          />
          {bomError && (
            <p role="alert" className="text-sm text-[#FF8A80]">
              {bomError}
            </p>
          )}
          <button
            type="button"
            onClick={continueWithBom}
            disabled={!bom}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-accent text-base font-semibold text-white transition-[transform,background-color,opacity] hover:bg-[#3d50ff] active:scale-[0.98] disabled:opacity-50"
          >
            {t("bomContinue")} <ArrowRight className="size-[18px]" aria-hidden="true" />
          </button>
        </TabsContent>
      </Tabs>

      <div className="border-t border-ink-3 pt-3.5">
        <div className="flex justify-between px-1 pb-2 label-mono-sm text-on-ink-faint">
          <span>{t("recent")}</span>
          <span aria-hidden="true">{t("status")}</span>
        </div>
        <ul>
          {EXAMPLE_PARTS.map(({ part: example, kind }) => (
            <li key={example} className="border-t border-[#1B2134]">
              <Link
                href={`/rfq?${rfqSearchParams({ partNumber: example })}`}
                className="group flex min-h-12 flex-wrap items-center justify-between gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-ink-2"
              >
                <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                  <span className="sr-only">{tc("requestQuote")}: </span>
                  <span className="font-mono text-[15px] break-all text-white group-hover:text-signal">
                    {example}
                  </span>
                  <span className="text-[13px] text-on-ink-faint">{t(`kinds.${kind}`)}</span>
                </span>
                <span className="rounded-full border border-[#3A4A1A] px-2.5 py-1 font-mono text-[12px] text-signal uppercase">
                  {t("quoteOnRequest")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
