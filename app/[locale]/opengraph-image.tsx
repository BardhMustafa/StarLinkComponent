import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "StarLink Components";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return renderOgImage({
    label: t("home.hero.index"),
    title: `${t("home.hero.titleA")} ${t("home.hero.titleB")}`,
    muted: t("home.hero.titleC"),
    tagline: t("meta.ogTagline"),
  });
}
