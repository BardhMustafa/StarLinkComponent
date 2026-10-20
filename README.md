# StarLink Components

Website for StarLink Components, a global stocking distributor of electronic components
(Canada · Germany · Hong Kong). Next.js App Router, TypeScript, Tailwind CSS v4, next-intl (EN/FR).

## Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Script           | What it does                        |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Dev server on http://localhost:3000 |
| `pnpm build`     | Production build                    |
| `pnpm lint`      | ESLint (zero warnings allowed)      |
| `pnpm typecheck` | `tsc --noEmit`                      |
| `pnpm format`    | Prettier                            |

Environment variables are documented in [`.env.example`](.env.example).
Migration notes: [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md). Missing facts: [`docs/CONTENT_TODO.md`](docs/CONTENT_TODO.md).
