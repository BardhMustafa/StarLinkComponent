import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/graphics/logo-mark";
import { Link } from "@/i18n/navigation";

export async function Logo() {
  const t = await getTranslations("common");
  return (
    <Link href="/" aria-label={t("home")} className="flex min-h-11 items-center gap-3 rounded-lg">
      <LogoMark />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className="font-display text-xl font-bold tracking-[-0.03em]">StarLink</span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted">COMPONENTS</span>
      </span>
    </Link>
  );
}
