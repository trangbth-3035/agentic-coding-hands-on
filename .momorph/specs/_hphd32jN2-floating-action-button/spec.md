# Feature Specification: Floating Action Button (closed state)

**Frame ID**: `_hphd32jN2`
**Figma Frame ID**: `313:9137`
**Frame Name**: `Floating Action Button`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The Floating Action Button (FAB) is a small persistent control pinned to the bottom-right corner of
the SAA 2025 homepage. In its **closed state** it renders as a single gold "viên vàng" pill showing
two icons separated by a "/" — a pen (Viết KUDOS) and the Sun*/rules mark (Thể lệ). Tapping it
expands the FAB into its **open state** (screen [`Sv7DFwBw1h`](../Sv7DFwBw1h-floating-action-button-2/spec.md)),
revealing the "Thể lệ" and "Viết KUDOS" action pills plus a red "Hủy" (×) button.

This is one of two states of a single shipped component, `app/_components/widget-button.tsx`. The
closed pill is the resting entry point; the open menu is the same component with local `open` state
set to `true`.

**Target users**: Authenticated Sun* employees browsing the SAA 2025 homepage.

**Business context**: The FAB gives users a one-tap shortcut to the two primary kudos actions
(read the rules, write a kudo) from anywhere on the long homepage without scrolling back to a nav
bar.

---

## User Scenarios & Testing

### User Story 1 - Expand the FAB menu (Priority: P1)

**As an** authenticated homepage visitor,
**I want to** tap the floating gold pill,
**So that** I can reveal the "Thể lệ" and "Viết KUDOS" shortcuts.

**Why this priority**: The closed FAB is the only entry point to the expanded action menu — without
it the shortcut menu is unreachable.

**Independent Test**: Load the homepage → locate the gold pill at bottom-right → click it → verify
the two action pills and the red "Hủy" button appear (open state).

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user inspects the bottom-right corner, **Then** a
   gold pill showing pen icon, "/", and the rules icon is visible and pinned in place while the page
   scrolls.
2. **Given** the closed FAB is visible, **When** the user clicks it, **Then** the FAB switches to its
   open state (`aria-expanded` becomes `true`) and the two action pills animate in above a red
   "Hủy" (×) circle.
3. **Given** the closed FAB is visible, **When** the user hovers over it, **Then** the pill
   background lightens (`bg-saa-gold` → `bg-saa-gold-light`) and the cursor is a pointer.

---

### Edge Cases

- **Rapid repeated taps**: Each tap toggles `open`; a second tap immediately after opening collapses
  the menu back to the closed pill (no intermediate broken state).
- **Small viewports**: The FAB stays pinned at `bottom-6 right-6` and must never introduce horizontal
  page overflow.
- **Overlap with footer / page content**: The FAB sits at `z-40`, above page content, so it remains
  tappable over the footer and all homepage sections.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors, and typography
> come from that document.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Widget Button | 313:9138 | Closed gold pill ("viên vàng gộp") — the FAB trigger. Two icons + "/" on a gold rounded-full background; light drop shadow, lift/lighten on hover | Click → toggle to open state (reveals "Thể lệ"/"Viết KUDOS" pills + red "Hủy") |
| A.1_icon viết kudos | I313:9138;214:3839;186:1935 | Pen icon (24×24), left of the "/" — signals the "Viết KUDOS" action | None (part of trigger) |
| A.2_icon thể lệ saa | I313:9138;214:3839;186:1766 | Sun*/rules mark (24×24), right of the "/" — signals the "Thể lệ" action | None (part of trigger) |

### Navigation Flow

- **From**:
  - Rendered on the SAA 2025 homepage (`app/page.tsx`), pinned bottom-right, always present.
- **To**:
  - Open state — same component, `open = true` (screen `Sv7DFwBw1h`); no route change.
- **Triggers**:
  - Click the pill → `setOpen(true)` → open menu appears in place (no navigation).

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST render the closed FAB pinned to the bottom-right corner of the homepage,
  fixed in the viewport during scroll.
- **FR-002**: The closed FAB MUST display a pen icon, a "/" separator, and the rules icon on a gold
  pill.
- **FR-003**: Clicking the closed FAB MUST expand it to the open state in place (no navigation).
- **FR-004**: The pill MUST provide a visible hover affordance (lighten + pointer cursor).
- **FR-005**: The trigger MUST expose its expanded/collapsed status to assistive technology via
  `aria-expanded`.

### Technical Requirements

- **TR-001**: The closed and open states MUST be the same client component
  (`app/_components/widget-button.tsx`, `"use client"`), toggled by a local `open: boolean` state.
- **TR-002**: Icons MUST be served from `public/saa/` as static SVGs via `next/image`.
- **TR-003**: Colors MUST be consumed from the SAA `@theme` tokens in `app/globals.css`
  (`--color-saa-gold`, `--color-saa-gold-light`, `--color-saa-bg`) — no raw hex in the component.

### Key Entities

- No data entities. State is purely local UI (`open`), no server data on this screen.

---

## State Management

- **Local component state** (in `WidgetButton`):
  - `open: boolean` — `false` in the closed state; toggled by clicking the trigger.
- **Global state**: none.
- **Cache requirements**: none.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: The closed FAB is visible and tappable from any scroll position on the homepage.
- **SC-002**: A single tap reliably transitions the closed pill to the open menu.

---

## Out of Scope

- The open-state layout, its action pills, and the red "Hủy" button — see screen
  [`Sv7DFwBw1h`](../Sv7DFwBw1h-floating-action-button-2/spec.md).
- The "Thể lệ" rules drawer (`b1Filzi9i6`) and the "Viết KUDOS" compose modal (`ihQ26W78P2`) — those
  are opened from the open state, not the closed pill.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shipped component exists (`app/_components/widget-button.tsx`)
- [x] Homepage host exists (`app/page.tsx`) and mounts `<WidgetButton />`
- [x] i18n labels exist (`dict.widget.writeKudos`, `dict.widget.rules` in `lib/i18n/dictionaries.ts`)
- [x] Icon assets exist (`public/saa/widget-pen.svg`, `public/saa/widget-rules-logo.svg`)

---

## Notes

- The closed and open states are two Figma frames but a **single** React component. Keep the two
  spec sets cross-referenced.
- `aria-label` on the trigger is currently the "Viết KUDOS" label (`labels.writeKudos`); the pill
  represents both actions, so a more neutral label (e.g. "Mở menu Kudos") could be considered — not
  a blocker.
</content>
</invoke>
