import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { buttonVariants } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.notFound");
  return { title: t("title"), robots: { index: false, follow: true } };
}

export default async function NotFound() {
  const t = await getTranslations("pages.notFound");
  return (
    <Container className="flex flex-col items-start gap-8 section-y">
      <MonoLabel>{t("index")}</MonoLabel>
      <h1 className="max-w-[14ch] text-h1 text-balance">
        {t("titleA")} <span className="text-faint">{t("titleB")}</span>
      </h1>
      <p className="max-w-[520px] text-lg text-text-2">{t("body")}</p>
      <Link href="/" className={buttonVariants({ size: "lg", badge: true })}>
        {t("home")}
        <ArrowBadge />
      </Link>
    </Container>
  );
}
