# Implementation Plan: Dropdown-profile (Account Menu — Regular User)

**Frame**: `z4sCl3_Qtk-dropdown-profile`
**Date**: 2026-07-16
**Spec**: `specs/z4sCl3_Qtk-dropdown-profile/spec.md`
**Design**: `specs/z4sCl3_Qtk-dropdown-profile/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the regular-user account menu — a small header overlay with two items: **"Trang cá nhân"**
(→ `/profile`) and **"Đăng xuất"** (→ `signOut` → `/login`). It is built on the shared
`SaaDropdownPanel` / `SaaDropdownItem` shell and hosted in the site header. It is the Admin menu
(`54rekaCHG1`) minus the "Dashboard" row.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**Auth**: Supabase via `lib/supabase/*`; logout is a server action.
**i18n**: Cookie `saa_lang` + dictionaries in `lib/i18n/`; labels via `dict.header.*`.
**Routing/files**: `app/`; shared components in `app/_components/`.
**State**: Local `useState` (`accountOpen`) in the header host.
**Testing**: None yet — test tasks PENDING.

---

## Architecture Decisions

- **Shared shell**: Rows use `SaaDropdownItem` inside `SaaDropdownPanel`
  (`app/_components/saa-dropdown.tsx`) — the dark `#00070C` panel with a gold-muted border, 56px
  rows, and gold hover/active glow.
- **Client host**: The menu lives in `app/_components/site-header.tsx` (`"use client"`) which owns
  the `accountOpen` state and the outside-click backdrop.
- **Profile as a link**: `SaaDropdownItem href="/profile"` renders an `<a role="menuitem">`.
- **Logout as a server action**: A `<form action={signOut}>` wraps a `type="submit"`
  `SaaDropdownItem`; `signOut` (`app/auth/actions.ts`) calls `supabase.auth.signOut()`, deletes the
  demo cookie, and `redirect("/login")`.
- **Localised labels**: `dict.header.profile` and `dict.header.signOut`.

---

## Project Structure

```
.momorph/specs/z4sCl3_Qtk-dropdown-profile/
├── spec.md            ✅
├── design-style.md    ✅
├── plan.md            ✅ (this file)
├── tasks.md           ✅
└── assets/
    └── frame.url.txt  ✅ (do not touch)
```

### Shipped Files (cite)

| File | Role |
|------|------|
| `app/_components/site-header.tsx` | Host: avatar trigger + `accountOpen` state + the menu markup |
| `app/_components/saa-dropdown.tsx` | Shared `SaaDropdownPanel` / `SaaDropdownItem` shell |
| `app/auth/actions.ts` | `signOut` server action (Supabase sign-out + demo-cookie delete → `/login`) |
| `lib/i18n/dictionaries.ts` | `dict.header.profile`, `dict.header.signOut` labels |

### Assets (in `public/saa/`)

| Asset | Path |
|-------|------|
| User icon (Profile row) | `/saa/icon-user.svg` |
| Chevron-right (Logout row) | `/saa/icon-chevron-right.svg` |

---

## Implementation Approach (Retrospective)

### Phase 1 — Shared shell (pre-existing)

- `saa-dropdown.tsx` provides `SaaDropdownPanel` (dark panel + gold-muted border) and
  `SaaDropdownItem` (56px row, hover gold wash + glow, `href`→anchor / else button).

### Phase 2 — Trigger + open state

- Avatar button (`h-10 w-10 rounded-full`) with `aria-haspopup="menu"` + `aria-expanded`; toggles
  `accountOpen`.
- Invisible `fixed inset-0 -z-10` backdrop button closes on outside click.

### Phase 3 — Menu rows

- Profile row: `SaaDropdownItem href="/profile"` + user icon; `onClick` closes the menu.
- Logout row: `<form action={signOut}>` wrapping a `type="submit"` `SaaDropdownItem` + chevron-right.
- Labels from `dict.header.*`.

### Phase 4 — Role gating (PENDING)

- The regular-user (2-item) variant requires hiding "Dashboard" for non-admins. Not yet
  implemented — the header currently always renders three rows. Add a role check (e.g. from the
  Supabase user / a `role` claim) to conditionally omit the Dashboard row, and add matching
  role-based route protection in `lib/supabase/middleware.ts` (currently `/dashboard` is only
  auth-gated).

---

## Risks & Notes

| Risk | Mitigation |
|------|------------|
| Non-admin sees "Dashboard" (current state) | PENDING role-gating task (Phase 4) |
| Logout without confirmation | Intentional per design; `signOut` redirects to `/login` |
| Menu style drift | Reuse `saa-dropdown.tsx`; do not fork the shell |

---

## Next Steps

1. Implement role-conditional rendering so regular users get the 2-item menu.
2. Add role-based guard for `/dashboard` in `lib/supabase/middleware.ts`.
3. Add unit tests once the test runner exists.
