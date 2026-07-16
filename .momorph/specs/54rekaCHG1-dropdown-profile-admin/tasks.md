# Tasks: Dropdown-profile Admin (Account Menu — Admin)

**Frame**: `54rekaCHG1-dropdown-profile-admin`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel · **[Story]**: US1 (open) / US2 (dashboard) / US3 (profile+logout)

---

## Phase 1: Shared Shell (pre-existing)

- [x] T001 Provide `SaaDropdownPanel` (dark `#00070C` panel, `border-saa-gold-muted`, `rounded-lg`, `p-1.5`, `shadow-2xl`) | `app/_components/saa-dropdown.tsx`
- [x] T002 Provide `SaaDropdownItem` (56px `h-14` rows, hover gold wash + text-glow; `href`→anchor else button) | `app/_components/saa-dropdown.tsx`

## Phase 2: Trigger + Open State (US1)

- [x] T003 [US1] Avatar trigger button (`h-10 w-10 rounded-full`) rendering `user.avatarUrl` or `/saa/icon-user.svg`; `aria-haspopup="menu"` + `aria-expanded`; toggles `accountOpen` | `app/_components/site-header.tsx`
- [x] T004 [US1] Invisible `fixed inset-0 -z-10` backdrop button that closes the menu on outside click | `app/_components/site-header.tsx`

## Phase 3: Three Menu Rows (US2 / US3)

- [x] T005 [US3] Profile row: `SaaDropdownItem href="/profile"` + `/saa/icon-user.svg`; label `dict.header.profile`; closes menu on click | `app/_components/site-header.tsx`
- [x] T006 [US2] Dashboard row: `SaaDropdownItem href="/dashboard"` + `/saa/icon-grid.svg`; label `dict.header.dashboard`; closes menu on click | `app/_components/site-header.tsx`
- [x] T007 [US3] Logout row inside `<form action={signOut}>` as `type="submit"` `SaaDropdownItem` + `/saa/icon-chevron-right.svg`; label `dict.header.signOut` | `app/_components/site-header.tsx`
- [x] T008 [US3] Implement `signOut` server action: `supabase.auth.signOut()`, delete demo cookie, `redirect("/login")` — no confirmation | `app/auth/actions.ts`

## Phase 4: Route Protection (partial)

- [x] T009 [US2] Guard `/dashboard` for authentication in the proxy: `PROTECTED_PREFIXES = ["/dashboard"]`, signed-out → `/login`, signed-in on `/login` → `/dashboard` | `lib/supabase/middleware.ts`
- [x] T010 [US2] Wire the proxy entry + matcher (Next.js 16 renamed `middleware` → `proxy`) | `proxy.ts`

## Phase 5: Admin-Role Gating (PENDING)

- [ ] T011 [P] Introduce an admin-role signal on the user and show the Dashboard row only for admins (non-admins fall back to the `z4sCl3_Qtk` 2-item menu) | `app/_components/site-header.tsx`
- [ ] T012 [P] Add role-based guard for `/dashboard` (admin-only, not just authenticated) | `lib/supabase/middleware.ts`
- [ ] T013 [P] Unit test: admin renders 3 rows in order (Profile/Dashboard/Logout); Dashboard → `/dashboard`; Logout submits `signOut` (PENDING — no test runner yet) | `app/_components/__tests__/site-header.test.tsx`

---

## Notes

- Implementation tasks are `[x]` (shipped in `app/_components/site-header.tsx` +
  `app/_components/saa-dropdown.tsx` + `app/auth/actions.ts` + `lib/supabase/middleware.ts` +
  `proxy.ts`). The shipped header renders this 3-row layout for all users.
- Admin-role gating (T011–T012) is PENDING — `/dashboard` is auth-gated but not role-gated, and the
  Dashboard row is not yet conditionally hidden.
- Test tasks are `[ ]` PENDING per project status ("unit test làm sau").
