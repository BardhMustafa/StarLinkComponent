"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { NavLinks } from "./nav-links";

export function MobileMenu() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-ink lg:hidden"
        aria-label={t("common.openMenu")}
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent closeLabel={t("common.closeMenu")} aria-describedby={undefined}>
        <SheetTitle className="label-mono text-on-ink-faint">{t("nav.menuTitle")}</SheetTitle>
        <nav aria-label={t("nav.label")}>
          <NavLinks variant="sheet" onNavigate={close} />
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <Link
            href="/rfq"
            onClick={close}
            className={cn(
              buttonVariants({ variant: "light", size: "lg", badge: true }),
              "w-full justify-between",
            )}
          >
            {t("common.requestQuote")}
            <ArrowBadge />
          </Link>
          <div className="flex items-center justify-between gap-4 border-t border-hairline-ink pt-4">
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-mono text-[13px] text-on-ink-muted hover:text-white"
            >
              {COMPANY.email}
            </a>
            <LocaleSwitcher tone="ink" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
