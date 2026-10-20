import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { LineCard } from "@/components/sections/line-card";
import { Offices } from "@/components/sections/offices";
import { Process } from "@/components/sections/process";
import { RfqBlock } from "@/components/sections/rfq-block";
import { Services } from "@/components/sections/services";
import { Ticker } from "@/components/sections/ticker";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("title"),
    absoluteTitle: true,
    description: t("description"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Ticker />
      <LineCard />
      <Services />
      <Process className="pb-[clamp(72px,10vw,120px)]" />
      <Offices />
      <RfqBlock />
    </>
  );
}
