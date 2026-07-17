# Plans & AIDD Artifacts — SAA 2025 (mock-api)

This repo follows the **MoMorph / Takumi AIDD** workflow. Design-driven specs are generated per
screen from the MoMorph design source (Figma file key `9ypp4enmFmdK3YAFJLIu6C` — "SAA 2025 -
Internal Live Coding") and kept under `.momorph/`.

## Where the artifacts live

| Artifact | Location |
|----------|----------|
| Project constitution | `.momorph/constitution.md` |
| Spec templates | `.momorph/templates/` |
| Engineering guidelines (frontend/backend/db/e2e) | `.momorph/guidelines/` |
| Screen inventory + navigation graph | `.momorph/contexts/SCREENFLOW.md` |
| **Per-screen spec set** (spec + design-style + plan + tasks + frame asset) | `.momorph/specs/<screenId>-<slug>/` |
| **Takumi per-feature plans** (clarifications + plan + phase files) | `plans/<feature>/` (this dir) |
| Cross-screen clarifications & decisions log | `plans/clarifications.md` (this dir) |

## Takumi per-feature plans (7)

Each folder = `clarifications.md` (Q/A decisions) + `plan.md` (goal, phase table, key decisions,
out-of-scope, risks) + `phase-XX-*.md` for larger features. Grounded in the shipped code and the
matching `.momorph/specs/` — all phases retrospective `done`; unit/e2e tests `[ ]` PENDING.

| Feature | Folder | Route | Phases |
|---------|--------|-------|--------|
| Login | [`plans/login/`](./login/) | `/login` | inline |
| Countdown / Prelaunch | [`plans/countdown-prelaunch/`](./countdown-prelaunch/) | `/prelaunch` | inline |
| Homepage SAA (+ FAB, "Thể lệ" drawer) | [`plans/homepage-saa/`](./homepage-saa/) | `/` | 01–04 |
| Award Information ("Hệ thống giải") | [`plans/award-information/`](./award-information/) | `/award-information` | inline |
| Kudos Live Board | [`plans/kudos-live-board/`](./kudos-live-board/) | `/kudos` | 01–06 |
| Write Kudo modal | [`plans/write-kudo-modal/`](./write-kudo-modal/) | modal | 01–02 |
| Profile | [`plans/profile/`](./profile/) | `/profile` | 01–05 |

Each `.momorph/specs/<screen>/` folder contains the four AIDD documents:
`spec.md` (feature spec grounded in real Figma node IDs), `design-style.md` (design tokens),
`plan.md` (implementation plan for this repo's stack), `tasks.md` (task breakdown), plus
`assets/frame.url.txt` (the MoMorph frame render URL).

## Screens with authored spec sets (17)

Copied from the reference sample (6): `GzbNeVGJHz-Login`, `8PJQswPZmU-countdown-prelaunch-page`,
`i87tDx10uM-homepage-saa`, `zFYDgyj_pD-he-thong-giai`, `MaZUn5xHXZ-sun-kudos-live-board`,
`ihQ26W78P2-viet-kudo`.

Authored 2026-07-16 from live MoMorph data (11): `3FoIx6ALVb-profile-ban-than`,
`b1Filzi9i6-the-le-update`, `_hphd32jN2-floating-action-button`,
`Sv7DFwBw1h-floating-action-button-2`, `J3-4YFIpMM-open-secret-box`,
`p9zO-c4a4x-dropdown-list-hashtag`, `WXK5AYB_rG-dropdown-phong-ban`,
`JWpsISMAaM-dropdown-hashtag-filter`, `54rekaCHG1-dropdown-profile-admin`,
`z4sCl3_Qtk-dropdown-profile`, `hUyaaugye2-dropdown-ngon-ngu`.

## Stack (used by every `plan.md` / `tasks.md`)

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · TailwindCSS 4 (`@theme` in
`app/globals.css`) · Supabase (`lib/supabase/*`) · i18n via `saa_lang` cookie + `lib/i18n/`
dictionaries. Files live under `app/` (not `src/`).

## Testing

Unit tests **shipped** via [`plans/unit-tests/`](./unit-tests/) (Vitest + React Testing Library,
one branch/PR per suite): 14 co-located suites — 8 over `lib/` + 6 over client components — with
coverage floors and CI (`.github/workflows/test.yml`) gating every PR. Test tasks in each
`tasks.md` are flipped `[x]` where a shipped suite genuinely covers them; route-level/e2e tasks
stay `[ ]` for the future Playwright plan.
