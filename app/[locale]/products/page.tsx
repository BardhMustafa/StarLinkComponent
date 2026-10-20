import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { LineCard } from "@/components/sections/line-card";
import { PageHero } from "@/components/sections/page-hero";
import { ProductList } from "@/components/sections/product-list";
import { RfqBlock } from "@/components/sections/rfq-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { CATEGORY_PRODUCTS } from "@/content/categories";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.products" });
  return pageMetadata({
    locale,
    path: "/products",
    title: t("title"),
    description: t("description"),
  });
}

const ALL_PRODUCTS = [...CATEGORY_PRODUCTS.semiconductors, ...CATEGORY_PRODUCTS.passives];

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        index={t("pages.products.index")}
        title={t("pages.products.titleA")}
        muted={t("pages.products.titleB")}
        intro={<p>{t("pages.products.intro")}</p>}
        aside={<span className="label-mono text-muted">{t("home.hero.regions")}</span>}
      />
      <LineCard withHeading={false} headingLevel="h2" />
      <section aria-labelledby="families-title">
        <Container className="section-y">
          <Reveal className="mb-12">
            <SectionHeading
              id="families-title"
              index={`[ 002.1 ] ${t("pages.category.productsHeading")}`}
              title={t("pages.category.productsHeading")}
            />
          </Reveal>
          <ProductList items={ALL_PRODUCTS} />
        </Container>
      </section>
      <RfqBlock />
    </>
  );
}
