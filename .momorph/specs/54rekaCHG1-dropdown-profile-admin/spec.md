# Feature Specification: Dropdown-profile Admin (Account Menu — Admin)

**Frame ID**: `54rekaCHG1`
**Figma Frame ID**: `721:5277`
**Frame Name**: `Dropdown-profile Admin`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown-profile Admin** is the account menu overlay for an **admin user**, anchored to the
avatar button in the SAA 2025 site header. It exposes three navigation items — **"Trang cá nhân"
(Profile)**, **"Dashboard"**, and **"Đăng xuất" (Logout)**.

This is a small header overlay shared across every authenticated screen. It differs from the regular
[`z4sCl3_Qtk`](../z4sCl3_Qtk-dropdown-profile/spec.md) variant **only** by the extra **"Dashboard"**
row, which links to the admin dashboard (`/dashboard`). The shell, styling, and logout behaviour are
identical to the regular variant.

> **Note**: This 3-item layout is the one the shipped `app/_components/site-header.tsx` renders for
> **all** users today — role-conditional hiding of "Dashboard" for non-admins is not yet
> implemented (see Notes).

**Target users**: Signed-in Sun* employees with the admin role.

**Business context**: Admins need one-click access to the management Dashboard in addition to their
own profile and sign-out.

---

## User Scenarios & Testing

### User Story 1 - Open the account menu (Priority: P1)

**As an** admin,
**I want to** click my avatar to open the account menu,
**So that** I can reach my profile, the dashboard, or sign out.

**Independent Test**: Click the avatar button → dropdown opens showing "Trang cá nhân", "Dashboard",
and "Đăng xuất".

**Acceptance Scenarios**:

1. **Given** the header is displayed, **When** the admin clicks the avatar, **Then** the dropdown
   opens with three rows in order: "Trang cá nhân", "Dashboard", "Đăng xuất".
2. **Given** the dropdown is open, **When** the admin clicks the avatar again or clicks outside,
   **Then** the dropdown closes.
3. **Given** the dropdown is open, **When** the admin hovers a row, **Then** the row gets the gold
   wash + gold text-glow highlight.

---

### User Story 2 - Go to Dashboard (Priority: P1)

**As an** admin,
**I want to** click "Dashboard",
**So that** I navigate to the admin dashboard.

**Independent Test**: Open the menu → click "Dashboard" → land on `/dashboard`.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the admin clicks "Dashboard", **Then** the app navigates
   to `/dashboard` and the dropdown closes.
2. **Given** an unauthenticated request hits `/dashboard`, **When** the proxy runs, **Then** the
   user is redirected to `/login` (route guarded by `lib/supabase/middleware.ts`).

---

### User Story 3 - Go to Profile / Log out (Priority: P1)

**As an** admin,
**I want to** reach my profile or sign out from the same menu,
**So that** account actions are in one place.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the admin clicks "Trang cá nhân", **Then** the app
   navigates to `/profile` and the dropdown closes.
2. **Given** the dropdown is open, **When** the admin clicks "Đăng xuất", **Then** the `signOut`
   server action runs and the admin is redirected to `/login`, with no confirmation dialog.

### Edge Cases

- **No avatar image**: When `user.avatarUrl` is null, the trigger renders `/saa/icon-user.svg`.
- **Non-admin reaching `/dashboard`**: Currently only auth-gated (any signed-in user can load it);
  role-based gating is PENDING (see Notes).
- **Rapid toggle**: `accountOpen` is a single boolean shared with the backdrop, so it cannot desync.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md).

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Dropdown-List | 666:9728 | The admin account navigation panel — dark shell, opens on avatar click, no open animation, closes on outside click | Open/close |
| A.1_Profile | I666:9728;666:9277 | "Trang cá nhân" row — active user icon | Click → `/profile`, close |
| A.2_Dashboard | I666:9728;666:9452 | "Dashboard" row — grid icon → admin dashboard (route admin-only by design) | Click → `/dashboard`, close |
| A.3_Logout | I666:9728;666:9278 | "Đăng xuất" row — chevron-right icon → clear session, no confirm | Click → `signOut` → `/login` |
| Avatar trigger | N/A (in `A_Header`) | Circular avatar / fallback icon button | Click → toggle open |
| Backdrop | N/A (implementation) | Invisible full-viewport button behind the open panel | Click → close |

### Navigation Flow

- **From**: The avatar button in `app/_components/site-header.tsx`, on every authenticated screen.
- **To**:
  - `/profile` — on "Trang cá nhân"
  - `/dashboard` — on "Dashboard"
  - `/login` — after "Đăng xuất" (via `signOut`)
- **Triggers**:
  - Click avatar → open/close
  - Click a row → navigate + close
  - Click "Đăng xuất" → `signOut` → `/login`
  - Click outside → close

---

## Requirements

### Functional Requirements

- **FR-001**: The avatar button MUST open/close the account dropdown.
- **FR-002**: For an admin, the dropdown MUST show three rows in order: "Trang cá nhân",
  "Dashboard", "Đăng xuất".
- **FR-003**: "Trang cá nhân" MUST navigate to `/profile` and close the dropdown.
- **FR-004**: "Dashboard" MUST navigate to `/dashboard` and close the dropdown.
- **FR-005**: "Đăng xuất" MUST invoke the `signOut` server action and redirect to `/login`, with no
  confirmation step.
- **FR-006**: Clicking outside the panel MUST close it.
- **FR-007**: Row labels MUST come from the dictionary (`dict.header.profile`,
  `dict.header.dashboard`, `dict.header.signOut`).

### Technical Requirements

- **TR-001**: The menu is rendered from the Client Component host (`site-header.tsx`) using the
  shared `SaaDropdownPanel` / `SaaDropdownItem` shell (`app/_components/saa-dropdown.tsx`).
- **TR-002**: The Profile and Dashboard rows MUST render as anchors (`SaaDropdownItem href=…`).
- **TR-003**: Logout MUST use the `signOut` server action (`app/auth/actions.ts`) inside a
  `<form action={signOut}>` with a `type="submit"` row.
- **TR-004**: `/dashboard` MUST be a protected route; `lib/supabase/middleware.ts` (via `proxy.ts`)
  currently enforces auth (`PROTECTED_PREFIXES = ["/dashboard"]`). Admin-role enforcement is PENDING.

### Key Entities

- **HeaderUser**: `{ email, name, avatarUrl }` (from `site-header.tsx`).
- **Session**: Supabase session; cleared by `signOut`.
- **Role**: (intended) admin vs. regular — not yet modelled in code; drives the Dashboard row + guard.

---

## State Management

- **Local component state**: `accountOpen: boolean` in `site-header.tsx`.
- **Server-driven**: Logout redirect + `/dashboard` auth guard are server-side.
- **Cache requirements**: None specific to this overlay.

---

## Success Criteria

- **SC-001**: An admin can reach `/dashboard`, `/profile`, or sign out in one click from any
  authenticated screen.
- **SC-002**: Logout fully clears the session and lands on `/login` with no confirmation prompt.
- **SC-003**: The admin menu shows three items in the documented order.

---

## Out of Scope

- The dashboard page content itself.
- Editing profile data (Profile page `3FoIx6ALVb`).
- Logout confirmation dialog.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared dropdown shell exists (`app/_components/saa-dropdown.tsx`)
- [x] Header host exists (`app/_components/site-header.tsx`)
- [x] `signOut` server action exists (`app/auth/actions.ts`)
- [x] `/dashboard` route + proxy guard exist (`app/dashboard/page.tsx`, `lib/supabase/middleware.ts`, `proxy.ts`)
- [ ] Admin-role model + role-based `/dashboard` guard — PENDING

---

## Notes

- **Differs from `z4sCl3_Qtk` only by the extra "Dashboard" row.** The shell, sizes, glow, avatar
  trigger and logout flow are shared verbatim.
- **Implementation reality**: `site-header.tsx` renders these three rows **unconditionally** for
  every signed-in user — there is no role check yet, so the regular-user 2-item variant is not
  produced. `/dashboard` is auth-gated but not role-gated. Adding an admin-role check (to hide the
  Dashboard row for non-admins and to guard the route by role) is the main outstanding work.
- **Logout target**: momorph notes describe returning to the Homepage; the shipped `signOut` action
  redirects to `/login`. Documented as-implemented.
