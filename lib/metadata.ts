import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";

const OG_LOCALE: Record<Locale, string> = { en: "en_CA", fr: "fr_CA" };

/** Absolute URL for a locale-less path, e.g. ("fr", "/services"). */
export function localizedUrl(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${clean}`;
}

/** hreflang map for every locale plus x-default (the default locale). */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localizedUrl(locale, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

type PageMetadataInput = {
  locale: Locale;
  /** Locale-less path, e.g. "/" or "/products/passives". */
  path: string;
  /** Omit on the homepage to use the full default title. */
  title?: string;
  /** Use the title verbatim, without the "— StarLink Components" template. */
  absoluteTitle?: boolean;
  description: string;
  noindex?: boolean;
};

export async function pageMetadata({
  locale,
  path,
  title,
  absoluteTitle,
  description,
  noindex,
}: PageMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = localizedUrl(locale, path);
  const fullTitle = title
    ? absoluteTitle
      ? title
      : `${title} — ${t("siteName")}`
    : t("defaultTitle");

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : { absolute: t("defaultTitle") },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: t("siteName"),
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
