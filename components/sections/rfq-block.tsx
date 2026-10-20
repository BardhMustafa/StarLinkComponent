import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/ui/mono-label";
import { COMPANY } from "@/content/site";
import { RfqForm } from "./rfq-form";

/** Full-width cobalt request-for-quote block with the quick form. */
export async function RfqBlock() {
  const t = await getTranslations("home.rfq");
  return (
    <section aria-labelledby="rfq-title">
      <Container className="section-y">
        <Reveal className="grid items-center gap-12 rounded-[36px] surface-accent p-[clamp(20px,5vw,72px)] lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-7">
            <MonoLabel className="text-accent-soft">{t("index")}</MonoLabel>
            <h2
              id="rfq-title"
              className="font-display text-[clamp(48px,7vw,112px)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance"
            >
              {t("title")}
            </h2>
            <p className="max-w-[440px] text-lg leading-[1.55] text-[#E6E9FF] sm:text-[19px]">
              {t("body")}
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[15px]">
              <a href={`mailto:${COMPANY.email}`} className="w-fit break-all hover:underline">
                {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone.tel}`} className="w-fit hover:underline">
                {COMPANY.phone.display}
              </a>
            </div>
          </div>
          <RfqForm variant="quick" className="[--ring:var(--color-accent)]" />
        </Reveal>
      </Container>
    </section>
  );
}
