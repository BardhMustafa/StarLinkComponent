import { getTranslations } from "next-intl/server";
import { CATEGORY_KEY, CATEGORY_SLUGS, isCategorySlug } from "@/content/categories";
import { routing, type Locale } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "StarLink Components line card";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORY_SLUGS.map((category) => ({ locale, category })),
  );
}

export default async function CategoryOgImage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale });
  const key = isCategorySlug(category) ? CATEGORY_KEY[category] : "semiconductors";
  return renderOgImage({
    label: t("home.lineCard.index"),
    title: t(`categories.${key}.name`),
    muted: t(`categories.${key}.meta`),
    tagline: t("meta.ogTagline"),
  });
}
