# Baitulmall Bangun Rakyat Sejahtera — Agent Guide

## Quick start
| Command | Purpose |
|---------|---------|
| `npm install` | Install (runs `nuxt prepare` postinstall automatically) |
| `npm run dev` | Dev server at `localhost:3000` |
| `npm run build` | SSR production build |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:ui` | Playwright UI mode |

## Database (Drizzle + MariaDB)
| Command | Purpose |
|---------|---------|
| `npm run db:push` | Push schema to DB (dev workflow, not migrations) |
| `npm run db:seed` | Seed: admin, categories, campaigns, donations |
| `npm run db:reset` | Drop all tables |
| `npm run db:studio` | Drizzle Studio GUI |

**Required order** after schema changes: `db:push && db:seed`

The connection uses `DATABASE_URL` env var (MySQL connection string). Drizzle mode is `'default'` (not planetscale). `decimal` columns return strings from Drizzle — must convert to Number manually for API responses.

## Architecture (server-side layers)
```
Nuxt Page → API Route (defineEventHandler)
                              ↓
                      Service (business logic)
                              ↓
                     Repository (DB access via Drizzle)
                              ↓
                        getDb() singleton
                              ↓
                        MySQL2 pool
```
- **Events**: `server/utils/events.ts` — Node EventEmitter; handlers in `server/events/`
- **Events registered**: Nitro plugin `server/plugins/events.ts`
- **Auth**: Cookie `auth_session` (plain user ID, HttpOnly, 1-week). **Not encrypted/JWT.**
- **Auth composable**: `composables/useAuth.ts` — provides `user`, `isLoggedIn`, `isAdmin`, `loginWithGoogle()`, `loginAsMockAdmin()`, `loginWithPassword()`, `logout()`
- **Toast**: `composables/useToast.ts` — returns `{ success(), error(), warning(), info(), add(), remove() }`. **NOT** `showToast` (common mistake).

## UI conventions
- Mobile-first: `.app-container` max-width 420px, centered
- Colors via CSS variables in `assets/css/style.css` (`--color-primary`, `--color-danger`, etc.)
- **NEVER hardcode colors** — use mapped Tailwind classes (`text-primary`, `bg-danger`)
- No `alert()` / `confirm()` — use `useToast()` composable
- Reusable components in `components/ui/` (AppButton, AppCard, AppInput, AppProgress, etc.)
- Icons: `lucide-vue-next`

## Payment architecture (Pakasir)
- **Donation** = business intent (status: `INITIATED → WAITING_PAYMENT → COMPLETED / CANCELLED`)
- **Payment** = settlement transaction (status: `PENDING → PAID / FAILED / EXPIRED`)
- **Webhook rule**: NEVER trust webhook payload — ALWAYS verify via Pakasir `transactiondetail` API
- Idempotent: check `payment.status !== 'PAID'` before settling
- Supported methods: `qris`, `bri_va`, `bni_va`, `cimb_niaga_va`, `permata_va`, `maybank_va`
- Pakasir amount MUST be integer (`Math.round()` applied)

## Scripts
- `scripts/seed.ts` — seeds admin (admin@amilzakat.com / admin123), 5 categories, 3 campaigns, 4 donations
- `scripts/reset-db.ts` — drops tables via raw SQL (SET FOREIGN_KEY_CHECKS=0)

## Testing
- Playwright E2E in `tests/` (3 spec files: home, donation, admin)
- Config auto-starts dev server, Chromium + Mobile Chrome projects
- CI: 2 retries, 1 worker. Local: 0 retries, reuse existing dev server

## Known issues (do NOT waste time debugging these)
- **Dual `DonationStatus` collision**: `shared/types/index.ts` has wrong statuses (`PENDING|PAID|FAILED|EXPIRED` — these are Payment statuses). `shared/types/donation.ts` has the correct ones (`INITIATED|WAITING_PAYMENT|COMPLETED|CANCELLED`). Use the latter.
- **Naming inconsistency**: The codebase uses 4 variants for donor name fields: `donaturName` (schema), `donor_name` (migration), `guestName` (old types/frontend), `donorName` (some API params). The canonical name is `donaturName` (schema).
- **Amount strings mixed with numbers**: `decimal` columns return strings from Drizzle, but only some API endpoints convert to Number before returning.
- **Docker compose requires external `tunnel-network`**: Fails if `docker network create tunnel-network` hasn't been run first.
- **`PAYMENT_EXPIRED` event emitted but no handler**: `payment.service.ts` emits `EVENTS.PAYMENT_EXPIRED` but `payment.handlers.ts` has no listener for it.
- **`confirm()` used instead of modal**: `pages/admin/campaigns/index.vue` uses `confirm()` — should use a custom modal component per spec.
