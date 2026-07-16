# Phase 03 — Account dropdown restyle (SaaDropdown; user vs admin)

**Status:** done

## Goal
Make the header account menu — the primary way users reach `/profile` — a `SaaDropdown`-based
overlay covering both the regular-user (`z4sCl3_Qtk`) and admin (`54rekaCHG1`) designs. As shipped,
the menu renders the 3-item **Admin** layout for everyone.

## Steps (in `app/_components/site-header.tsx`, `"use client"`)
- Avatar trigger toggles `accountOpen: boolean`; `aria-expanded={accountOpen}`. Fallback icon
  `/saa/icon-user.svg` when `user.avatarUrl` is null. An invisible full-viewport backdrop closes it.
- Menu panel uses the shared shell `SaaDropdownPanel` / `SaaDropdownItem`
  (`app/_components/saa-dropdown.tsx`), `absolute right-0 z-50 mt-2 min-w-52`, with three rows:
  - "Trang cá nhân" → `SaaDropdownItem href="/profile"` (`dict.header.profile`) — the Profile entry.
  - "Dashboard" → `SaaDropdownItem href="/dashboard"` (`dict.header.dashboard`).
  - "Đăng xuất" → `<form action={signOut}>` wrapping a `type="submit"` `SaaDropdownItem`
    (`dict.header.signOut`), running the `signOut` server action (`app/auth/actions.ts`) →
    `/login`.
- Labels come from the dictionary so both variants localize (VN/EN).

## Variants (design intent vs. as-shipped)
- **Regular user (`z4sCl3_Qtk`)**: 2 rows — "Trang cá nhân" + "Đăng xuất" (no Dashboard).
- **Admin (`54rekaCHG1`)**: 3 rows — adds "Dashboard" → `/dashboard`.
- **As shipped**: the 3-item Admin variant renders unconditionally for every signed-in user; there
  is no role check. `/dashboard` is auth-gated (`PROTECTED_PREFIXES = ["/dashboard"]` in
  `lib/supabase/middleware.ts`, wired via `proxy.ts`) but **not** role-gated.

## Success criteria
- Account menu opens on avatar click, closes on outside click / re-click, hover gold-glows rows.
- "Trang cá nhân" navigates to `/profile` and closes the menu.
- "Đăng xuất" clears the session and redirects to `/login` with no confirmation dialog.
- Rows render localized labels in VN and EN.

## Todo
- [x] Avatar trigger + `accountOpen` state + backdrop close — `app/_components/site-header.tsx`
- [x] `SaaDropdownPanel`/`SaaDropdownItem` menu shell reused — `app/_components/site-header.tsx`, `app/_components/saa-dropdown.tsx`
- [x] "Trang cá nhân" (→ `/profile`) + "Dashboard" (→ `/dashboard`) anchor rows — `app/_components/site-header.tsx`
- [x] "Đăng xuất" via `<form action={signOut}>` → `/login` — `app/_components/site-header.tsx`, `app/auth/actions.ts`
- [ ] Role-conditional 2-item regular-user variant (`z4sCl3_Qtk`) + admin-role guard on `/dashboard` — DEFERRED
