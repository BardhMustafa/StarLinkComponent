"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  tone?: "paper" | "ink";
  /** "nav" adds a landmark; use "div" for repeats (e.g. the footer). */
  as?: "nav" | "div";
};

export function LocaleSwitcher({ tone = "paper", as: Wrapper = "nav" }: LocaleSwitcherProps) {
  const t = useTranslations("common");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <Wrapper aria-label={t("language")} role={Wrapper === "div" ? "group" : undefined}>
      <ul className="flex font-mono text-[13px]">
        {routing.locales.map((locale) => {
          const active = locale === current;
          const language = t(`languageNames.${locale}`);
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg uppercase underline-offset-4 transition-colors",
                  tone === "paper"
                    ? "text-muted hover:text-ink"
                    : "text-on-ink-muted hover:text-white",
                  active && "font-semibold underline",
                  active && (tone === "paper" ? "text-ink" : "text-white"),
                )}
              >
                {locale}
                <span className="sr-only">
                  {" — "}
                  {active ? language : t("switchTo", { language })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}
