# Tasks: Thể lệ UPDATE

**Frame**: `b1Filzi9i6-the-le-update`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (retrospective) — implementation tasks `[x]`; unit tests `[ ]` PENDING

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies on sibling tasks)
- **[Story]**: Which user story this belongs to (US1 read rules, US2 close, US3 write-kudos)
- **|**: Primary file affected by this task

---

## Phase 1: Copy & Data

- [x] T001 [P] Add the `rules` block (title, close, writeKudos, receiverHeading/Intro, 4 `tiers`, senderHeading/Intro/Footnote, nationalHeading/Body) to the `vi` and `en` dictionaries | `lib/i18n/dictionaries.ts`
- [x] T002 [P] Add `widget` labels (writeKudos, rules) to the `vi` and `en` dictionaries | `lib/i18n/dictionaries.ts`
- [x] T003 [P] Add `RULE_HERO_BADGES` (4 Hero-rank badge paths) and `RULE_ICONS` (6 collectible icon paths) arrays | `lib/saa/kudos.ts`
- [x] T004 [P] Confirm badge/icon PNGs and footer icons present under `public/saa/` (`kudos-rule-hero-*.png`, `kudos-rule-*.png`, `widget-close.svg`, `widget-pen.svg`) | `public/saa/`

---

## Phase 2: Drawer Component (US1 + US2 + US3)

- [x] T005 [US1] Create `RulesModal` Client Component (`'use client'`) with props `open`, `onClose`, `t: RulesCopy`, `onWriteKudos`; export the `RulesCopy` type (`Dictionary["rules"]`) | `app/_components/rules-modal.tsx`
- [x] T006 [US2] Add the lifecycle effect: on `open`, bind `keydown` → close on `Escape` and set `document.body.style.overflow = 'hidden'`; restore both on cleanup | `app/_components/rules-modal.tsx`
- [x] T007 [US1] Add the mount guard `if (!open) return null` and `createPortal(..., document.body)` wrapper `fixed inset-0 z-[70] flex justify-end` with `role="dialog"`, `aria-modal="true"`, `aria-label={t.title}` | `app/_components/rules-modal.tsx`
- [x] T008 [US2] Render the fading backdrop `<button aria-hidden tabIndex={-1} onClick={onClose}>` (`saa-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm`) | `app/_components/rules-modal.tsx`
- [x] T009 [US1] Render the panel `<aside>` (`saa-drawer-in saa-no-scrollbar h-full w-full max-w-[553px] flex flex-col justify-between gap-10 overflow-y-auto bg-[#00070C] px-6 pb-10 pt-6 sm:px-10`) with the title `<h2>` (`text-[40px]/[45px] font-bold text-saa-gold-light`) | `app/_components/rules-modal.tsx`
- [x] T010 [P] [US1] Add the `Heading` (gold 22px) and `Body` (justified white 16px) presentational helpers | `app/_components/rules-modal.tsx`
- [x] T011 [US1] Render the "Người nhận" block: heading + intro + `t.tiers.map` rows (`pl-5`, badge `RULE_HERO_BADGES[i]` at `h-[22px]`, count label, `text-sm text-white/90` description) | `app/_components/rules-modal.tsx`
- [x] T012 [US1] Render the "Người gửi" block: heading + intro + two rows of three `RULE_ICONS` (`flex justify-between`, container `px-6 gap-4`, icons `w-20`) + footnote | `app/_components/rules-modal.tsx`
- [x] T013 [US1] Render the "Kudos Quốc Dân" block: heading + body | `app/_components/rules-modal.tsx`
- [x] T014 [US2] Render the pinned footer "Đóng" button (`rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-4 text-white hover:bg-saa-gold-light/20`, `/saa/widget-close.svg` 24×24, `onClick={onClose}`) | `app/_components/rules-modal.tsx`
- [x] T015 [US3] Render the pinned footer "Viết KUDOS" button (`flex-1 rounded bg-saa-gold-light px-4 py-4 text-saa-bg hover:brightness-105`, `/saa/widget-pen.svg` 24×24, `onClick={onWriteKudos}`) | `app/_components/rules-modal.tsx`

---

## Phase 3: Wire into FAB / Homepage

- [x] T016 [US2] In `WidgetButton`, add `rulesOpen`/`composeOpen` state; map the "Thể lệ" pill to `setRulesOpen(true)`; render `<RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} t={rules} onWriteKudos={…}/>` | `app/_components/widget-button.tsx`
- [x] T017 [US3] Wire `onWriteKudos` to `setRulesOpen(false)` + `setComposeOpen(true)` so the drawer is swapped for `<WriteKudosModal/>` | `app/_components/widget-button.tsx`
- [x] T018 [US1] Mount `WidgetButton` on the homepage with `rules={dict.rules}` / `labels={dict.widget}` resolved from the `saa_lang` cookie | `app/page.tsx`

---

## Phase 4: Polish

- [x] T019 [P] Apply `.saa-no-scrollbar`, `sm:` padding/typography step-ups, and justified body copy for VN/EN readability | `app/_components/rules-modal.tsx`

---

## Phase 5: Testing (PENDING — "unit test làm sau")

- [ ] T020 [P] [US2] Unit test: clicking "Đóng", the backdrop, and pressing `Escape` each call `onClose` | `app/_components/__tests__/rules-modal.test.tsx`
- [ ] T021 [P] [US2] Unit test: opening locks `document.body` overflow and closing restores the previous value | `app/_components/__tests__/rules-modal.test.tsx`
- [ ] T022 [P] [US3] Unit test: clicking "Viết KUDOS" calls `onWriteKudos` exactly once | `app/_components/__tests__/rules-modal.test.tsx`
- [ ] T023 [P] [US1] Unit test: renders `t.title`, all four tier rows with their badges, and six collectible icons | `app/_components/__tests__/rules-modal.test.tsx`

---

## Dependencies & Execution Order

```
Phase 1 (copy + data) ──> Phase 2 (drawer component) ──> Phase 3 (wire into FAB/homepage) ──> Phase 4 (polish)
                                                                                                    │
                                                                                                    ▼
                                                                                     Phase 5 (tests — PENDING)
```

- **Phase 1**: independent files (dictionaries, kudos data, assets) — parallel.
- **Phase 2**: single component file; T010 helper is parallelizable, the render tasks are sequential edits.
- **Phase 3**: depends on the exported `RulesModal` / `RulesCopy` from Phase 2.
- **Phase 5**: written after the "unit test làm sau" hold is lifted.

---

## Notes

- Follow Conventional Commits (`feat:`, `fix:`).
- Copy is dictionary-driven — never hard-code VN/EN strings in the component.
- Badge/icon order is index-aligned with `t.tiers`; do not reorder `RULE_HERO_BADGES` without
  reordering the tiers.
