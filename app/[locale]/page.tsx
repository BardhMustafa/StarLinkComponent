import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/routing";

export default function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home.lineCard");

  return (
    <Container className="section-y">
      <SectionHeading index={t("index")} title={t("titleA")} muted={t("titleB")} />
    </Container>
  );
}
