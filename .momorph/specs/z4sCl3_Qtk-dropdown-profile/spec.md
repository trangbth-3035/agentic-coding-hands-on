# Feature Specification: Dropdown-profile (Account Menu — Regular User)

**Frame ID**: `z4sCl3_Qtk`
**Figma Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown-profile** is the account menu overlay for a **regular (non-admin) user**, anchored to
the avatar button in the SAA 2025 site header. It exposes two navigation items — **"Trang cá nhân"
(Profile)** and **"Đăng xuất" (Logout)**.

This is a small header overlay shared across every authenticated screen (the header is rendered on
all of them). It differs from the **Admin** variant [`54rekaCHG1`](../54rekaCHG1-dropdown-profile-admin/spec.md)
**only** by the absence of the extra **"Dashboard"** item; everything else (shell, styling, logout
behaviour) is identical.

**Target users**: All signed-in Sun* employees without the admin role.

**Business context**: A single account affordance in the header for reaching one's own profile and
for signing out.

---

## User Scenarios & Testing

### User Story 1 - Open the account menu (Priority: P1)

**As a** signed-in user,
**I want to** click my avatar to open the account menu,
**So that** I can reach my profile or sign out.

**Independent Test**: Click the avatar button → dropdown opens showing "Trang cá nhân" and
"Đăng xuất".

**Acceptance Scenarios**:

1. **Given** the header is displayed, **When** the user clicks the avatar button, **Then** the
   dropdown opens with exactly two rows: "Trang cá nhân" and "Đăng xuất".
2. **Given** the dropdown is open, **When** the user clicks the avatar again or clicks outside,
   **Then** the dropdown closes.
3. **Given** the dropdown is open, **When** the user hovers a row, **Then** the row gets the gold
   wash + gold text-glow highlight.

---

### User Story 2 - Go to Profile (Priority: P1)

**As a** signed-in user,
**I want to** click "Trang cá nhân",
**So that** I navigate to my own profile page.

**Independent Test**: Open the menu → click "Trang cá nhân" → land on `/profile`.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Trang cá nhân", **Then** the app
   navigates to `/profile` and the dropdown closes.

---

### User Story 3 - Log out (Priority: P1)

**As a** signed-in user,
**I want to** click "Đăng xuất",
**So that** my session ends and I return to the login screen.

**Independent Test**: Open the menu → click "Đăng xuất" → session cleared → redirected to `/login`.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Đăng xuất", **Then** the `signOut`
   server action runs (`supabase.auth.signOut()` + demo-cookie delete) and the user is redirected
   to `/login`, with no confirmation dialog.

### Edge Cases

- **No avatar image**: When `user.avatarUrl` is null, the trigger renders the fallback
  `/saa/icon-user.svg`.
- **Rapid toggle**: `accountOpen` is a single boolean; the invisible backdrop and the trigger both
  drive it, so it cannot desync.
- **Logout while offline**: The `signOut` action still clears the demo cookie and redirects; the
  Supabase call is awaited server-side.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md).

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Dropdown-List | 666:9601 | The account `dropdown_menu` panel (regular user) — dark shell, opens on avatar click, closes on outside click | Open/close |
| A.1_Profile | I666:9601;563:7844 | "Trang cá nhân" row (119×56) — user icon; gold glow when active | Click → `/profile`, close |
| A.2_Logout | I666:9601;563:7868 | "Đăng xuất" row — chevron-right icon | Click → `signOut` → `/login` |
| Avatar trigger | N/A (in `A_Header`) | Circular avatar / fallback icon button that opens the menu | Click → toggle open |
| Backdrop | N/A (implementation) | Invisible full-viewport button behind the open panel | Click → close |

### Navigation Flow

- **From**: The avatar button in `app/_components/site-header.tsx`, present on every authenticated
  screen.
- **To**:
  - `/profile` — on "Trang cá nhân"
  - `/login` — after "Đăng xuất" (via the `signOut` server action)
- **Triggers**:
  - Click avatar → open/close
  - Click "Trang cá nhân" → navigate `/profile` + close
  - Click "Đăng xuất" → `signOut` → `/login`
  - Click outside → close

---

## Requirements

### Functional Requirements

- **FR-001**: The avatar button MUST open/close the account dropdown.
- **FR-002**: The dropdown MUST show exactly two rows for a regular user: "Trang cá nhân" and
  "Đăng xuất".
- **FR-003**: "Trang cá nhân" MUST navigate to `/profile` and close the dropdown.
- **FR-004**: "Đăng xuất" MUST invoke the `signOut` server action and redirect to `/login`, with no
  confirmation step.
- **FR-005**: Clicking outside the panel MUST close it.
- **FR-006**: Each row's label MUST come from the dictionary (`dict.header.profile`,
  `dict.header.signOut`) so it is localised.

### Technical Requirements

- **TR-001**: The menu is rendered from a Client Component host (`site-header.tsx`, `"use client"`)
  using the shared `SaaDropdownPanel` / `SaaDropdownItem` shell (`app/_components/saa-dropdown.tsx`).
- **TR-002**: Logout MUST use the `signOut` server action (`app/auth/actions.ts`) — a `<form
  action={signOut}>` wrapping a `type="submit"` row — never a client-side auth call.
- **TR-003**: The Profile row MUST render as an anchor (`SaaDropdownItem href="/profile"`), not a
  button, so it is a real navigable link.

### Key Entities

- **HeaderUser**: `{ email, name, avatarUrl }` (from `site-header.tsx`) — supplies the avatar/fallback.
- **Session**: Supabase session; cleared by `signOut`.

---

## State Management

- **Local component state**: `accountOpen: boolean` (in `site-header.tsx`) — dropdown visibility.
- **Server-driven**: Logout is a server action; the redirect is issued server-side.
- **Cache requirements**: None specific to this overlay.

---

## Success Criteria

- **SC-001**: A regular user can reach `/profile` in one click from any authenticated screen.
- **SC-002**: Logout fully clears the session and lands on `/login` without a confirmation prompt.
- **SC-003**: The menu shows two items only (no Dashboard) for the regular-user variant.

---

## Out of Scope

- The extra "Dashboard" item — that is the Admin variant (`54rekaCHG1`).
- Editing profile data (handled by the Profile page `3FoIx6ALVb`).
- Logout confirmation dialog.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared dropdown shell exists (`app/_components/saa-dropdown.tsx`)
- [x] Header host exists (`app/_components/site-header.tsx`)
- [x] `signOut` server action exists (`app/auth/actions.ts`)
- [x] Profile page route exists (`/profile`, screen `3FoIx6ALVb`)

---

## Notes

- **Implementation reality**: The shipped `site-header.tsx` currently renders **all three** rows
  (Profile / Dashboard / Logout) unconditionally — i.e. it ships the Admin layout for every user.
  The role-conditional hiding of "Dashboard" that would produce this 2-item regular-user variant is
  **not yet implemented**; `/dashboard` is only auth-gated (not role-gated) by
  `lib/supabase/middleware.ts`. This spec documents the intended regular-user design; see the
  Admin spec for the shared shell and the PENDING role-gating task.
- **Logout target**: momorph notes describe returning to the Homepage; the shipped `signOut` action
  redirects to `/login`. Documented as-implemented.
