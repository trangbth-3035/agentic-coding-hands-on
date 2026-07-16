# Implementation Plan: Dropdown list hashtag (Compose Multi-select)

**Frame**: `p9zO-c4a4x-dropdown-list-hashtag`
**Date**: 2026-07-16
**Spec**: `specs/p9zO-c4a4x-dropdown-list-hashtag/spec.md`
**Design**: `specs/p9zO-c4a4x-dropdown-list-hashtag/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the multi-select hashtag picker used inside the "Viết Kudo" compose form. It reuses the
shared Dropdown-List shell in its `checked` / `compact` mode and is driven by the compose form's
`tags: string[]` state, capped at five. Selected hashtags render both as check-badged rows in the
picker and as removable chips in the Hashtag row. It is distinct from the board's single-select
hashtag filter (screen `JWpsISMAaM`).

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**Routing/files**: `app/` (no `src/`). Shared components in `app/_components/`; the compose modal is
route-scoped in `app/kudos/_components/`.
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/` (`getDict` on the server). Not
next-intl. The picker labels ("Hashtag", "Tối đa 5"/"Max 5") come from
`dict.kudosBoard.writeKudos`.
**Auth/Data**: Supabase via `lib/supabase/*`; the board page is a Server Component; the compose
modal is a `"use client"` component rendered via `createPortal`.
**Testing**: None yet — test tasks tracked as PENDING.

---

## Architecture Decisions

### Component structure

- **Shared shell** (`app/_components/saa-dropdown.tsx`): `SaaDropdownItem` gained a `checked` prop
  (gold/20 wash + trailing `CheckBadge`) and a `size="compact"` variant (40px rows) specifically for
  this picker, alongside the `active` variant used by the single-select filters.
- **Compose modal** (`app/kudos/_components/write-kudos-modal.tsx`): owns `tags` + `tagOpen`,
  renders the `AddButton`, the chips, and the picker `SaaDropdownPanel`. Enforces the cap.

### State + cap

- `toggleTag(tag)`: removes if present; otherwise adds only when `tags.length < MAX_ITEMS` (5);
  otherwise no-op.
- The `AddButton` (and thus the picker) is rendered only while `tags.length < 5`, which is how the
  cap is surfaced in the UI. Selected chips remain removable, so removing one brings the button
  back. (Figma expresses the cap by disabling unselected rows in the open panel; the shipped
  approach achieves the same guarantee.)

### Data + i18n

- `HASHTAGS` (`lib/saa/kudos.ts`) is passed to `WriteKudosModal` as `hashtags` (via
  `write-kudos-launcher.tsx`).
- Labels (`hashtagLabel`, `maxFive`) come from `dict.kudosBoard.writeKudos`.
- On submit, `handleSubmit` writes `hashtags: tags` (and a space-joined `tags` string) onto the new
  `KudosPost` via `addKudos`.

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/p9zO-c4a4x-dropdown-list-hashtag/
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
| `app/_components/saa-dropdown.tsx` | Shared shell; `checked` + `compact` variants + `CheckBadge` |
| `app/kudos/_components/write-kudos-modal.tsx` | Compose form; owns `tags`, chips, `AddButton`, picker + cap |
| `app/kudos/_components/write-kudos-launcher.tsx` | Opens the modal; passes `HASHTAGS` as `hashtags` |
| `lib/saa/kudos.ts` | `HASHTAGS` data; `KudosPost.hashtags` |
| `lib/saa/kudos-store.ts` | `addKudos` — persists the composed kudos (with its hashtags) for the session |
| `lib/i18n/dictionaries.ts` | `kudosBoard.writeKudos.hashtagLabel` / `.maxFive` (vi/en) |

---

## Implementation Approach (retrospective)

### Phase 1 — Shell multi-select support

Extended `SaaDropdownItem` with `checked` (gold/20 wash + `CheckBadge`) and `size="compact"` (40px,
`rounded-sm`, `text-sm`) so the shared shell can serve the multi-select picker as well as the
single-select filters.

### Phase 2 — Picker in the compose form

In `write-kudos-modal.tsx`, added the `AddButton`, the picker `SaaDropdownPanel`
(`max-h-72 min-w-56 overflow-y-auto`) mapping `hashtags` to `SaaDropdownItem checked={tags.includes(opt)}`,
plus the outside-click backdrop and `tagOpen` toggle.

### Phase 3 — Selection, chips, cap

Implemented `toggleTag` with the five-item cap, the removable chips row, and the conditional
rendering of the add button (`tags.length < MAX_ITEMS`).

### Phase 4 — Submit + reset

`handleSubmit` carries `hashtags: tags` onto the new `KudosPost`; `reset()` clears the selection on
close/submit.

### Phase 5 — Tests (PENDING)

Unit tests for toggle, the five-item cap, chip removal, and submit-carries-tags are not yet written
("unit test làm sau").

---

## Risks & Notes

| Risk / Note | Detail |
|-------------|--------|
| Cap surfaced via hidden button | Differs from the Figma "disable rows" expression; same guarantee. |
| Shared shell | Changes to `SaaDropdownItem` also affect the single-select filters. |
| No search in picker | Long directories rely on scroll; search is out of scope. |

---

## Constitution Compliance Check

- [x] Kebab-case module files, PascalCase components, 2-space indent
- [x] Approved stack (Next.js/React/TS/Tailwind 4, Supabase for the page)
- [x] Folder structure (`app/_components/`, `app/kudos/_components/`)
- [x] Design tokens via CSS variables; no raw values in components (except the intentional
      `#00070C` panel bg and the `CheckBadge` fills in the shared shell)
- [ ] Test-First — NOT met yet; tests deferred (PENDING)
