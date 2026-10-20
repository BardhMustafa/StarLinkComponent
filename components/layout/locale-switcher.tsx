"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const t = useTranslations("common");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")}>
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
                aria-label={active ? language : t("switchTo", { language })}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
