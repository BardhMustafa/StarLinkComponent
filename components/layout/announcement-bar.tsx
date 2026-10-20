import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";

export async function AnnouncementBar() {
  const t = await getTranslations("announcement");
  return (
    <div className="surface-ink font-mono text-[12px] tracking-[0.06em] text-on-ink">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5">
        <p className="flex items-center gap-2.5 uppercase">
          <span className="size-[7px] shrink-0 rounded-full bg-signal" aria-hidden="true" />
          {t("text")}
        </p>
        <Link
          href="/rfq"
          className="inline-flex min-h-6 items-center gap-1.5 text-white uppercase underline-offset-4 hover:underline"
        >
          {t("cta")} <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </div>
  );
}
