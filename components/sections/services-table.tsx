import { getTranslations } from "next-intl/server";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { SERVICES } from "@/content/services";
import { Link } from "@/i18n/navigation";

type ServicesTableProps = {
  /** "short" for the homepage, "long" for /services. */
  copy?: "short" | "long";
  headingLevel?: "h3" | "h2";
};

/** Editorial table of services separated by 1px ink rules. */
export async function ServicesTable({ copy = "short", headingLevel = "h3" }: ServicesTableProps) {
  const t = await getTranslations("services");
  const Name = headingLevel;

  return (
    <ul className="border-b border-ink">
      {SERVICES.map(({ key, code }) => (
        <li
          key={key}
          id={copy === "long" ? key : undefined}
          className="scroll-mt-28 border-t border-ink"
        >
          <Link
            href={copy === "long" ? "/rfq" : `/services#${key}`}
            className="group -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 rounded-2xl px-3 py-7 transition-colors duration-300 hover:bg-ink/[0.04] sm:py-8 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)_52px] md:gap-x-10"
          >
            <span className="col-span-2 font-mono text-[13px] text-muted md:col-span-1">
              {code}
            </span>
            <Name className="col-start-1 text-h3 font-display md:col-start-auto">
              {t(`${key}.name`)}
            </Name>
            <p className="col-span-2 text-base leading-relaxed text-text-2 md:col-span-1">
              {t(`${key}.${copy}`)}
            </p>
            <ArrowBadge
              tone="outline"
              size="md"
              className="col-start-2 row-start-2 md:col-start-auto md:row-start-auto"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
