import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ProductList } from "@/components/sections/product-list";
import { RfqBlock } from "@/components/sections/rfq-block";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CATEGORY_KEY,
  CATEGORY_PRODUCTS,
  CATEGORY_SLUGS,
  isCategorySlug,
} from "@/content/categories";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale; category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORY_SLUGS.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isCategorySlug(category)) return {};
  const t = await getTranslations({ locale, namespace: `categories.${CATEGORY_KEY[category]}` });
  return pageMetadata({
    locale,
    path: `/products/${category}`,
    ogImagePath: `/products/${category}`,
    title: t("name"),
    description: t("intro"),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isCategorySlug(category)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const key = CATEGORY_KEY[category];
  const name = t(`categories.${key}.name`);
  const products = CATEGORY_PRODUCTS[category];
  const others = CATEGORY_SLUGS.filter((slug) => slug !== category);

  return (
    <>
      <PageHero
        index={t("pages.category.index", { name })}
        title={name}
        intro={<p>{t(`categories.${key}.intro`)}</p>}
        aside={
          <Link href="/products" className="label-mono text-muted hover:text-accent">
            ← {t("pages.category.back")}
          </Link>
        }
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/rfq" className={buttonVariants({ size: "lg", badge: true })}>
            {t("pages.category.requestCta")}
            <ArrowBadge />
          </Link>
          {category === "obsolete-eol" && (
            <Link
              href="/services#obsolescence"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("services.obsolescence.name")}
            </Link>
          )}
        </div>
      </PageHero>

      <section aria-labelledby="families-title">
        <Container className="pb-[clamp(72px,10vw,120px)]">
          <Reveal className="mb-10">
            <SectionHeading
              id="families-title"
              index={`[ 002.1 ] ${name}`}
              title={t("pages.category.productsHeading")}
            />
          </Reveal>
          {products.length > 0 ? (
            <ProductList items={products} />
          ) : (
            <p className="max-w-[640px] border-y border-ink py-8 text-lg leading-relaxed text-text-2">
              {t("pages.category.noProducts")}
            </p>
          )}

          <nav aria-labelledby="other-title" className="mt-16">
            <h2 id="other-title" className="mb-4 label-mono text-muted">
              {t("pages.category.other")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {others.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/products/${slug}`}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border border-hairline bg-panel px-4 text-[15px] font-medium transition-colors hover:border-ink",
                    )}
                  >
                    {t(`categories.${CATEGORY_KEY[slug]}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
      <RfqBlock />
    </>
  );
}
