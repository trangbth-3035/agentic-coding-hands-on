# Plan — Sun* Kudos Live Board (`/kudos`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the authenticated `/kudos` page — the Sun* Kudos Live Board: **KV hero + Highlight
carousel (with Hashtag / Phòng ban filters) + Spotlight word-cloud board + All Kudos feed + stats
sidebar** — as a demo-data experience for SAA 2025. Data is static seed (`lib/saa/kudos.ts`) plus a
client-only session store (`lib/saa/kudos-store.ts`) for kudos composed this session; all copy is
VI/EN via the `saa_lang` cookie + `lib/i18n` dictionaries. Interactions are local-state only.

## Phases
| # | Phase | Status | Depends |
|---|-------|--------|---------|
| 01 | [Data layer — seed + session store](./phase-01-data-layer.md) | done | — |
| 02 | [Shared primitives — dropdown shell, rank badge, like, stats card](./phase-02-shared-primitives.md) | done | 01 |
| 03 | [Highlight section — carousel + filters](./phase-03-highlight-section.md) | done | 01, 02 |
| 04 | [All Kudos feed + Spotlight + sidebar + Secret Box modal](./phase-04-feed-and-sidebar.md) | done | 01, 02 |
| 05 | [Integration — page assembly + i18n](./phase-05-integration-i18n.md) | done | 03, 04 |
| 06 | [Temper + Inspect — visual validation + review](./phase-06-temper-inspect.md) | done | 05 |

## Key decisions
- **Demo data, no backend**: `lib/saa/kudos.ts` (structural/UGC seed) + `lib/saa/kudos-store.ts`
  (session store via `useSyncExternalStore`). No Supabase tables/migration for kudos.
- **Filters scope the Highlight carousel only** (via `HighlightSection`), single-select, combine
  with AND, selecting the active value clears it; carousel remounts (`key=`) to reset on change.
- **Reuse the shared SAA chrome & tokens**: `SiteHeader`/`SiteFooter`, `SaaDropdownPanel`/`Item`
  (`app/_components/saa-dropdown.tsx`), the `@theme` tokens in `app/globals.css` (`saa-bg`,
  `saa-gold*`, `saa-red`, `saa-divider`), and the `KudosCard` `variant` (`highlight` | `full`).
- **`StatsCard` is shared** between this sidebar and the Profile page; extracted from `StatsSidebar`.
- **Auth gate mirrors homepage/awards**: Supabase user OR `DEMO_COOKIE` else redirect `/login`.
- **i18n**: `kudosBoard` namespace in `lib/i18n/dictionaries.ts` (vi/en) via `getDict()`.

## Out of Scope (Deferred)
- **Secret Box reveal**: `onOpenBox` is unwired; the opened "đã mở" frame + reveal-odds engine and
  the count-decrement / hint-hide at zero are a separate frame (spec `J3-4YFIpMM`).
- **Page-wide filtering**: filters do not touch the All Kudos feed or Spotlight board (Figma copy
  says "toàn trang"; shipped scopes to the Highlight carousel).
- **Copy Link / Xem chi tiết**: visual-only CTAs — no clipboard/toast, no `/kudos/{id}` detail nav.
- **Persisted likes**: Like heart is client-only local state, not stored.
- **Profile navigation from cards**, avatar hover-cards, 4-tier hero-badge tooltips, campaign x2
  logic, real-time feed — all visualized only / not built.
- **Sunner profile search bar** (hero, right of compose input): static pill, not wired.

## Risks (Mitigated)
- Carousel centering/scroll math + responsive card widths — validated via visual review; pager
  derived from `scrollLeft / step`.
- Filter/carousel state desync on filter change — mitigated by remounting the carousel via `key`.
- Secret Box no-op click could read as broken — intentional; documented in clarifications + spec Notes.
