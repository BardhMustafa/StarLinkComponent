// Structural, non-translatable facts. Copy lives in messages/*.json.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.starlinkcomponents.com"
).replace(/\/$/, "");

export const COMPANY = {
  name: "StarLink Components",
  shortName: "StarLink",
  email: "sales@starlinkcomponents.com",
  phone: { display: "+1 514 927 6023", tel: "+15149276023" },
  googleSiteVerification: "orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M",
} as const;

/**
 * Social profiles. Leave a URL empty to hide it; the footer's Social column
 * only renders when at least one is set. See docs/CONTENT_TODO.md.
 */
export const SOCIAL: ReadonlyArray<{ id: "linkedin" | "x"; label: string; url: string }> = [
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "x", label: "X", url: "" },
];

export const NAV = [
  { key: "lineCard", href: "/products" },
  { key: "services", href: "/services" },
  { key: "offices", href: "/about#offices" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];
