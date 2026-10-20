# StarLink Components — Migration Plan (Astro/AstroWind → Next.js "Datasheet")

Status: **approved 2026-10-20**. All proposals in §6 accepted, except hosting: the site stays on **Netlify** (Q1). Original decisions: (Vercel; 4 MB BOM cap; four-point star logo per brief; light only; Upstash rate limit; placeholder /privacy, no /terms; mockup sub-lists for Connectors/Electromechanical flagged; Resend test sender until DNS is verified; Social column hidden until URLs exist).
Design reference: `docs/design/concept-b-homepage.html` (source) and `docs/design/concept-b-homepage.webp` (screenshot).

---

## 1. What exists today

### Stack

| Item            | Today                                                                                                                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | Astro 2.2 (`output: 'static'`), AstroWind template v0.9.8 (`package.json` name is still `@onwidget/astrowind`)                                                                                                                                                                                                          |
| Styling         | Tailwind 3.3 + `@tailwindcss/typography`, AstroWind CSS vars (`--aw-color-*`), dark mode by class, **dark set as default** (commit `dd6de41`)                                                                                                                                                                           |
| Package manager | yarn (`yarn.lock`), Node ≥16                                                                                                                                                                                                                                                                                            |
| Hosting config  | **Both** `vercel.json` (cache headers for `/_astro/*`) **and** `netlify.toml` + `public/_headers` + `@astrojs/netlify` dependency                                                                                                                                                                                       |
| SEO             | `@astrolib/seo`, `@astrojs/sitemap`, Google Site Verification ID `orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M` (real — keep)                                                                                                                                                                                            |
| Forms           | `Form.astro` / `FormFr.astro`: inputs have no `name`, the submit handler lives in frontmatter and is never bound, posts to a non-existent `/api/send-email`. `src/api/contact.js` uses nodemailer with `smtp.example.com` and is not wired up (nodemailer isn't even installed). **The contact form has never worked.** |

### Pages and sections

| Route                | File                    | Notes                                                                                                  |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `/`                  | `src/pages/index.astro` | Single long page, anchors `#products #services #about #contact`                                        |
| `/fr`                | `src/pages/fr.astro`    | Full copy of the EN page with French strings; uses `PageLayoutFr`, `HeaderFr`, `NoteFr`, `FormFr`      |
| `/privacy`, `/terms` | `src/pages/*.md`        | AstroWind **demo** legal text ("AstroWind LLC, 1 Cupertino, CA", "This Privacy Policy is just a Demo") |
| `/404`               | `src/pages/404.astro`   | Generic                                                                                                |
| `/rss.xml` + blog    | `src/content/post/*`    | 5 AstroWind demo posts; blog config enabled                                                            |

Homepage section order (EN and FR identical): Hero2 → Note banner → "Our Products" (9 items) → "Benefits of chips" (6 items) → "What we offer?" services (4) → About us (one long paragraph) → Stats (phone, email) → Contact form.

### How EN/FR works today

- Not real i18n: two hand-duplicated pages (`index.astro` / `fr.astro`), two layouts, two headers, two forms, and `headerData`/`headerDataFrench` + `footerData`/`footerDataFrench` in `src/data.js`.
- The language switch is a plain `<a href="/fr">French</a>` inside `ToggleThemeFr.astro`, next to the theme toggle. The FR page links back with `<a href="/">`.
- `<html lang="en">` is hard-coded from `SITE.language`, so **`/fr` is served as `lang="en"`**. No hreflang tags.
- Product/service copy is passed inline as props in each page file.

---

## 2. Real content to carry over

### Company facts

- Name: **StarLink Components**. Description: "global stocking distributor of electronic components with three offices worldwide."
- Offices: **Canada, Germany, Hong Kong**, each "staffed with experienced sales professionals".
- Phone: **+1 514 927 6023** (Montréal area code → Canada office). Email: **sales@starlinkcomponents.com**.
- Product families mentioned: semiconductors, passive components, connectors, electromechanical components "from leading manufacturers"; inventory "constantly updated".
- Values: high-quality products, responsive service, competitive pricing, long-term relationships.
- Existing brand logo: `src/assets/images/logo.jpeg` / `logo-rbg.png` (blue shooting-star mark + "STARLINK COMPONENTS", tagline "WE DONT PROMISE WE DELIVER"). See open question Q3.

### Products (9 items, EN + FR, with descriptions)

| EN                             | FR                                                | Family         |
| ------------------------------ | ------------------------------------------------- | -------------- |
| Microcontrollers               | Microcontrôleurs                                  | Semiconductors |
| Integrated Circuits (ICs)      | Circuits intégrés (CI)                            | Semiconductors |
| Memory Chips (RAM, ROM, Flash) | Puces de mémoire (RAM, ROM, Flash)                | Semiconductors |
| Transistors                    | Transistors                                       | Semiconductors |
| Diodes                         | Diodes                                            | Semiconductors |
| Voltage Regulators             | Régulateurs de tension                            | Semiconductors |
| Capacitors                     | Condensateurs                                     | Passives       |
| Resistors                      | Résistances                                       | Passives       |
| Inductors                      | Inducteurs (→ "Inductances" is the usual FR term) | Passives       |

Each has a 1–2 sentence description in both languages. These become the sub-items on `/products/semiconductors` and `/products/passives`.

### Services (4 items, EN + FR)

Product Sourcing / Approvisionnement de produits · Inventory Management / Gestion de l'inventaire · Obsolescence Management / _(FR left untranslated in source → "Gestion de l'obsolescence")_ · Just-in-Time (JIT) Delivery / Livraison juste à temps (JAT). Long descriptions go to `/services`; the short mockup descriptions go on the homepage table.

### About text (EN + FR)

One long paragraph per language. I'll split it into 3–4 short paragraphs for `/about`, keep the meaning, and fix the typos.

### Copy that is new in the mockup (not in the repo)

Hero headline/subcopy, announcement bar, process cards (T + 0 …), "Nine categories. One purchase order.", the short service lines, the RFQ block copy, and the Connectors/Electromechanical sub-lists. I'll write the FR versions myself and mark them for native review in `CONTENT_TODO.md`.

---

## 3. Template junk to delete

- **AstroWind placeholders:** `Note.astro` / `NoteFr.astro` ("Simplicity, Best Practices and High Performance", which is AstroWind's tagline), `Announcement.astro` (Astro 2.2 + GitHub stars badge), hero alt "AstroWind Hero Image", footer `onwidget.com` favicon in `footNote`, Astro's default `favicon.svg`/`favicon.ico`, package name `@onwidget/astrowind`, `LICENSE.md` (AstroWind MIT, see assumptions in §6), `sandbox.config.json`, `vscode.tailwind.json`, `.DS_Store` files.
- **Fake social links:** `twitter.com/example`, `linkedin.com/company/example`, `instagram.com/example`, `facebook.com/example`, plus `socialLinks` with `href: '#'`.
- **Dead `#` anchors:** `#benefits`, and `#products/#services/#about/#contact` once pages split.
- **Placeholder alt text:** "Colorful Image" (services image), "Vintage Image" (about image), "Default image".
- **Off-topic consumer section:** "Benefits of chips" / "Avantages des puces" (gaming graphics, electricity bills, and so on): removed in both languages.
- **Wrong canonical:** `origin: 'https://astrowind.vercel.app'` → `https://www.starlinkcomponents.com`.
- **Typos and quality issues:** "Our companys focus" → "Our company's focus"; "customers needs" → "customers' needs"; "Canada,Germany" missing space; footer says "StarLink **Link** Components"; no closing period on the About paragraph; "dont" in 404; FR "Des produits" CTA, "Prestations de service" heading, "distributeur mondial de stockage" (→ "distributeur stockiste international").
- **Demo content:** 5 blog posts, `rss.xml.ts`, blog utils, MDX/reading-time plugins, `privacy.md`/`terms.md` demo legal text (see Q6), unused widgets (FAQs, Steps, Steps2, Features, Content, CallToAction, …), stock images (`caos`, `colors`, `creativity`, `do-more`, `stickers`, `tools`, `vintage`, `hero.*`, `about.jpeg`, `default.png` (3.1 MB)).
- **Broken backend:** `src/api/contact.js` (nodemailer with example credentials).

The whole of `src/`, `astro.config.mjs`, `tailwind.config.cjs`, `netlify.toml`, `public/_headers`, `yarn.lock`, and `.astro/` is replaced. Git history keeps the old site.

---

## 4. Target architecture

**Stack:** Next.js 15 App Router · TypeScript strict · RSC by default · Tailwind v4 (`@theme` tokens) · shadcn/ui (Radix) restyled · motion/react · Lenis · next-intl · React Hook Form + Zod · Resend · next/font (Inter Tight, Inter, JetBrains Mono) · lucide-react · pnpm · ESLint + Prettier · Vercel.

### i18n

- `localePrefix: 'always'` → `/en/...` and `/fr/...`. `/` redirects by `Accept-Language` (cookie wins), default `en`.
- `i18n/routing.ts` holds `locales = ['en', 'fr']`. **Adding German = add `'de'` to that array + `messages/de.json`.** Metadata, sitemap, hreflang and the switcher all derive from the array.
- 301 redirects from the old URLs: `/fr` → `/fr` (unchanged), `/privacy` → `/en/privacy`, `/terms` → `/en/terms`.
- `<html lang>` set per locale. Message keys type-checked against `en.json` (next-intl `AppConfig`).

### Content model

Copy lives in `messages/*.json`. Structural, non-translatable data (slugs, part numbers, codes, timezones, phone) lives in typed `content/*.ts` and refers to message keys, so the two languages can't drift.

### File tree

```
app/
  [locale]/
    layout.tsx                 # fonts, NextIntlClientProvider, Header/Footer, Lenis, Toaster, JSON-LD
    page.tsx                   # homepage
    products/page.tsx
    products/[category]/page.tsx   # generateStaticParams × locales
    services/page.tsx
    about/page.tsx
    contact/page.tsx
    rfq/page.tsx               # reads ?part=&qty=
    privacy/page.tsx           # pending Q6
    not-found.tsx
    opengraph-image.tsx        # next/og, Datasheet style (per-route variants where useful)
  actions/rfq.ts               # 'use server' — Zod, honeypot, rate limit, Resend
  sitemap.ts
  robots.ts
  icon.svg / apple-icon.png
  globals.css                  # @import "tailwindcss"; @theme tokens
components/
  ui/          button.tsx, arrow-badge.tsx, chip.tsx, mono-label.tsx, input.tsx, tabs.tsx,
               dialog.tsx, sheet.tsx, toast.tsx (sonner), dropzone.tsx, section-index.tsx
  layout/      announcement-bar.tsx, header.tsx (+ header-scroll.client), mobile-menu.tsx,
               locale-switcher.tsx, footer.tsx, container.tsx, smooth-scroll.tsx
  sections/    hero.tsx, search-console.tsx, ticker.tsx, line-card.tsx, services-table.tsx,
               process.tsx, offices.tsx, rfq-block.tsx, rfq-form.tsx, page-hero.tsx
  graphics/    logo-mark.tsx, chip-pill.tsx, pcb-chip.tsx, star.tsx
  motion/      reveal.tsx, stagger.tsx, mask-text.tsx   (all no-ops under reduced motion)
  seo/         json-ld.tsx
content/
  categories.ts  services.ts  offices.ts  ticker.ts  site.ts
lib/
  search.ts      # interface PartSearchProvider { search(q): Promise<PartResult[]> } + placeholder impl
  rfq-schema.ts  # shared Zod schema (client + server)
  rate-limit.ts
  email/         rfq-sales.tsx, rfq-autoreply.tsx (React Email templates, localized)
  utils.ts       # cn()
i18n/
  routing.ts  request.ts  navigation.ts
messages/
  en.json  fr.json
middleware.ts
next.config.ts   # security headers, next-intl plugin, serverActions.bodySizeLimit
docs/
  MIGRATION_PLAN.md  CONTENT_TODO.md  design/
.env.example
```

### Category routes

`/products/semiconductors`, `/products/passives`, `/products/connectors`, `/products/electromechanical`, `/products/obsolete-eol`. Everything is statically generated (SSG). `/rfq` is static with client-side query prefill. The only dynamic piece is the Server Action.

### RFQ flow

Hero console / ticker item / example part → `/[locale]/rfq?part=…&qty=…` → RHF + Zod form (shared schema) → Server Action re-validates → honeypot check → rate limit → Resend: email to `RFQ_TO_EMAIL` with the attachment, plus a localized auto-reply → success state + toast. `lib/search.ts` exposes a typed `PartSearchProvider`. Today it only normalizes the part number and returns "quote on request"; a stock API can be plugged in later without touching the UI.

---

## 5. Build order (one commit per milestone; `pnpm build` + `pnpm lint` clean each time)

1. **Scaffold:** remove the Astro sources, `create-next-app` (TS, App Router, Tailwind v4, ESLint), add Prettier, pnpm, `.env.example`, and `next.config.ts` with security headers.
2. **Tokens, fonts, layout:** `@theme` tokens, next/font, Container, Header (sticky/blur, mobile Sheet), AnnouncementBar, Footer, LogoMark, Button variants, MonoLabel.
3. **Homepage sections:** Hero + SearchConsole, Ticker, LineCard bento, ServicesTable, Process, Offices, RFQ block, all static and matching the mockup at 360 / 768 / 1440 / 1920.
4. **Motion:** Reveal/Stagger/MaskText wrappers, H1 line reveal, chip pill scale-in, tile hover, PCB trace glow, office letter mask, Lenis, reduced-motion fallbacks.
5. **i18n:** next-intl routing/middleware, move every string to `messages/en.json`, write `fr.json` (ported + new), locale switcher, hreflang.
6. **RFQ backend:** Zod schema, Server Action, Resend + React Email templates, honeypot, rate limit, upload handling, toast, `/rfq` page with prefill, `lib/search.ts`.
7. **Inner pages:** products, products/[category], services, about, contact, privacy, 404.
8. **SEO and performance pass:** `generateMetadata` everywhere, OG images via next/og, sitemap, robots, JSON-LD Organization (3 offices + contactPoint), Lighthouse mobile ≥ 95 ×4, axe check, `docs/CONTENT_TODO.md`, final report.

---

## 6. Open questions — where the repo contradicts the brief

**Q1. Hosting: Vercel or Netlify?** The brief says Vercel, but the repo ships `netlify.toml`, `public/_headers` and depends on `@astrojs/netlify`. Which one actually serves www.starlinkcomponents.com today? _Proposal:_ Vercel, and delete the Netlify files.

**Q2. BOM upload size vs. Vercel limits.** The mockup promises "up to 10 MB", but Vercel functions (including Server Actions) reject request bodies over **4.5 MB**. Options:

- (a) Cap uploads at **4 MB** and change the copy. Simple, and no extra service.
- (b) Keep 10 MB: upload from the browser straight to **Vercel Blob**, then email a link (or fetch and attach server-side). Needs `BLOB_READ_WRITE_TOKEN`.
  _Proposal:_ (a) now, (b) later if customers need it.

**Q3. Logo.** The repo has a real brand logo (gradient shooting star, tagline "We dont promise we deliver"). The brief specifies a new four-point star on an ink square. Replace the brand mark, or adapt the existing star into the Datasheet style? Keep the tagline anywhere?

**Q4. Dark mode.** The latest commits made dark the default (`dd6de41`, `df85297`). Datasheet is a light "paper" system that uses ink sections for contrast. _Proposal:_ drop the theme toggle and ship light only.

**Q5. Rate limiting on serverless.** An in-memory limiter doesn't survive Vercel's multiple instances. _Proposal:_ `@upstash/ratelimit` + Upstash Redis (free tier, env `UPSTASH_REDIS_REST_URL/TOKEN`), with an in-memory fallback in dev. OK to add that dependency?

**Q6. Privacy / Terms.** The current pages are AstroWind demo text naming another company. They must go. But the RFQ form collects personal data and you have an office in Germany, so a privacy notice is effectively required (GDPR). _Proposal:_ ship `/privacy` with a short, clearly marked **placeholder** for your counsel to fill in, drop `/terms`, and list both in CONTENT_TODO.

**Q7. Category structure.** The heading says "Nine categories", which matches the nine real products. But the tiles and routes are the four families plus Obsolete/EOL. Connectors and Electromechanical have **no real content** in the repo (only a mention in About); the mockup's sub-lists ("Board-to-board, wire-to-board, RF, I/O" and "Relays, switches, sensors, fans") were invented. _Proposal:_ use the five family pages above, list the nine real products under Semiconductors/Passives, use the mockup sub-lists for Connectors/Electromechanical, and flag them in CONTENT_TODO for confirmation.

**Q8. Resend sender domain.** The sender address (e.g. `rfq@starlinkcomponents.com`) needs the domain verified in Resend (DNS records: SPF, DKIM). Do you have DNS access, or should I default the `from` address to `onboarding@resend.dev` until it's verified? It would come from env `RFQ_FROM_EMAIL`.

**Q9. Social column.** There are no real social URLs. A visible placeholder link would be a dead link (bad for a11y and SEO). _Proposal:_ hide the Social column until URLs are set in `content/site.ts`, and list them in CONTENT_TODO.

Smaller assumptions (tell me if any are wrong):

- Fully replace the Astro code in place on `main` (history keeps the old site), with one commit per milestone. Pushing is up to you.
- Remove `LICENSE.md` (it's AstroWind's MIT licence, not yours).
- Keep the Google Site Verification meta tag.
- Default locale `en`; redirect `/` by browser language.
- Node 20 LTS+, Next.js 15 (latest stable at build time).
