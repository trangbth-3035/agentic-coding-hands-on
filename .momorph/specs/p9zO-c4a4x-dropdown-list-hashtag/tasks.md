# Tasks: Dropdown list hashtag (Compose Multi-select)

**Frame**: `p9zO-c4a4x-dropdown-list-hashtag`
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

## Phase 1: Shell multi-select support

- [x] T001 Add the `checked` prop to `SaaDropdownItem`: gold/20 wash (`bg-saa-gold-light/20`) + gold text-glow + trailing `CheckBadge` | `app/_components/saa-dropdown.tsx`
- [x] T002 Add `size="compact"` (40px `h-10`, `rounded-sm`, `px-4`, `text-sm`) alongside the 56px default | `app/_components/saa-dropdown.tsx`
- [x] T003 Implement `CheckBadge` — 24×24 viewBox (`h-5 w-5`), circle fill `#FFEA9E`, tick stroke `#00101A` width 2.2 | `app/_components/saa-dropdown.tsx`

## Phase 2: Picker in the compose form

- [x] T004 Add the `AddButton` ("+ Hashtag / Tối đa 5") that toggles `tagOpen` | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T005 Render the picker `SaaDropdownPanel` (`absolute left-0 z-20 mt-2 max-h-72 min-w-56 overflow-y-auto saa-no-scrollbar`) mapping `hashtags` → `SaaDropdownItem size="compact" checked={tags.includes(opt)}` | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T006 Add the outside-click backdrop (`fixed inset-0 z-10`, `aria-hidden`, `tabIndex={-1}`) that closes the picker | `app/kudos/_components/write-kudos-modal.tsx`

## Phase 3: Selection, chips, cap

- [x] T007 Implement `toggleTag`: remove if present, else add only when `tags.length < MAX_ITEMS` (5), else no-op | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T008 Render selected hashtags as removable chips (`h-12 rounded-lg border bg-white`, `#D4271D` × button) that de-select on click | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T009 Show the `AddButton` only while `tags.length < MAX_ITEMS` so no sixth hashtag can be added | `app/kudos/_components/write-kudos-modal.tsx`

## Phase 4: Submit + reset + data wiring

- [x] T010 On submit, carry `hashtags: tags` onto the new `KudosPost` and push via `addKudos` | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T011 Reset `tags` + `tagOpen` on close/submit (`reset()`) | `app/kudos/_components/write-kudos-modal.tsx`
- [x] T012 [P] Pass `HASHTAGS` into the modal as the `hashtags` prop | `app/kudos/_components/write-kudos-launcher.tsx`
- [x] T013 [P] Provide the `hashtagLabel` + `maxFive` labels in both locales | `lib/i18n/dictionaries.ts`

## Phase 5: Tests (PENDING — "unit test làm sau")

- [ ] T014 [P] Test: clicking a picker row toggles it in `tags` (add then remove) | `app/kudos/_components/__tests__/write-kudos-modal.test.tsx`
- [ ] T015 [P] Test: a selected row shows the `CheckBadge` and gold/20 wash | `app/kudos/_components/__tests__/write-kudos-modal.test.tsx`
- [ ] T016 [P] Test: at five selections, adding a sixth is a no-op and the add button is not rendered | `app/kudos/_components/__tests__/write-kudos-modal.test.tsx`
- [ ] T017 [P] Test: removing a chip de-selects the hashtag and restores the add button | `app/kudos/_components/__tests__/write-kudos-modal.test.tsx`
- [ ] T018 [P] Test: submit carries the selected hashtags onto the new `KudosPost` | `app/kudos/_components/__tests__/write-kudos-modal.test.tsx`

---

## Notes

- No test runner is configured yet; T014–T018 are placeholders until testing is set up.
- The five-item cap is surfaced by hiding the add button at five selections (which also hides the
  picker), matching the Figma "disable unselected rows" intent.
