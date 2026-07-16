# Tasks: Open Secret Box — Chưa Mở

**Frame**: `J3-4YFIpMM-open-secret-box`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (retrospective) — implementation tasks `[x]`; unit tests `[ ]` PENDING

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies on sibling tasks)
- **[Story]**: Which user story this belongs to (US1 open modal, US2 close, US3 open the box)
- **|**: Primary file affected by this task

---

## Phase 1: Copy & Data

- [x] T001 [P] Add `kudosBoard.secretBox` (`title`, `hint`, `unopenedLabel`) and `kudosBoard.stats.openBox` to the `vi` and `en` dictionaries | `lib/i18n/dictionaries.ts`
- [x] T002 [P] Ensure `KUDOS_STATS.boxUnopened` sample count exists | `lib/saa/kudos.ts`
- [x] T003 [P] Confirm assets present under `public/saa/` (`secretbox-closed.jpg`, `widget-close.svg`, `kudos-ic-gift.svg`) | `public/saa/`

---

## Phase 2: Modal Component (US1 + US2 + US3)

- [x] T004 [US1] Create `SecretBoxModal` Client Component (`'use client'`) with props `open`, `onClose`, `t: SecretBoxCopy`, `count`, `onOpenBox?`; export the `SecretBoxCopy` type (`Dictionary["kudosBoard"]["secretBox"]`) | `app/kudos/_components/secret-box-modal.tsx`
- [x] T005 [US2] Add the lifecycle effect: on `open`, bind `keydown` → close on `Escape` and set `document.body.style.overflow = 'hidden'`; restore both on cleanup | `app/kudos/_components/secret-box-modal.tsx`
- [x] T006 [US1] Add the mount guard `if (!open) return null` and `createPortal(..., document.body)` wrapper `fixed inset-0 z-[70] flex items-center justify-center p-4` with `role="dialog"`, `aria-modal="true"`, `aria-label={t.title}` | `app/kudos/_components/secret-box-modal.tsx`
- [x] T007 [US2] Render the fading backdrop `<button aria-hidden tabIndex={-1} onClick={onClose}>` (`saa-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm`) | `app/kudos/_components/secret-box-modal.tsx`
- [x] T008 [US1] Render the modal card (`saa-zoom-in saa-no-scrollbar max-h-[92vh] w-full max-w-[652px] flex flex-col items-center gap-[22px] overflow-y-auto rounded-xl bg-saa-bg px-3 py-6 sm:px-4`) | `app/kudos/_components/secret-box-modal.tsx`
- [x] T009 [US1] Render the header (A_Title): centered `h2` (`text-xl font-bold leading-8 text-saa-gold-light sm:text-[25px]`) + absolute ✕ button (`h-8 w-8`, `/saa/widget-close.svg` `h-5 w-5`, `onClick={onClose}`), then a `h-px w-full bg-saa-divider` divider | `app/kudos/_components/secret-box-modal.tsx`
- [x] T010 [US1] Render the hint (B_Group 396): `text-center text-[13px] font-bold tracking-[0.4px] text-white` → `t.hint` | `app/kudos/_components/secret-box-modal.tsx`
- [x] T011 [US3] Render the clickable box (C_Box image): `<button onClick={onOpenBox}>` (`block w-full max-w-[557px] overflow-hidden rounded-lg hover:brightness-110 active:scale-[0.99]`) wrapping `/saa/secretbox-closed.jpg` (`aspect-square w-full object-cover`), then a second divider | `app/kudos/_components/secret-box-modal.tsx`
- [x] T012 [US1] Render the unopened count (D_Số box chưa mở): label (`text-[13px] font-bold tracking-[0.4px] text-white`) + number (`text-3xl font-bold leading-9 text-saa-gold-light`) via `String(count).padStart(2, '0')` | `app/kudos/_components/secret-box-modal.tsx`

---

## Phase 3: Trigger Island + Wiring

- [x] T013 [US1] Create `OpenSecretBox` Client Component with `open` state and the "Mở Secret Box" trigger button (`mt-2 flex items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4 text-[22px] font-bold text-saa-bg`, `/saa/kudos-ic-gift.svg` `h-6 w-6`), mounting `<SecretBoxModal>` | `app/kudos/_components/open-secret-box.tsx`
- [x] T014 [US1] Render `<OpenSecretBox label={dict.stats.openBox} t={dict.secretBox} unopenedCount={KUDOS_STATS.boxUnopened} />` inside `StatsCard`, keeping `StatsCard` / `StatsSidebar` server-rendered | `app/kudos/_components/stats-card.tsx`

---

## Phase 4: Polish

- [x] T015 [P] Apply `saa-zoom-in` entrance, `.saa-no-scrollbar` + `max-h-[92vh]` internal scroll, `sm:` padding/type step-ups, and box hover-brighten / active-press affordances | `app/kudos/_components/secret-box-modal.tsx`

---

## Phase 5: Testing (PENDING — "unit test làm sau")

- [ ] T016 [P] [US2] Unit test: clicking ✕, the backdrop, and pressing `Escape` each call `onClose` | `app/kudos/_components/__tests__/secret-box-modal.test.tsx`
- [ ] T017 [P] [US2] Unit test: opening locks `document.body` overflow and closing restores the previous value | `app/kudos/_components/__tests__/secret-box-modal.test.tsx`
- [ ] T018 [P] [US1] Unit test: `count` renders zero-padded to two digits (e.g. `4` → `04`) | `app/kudos/_components/__tests__/secret-box-modal.test.tsx`
- [ ] T019 [P] [US3] Unit test: clicking the gift box calls `onOpenBox` when provided | `app/kudos/_components/__tests__/secret-box-modal.test.tsx`
- [ ] T020 [P] [US1] Unit test: `OpenSecretBox` trigger opens the modal (`setOpen(true)`) and renders `t.title` | `app/kudos/_components/__tests__/open-secret-box.test.tsx`

---

## Phase 6: Deferred — Opened ("đã mở") reveal frame (out of scope here)

- [ ] T021 Build the opened reveal result frame + weighted-odds engine (Stay Gold 30% / Flow to Horizon 25% / Touch of Light 20% / Beyond the Boundary 10% / Revival 10% / Root Further 5%) | separate frame
- [ ] T022 Wire `onOpenBox` from `StatsCard` and decrement the unopened count on reveal | `app/kudos/_components/*`
- [ ] T023 Hide the hint and disable the box click when `count === 0` (FR-006) | `app/kudos/_components/secret-box-modal.tsx`

---

## Dependencies & Execution Order

```
Phase 1 (copy + data) ──> Phase 2 (modal component) ──> Phase 3 (trigger island + wiring) ──> Phase 4 (polish)
                                                                                                   │
                                                                                                   ▼
                                                                                    Phase 5 (tests — PENDING)
                                                                                    Phase 6 (reveal frame — deferred)
```

- **Phase 1**: independent files (dictionaries, kudos data, assets) — parallel.
- **Phase 2**: single component file; render tasks are sequential edits to the same file.
- **Phase 3**: depends on the exported `SecretBoxModal` / `SecretBoxCopy` from Phase 2.
- **Phase 5 / 6**: written / built after the current holds are lifted.

---

## Notes

- Follow Conventional Commits (`feat:`, `fix:`).
- Copy is dictionary-driven — never hard-code VN/EN strings in the component.
- The shipped `StatsCard` mounts `OpenSecretBox` without an `onOpenBox` handler, so the box click is
  a documented no-op until Phase 6 wires the reveal frame.
- The Figma `A_Title` node label ("MỞ SECRET BOX THÀNH CÔNG") differs from the shipped localized
  title ("KHÁM PHÁ SECRET BOX CỦA BẠN"); the dictionary string is authoritative.
