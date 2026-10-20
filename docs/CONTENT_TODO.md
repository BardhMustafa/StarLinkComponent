# Content TODO

Facts the new site needs but the old repo didn't contain. Every item below is
shown on the site as a **visible placeholder** (e.g. `[X] hours`) or is
switched off until it exists — nothing has been invented.

## 1. Facts to supply

| #   | What                                                                                                                                                                    | Where it shows                                                                  | Where to change it                                                                                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Quote turnaround** — the `[X]` in "quoted within [X] hours", the hero stat `[X]h`, and the process steps `T + [X] HOURS` / `T + [X] DAYS`                             | Announcement bar, hero, homepage process, /services, /rfq                       | `messages/en.json` + `messages/fr.json`: `announcement.text`, `home.hero.stats.turnaround.value`, `home.process.steps.quote.time`, `home.process.steps.dock.time` |
| 2   | **Germany office** — phone and street address                                                                                                                           | Global network section (home, /about, /contact), JSON-LD                        | `content/offices.ts` → `de.phone`, `de.address`                                                                                                                   |
| 3   | **Hong Kong office** — phone and street address                                                                                                                         | Same as above                                                                   | `content/offices.ts` → `hk.phone`, `hk.address`                                                                                                                   |
| 4   | **Canada office street address** (phone is known: +1 514 927 6023)                                                                                                      | JSON-LD only, today                                                             | `content/offices.ts` → `ca.address`                                                                                                                               |
| 5   | **Social profile URLs** (LinkedIn, X)                                                                                                                                   | Footer "Social" column — hidden until at least one URL is set; JSON-LD `sameAs` | `content/site.ts` → `SOCIAL`                                                                                                                                      |
| 6   | **Manufacturer list** (brands you stock / are franchised or independent for)                                                                                            | Not shown yet — suggested as a mono "line card" strip on /products              | New `content/manufacturers.ts` + a section on /products                                                                                                           |
| 7   | **Connectors & Electromechanical sub-lists** — the mockup's "Board-to-board, wire-to-board, RF, I/O" and "Relays, switches, sensors, fans" were invented for the design | Line-card tiles, category pages                                                 | `messages/*.json` → `categories.connectors.*`, `categories.electromechanical.*`; add product families in `content/categories.ts` → `CATEGORY_PRODUCTS`            |
| 8   | **"9 product categories"** stat — counts the nine product families carried over from the old site. Confirm it's the number you want to advertise                        | Hero stats                                                                      | `home.hero.stats.categories`                                                                                                                                      |

## 2. Legal

| #   | What                                                                                                                                                                                                            | Where                                 |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 9   | **Privacy notice** is a draft marked "pending legal review". Fill in `[registered legal entity name and address]` and `[retention period]`, and have counsel review (GDPR applies: German office + EU visitors) | `messages/*.json` → `pages.privacy.*` |
| 10  | The old site had a **Terms** page with AstroWind demo text; it was dropped, not replaced. Add real terms of sale if you want them online                                                                        | —                                     |

## 3. Brand

| #   | What                                                                                                                                                                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11  | The header uses the **new four-point-star mark** from the brief instead of the previous gradient shooting-star logo (`logo.jpeg` in the old repo, tagline "We dont promise we deliver"). Confirm, or supply an SVG of the mark you want. |
| 12  | Time zones are shown as **standard time** (CA UTC−5 assumes the Montréal office; DE UTC+1; HK UTC+8). Change in `content/offices.ts` if the Canadian office is elsewhere.                                                                |

## 4. Translation review

All French strings ported from the old `fr.astro` were corrected (e.g. "Obsolescence Management" left in English, "Prestations de service", "distributeur mondial de stockage"). **Copy that is new in the Datasheet design was translated by the developer and needs a native review**, notably:

- `home.hero.*` (headline "Les composants que votre ligne ne peut pas attendre.")
- `home.lineCard.*`, `home.services.*`, `home.process.*`, `home.offices.*`, `home.rfq.*`
- `categories.*.intro`, `categories.*.summary`
- `rfqForm.*` (labels, errors, success/toast), `email.autoreply.*`
- `pages.about.values.*`, `pages.privacy.*`

## 5. Operations (env vars — see `.env.example`)

| #   | What                                                                                                                                                                                                                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13  | Create a **Resend** API key → `RESEND_API_KEY`.                                                                                                                                                                                                                  |
| 14  | Verify **starlinkcomponents.com** in Resend (SPF + DKIM DNS records), then set `RFQ_FROM_EMAIL="StarLink Components <rfq@starlinkcomponents.com>"`. Until then the sender is `onboarding@resend.dev`, which Resend only delivers to the account owner's address. |
| 15  | Create an **Upstash Redis** database → `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Without it, rate limiting is per serverless instance only.                                                                                                          |
| 16  | Confirm the **Google Search Console** verification ID carried over from the old site (`orcPxI47GSa-…`) is still yours (`content/site.ts`).                                                                                                                       |
