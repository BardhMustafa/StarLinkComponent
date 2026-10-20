import type { MetadataRoute } from "next";
import { CATEGORY_SLUGS } from "@/content/categories";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/metadata";

const PAGES: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  ...CATEGORY_SLUGS.map((slug) => ({ path: `/products/${slug}`, priority: 0.8 })),
  { path: "/services", priority: 0.8 },
  { path: "/rfq", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
