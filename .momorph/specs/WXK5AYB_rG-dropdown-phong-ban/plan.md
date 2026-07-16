# Implementation Plan: Dropdown Phòng ban (Department Filter)

**Frame**: `WXK5AYB_rG-dropdown-phong-ban`
**Date**: 2026-07-16
**Spec**: `specs/WXK5AYB_rG-dropdown-phong-ban/spec.md`
**Design**: `specs/WXK5AYB_rG-dropdown-phong-ban/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the department single-select filter on the Kudos board. It is a thin, controlled control:
a trigger pill plus an options panel built on the shared Dropdown-List shell. Selecting a department
lifts the value to the Highlight section, which re-filters the kudos it renders. No new routes, no
data fetching beyond the existing board data.

This capability shipped as part of the Kudos board and shares its files with the sibling Hashtag
filter (screen `JWpsISMAaM`).

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**Routing/files**: `app/` (no `src/`). Shared components in `app/_components/`; route-scoped in
`app/kudos/_components/`.
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/` (`getDict` on the server). Not
next-intl.
**Auth/Data**: Supabase via `lib/supabase/*`; the board page is a Server Component. Filter state is
client-side (`"use client"` sub-tree).
**Testing**: None yet ("unit test làm sau") — test tasks are tracked as PENDING.

---

## Architecture Decisions

### Component structure

- **Shared shell** (`app/_components/saa-dropdown.tsx`): `SaaDropdownPanel` (the dark `role="menu"`
  panel) and `SaaDropdownItem` (rows, with `active` / `checked` / `size` variants). Reused across
  all SAA dropdowns.
- **Filter control** (`app/kudos/_components/kudos-filters.tsx`): renders both filter pills
  ("Hashtag", "Phòng ban") and their panels; owns only `openKey` (which panel is open). Fully
  controlled via `value` + `onChange` props.
- **State owner** (`app/kudos/_components/highlight-section.tsx`): holds `value: FilterValue` and
  applies it to `posts` before passing them to the carousel.

### Data

- `DEPARTMENTS` (`lib/saa/kudos.ts`) is the department list; the board page (`app/kudos/page.tsx`)
  passes it to `HighlightSection` → `KudosFilters`.
- Labels come from `dict.kudosBoard.department` / `dict.kudosBoard.hashtag`
  (`lib/i18n/dictionaries.ts`), resolved server-side and passed down.

### Interaction model

- Single panel open at a time (`openKey`). Outside click handled by a full-screen transparent
  backdrop button behind the panel.
- Toggle semantics: selecting the active value clears it (`opt === selected ? null : opt`).

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/WXK5AYB_rG-dropdown-phong-ban/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Design specifications
├── plan.md              ✅ This file
├── tasks.md             ✅ Task breakdown
└── assets/
    └── frame.url.txt    ✅ Figma frame image URL
```

### Shipped files (cited)

| File | Role |
|------|------|
| `app/_components/saa-dropdown.tsx` | Shared Dropdown-List shell (`SaaDropdownPanel`, `SaaDropdownItem`) |
| `app/kudos/_components/kudos-filters.tsx` | Filter pills + panels; single-select toggle logic |
| `app/kudos/_components/highlight-section.tsx` | Owns `FilterValue`, applies the department filter |
| `app/kudos/page.tsx` | Server Component; supplies `DEPARTMENTS` + labels |
| `lib/saa/kudos.ts` | `DEPARTMENTS` data + `KudosPost.department` field |
| `lib/i18n/dictionaries.ts` | `kudosBoard.department` label (vi/en) |
| `public/saa/chevron-down.svg` | Pill chevron glyph |

---

## Implementation Approach (retrospective)

### Phase 1 — Shared shell

Built the reusable `SaaDropdownPanel` / `SaaDropdownItem` in `app/_components/saa-dropdown.tsx`,
including the dark panel, 56px default rows, and the gold text-glow hover/active styling. This shell
backs every SAA dropdown.

### Phase 2 — Filter pills + panel

Implemented `KudosFilters` (`app/kudos/_components/kudos-filters.tsx`): the two pills, `openKey`
state, the outside-click backdrop, chevron rotation, and the single-select toggle that calls
`onChange(key, opt === selected ? null : opt)` and closes the panel.

### Phase 3 — State lifting + filtering

Wired `HighlightSection` to own `value: FilterValue`, derive `filtered` posts (department AND
hashtag), remount the carousel on filter change, and show the empty-state message when nothing
matches.

### Phase 4 — Data + i18n wiring

Passed `DEPARTMENTS` and localized labels from `app/kudos/page.tsx` down through
`HighlightSection` → `KudosFilters`.

### Phase 5 — Tests (PENDING)

Unit tests for open/close, select, clear-on-reselect, and filter application are not yet written
("unit test làm sau").

---

## Risks & Notes

| Risk / Note | Detail |
|-------------|--------|
| Scope of filter | Figma says page-wide; shipped code filters only the Highlight carousel. |
| Dynamic list | Production department list is DB-driven; demo seeds six entries in `DEPARTMENTS`. |
| No persistence | Selection resets on reload — acceptable for the demo scope. |

---

## Constitution Compliance Check

- [x] Kebab-case module files, PascalCase components, 2-space indent
- [x] Approved stack (Next.js/React/TS/Tailwind 4, Supabase for the page)
- [x] Folder structure (`app/_components/`, `app/kudos/_components/`)
- [x] Design tokens via CSS variables (`app/globals.css`), no raw values in components (except the
      intentional `#00070C` panel bg in the shared shell)
- [ ] Test-First — NOT met yet; tests deferred (PENDING)
