import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { RfqForm } from "@/components/sections/rfq-form";
import { MonoLabel } from "@/components/ui/mono-label";
import { COMPANY } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.rfq" });
  return pageMetadata({ locale, path: "/rfq", title: t("title"), description: t("description") });
}

const STEPS = ["send", "quote", "dock"] as const;

export default async function RfqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        index={t("pages.rfq.index")}
        title={t("pages.rfq.titleA")}
        muted={t("pages.rfq.titleB")}
        intro={<p>{t("pages.rfq.intro")}</p>}
      />
      <Container className="grid gap-6 pb-[clamp(72px,10vw,120px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Static HTML; ?part=&qty=&bom= are applied after hydration. */}
        <RfqForm variant="full" prefillFromUrl className="border border-hairline" />

        <aside className="flex flex-col gap-4" aria-labelledby="rfq-next">
          <div className="flex flex-col gap-6 rounded-3xl surface-ink p-7">
            <h2 id="rfq-next" className="label-mono text-on-ink-faint">
              {t("pages.rfq.asideTitle")}
            </h2>
            <ol className="flex flex-col">
              {STEPS.map((step) => (
                <li key={step} className="flex flex-col gap-1 border-t border-hairline-ink py-4">
                  <span className="font-mono text-[13px] font-semibold text-signal uppercase">
                    {t(`home.process.steps.${step}.time`)}
                  </span>
                  <span className="font-display text-xl font-semibold tracking-[-0.02em] text-white">
                    {t(`home.process.steps.${step}.title`)}
                  </span>
                  <span className="text-[15px] leading-relaxed text-on-ink-muted">
                    {t(`home.process.steps.${step}.body`)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-2 rounded-3xl border border-hairline bg-panel p-7">
            <MonoLabel>{t("pages.rfq.directLabel")}</MonoLabel>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-h-11 items-center font-mono text-[15px] break-all hover:text-accent"
            >
              {COMPANY.email}
            </a>
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex min-h-11 items-center font-mono text-[15px] hover:text-accent"
            >
              {COMPANY.phone.display}
            </a>
          </div>
        </aside>
      </Container>
    </>
  );
}
