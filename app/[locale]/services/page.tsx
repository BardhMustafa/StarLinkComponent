import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { RfqBlock } from "@/components/sections/rfq-block";
import { ServicesTable } from "@/components/sections/services-table";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return pageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");

  return (
    <>
      <PageHero
        index={t("index")}
        title={t("titleA")}
        muted={t("titleB")}
        intro={<p>{t("intro")}</p>}
      />
      <Container className="pb-[clamp(72px,10vw,120px)]">
        <Reveal>
          <ServicesTable copy="long" headingLevel="h2" />
        </Reveal>
      </Container>
      <Process />
      <RfqBlock />
    </>
  );
}
