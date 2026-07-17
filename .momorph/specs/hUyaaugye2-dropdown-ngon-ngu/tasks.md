# Tasks: Dropdown-ngôn ngữ (Language Picker)

**Frame**: `hUyaaugye2-dropdown-ngon-ngu`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 (switch language) / US2 (dismiss)
- **|**: Primary file affected

---

## Phase 1: i18n Foundation (pre-existing)

- [x] T001 Define locale union, default (`vi`) and cookie key `saa_lang` | `lib/i18n/config.ts`
- [x] T002 Implement server-side `getLocale()` / `getDict()` (async `cookies()`, `vi` fallback) | `lib/i18n/server.ts`
- [x] T003 [P] Provide VN + EN dictionaries | `lib/i18n/dictionaries.ts`

## Phase 2: Toggle + Overlay UI (US1)

- [x] T004 [US1] Build the toggle pill: flag (24×18) + code ("VN"/"EN") + chevron; `h-10 rounded-full border-white/15 bg-white/5 hover:bg-white/10`; `aria-haspopup="menu"` + `aria-expanded`; derive `current` from `locale` prop | `app/_components/language-switcher.tsx`
- [x] T005 [US1] Render the dropdown panel on `open`: `absolute right-0 mt-2 w-28 rounded-xl border-white/10 bg-black/90 shadow-2xl backdrop-blur`, `overflow-hidden` | `app/_components/language-switcher.tsx`
- [x] T006 [US1] Render VN/EN rows with `role="menuitemradio"` + `aria-checked`; active row `bg-[#2e3940] text-white`, idle `text-white/80 hover:bg-white/5` | `app/_components/language-switcher.tsx`

## Phase 3: Selection + Persistence (US1)

- [x] T007 [US1] `selectLocale(next)` — write `saa_lang` cookie (`path=/; max-age=31536000; samesite=lax`), `setOpen(false)`, `router.refresh()` | `app/_components/language-switcher.tsx`

## Phase 4: Dismiss (US2)

- [x] T008 [US2] Add invisible `fixed inset-0 -z-10` backdrop button that closes the dropdown on outside click | `app/_components/language-switcher.tsx`
- [x] T009 [US2] Toggle click also closes when already open (`setOpen((o) => !o)`) | `app/_components/language-switcher.tsx`

## Phase 5: Host Wiring (pre-existing)

- [x] T010 [US1] Render `<LanguageSwitcher locale={locale} />` inside the header; feed `locale` from `getDict()` on each server page | `app/_components/site-header.tsx`

## Phase 6: Polish (PENDING)

- [ ] T011 [P] Add keyboard support: `Escape` closes and returns focus to the toggle; arrow keys rove between rows | `app/_components/language-switcher.tsx`
- [x] T012 [P] Unit test: clicking a row writes `saa_lang` and calls `router.refresh()`| `app/_components/language-switcher.test.tsx`

---

## Notes

- Implementation tasks are `[x]` (shipped in `app/_components/language-switcher.tsx`).
- Test / keyboard tasks are `[ ]` PENDING per project status ("unit test làm sau").
