# Tasks: Dropdown Hashtag filter

**Frame**: `JWpsISMAaM-dropdown-hashtag-filter`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (retrospective) — implementation tasks `[x]`, tests `[ ]` PENDING

---

## Task Format

```
- [ ] T### [P?] Description | file/path
```

- **[P]**: Parallelizable (different file, no dependency on a sibling task)
- **|**: Primary file affected

> **Shared code**: the Hashtag filter and the Department filter (screen `WXK5AYB_rG`) are the same
> `KudosFilters` control on the same shell; T001–T002 below are shared with that screen.

---

## Phase 1: Shared shell

- [x] T001 Implement `SaaDropdownPanel` (dark `#00070C`, 1px gold-muted border, 8px radius, 6px padding, `role="menu"`, `shadow-2xl`) | `app/_components/saa-dropdown.tsx`
- [x] T002 Implement `SaaDropdownItem` default 56px row with hover + `active` gold/10 wash and gold text-glow | `app/_components/saa-dropdown.tsx`

## Phase 2: Filter pill + panel

- [x] T003 Add the "Hashtag" pill as an entry in the `KudosFilters` `filters` array (`options: hashtags`, `label: labels.hashtag`); style matches the department pill | `app/kudos/_components/kudos-filters.tsx`
- [x] T004 Render hashtag options via `SaaDropdownPanel` (`absolute right-0 z-50 mt-2 min-w-full`), mapping each to `SaaDropdownItem active={opt === selected}` | `app/kudos/_components/kudos-filters.tsx`
- [x] T005 Reuse `openKey` so opening the Hashtag panel closes the Department panel (single-open invariant) and the chevron rotates when open | `app/kudos/_components/kudos-filters.tsx`
- [x] T006 Reuse the outside-click backdrop + single-select toggle (`onChange(f.key, opt === selected ? null : opt)`, then close) | `app/kudos/_components/kudos-filters.tsx`

## Phase 3: State lifting + filtering

- [x] T007 In `HighlightSection`, filter by `p.hashtags.includes(value.hashtag)` (AND with department) and remount the carousel on change; empty-state when none match | `app/kudos/_components/highlight-section.tsx`

## Phase 4: Data + i18n wiring

- [x] T008 [P] Provide `HASHTAGS` data and the `KudosPost.hashtags` field | `lib/saa/kudos.ts`
- [x] T009 [P] Pass `HASHTAGS` + `filterLabels.hashtag` (`dict.kudosBoard.hashtag`) from the board page into `HighlightSection` | `app/kudos/page.tsx`
- [x] T010 [P] Add the "Hashtag" label to both locales | `lib/i18n/dictionaries.ts`

## Phase 5: Tests (PENDING — "unit test làm sau")

- [ ] T011 [P] Test: clicking the "Hashtag" pill toggles the panel; opening it closes the Department panel | `app/kudos/_components/kudos-filters.test.tsx`
- [x] T012 [P] Test: selecting a hashtag calls `onChange("hashtag", value)` and closes the panel | `app/kudos/_components/kudos-filters.test.tsx`
- [x] T013 [P] Test: reselecting the active hashtag calls `onChange("hashtag", null)` | `app/kudos/_components/kudos-filters.test.tsx`
- [ ] T014 [P] Test: `HighlightSection` shows only kudos whose `hashtags` include the selection | `app/kudos/_components/__tests__/highlight-section.test.tsx`

---

## Notes

- No test runner is configured yet; T011–T014 are placeholders until testing is set up.
- The hashtag list is DB-driven in production; the demo seeds eight value hashtags in `HASHTAGS`.
