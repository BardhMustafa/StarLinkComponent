import { getTranslations } from "next-intl/server";
import { OFFICES } from "@/content/offices";
import { COMPANY, SITE_URL, SOCIAL } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

/** schema.org Organization with the three offices and the sales contact point. */
export async function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    url: localizedUrl(locale, "/"),
    logo: `${SITE_URL}/icon.svg`,
    email: COMPANY.email,
    telephone: COMPANY.phone.tel,
    description: t("meta.defaultDescription"),
    areaServed: "Worldwide",
    knowsAbout: [
      t("categories.semiconductors.name"),
      t("categories.passives.name"),
      t("categories.connectors.name"),
      t("categories.electromechanical.name"),
      t("categories.obsolete.name"),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone.tel,
        availableLanguage: ["English", "French"],
        areaServed: "Worldwide",
      },
    ],
    // Offices without a confirmed street address are listed by country only.
    location: OFFICES.map((office) => ({
      "@type": "Place",
      name: `${COMPANY.name} — ${t(`offices.${office.id}.country`)}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: office.country,
        ...(office.address ? { streetAddress: office.address } : {}),
      },
      ...(office.phone ? { telephone: office.phone.tel } : {}),
    })),
    sameAs: SOCIAL.filter((s) => s.url).map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" so no string can close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
