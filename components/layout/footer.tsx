import { getTranslations } from "next-intl/server";
import { CATEGORY_KEY, CATEGORY_SLUGS } from "@/content/categories";
import { COMPANY, SOCIAL } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";

const linkClass = "inline-flex min-h-8 items-center transition-colors hover:text-accent";

export async function Footer() {
  const t = await getTranslations();
  const social = SOCIAL.filter((s) => s.url);

  const columns = [
    {
      title: t("footer.company"),
      links: [
        { href: "/about", label: t("footer.about") },
        { href: "/about#offices", label: t("nav.offices") },
        { href: "/services", label: t("nav.services") },
        { href: "/contact", label: t("nav.contact") },
        { href: "/privacy", label: t("footer.privacy") },
      ],
    },
    {
      title: t("footer.products"),
      links: CATEGORY_SLUGS.map((slug) => ({
        href: `/products/${slug}`,
        label: t(`categories.${CATEGORY_KEY[slug]}.name`),
      })),
    },
  ];

  return (
    <footer className="overflow-hidden border-t border-hairline">
      <Container className="flex flex-wrap justify-between gap-10 pt-14 text-[15px]">
        <div className="flex max-w-[360px] flex-col gap-4">
          <p className="leading-relaxed text-text-2">{t("footer.description")}</p>
          <div className="flex flex-col font-mono text-[13px]">
            <a href={`mailto:${COMPANY.email}`} className={linkClass}>
              {COMPANY.email}
            </a>
            <a href={`tel:${COMPANY.phone.tel}`} className={linkClass}>
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
        <nav aria-label={t("footer.label")} className="flex flex-wrap gap-x-14 gap-y-8">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-1.5">
              <h2 className="mb-1 label-mono-sm text-muted">{col.title}</h2>
              <ul className="flex flex-col">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {social.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <h2 className="mb-1 label-mono-sm text-muted">{t("footer.social")}</h2>
              <ul className="flex flex-col">
                {social.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} rel="noopener noreferrer" target="_blank" className={linkClass}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </Container>

      <Container aria-hidden="true" className="pt-10 select-none">
        <p className="font-display text-[clamp(80px,19vw,280px)] leading-[0.78] font-bold tracking-[-0.07em] whitespace-nowrap text-[#dfe2e9]">
          StarLink
        </p>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[12px] text-muted">
          <span className="uppercase">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </span>
          <LocaleSwitcher />
        </Container>
      </div>
    </footer>
  );
}
