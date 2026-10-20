import { getTranslations } from "next-intl/server";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { Link } from "@/i18n/navigation";

type ProductKey =
  | "microcontrollers"
  | "integratedCircuits"
  | "memory"
  | "transistors"
  | "diodes"
  | "voltageRegulators"
  | "capacitors"
  | "resistors"
  | "inductors";

type ProductListProps = {
  items: readonly ProductKey[];
  /** Mono code prefix, e.g. "P" → P—01. */
  prefix?: string;
  headingLevel?: "h2" | "h3";
};

/** Datasheet-style rows: code, family name, description, quote link. */
export async function ProductList({ items, prefix = "P", headingLevel = "h3" }: ProductListProps) {
  const t = await getTranslations();
  const Name = headingLevel;

  return (
    <ul className="border-b border-ink">
      {items.map((key, i) => {
        const name = t(`products.${key}.name`);
        return (
          <li
            key={key}
            className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 border-t border-ink py-7 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:gap-x-10"
          >
            <span className="col-span-2 font-mono text-[13px] text-muted md:col-span-1 md:pt-2">
              {prefix}—{String(i + 1).padStart(2, "0")}
            </span>
            <Name className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              {name}
            </Name>
            <p className="col-span-2 text-base leading-relaxed text-text-2 md:col-span-1">
              {t(`products.${key}.description`)}
            </p>
            <Link
              href="/rfq"
              aria-label={`${t("common.requestQuote")} — ${name}`}
              className="group col-start-2 row-start-2 rounded-full md:col-start-auto md:row-start-auto"
            >
              <ArrowBadge tone="outline" size="md" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
