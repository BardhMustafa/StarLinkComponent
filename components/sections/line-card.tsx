import { getTranslations } from "next-intl/server";
import { PcbChip } from "@/components/graphics/pcb-chip";
import { Container } from "@/components/layout/container";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { buttonVariants } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { CATEGORY_PRODUCTS } from "@/content/categories";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const tileBase =
  "group relative flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-[28px] p-7 transition-transform duration-300 ease-(--ease-precise) hover:-translate-y-1 sm:p-8 motion-reduce:hover:translate-y-0";

const tileTitle = "font-display font-semibold tracking-[-0.04em] leading-none";

type LineCardProps = {
  /** Render the section heading row (homepage) or tiles only (inner pages). */
  withHeading?: boolean;
  headingLevel?: "h2" | "h3";
};

export async function LineCard({ withHeading = true, headingLevel = "h3" }: LineCardProps) {
  const t = await getTranslations();
  const Title = headingLevel;

  return (
    <section
      aria-labelledby={withHeading ? "line-card-title" : undefined}
      aria-label={withHeading ? undefined : t("home.lineCard.full")}
    >
      <Container className={cn(withHeading && "pt-[clamp(72px,10vw,120px)] pb-10")}>
        {withHeading && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="line-card-title"
              index={t("home.lineCard.index")}
              title={t("home.lineCard.titleA")}
              muted={t("home.lineCard.titleB")}
            />
            <Link href="/products" className={buttonVariants({ variant: "outline" })}>
              {t("home.lineCard.full")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}

        <ul className="grid gap-4 md:grid-cols-6 lg:grid-cols-3">
          {/* §01 Semiconductors — big ink tile */}
          <li className="md:col-span-6 lg:col-span-2 lg:row-span-2">
            <Link
              href="/products/semiconductors"
              className={cn(
                tileBase,
                "h-full min-h-[440px] surface-ink text-white sm:min-h-[540px] sm:p-9",
              )}
            >
              <div className="flex justify-between label-mono text-on-ink-faint">
                <span>§01</span>
                <span>{t("categories.semiconductors.meta")}</span>
              </div>
              <PcbChip className="pointer-events-none absolute top-10 -right-10 w-[78%] max-w-[460px] sm:w-[62%]" />
              <div className="relative">
                <Title className={cn(tileTitle, "mb-5 text-[clamp(36px,4vw,56px)]")}>
                  {t("categories.semiconductors.name")}
                </Title>
                <ul className="flex max-w-[520px] flex-wrap gap-2">
                  {CATEGORY_PRODUCTS.semiconductors.map((key) => (
                    <li
                      key={key}
                      className="rounded-full border border-hairline-ink px-3.5 py-2 text-sm"
                    >
                      {t(`products.${key}.name`)}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>

          {/* §02 Passives — cobalt */}
          <li className="md:col-span-3 lg:col-span-1">
            <Link
              href="/products/passives"
              className={cn(tileBase, "h-full min-h-[262px] surface-accent")}
            >
              <div className="flex items-center justify-between label-mono text-accent-soft">
                <span>§02</span>
                <ArrowBadge tone="outlineLight" />
              </div>
              <div>
                <Title className={cn(tileTitle, "mb-2.5 text-[40px]")}>
                  {t("categories.passives.name")}
                </Title>
                <p className="text-[15px] text-[#E6E9FF]">{t("categories.passives.summary")}</p>
              </div>
            </Link>
          </li>

          {/* §03 Connectors — white */}
          <li className="md:col-span-3 lg:col-span-1">
            <Link
              href="/products/connectors"
              className={cn(tileBase, "h-full min-h-[262px] border border-hairline bg-panel")}
            >
              <div className="flex items-center justify-between label-mono text-muted">
                <span>§03</span>
                <ArrowBadge tone="outline" />
              </div>
              <div>
                <Title className={cn(tileTitle, "mb-2.5 text-[40px]")}>
                  {t("categories.connectors.name")}
                </Title>
                <p className="text-[15px] text-muted">{t("categories.connectors.summary")}</p>
              </div>
            </Link>
          </li>

          {/* §04 Electromechanical — white */}
          <li className="md:col-span-3 lg:col-span-1">
            <Link
              href="/products/electromechanical"
              className={cn(tileBase, "h-full min-h-[240px] border border-hairline bg-panel")}
            >
              <div className="flex items-center justify-between label-mono text-muted">
                <span>§04</span>
                <ArrowBadge tone="outline" />
              </div>
              <div>
                <Title
                  className={cn(
                    tileTitle,
                    "mb-2.5 text-[clamp(32px,3.2vw,40px)] break-words hyphens-auto",
                  )}
                >
                  {t("categories.electromechanical.name")}
                </Title>
                <p className="text-[15px] text-muted">
                  {t("categories.electromechanical.summary")}
                </p>
              </div>
            </Link>
          </li>

          {/* §05 Obsolete & EOL — wide muted */}
          <li className="md:col-span-3 lg:col-span-2">
            <Link
              href="/products/obsolete-eol"
              className={cn(
                tileBase,
                "h-full min-h-[240px] flex-row flex-wrap items-end bg-panel-2",
              )}
            >
              <div className="max-w-[540px]">
                <MonoLabel className="mb-[18px] block">
                  §05 · {t("categories.obsolete.meta")}
                </MonoLabel>
                <Title className="text-h3 font-display">{t("categories.obsolete.summary")}</Title>
              </div>
              <ArrowBadge direction="right" tone="ink" size="lg" />
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
