import { getTranslations } from "next-intl/server";
import { ArrowBadge } from "@/components/ui/arrow-badge";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { HeaderFrame } from "./header-frame";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export async function Header() {
  const t = await getTranslations();
  return (
    <HeaderFrame>
      <Container className="flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Logo />
        <nav aria-label={t("nav.label")} className="hidden lg:block">
          <NavLinks variant="bar" />
        </nav>
        <div className="flex items-center gap-2 sm:gap-3.5">
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
          <Link
            href="/rfq"
            className={cn(buttonVariants({ size: "md", badge: true }), "hidden sm:inline-flex")}
          >
            {t("common.requestQuote")}
            <ArrowBadge />
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </HeaderFrame>
  );
}
