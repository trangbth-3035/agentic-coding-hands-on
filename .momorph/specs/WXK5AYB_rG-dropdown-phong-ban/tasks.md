# Tasks: Dropdown Phòng ban (Department Filter)

**Frame**: `WXK5AYB_rG-dropdown-phong-ban`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (retrospective) — implementation tasks `[x]`, tests `[ ]` PENDING

---

## Task Format

```
- [ ] T### [P?] Description | file/path
```

- **[P]**: Parallelizable (different file, no dependency on a sibling task)
- **|**: Primary file affected

---

## Phase 1: Shared shell

- [x] T001 Implement `SaaDropdownPanel` (dark `#00070C` panel, 1px gold-muted border, 8px radius, 6px padding, `role="menu"`, `shadow-2xl`) | `app/_components/saa-dropdown.tsx`
- [x] T002 Implement `SaaDropdownItem` default 56px row (`h-14`, `px-4`, Montserrat 16/700, `tracking-[0.5px]`) with hover + `active` gold/10 wash and gold text-glow | `app/_components/saa-dropdown.tsx`

## Phase 2: Filter pill + panel

- [x] T003 Implement the "Phòng ban" trigger pill: `inline-flex … rounded border px-4 py-3 text-sm font-semibold text-white`, active = `border-saa-gold bg-saa-gold-light/20`, default = `border-saa-gold-muted bg-saa-gold-light/10 hover:bg-saa-gold-light/20`; label = `f.selected ?? f.label` | `app/kudos/_components/kudos-filters.tsx`
- [x] T004 Add chevron (`/saa/chevron-down.svg`, `h-4 w-4`, `rotate-180` when open) and `openKey` state so only one panel opens at a time | `app/kudos/_components/kudos-filters.tsx`
- [x] T005 Render the department options via `SaaDropdownPanel` (`absolute right-0 z-50 mt-2 min-w-full`) mapping each department to a `SaaDropdownItem active={opt === selected}` | `app/kudos/_components/kudos-filters.tsx`
- [x] T006 Implement the outside-click backdrop (`fixed inset-0 -z-10`, `aria-hidden`, `tabIndex={-1}`) that closes the panel | `app/kudos/_components/kudos-filters.tsx`
- [x] T007 Implement single-select toggle: `onChange(f.key, opt === f.selected ? null : opt)` then close the panel | `app/kudos/_components/kudos-filters.tsx`

## Phase 3: State lifting + filtering

- [x] T008 Own `value: FilterValue` in `HighlightSection`; pass `value` + `onChange` to `KudosFilters` | `app/kudos/_components/highlight-section.tsx`
- [x] T009 Derive `filtered = posts.filter(p => (!department || p.department === department) && …)` and remount the carousel on filter change (`key`); show empty-state text when none match | `app/kudos/_components/highlight-section.tsx`

## Phase 4: Data + i18n wiring

- [x] T010 [P] Provide `DEPARTMENTS` data and the `KudosPost.department` field | `lib/saa/kudos.ts`
- [x] T011 [P] Pass `DEPARTMENTS` + `filterLabels.department` (`dict.kudosBoard.department`) from the board page into `HighlightSection` | `app/kudos/page.tsx`
- [x] T012 [P] Add the "Phòng ban" / "Department" label to both locales | `lib/i18n/dictionaries.ts`

## Phase 5: Tests (PENDING — "unit test làm sau")

- [ ] T013 [P] Test: clicking the "Phòng ban" pill toggles the panel open/closed | `app/kudos/_components/__tests__/kudos-filters.test.tsx`
- [ ] T014 [P] Test: selecting a department calls `onChange("department", value)` and closes the panel | `app/kudos/_components/__tests__/kudos-filters.test.tsx`
- [ ] T015 [P] Test: reselecting the active department calls `onChange("department", null)` | `app/kudos/_components/__tests__/kudos-filters.test.tsx`
- [ ] T016 [P] Test: `HighlightSection` shows only kudos whose `department` matches the selection, and the empty-state when none match | `app/kudos/_components/__tests__/highlight-section.test.tsx`

---

## Notes

- No test runner is configured yet; T013–T016 are placeholders until testing is set up.
- The department list is DB-driven in production; the demo seeds six values in `DEPARTMENTS`.
