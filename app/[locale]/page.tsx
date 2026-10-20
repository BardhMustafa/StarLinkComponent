import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { LineCard } from "@/components/sections/line-card";
import { Offices } from "@/components/sections/offices";
import { Process } from "@/components/sections/process";
import { RfqBlock } from "@/components/sections/rfq-block";
import { Services } from "@/components/sections/services";
import { Ticker } from "@/components/sections/ticker";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
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
