# Tasks: Floating Action Button (closed state)

**Frame**: `_hphd32jN2-floating-action-button`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (test tasks PENDING)

---

## Task Format

```
- [ ] T### [P?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **|**: Primary file affected

---

## Phase 1: Assets & i18n

- [x] T001 [P] Add pen icon asset for the pen glyph (A.1_icon viết kudos) | `public/saa/widget-pen.svg`
- [x] T002 [P] Add rules mark asset (A.2_icon thể lệ saa) | `public/saa/widget-rules-logo.svg`
- [x] T003 [P] Add `widget.writeKudos` ("Viết KUDOS"/"Write KUDOS") and `widget.rules` ("Thể lệ"/"Rules") to both locales | `lib/i18n/dictionaries.ts`

## Phase 2: Component

- [x] T004 Create the FAB client component with the fixed bottom-right container (`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-5`) and local `open` state | `app/_components/widget-button.tsx`
- [x] T005 Build the closed gold pill trigger — `rounded-full bg-saa-gold px-5 py-3.5 shadow-xl shadow-black/40 hover:bg-saa-gold-light`, contents = pen icon + "/" (`text-xl font-bold text-saa-bg`) + rules mark, `onClick` toggles `open`, `aria-expanded={open}` | `app/_components/widget-button.tsx`
- [x] T006 Render icons via `next/image` at 24×24 (`h-6 w-6`) from `public/saa/` | `app/_components/widget-button.tsx`

## Phase 3: Host wiring

- [x] T007 Mount `<WidgetButton labels={dict.widget} … />` on the homepage after `<SiteFooter />`, passing server-resolved dictionary labels | `app/page.tsx`

## Phase 4: Tests (PENDING — "unit test làm sau")

- [ ] T008 [P] Unit test: closed pill renders with `aria-expanded="false"` and both icons present | `app/_components/widget-button.test.tsx`
- [x] T009 [P] Unit test: clicking the pill sets `aria-expanded="true"` and reveals the open-state pills | `app/_components/widget-button.test.tsx`

---

## Notes

- No test runner is configured in this repo yet; Phase 4 tasks stay unchecked until one is added.
- The open-state tasks (action pills + red "Hủy" button) live in
  [`Sv7DFwBw1h`](../Sv7DFwBw1h-floating-action-button-2/tasks.md) — same component file.
</content>
