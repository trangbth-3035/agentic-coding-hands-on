---
title: Unit Tests — SAA 2025 (mock-api)
status: completed
work_type: deliverable
spec_waived: "Testing deliverable — exercises already-shipped SAA code; no new product feature, so no F### spec. Targets are existing lib/ modules + client components."
created: 2026-07-16
approach: Vitest + React Testing Library (jsdom)
scope: lib/ logic + key client components; e2e deferred to a separate plan
blockedBy: []
blocks: []
phases: 4
---

# Unit Tests — SAA 2025 (mock-api)

Stand up a real unit-test suite for the SAA app. The repo ships zero test tooling today; this
plan adds **Vitest + React Testing Library** and writes tests for the two layers that carry
actual logic — the `lib/` modules and the client components with state/branching. Route-level
flows (Server Components, redirects, auth gate) are left to a **separate e2e plan** (Playwright).

## Testing strategy (settled — see `clarifications.md`)

- **Co-locate** tests: `foo.test.ts(x)` sits next to `foo.ts(x)`. No separate `tests/` tree.
- **Unit target = component or `lib/` module**, never a `page.tsx` (async Server Components pull
  `cookies()`/Supabase → e2e territory).
- Highest ROI first: pure `lib/` logic (no mocks) → stateful/mocked `lib/` → client components (RTL).

## Stack

Next.js 16.2.7 (App Router, Turbopack) · React 19.2.4 · TypeScript 5 (`@/*` → `./*`) · npm ·
TailwindCSS 4. New test deps: `vitest`, `@vitejs/plugin-react`, `jsdom`, `vite-tsconfig-paths`,
`@testing-library/react` + `/dom` + `/user-event` + `/jest-dom`, `@vitest/coverage-v8`.

## Phases

| # | Phase | File | Depends on | Status |
|---|-------|------|-----------|--------|
| 01 | Test harness setup (Vitest + RTL + jsdom) | [phase-01-test-harness-setup.md](./phase-01-test-harness-setup.md) | — | done — merged (PR #8) |
| 02 | `lib/` unit tests (pure + stateful + mocked) | [phase-02-lib-unit-tests.md](./phase-02-lib-unit-tests.md) | 01 | done — merged (PRs #10–#23) |
| 03 | Client component tests (RTL) | [phase-03-component-tests.md](./phase-03-component-tests.md) | 01 | done — merged (PRs #10–#23) |
| 04 | Coverage gate + CI + docs sync | [phase-04-coverage-ci-docs.md](./phase-04-coverage-ci-docs.md) | 02, 03 | done — this branch (test/coverage-ci) |

Phases 02 and 03 both depend only on 01 and are **independent of each other** — run them in
parallel. Phase 04 gates on both.

## Key decisions

- **Vitest over Jest** — ESM/Turbopack fit, minimal config.
- **`lib/supabase/*` out of scope** — thin infra wrappers, low ROI, heavy mocking.
- **`next/*` mocked at the boundary** — `next/headers` (`cookies`) for `lib/i18n/server`,
  `next/navigation` (`useRouter`) + `next/image`/`next/link` for components.
- **CI is net-new** — no `.github/workflows/` exists; Phase 04 adds a minimal one (optional).

## Git / branch strategy — one branch per unit test

Per the owner's directive: **each unit test gets its own branch → its own PR** (matching the repo's
`<type>/<slug>` branch-per-feature convention; tests use the `test/` prefix, `test:` commits).

1. **Prerequisite branch merges first:** `test/harness-setup` (Phase 01) adds the runner, config,
   setup file, deps and scripts. Nothing else can run until this is on `main`.
2. **After it merges, each test target is its own branch off updated `main`.** Because every test
   only *adds* a co-located `*.test.ts(x)` file, these branches barely touch shared files → near-zero
   merge conflicts running in parallel.
3. **Coverage/CI branch lands last** (`test/coverage-ci`, Phase 04) once the test files exist.

| Order | Branch | Adds | Phase |
|-------|--------|------|-------|
| 1 (first) | `test/harness-setup` | vitest.config, vitest.setup, deps, scripts, sanity test | 01 |
| 2 | `test/lib-countdown` | `lib/saa/countdown.test.ts` | 02 |
| 2 | `test/lib-i18n-config` | `lib/i18n/config.test.ts` | 02 |
| 2 | `test/lib-saa-content` | `lib/saa/content.test.ts` | 02 |
| 2 | `test/lib-i18n-dictionaries` | `lib/i18n/dictionaries.test.ts` | 02 |
| 2 | `test/lib-saa-awards` | `lib/saa/awards.test.ts` | 02 |
| 2 | `test/lib-saa-kudos` | `lib/saa/kudos.test.ts` | 02 |
| 2 | `test/lib-saa-kudos-store` | `lib/saa/kudos-store.test.ts` | 02 |
| 2 | `test/lib-i18n-server` | `lib/i18n/server.test.ts` | 02 |
| 2 | `test/like-button` | `app/kudos/_components/like-button.test.tsx` | 03 |
| 2 | `test/kudos-filters` | `app/kudos/_components/kudos-filters.test.tsx` | 03 |
| 2 | `test/profile-kudos` | `app/profile/_components/profile-kudos.test.tsx` | 03 |
| 2 | `test/widget-button` | `app/_components/widget-button.test.tsx` | 03 |
| 2 | `test/write-kudos-modal` | `app/kudos/_components/write-kudos-modal.test.tsx` | 03 |
| 2 | `test/language-switcher` | `app/_components/language-switcher.test.tsx` | 03 |
| 2 *(opt)* | `test/saa-dropdown` | `app/_components/saa-dropdown.test.tsx` | 03 |
| 3 (last) | `test/coverage-ci` | vitest coverage thresholds, `.github/workflows/test.yml`, docs | 04 |

> ~16 branches/PRs. If that is too many PRs to review, the fallback is **one branch per phase**
> (`test/lib-suite`, `test/component-suite`) — say the word and the mapping collapses to that.
> Each phase file lists the exact branch beside every test target.

## Out of scope

- e2e / route-level flows (login redirect, `/dashboard` auth gate, `/kudos`, `/profile`) →
  follow-up plan `plans/e2e-playwright/` (Playwright MCP is already available).
- `lib/supabase/*`, all `app/**/page.tsx` Server Components, purely-presentational components.

## Risks

- **React 19 + Vitest peer ranges** — pin compatible `@testing-library/react` (v16+). Verify install.
- **Module-level state in `lib/saa/kudos-store.ts`** persists across tests → reset discipline
  (`vi.resetModules()` + dynamic import per test) documented in Phase 02.
- **Turbopack ≠ Vitest transform** — Vitest uses its own esbuild/Vite pipeline; config must mirror
  the `@/*` path alias (via `vite-tsconfig-paths`) or imports break.

## Handoff

Execute with `/tkm:takumi` pointed at this plan directory. **Land `test/harness-setup` first**,
then fan out the per-target `test/*` branches (Phase 02 + 03 in parallel), and finish with
`test/coverage-ci`. Tests run against the **final shipped code** — no stubbing the code under test.
