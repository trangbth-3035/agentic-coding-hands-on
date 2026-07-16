# Implementation Plan: Dropdown Hashtag filter

**Frame**: `JWpsISMAaM-dropdown-hashtag-filter`
**Date**: 2026-07-16
**Spec**: `specs/JWpsISMAaM-dropdown-hashtag-filter/spec.md`
**Design**: `specs/JWpsISMAaM-dropdown-hashtag-filter/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the single-select hashtag filter on the Kudos board. It is the sibling of the department
filter (screen `WXK5AYB_rG`): both pills and both panels are rendered by the same `KudosFilters`
control on the shared Dropdown-List shell, and both feed the same lifted `FilterValue`. Selecting a
hashtag re-filters the Highlight carousel client-side. No new routes or data fetching.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**Routing/files**: `app/` (no `src/`). Shared components in `app/_components/`; route-scoped in
`app/kudos/_components/`.
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/` (`getDict` on the server). Not
next-intl.
**Auth/Data**: Supabase via `lib/supabase/*`; the board page is a Server Component; filter state is
in a `"use client"` sub-tree.
**Testing**: None yet — test tasks tracked as PENDING.

---

## Architecture Decisions

### Component structure

- **Shared shell** (`app/_components/saa-dropdown.tsx`): `SaaDropdownPanel` + `SaaDropdownItem`.
- **Filter control** (`app/kudos/_components/kudos-filters.tsx`): both pills + panels; owns
  `openKey`. The Hashtag filter is one of the two entries in its `filters` array, differing from the
  Department entry only in its `options` (hashtags) and `label`.
- **State owner** (`app/kudos/_components/highlight-section.tsx`): holds `value: FilterValue`;
  applies `p.hashtags.includes(value.hashtag)` when filtering.

### Data

- `HASHTAGS` (`lib/saa/kudos.ts`) is the hashtag list; the board page passes it down.
- `KudosPost.hashtags: string[]` is matched against the selected hashtag.
- The "Hashtag" label comes from `dict.kudosBoard.hashtag` (`lib/i18n/dictionaries.ts`).

### Interaction model

- Single panel open at a time via `openKey`; outside click closes via a transparent backdrop.
- Toggle semantics: reselecting the active hashtag clears it (`opt === selected ? null : opt`).

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/JWpsISMAaM-dropdown-hashtag-filter/
├── spec.md              ✅
├── design-style.md      ✅
├── plan.md              ✅ This file
├── tasks.md             ✅
└── assets/
    └── frame.url.txt    ✅
```

### Shipped files (cited)

| File | Role |
|------|------|
| `app/_components/saa-dropdown.tsx` | Shared Dropdown-List shell |
| `app/kudos/_components/kudos-filters.tsx` | Filter pills + panels; single-select toggle |
| `app/kudos/_components/highlight-section.tsx` | Owns `FilterValue`, applies the hashtag filter |
| `app/kudos/page.tsx` | Server Component; supplies `HASHTAGS` + label |
| `lib/saa/kudos.ts` | `HASHTAGS` data + `KudosPost.hashtags` field |
| `lib/i18n/dictionaries.ts` | `kudosBoard.hashtag` label (vi/en) |
| `public/saa/chevron-down.svg` | Pill chevron glyph |

---

## Implementation Approach (retrospective)

### Phase 1 — Shared shell

Reused the `SaaDropdownPanel` / `SaaDropdownItem` shell built for the SAA dropdowns (see the
department filter plan for shell details).

### Phase 2 — Filter pills + panel

`KudosFilters` renders the "Hashtag" pill as one entry in its `filters` array; the open panel maps
`HASHTAGS` to `SaaDropdownItem active={opt === selected}`, with the outside-click backdrop and
chevron rotation shared with the department pill.

### Phase 3 — State lifting + filtering

`HighlightSection` filters posts by `p.hashtags.includes(value.hashtag)` (combined with department
via AND), remounts the carousel on change, and shows the empty state when nothing matches.

### Phase 4 — Data + i18n wiring

`app/kudos/page.tsx` passes `HASHTAGS` and the localized "Hashtag" label into `HighlightSection`.

### Phase 5 — Tests (PENDING)

Unit tests for open/close, select, clear-on-reselect, and hashtag filtering are not yet written.

---

## Risks & Notes

| Risk / Note | Detail |
|-------------|--------|
| Scope of filter | Figma says page-wide; shipped code filters only the Highlight carousel. |
| Dynamic list | Production hashtag list is DB-driven; demo seeds eight value hashtags. Figma lists thirteen. |
| Shared component | Bugs here also affect the department filter — they share `KudosFilters`. |

---

## Constitution Compliance Check

- [x] Kebab-case module files, PascalCase components, 2-space indent
- [x] Approved stack (Next.js/React/TS/Tailwind 4, Supabase for the page)
- [x] Folder structure (`app/_components/`, `app/kudos/_components/`)
- [x] Design tokens via CSS variables; no raw values in components (except the intentional
      `#00070C` panel bg in the shared shell)
- [ ] Test-First — NOT met yet; tests deferred (PENDING)
