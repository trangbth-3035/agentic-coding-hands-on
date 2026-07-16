# Tasks: Dropdown-profile (Account Menu — Regular User)

**Frame**: `z4sCl3_Qtk-dropdown-profile`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel · **[Story]**: US1 (open) / US2 (profile) / US3 (logout)

---

## Phase 1: Shared Shell (pre-existing)

- [x] T001 Provide `SaaDropdownPanel` (dark `#00070C` panel, `border-saa-gold-muted`, `rounded-lg`, `p-1.5`, `shadow-2xl`) | `app/_components/saa-dropdown.tsx`
- [x] T002 Provide `SaaDropdownItem` (56px `h-14` rows, `font-bold tracking-[0.5px]`, hover gold wash + text-glow; `href`→anchor else button) | `app/_components/saa-dropdown.tsx`

## Phase 2: Trigger + Open State (US1)

- [x] T003 [US1] Avatar trigger button (`h-10 w-10 rounded-full border-white/10 bg-white/5`) rendering `user.avatarUrl` or `/saa/icon-user.svg`; `aria-haspopup="menu"` + `aria-expanded`; toggles `accountOpen` | `app/_components/site-header.tsx`
- [x] T004 [US1] Invisible `fixed inset-0 -z-10` backdrop button that closes the menu on outside click | `app/_components/site-header.tsx`

## Phase 3: Profile Row (US2)

- [x] T005 [US2] Render Profile row: `SaaDropdownItem href="/profile"` + `/saa/icon-user.svg` (24×24); label `dict.header.profile`; `onClick` closes the menu | `app/_components/site-header.tsx`

## Phase 4: Logout Row (US3)

- [x] T006 [US3] Render Logout row inside `<form action={signOut}>` as `type="submit"` `SaaDropdownItem` + `/saa/icon-chevron-right.svg`; label `dict.header.signOut` | `app/_components/site-header.tsx`
- [x] T007 [US3] Implement `signOut` server action: `supabase.auth.signOut()`, delete demo cookie, `redirect("/login")` — no confirmation | `app/auth/actions.ts`

## Phase 5: Regular-User Variant (PENDING)

- [ ] T008 [P] Add role-conditional rendering so non-admin users see only Profile + Logout (omit the Dashboard row) — currently the header always renders all three | `app/_components/site-header.tsx`
- [ ] T009 [P] Add role-based guard for `/dashboard` (currently only auth-gated) | `lib/supabase/middleware.ts`
- [ ] T010 [P] Unit test: regular user renders exactly 2 rows; Profile → `/profile`; Logout submits `signOut` (PENDING — no test runner yet) | `app/_components/__tests__/site-header.test.tsx`

---

## Notes

- Implementation tasks are `[x]` (shipped in `app/_components/site-header.tsx` +
  `app/_components/saa-dropdown.tsx` + `app/auth/actions.ts`).
- The 2-item regular-user variant (T008) and role gating (T009) are PENDING — the shipped header
  currently renders the 3-item Admin layout for all users.
- Test tasks are `[ ]` PENDING per project status ("unit test làm sau").
