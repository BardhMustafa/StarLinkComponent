"use client";

import { useTranslations } from "next-intl";
import { NAV } from "@/content/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  variant: "bar" | "sheet";
  onNavigate?: () => void;
};

export function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={cn(variant === "bar" ? "flex items-center gap-1" : "flex flex-col")}>
      {NAV.map(({ key, href }) => {
        const base = href.split("#")[0];
        const active =
          !href.includes("#") && (pathname === base || pathname.startsWith(`${base}/`));
        return (
          <li key={key}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                variant === "bar"
                  ? "inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-medium transition-colors hover:bg-ink/5 aria-[current=page]:bg-ink/5"
                  : "flex min-h-16 items-center border-b border-hairline-ink font-display text-[34px] font-semibold tracking-[-0.04em] text-white transition-colors hover:text-signal aria-[current=page]:text-signal",
              )}
            >
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
