import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { StaggerItem, StaggerList } from "@/components/motion/reveal";
import { Offices } from "@/components/sections/offices";
import { PageHero } from "@/components/sections/page-hero";
import { RfqBlock } from "@/components/sections/rfq-block";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { MonoLabel } from "@/components/ui/mono-label";
import { COMPANY } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const channels = [
    { href: `mailto:${COMPANY.email}`, label: t("common.email"), value: COMPANY.email, Icon: Mail },
    {
      href: `tel:${COMPANY.phone.tel}`,
      label: t("common.phone"),
      value: COMPANY.phone.display,
      Icon: Phone,
    },
  ];

  return (
    <>
      <PageHero
        index={t("pages.contact.index")}
        title={t("pages.contact.titleA")}
        muted={t("pages.contact.titleB")}
        intro={<p>{t("pages.contact.intro")}</p>}
      />

      <section aria-labelledby="sales-title">
        <Container className="pb-[clamp(72px,10vw,120px)]">
          <h2 id="sales-title" className="mb-6 label-mono text-muted">
            {t("pages.contact.salesLabel")}
          </h2>
          <StaggerList className="grid gap-4 md:grid-cols-2">
            {channels.map(({ href, label, value, Icon }) => (
              <StaggerItem key={href}>
                <a
                  href={href}
                  className="group flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-[28px] border border-hairline bg-panel p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
                >
                  <span className="flex items-center justify-between">
                    <MonoLabel className="flex items-center gap-2">
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </MonoLabel>
                    <ArrowBadge tone="outline" />
                  </span>
                  <span className="font-mono text-[clamp(20px,2.6vw,32px)] font-medium break-all">
                    {value}
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>

      <Offices />
      <RfqBlock />
    </>
  );
}
