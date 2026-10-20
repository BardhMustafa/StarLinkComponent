import { getTranslations } from "next-intl/server";
import { ChipPill } from "@/components/graphics/chip-pill";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";
import { Link } from "@/i18n/navigation";
import { SearchConsole } from "./search-console";

const STATS = ["hubs", "categories", "turnaround"] as const;

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-10 pb-16 sm:pt-14 sm:pb-[72px]">
        <div className="flex flex-wrap justify-between gap-3 pb-7">
          <MonoLabel>{t("index")}</MonoLabel>
          <MonoLabel>{t("regions")}</MonoLabel>
        </div>

        <h1 id="hero-title" className="text-h1 text-balance">
          <span data-line>{t("titleA")}</span> <ChipPill /> <span data-line>{t("titleB")}</span>{" "}
          <span data-line className="text-accent">
            {t("titleC")}
          </span>
        </h1>

        <div className="mt-12 grid gap-x-14 gap-y-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <p className="max-w-[460px] text-lg leading-[1.55] text-text-2 sm:text-xl">
              {t("sub")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rfq?bom=1" className={buttonVariants({ variant: "accent", size: "lg" })}>
                {t("uploadBom")}
              </Link>
              <Link href="/products" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {t("explore")}
              </Link>
            </div>
            <dl
              aria-label={t("statsLabel")}
              className="flex flex-wrap gap-x-7 gap-y-4 border-t border-hairline pt-5"
            >
              {STATS.map((key) => (
                <div key={key} className="flex flex-col-reverse">
                  <dt className="text-[13px] text-muted">{t(`stats.${key}.label`)}</dt>
                  <dd className="font-display text-[32px] leading-tight font-semibold tracking-[-0.03em]">
                    {t(`stats.${key}.value`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <SearchConsole />
        </div>
      </Container>
    </section>
  );
}
