import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return pageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("description"),
  });
}

const SECTIONS = [
  "controller",
  "data",
  "use",
  "processors",
  "retention",
  "rights",
  "cookies",
] as const;

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.privacy");

  return (
    <>
      <PageHero index={t("index")} title={t("titleA")} muted={t("titleB")} />
      <Container className="pb-[clamp(72px,10vw,120px)]">
        <p
          role="note"
          className="mb-12 max-w-[760px] rounded-2xl border-[1.5px] border-dashed border-ink px-5 py-4 font-mono text-[13px] leading-relaxed"
        >
          {t("draft")}
        </p>
        <ol className="max-w-[920px] border-b border-ink">
          {SECTIONS.map((key, i) => (
            <li
              key={key}
              className="grid gap-x-10 gap-y-3 border-t border-ink py-8 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.6fr)]"
            >
              <span className="font-mono text-[13px] text-muted">
                §{String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="text-base leading-relaxed text-text-2">{t(`sections.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
