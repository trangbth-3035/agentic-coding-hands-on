# Implementation Plan: Dropdown-profile Admin (Account Menu — Admin)

**Frame**: `54rekaCHG1-dropdown-profile-admin`
**Date**: 2026-07-16
**Spec**: `specs/54rekaCHG1-dropdown-profile-admin/spec.md`
**Design**: `specs/54rekaCHG1-dropdown-profile-admin/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the admin account menu — a small header overlay with three items: **"Trang cá nhân"**
(→ `/profile`), **"Dashboard"** (→ `/dashboard`) and **"Đăng xuất"** (→ `signOut` → `/login`). It is
built on the shared `SaaDropdownPanel` / `SaaDropdownItem` shell and hosted in the site header. It is
the regular menu (`z4sCl3_Qtk`) plus the "Dashboard" row. This 3-item layout is the one the shipped
header renders today for all users.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**Auth**: Supabase via `lib/supabase/*`; logout is a server action; `/dashboard` guarded in the proxy.
**i18n**: Cookie `saa_lang` + dictionaries in `lib/i18n/`; labels via `dict.header.*`.
**Routing/files**: `app/`; shared components in `app/_components/`.
**State**: Local `useState` (`accountOpen`) in the header host.
**Testing**: None yet — test tasks PENDING.

---

## Architecture Decisions

- **Shared shell**: Rows use `SaaDropdownItem` inside `SaaDropdownPanel`
  (`app/_components/saa-dropdown.tsx`) — dark `#00070C` panel, gold-muted border, 56px rows, gold
  hover/active glow. The shell's docstring lists `54rekaCHG1` as a source frame.
- **Client host**: The menu lives in `app/_components/site-header.tsx` (`"use client"`) which owns
  `accountOpen` and the outside-click backdrop.
- **Links vs. action**: Profile and Dashboard rows are anchors (`SaaDropdownItem href=…`); Logout is
  a `<form action={signOut}>` wrapping a `type="submit"` row.
- **Protected route**: `/dashboard` is listed in `PROTECTED_PREFIXES` in
  `lib/supabase/middleware.ts` (invoked from `proxy.ts`) — signed-out users are redirected to
  `/login`. A signed-in user hitting `/login` is redirected to `/dashboard`.
- **Localised labels**: `dict.header.profile`, `dict.header.dashboard`, `dict.header.signOut`.

---

## Project Structure

```
.momorph/specs/54rekaCHG1-dropdown-profile-admin/
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
| `app/_components/site-header.tsx` | Host: avatar trigger + `accountOpen` + the 3-row menu markup |
| `app/_components/saa-dropdown.tsx` | Shared `SaaDropdownPanel` / `SaaDropdownItem` shell |
| `app/auth/actions.ts` | `signOut` server action → `/login` |
| `proxy.ts` | Next.js 16 proxy entry — calls `updateSession` |
| `lib/supabase/middleware.ts` | `updateSession`: `PROTECTED_PREFIXES = ["/dashboard"]` auth guard + `/login`→`/dashboard` redirect |
| `app/dashboard/page.tsx` | The dashboard route target |
| `lib/i18n/dictionaries.ts` | `dict.header.profile` / `dashboard` / `signOut` labels |

### Assets (in `public/saa/`)

| Asset | Path |
|-------|------|
| User icon (Profile) | `/saa/icon-user.svg` |
| Grid icon (Dashboard) | `/saa/icon-grid.svg` |
| Chevron-right (Logout) | `/saa/icon-chevron-right.svg` |

---

## Implementation Approach (Retrospective)

### Phase 1 — Shared shell (pre-existing)

- `saa-dropdown.tsx` provides `SaaDropdownPanel` + `SaaDropdownItem` (see the regular-variant plan).

### Phase 2 — Trigger + open state

- Avatar button + `accountOpen` state + invisible `fixed inset-0 -z-10` backdrop, as in the regular
  variant.

### Phase 3 — Three menu rows

- Profile: `SaaDropdownItem href="/profile"` + user icon.
- Dashboard: `SaaDropdownItem href="/dashboard"` + grid icon.
- Logout: `<form action={signOut}>` → `type="submit"` `SaaDropdownItem` + chevron-right.
- All labels from `dict.header.*`; each row's `onClick` closes the menu.

### Phase 4 — Route protection (partial)

- `lib/supabase/middleware.ts` guards `/dashboard` for authentication (signed-out → `/login`), and
  redirects a signed-in user off `/login` to `/dashboard`. Wired via `proxy.ts` matcher.

### Phase 5 — Admin-role gating (PENDING)

- Restrict `/dashboard` to admins (role-based, not just auth) and hide the Dashboard row for
  non-admins so regular users get the `z4sCl3_Qtk` 2-item menu. Requires a role model on the user;
  not yet implemented.

---

## Risks & Notes

| Risk | Mitigation |
|------|------------|
| Non-admins can currently open `/dashboard` (auth-only gate) | PENDING role-based guard (Phase 5) |
| Dashboard row shown to everyone | PENDING role-conditional rendering (Phase 5) |
| Logout without confirmation | Intentional; `signOut` redirects to `/login` |
| Menu style drift | Reuse `saa-dropdown.tsx`; do not fork the shell |

---

## Next Steps

1. Introduce an admin-role signal and gate both the Dashboard row and the `/dashboard` route by it.
2. Add unit tests once the test runner exists.
