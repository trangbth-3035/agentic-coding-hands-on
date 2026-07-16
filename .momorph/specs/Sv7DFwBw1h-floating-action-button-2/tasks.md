# Tasks: Floating Action Button 2 (open state)

**Frame**: `Sv7DFwBw1h-floating-action-button-2`
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

- [x] T001 [P] Add close (×) icon asset for the "Hủy" button | `public/saa/widget-close.svg`
- [x] T002 [P] Reuse pen + rules-mark icons for the pills | `public/saa/widget-pen.svg`, `public/saa/widget-rules-logo.svg`
- [x] T003 [P] Provide labels: `widget.rules`/`widget.writeKudos` (pill labels) and `rules.*` / `kudosBoard.writeKudos` (launched overlays), vi + en | `lib/i18n/dictionaries.ts`

## Phase 2: Expanded layout

- [x] T004 Conditionally render the two action pills (`open &&`) in the shared container, ordered "Thể lệ" then "Viết KUDOS" | `app/_components/widget-button.tsx`
- [x] T005 Style each pill — `saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 hover:brightness-105`, icon (24×24) + label (`text-2xl font-bold leading-8 text-saa-bg`) | `app/_components/widget-button.tsx`
- [x] T006 Swap the trigger to the red × circle when open — `grid h-14 w-14 place-items-center rounded-full bg-saa-red shadow-xl shadow-black/40 hover:brightness-110`, white × icon, `aria-expanded={open}` | `app/_components/widget-button.tsx`

## Phase 3: Entrance animation

- [x] T007 Add the `saa-fab-in` keyframes (opacity + translateY(8px) + scale(0.96)) | `app/globals.css`
- [x] T008 Apply staggered `animationDelay` to the pills — "Viết KUDOS" 0ms, "Thể lệ" 60ms | `app/_components/widget-button.tsx`

## Phase 4: Dismiss & actions

- [x] T009 Add the transparent full-screen outside-click catcher (`fixed inset-0 z-30 cursor-default`) that calls `setOpen(false)` | `app/_components/widget-button.tsx`
- [x] T010 Register an `Escape` keydown listener (only while `open`) that collapses the menu, with effect cleanup | `app/_components/widget-button.tsx`
- [x] T011 Wire "Viết KUDOS" pill → `setOpen(false)` + `setComposeOpen(true)`; mount `<WriteKudosModal />` sibling | `app/_components/widget-button.tsx`
- [x] T012 Wire "Thể lệ" pill → `setOpen(false)` + `setRulesOpen(true)`; mount `<RulesModal />` sibling (its own "Viết KUDOS" CTA also opens the compose modal) | `app/_components/widget-button.tsx`

## Phase 5: Host wiring

- [x] T013 Mount `<WidgetButton labels={dict.widget} rules={dict.rules} compose={dict.kudosBoard.writeKudos} senderName={…} />` on the homepage | `app/page.tsx`

## Phase 6: Tests (PENDING — "unit test làm sau")

- [ ] T014 [P] Unit test: opening the FAB renders both pills and the red × circle (`aria-expanded="true"`) | `app/_components/__tests__/widget-button.test.tsx`
- [ ] T015 [P] Unit test: clicking "Viết KUDOS" collapses the menu and opens the compose modal | `app/_components/__tests__/widget-button.test.tsx`
- [ ] T016 [P] Unit test: clicking "Thể lệ" collapses the menu and opens the rules drawer | `app/_components/__tests__/widget-button.test.tsx`
- [ ] T017 [P] Unit test: red × click, outside click, and `Escape` each collapse the menu | `app/_components/__tests__/widget-button.test.tsx`

---

## Notes

- No test runner is configured in this repo yet; Phase 6 tasks stay unchecked until one is added.
- The closed-pill tasks live in
  [`_hphd32jN2`](../_hphd32jN2-floating-action-button/tasks.md) — same component file.
</content>
