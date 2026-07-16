# Clarifications & Decisions Log — Unit Tests (mock-api / SAA 2025)

Scope decisions settled before drafting the blueprint. Each is grounded in the shipped code
(the `lib/` modules and `app/**/_components/*` client components) — not invented.

## Session 2026-07-16 — scope of the unit-test plan

- Q: Test runner? → A: **Vitest + React Testing Library**. Rationale: ESM-native, fast,
  first-class fit with Next.js 16 / React 19 / TS / Turbopack; far less config than Jest
  (no babel/ts-jest, no `transformIgnorePatterns` wrangling for ESM).
- Q: How broad is the unit-test scope this pass? → A: **`lib/` logic + key client components.**
  Test all of `lib/` EXCEPT the `lib/supabase/*` wrappers (thin infra, low ROI, heavy mocking).
  Client components with real logic: `like-button`, `kudos-filters`, `write-kudos-modal`,
  `widget-button`, `profile-kudos`, `language-switcher` (+ `saa-dropdown` shell, optional).
- Q: e2e for pages/routes (login redirect, auth gate, `/kudos`, `/profile`, i18n at route level)?
  → A: **Deferred to a separate plan.** Server Components (`app/**/page.tsx`) pull `cookies()` /
  Supabase / redirects and are not good unit-test units; they belong to Playwright e2e later.
- Q: Which layers are explicitly OUT of scope? → A: `lib/supabase/*` (client/server/middleware/proxy),
  all `app/**/page.tsx` Server Components, purely-presentational components with no branching logic,
  and any e2e/route-level flow.

## Provenance / open items

- CI does not exist yet (`.github/workflows/` absent) → Phase 04 CI wiring is **net-new** infra,
  kept optional.
- Repo has **no test tooling installed** — Vitest/RTL/jsdom get added from scratch in Phase 01.
- The `.momorph/specs/*/tasks.md` sets (on branch `docs/aidd-artifacts`) mark their test tasks
  `[ ]` PENDING; completing this plan is what flips them. Cross-branch — reconcile on merge.
