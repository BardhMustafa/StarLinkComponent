import { getTranslations } from "next-intl/server";
import { Star } from "@/components/graphics/star";
import { TICKER } from "@/content/parts";
import { Link } from "@/i18n/navigation";
import { rfqSearchParams } from "@/lib/search";

/**
 * Decorative marquee. Hidden from assistive tech and the tab order — the same
 * parts are reachable through the console's example list and the line card.
 */
export async function Ticker() {
  const t = await getTranslations("ticker");
  const items = [...TICKER, ...TICKER];

  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-ink bg-accent text-white"
    >
      <div className="flex w-max animate-marquee gap-10 py-[18px] font-mono text-[15px] tracking-[0.06em] whitespace-nowrap uppercase group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {item.type === "part" ? (
              <Link
                href={`/rfq?${rfqSearchParams({ partNumber: item.value })}`}
                tabIndex={-1}
                className="hover:text-signal"
              >
                {item.value}
              </Link>
            ) : (
              <span>{t(item.key)}</span>
            )}
            <Star />
          </span>
        ))}
      </div>
    </div>
  );
}
