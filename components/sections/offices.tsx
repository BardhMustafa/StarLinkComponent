import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatAddress, OFFICES } from "@/content/offices";

export async function Offices({ id = "offices" }: { id?: string }) {
  const t = await getTranslations();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 surface-ink">
      <Container className="section-y">
        <Reveal className="mb-14 sm:mb-[72px]">
          <SectionHeading
            id={`${id}-title`}
            tone="ink"
            index={t("home.offices.index")}
            title={t("home.offices.titleA")}
            muted={t("home.offices.titleB")}
          />
        </Reveal>
        <ul className="grid gap-y-14 md:grid-cols-3">
          {OFFICES.map((office, i) => (
            <li key={office.id} className="flex flex-col gap-5 md:pr-6">
              <div className="flex items-center" aria-hidden="true">
                <span className="size-3.5 shrink-0 rounded-full bg-signal shadow-[0_0_0_6px_rgba(212,255,58,0.15)]" />
                <span className="h-px flex-1 bg-hairline-ink" />
              </div>
              <MaskReveal delay={i * 0.08}>
                <span
                  aria-hidden="true"
                  className="block font-display text-[clamp(96px,11vw,168px)] leading-[0.85] font-bold tracking-[-0.06em] text-white"
                >
                  {office.code}
                </span>
              </MaskReveal>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-hairline-ink pt-4">
                <h3 className="text-xl font-semibold text-white">
                  {t(`offices.${office.id}.country`)}
                </h3>
                <span className="font-mono text-[13px] text-on-ink-muted">{office.utc}</span>
              </div>
              <div className="text-[15px] leading-relaxed text-on-ink-muted">
                <p>{t(`offices.${office.id}.region`)}</p>
                {office.address && (
                  <address className="not-italic">{formatAddress(office.address)}</address>
                )}
                {office.phone ? (
                  <a
                    href={`tel:${office.phone.tel}`}
                    className="inline-flex min-h-8 items-center font-mono text-white hover:text-signal"
                  >
                    {office.phone.display}
                  </a>
                ) : (
                  <p>{t("common.placeholderContact")}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
