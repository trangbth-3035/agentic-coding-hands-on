# Feature Specification: Floating Action Button 2 (open state)

**Frame ID**: `Sv7DFwBw1h`
**Figma Frame ID**: `313:9139`
**Frame Name**: `Floating Action Button 2`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

This is the **open (expanded) state** of the homepage Floating Action Button. When the closed gold
pill (screen [`_hphd32jN2`](../_hphd32jN2-floating-action-button/spec.md)) is tapped, it becomes a
red circular "Hủy" (×) button and two action pills slide in above it:

- **"Thể lệ"** — opens the rules drawer (`b1Filzi9i6`).
- **"Viết KUDOS"** — opens the compose modal (`ihQ26W78P2`) in place.

Both states are the same shipped component (`app/_components/widget-button.tsx`); the open layout is
rendered when the local `open` state is `true`.

**Target users**: Authenticated Sun* employees browsing the SAA 2025 homepage.

**Business context**: The expanded menu surfaces the two primary kudos shortcuts — reading the rules
and writing a kudo — from anywhere on the homepage, without navigating away.

---

## User Scenarios & Testing

### User Story 1 - Open "Viết KUDOS" (Priority: P1)

**As a** homepage visitor with the FAB expanded,
**I want to** tap the "Viết KUDOS" pill,
**So that** the kudos compose form opens in place.

**Why this priority**: Writing a kudo is the primary conversion action of the whole app.

**Independent Test**: Expand the FAB → click "Viết KUDOS" → verify the FAB collapses and the compose
modal (`ihQ26W78P2`) opens.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks the "Viết KUDOS" pill, **Then** the menu
   collapses (`open = false`) and the "Viết KUDOS" compose modal opens over the page.
2. **Given** the FAB is expanded, **When** the pills render, **Then** "Viết KUDOS" appears with a pen
   icon and its label on a light-gold pill.

---

### User Story 2 - Open "Thể lệ" (Priority: P2)

**As a** homepage visitor with the FAB expanded,
**I want to** tap the "Thể lệ" pill,
**So that** the rules drawer opens.

**Why this priority**: Understanding the rules supports participation but does not block the core
write action.

**Independent Test**: Expand the FAB → click "Thể lệ" → verify the FAB collapses and the rules drawer
(`b1Filzi9i6`) slides in.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks the "Thể lệ" pill, **Then** the menu
   collapses and the rules drawer opens.
2. **Given** the FAB is expanded, **When** the pills render, **Then** "Thể lệ" appears with the rules
   icon and its label on a light-gold pill.

---

### User Story 3 - Cancel / collapse (Priority: P1)

**As a** homepage visitor with the FAB expanded,
**I want to** dismiss the menu,
**So that** I return to the resting closed pill.

**Why this priority**: The menu must be trivially dismissible or it becomes an obstruction.

**Independent Test**: Expand the FAB → click the red "Hủy" (×) circle → verify the menu collapses
back to the closed gold pill.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks the red "Hủy" (×) circle, **Then** the
   menu collapses to the closed pill (`open = false`).
2. **Given** the FAB is expanded, **When** the user clicks anywhere outside the menu, **Then** the
   menu collapses (an invisible full-screen catcher handles the outside click; the page is **not**
   dimmed).
3. **Given** the FAB is expanded, **When** the user presses `Escape`, **Then** the menu collapses and
   the keydown listener is removed.

---

### Edge Cases

- **No page dimming**: Unlike the rules drawer / compose modal, the open FAB does not dim the page —
  the outside-click catcher is transparent (`cursor-default`) by design.
- **Staggered entrance mid-tap**: The pills animate in (`saa-fab-in`) with a 0/60ms stagger; a fast
  outside-click during the animation still collapses cleanly.
- **Action then reopen**: Choosing an action sets `open = false` and opens the target overlay;
  reopening the FAB later starts fresh from the closed pill.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors, and typography
> come from that document.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Button thể lệ | I313:9140;214:3799 | "Thể lệ" pill (149×64), light-gold rounded, rules icon + label. Top of the stack | Click → collapse menu + open rules drawer (`b1Filzi9i6`) |
| B_Button viết kudos | I313:9140;214:3732 | "Viết KUDOS" pill (light-gold rounded, pen icon + label). Middle of the stack | Click → collapse menu + open compose modal (`ihQ26W78P2`) |
| C_Button huỷ | I313:9140;214:3827 | Red circular "Hủy" button (56×56), white × icon, drop shadow. Bottom of the stack (the trigger itself) | Click → collapse menu back to closed pill |

### Navigation Flow

- **From**:
  - Closed FAB (`_hphd32jN2`) → click the gold pill → `open = true`.
- **To**:
  - "Viết KUDOS" pill → collapse + open compose modal (`ihQ26W78P2`) — overlay, no route change.
  - "Thể lệ" pill → collapse + open rules drawer (`b1Filzi9i6`) — overlay, no route change.
  - Red "Hủy" / outside click / `Escape` → back to closed pill (`_hphd32jN2`).
- **Triggers**:
  - `setOpen(false)` + `setComposeOpen(true)` — "Viết KUDOS".
  - `setOpen(false)` + `setRulesOpen(true)` — "Thể lệ".
  - `setOpen(false)` — red circle / outside catcher / `Escape`.

---

## Requirements

### Functional Requirements

- **FR-001**: When expanded, the FAB MUST render two action pills ("Thể lệ", "Viết KUDOS") above a
  red circular "Hủy" (×) trigger.
- **FR-002**: Clicking "Viết KUDOS" MUST collapse the menu and open the compose modal in place.
- **FR-003**: Clicking "Thể lệ" MUST collapse the menu and open the rules drawer.
- **FR-004**: Clicking the red "Hủy" circle MUST collapse the menu to the closed pill.
- **FR-005**: Clicking outside the menu OR pressing `Escape` MUST collapse the menu.
- **FR-006**: The expanded state MUST NOT dim the page.

### Technical Requirements

- **TR-001**: Open and closed states MUST be the same client component
  (`app/_components/widget-button.tsx`), selected by the local `open: boolean`.
- **TR-002**: The pill entrance MUST use the `saa-fab-in` keyframes defined in `app/globals.css`,
  with staggered `animationDelay` (Viết KUDOS 0ms, Thể lệ 60ms).
- **TR-003**: The outside-click catcher MUST be a transparent full-screen element at `z-30`, below
  the menu (`z-40`).
- **TR-004**: Colors MUST come from SAA `@theme` tokens (`--color-saa-gold-light`, `--color-saa-red`,
  `--color-saa-bg`) — no raw hex.

### Key Entities

- No data entities. The two actions launch the compose modal (`ihQ26W78P2`) and rules drawer
  (`b1Filzi9i6`), which own their own data.

---

## State Management

- **Local component state** (in `WidgetButton`):
  - `open: boolean` — `true` in this state.
  - `rulesOpen: boolean` — set `true` by the "Thể lệ" pill.
  - `composeOpen: boolean` — set `true` by the "Viết KUDOS" pill (and by the rules drawer's own
    "Viết KUDOS" CTA).
- **Effect**: an `Escape` keydown listener is registered only while `open` is `true`.
- **Global state**: none.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Each of the three controls (two pills + red circle) performs its action on a single tap.
- **SC-002**: Outside click and `Escape` reliably collapse the menu without dimming the page.

---

## Out of Scope

- The closed pill layout — see screen
  [`_hphd32jN2`](../_hphd32jN2-floating-action-button/spec.md).
- The rules drawer content (`b1Filzi9i6`) and the compose-modal form (`ihQ26W78P2`) — separate specs;
  this state only launches them.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shipped component exists (`app/_components/widget-button.tsx`)
- [x] `saa-fab-in` keyframes exist (`app/globals.css`)
- [x] Rules drawer component exists (`app/_components/rules-modal.tsx` → `RulesModal`)
- [x] Compose modal exists (`app/kudos/_components/write-kudos-modal.tsx` → `WriteKudosModal`)
- [x] Icon assets exist (`public/saa/widget-pen.svg`, `widget-rules-logo.svg`, `widget-close.svg`)

---

## Notes

- Both action pills and the rules drawer's own "Viết KUDOS" CTA converge on the same
  `setComposeOpen(true)` — the compose modal opens in place rather than navigating to `/kudos`.
- The red "Hủy" circle is literally the closed pill's trigger `<button>` with a swapped class set and
  the × icon — same element, different `open` branch.
</content>
