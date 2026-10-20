import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Reveal, StaggerItem, StaggerList } from "@/components/motion/reveal";
import { Offices } from "@/components/sections/offices";
import { PageHero } from "@/components/sections/page-hero";
import { RfqBlock } from "@/components/sections/rfq-block";
import { MonoLabel } from "@/components/ui/mono-label";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return pageMetadata({ locale, path: "/about", title: t("title"), description: t("description") });
}

const VALUES = ["quality", "response", "pricing", "relationships"] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const tHero = await getTranslations("home.hero");

  return (
    <>
      <PageHero
        index={t("index")}
        title={t("titleA")}
        muted={t("titleB")}
        aside={<MonoLabel>{tHero("regions")}</MonoLabel>}
      />

      <Container className="grid gap-x-14 gap-y-8 pb-[clamp(72px,10vw,120px)] lg:grid-cols-2">
        <Reveal className="text-[clamp(22px,2.2vw,30px)] leading-[1.35] font-medium tracking-[-0.015em] text-ink">
          <p>{t("p1")}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-5 text-lg leading-[1.65] text-text-2">
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
        </Reveal>
      </Container>

      <section aria-labelledby="values-title">
        <Container className="pb-[clamp(72px,10vw,120px)]">
          <h2 id="values-title" className="mb-6 label-mono text-muted">
            {t("valuesLabel")}
          </h2>
          <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((key, i) => (
              <StaggerItem
                key={key}
                className="flex flex-col gap-8 rounded-3xl border border-hairline bg-panel p-7"
              >
                <span className="font-mono text-[13px] font-semibold text-accent">
                  V—{String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 font-display text-2xl font-semibold tracking-[-0.03em]">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {t(`values.${key}.body`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>

      <Offices />
      <RfqBlock />
    </>
  );
}
