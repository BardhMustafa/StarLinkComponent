# StarLink Components

Website for StarLink Components, a global stocking distributor of electronic components
(Canada · Germany · Hong Kong). Next.js 15 App Router, TypeScript, Tailwind CSS v4,
next-intl (EN/FR), Motion, Resend.

## Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Script           | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Dev server on http://localhost:3000                   |
| `pnpm build`     | Production build (every page is statically generated) |
| `pnpm lint`      | ESLint (zero warnings) + EN/FR message parity check   |
| `pnpm typecheck` | `tsc --noEmit`                                        |
| `pnpm format`    | Prettier                                              |

Without `RESEND_API_KEY`, RFQ submissions are validated and logged in the dev server
console instead of emailed.

## Project layout

```
app/[locale]/        pages (home, products, products/[category], services, about, contact, rfq, privacy)
app/actions/rfq.ts   RFQ Server Action — honeypot, Zod, rate limit, Resend
components/ui        primitives (button, arrow badge, tabs, sheet, field, dropzone…)
components/layout    header, footer, announcement bar, locale switcher
components/sections  homepage and inner-page sections
components/motion    reveal / stagger / mask wrappers, Lenis
content/             structural data: categories, services, offices, parts, site facts
messages/            all copy — en.json, fr.json
lib/search.ts        part-search interface (plug a stock API in here)
```

## Content and translations

All copy lives in `messages/<locale>.json`. Structural facts (phone numbers, office codes,
category slugs) live in `content/`.

To add a language, e.g. German:

1. Copy `messages/en.json` to `messages/de.json` and translate it.
2. Add `"de"` to `locales` in `i18n/routing.ts`.

Routing, hreflang, the sitemap, the language switcher and OG images pick it up
automatically. `pnpm lint` fails if any key or placeholder is missing.

Open items (turnaround time, DE/HK details, social URLs, legal text…) are tracked in
[`docs/CONTENT_TODO.md`](docs/CONTENT_TODO.md).

## Deploy on Netlify

Build settings live in [`netlify.toml`](netlify.toml) (Node 22, `pnpm build`, publish
`.next`); they override anything left in the Netlify UI from the old Astro site. Netlify
detects Next.js and applies its Next.js runtime automatically — static pages are served
from the CDN, middleware and the RFQ Server Action run as functions.

1. **Environment variables** (Site configuration → Environment variables), from
   [`.env.example`](.env.example):
   - `NEXT_PUBLIC_SITE_URL=https://www.starlinkcomponents.com`
   - `RESEND_API_KEY`, `RFQ_TO_EMAIL=sales@starlinkcomponents.com`, `RFQ_FROM_EMAIL`
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
2. **Resend:** add and verify `starlinkcomponents.com` (DNS: SPF/DKIM records), then set
   `RFQ_FROM_EMAIL` to an address on that domain.
3. **Check the deploy preview:** submit a test RFQ, confirm the sales email and the
   auto-reply arrive, and run PageSpeed Insights (mobile) on `/en`, `/fr/products`,
   `/en/rfq`.
4. In **Google Search Console**, submit `https://www.starlinkcomponents.com/sitemap.xml`.

Old URLs: `/` and `/fr` keep working (`/` redirects by browser language). The old blog
and `/terms` pages are gone and return a localized 404.

Migration notes: [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md).
