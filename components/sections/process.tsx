import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const STEPS = ["send", "quote", "dock"] as const;

export async function Process({ className }: { className?: string }) {
  const t = await getTranslations("home.process");
  return (
    <section aria-label={t("label")} className={className}>
      <Container>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li
                key={step}
                className={cn(
                  "flex flex-col gap-10 rounded-3xl p-7",
                  last ? "surface-ink text-white" : "border border-hairline bg-panel",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[13px] font-semibold uppercase",
                    last ? "text-signal" : "text-accent",
                  )}
                >
                  {t(`steps.${step}.time`)}
                </span>
                <div>
                  <h3 className="mb-2 font-display text-[26px] font-semibold tracking-[-0.03em]">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p
                    className={cn(
                      "text-[15px] leading-relaxed",
                      last ? "text-on-ink-muted" : "text-muted",
                    )}
                  >
                    {t(`steps.${step}.body`)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
