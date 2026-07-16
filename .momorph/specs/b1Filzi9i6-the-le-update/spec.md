# Feature Specification: Thể lệ UPDATE

**Frame ID**: `b1Filzi9i6`
**Figma Frame ID**: `3204:6051`
**Frame Name**: `Thể lệ UPDATE`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The "Thể lệ" (Rules) panel is a right-side drawer that explains how the **Sun Annual Awards 2025
(SAA 2025)** Kudos programme works. It is the "UPDATE" revision of the original rules panel and is
the single source of truth Sunners consult before writing a Kudo.

The drawer slides in from the right over a dimmed page and presents three rule blocks:

1. **Người nhận Kudos** — the four Hero-rank badges receivers earn by the number of Kudos sent to
   them (1–4 / 5–9 / 10–20 / 20+).
2. **Người gửi Kudos** — the six collectible Secret-Box icons a sender can unlock (one per Secret
   Box opened), and the mystery reward for collecting all six.
3. **Kudos Quốc Dân** — the five most-hearted Kudos across Sun* win the "Root Further" grand prize.

A footer action row pinned to the bottom offers two buttons: **"Đóng"** (close the drawer) and
**"Viết KUDOS"** (open the compose modal in place of the drawer).

**Target users**: All Sun* employees participating in SAA 2025.

**Business context**: The rules panel is opened from the homepage floating action button ("Thể lệ"
pill, screen `Sv7DFwBw1h`) so the programme rules are always one tap away while a Sunner decides
whom to recognise and why.

---

## User Scenarios & Testing

### User Story 1 - Read the Kudos programme rules (Priority: P1)

**As a** Sun* employee,
**I want to** open the "Thể lệ" drawer and read the receiver badges, collectible icons, and
national-Kudos rules,
**So that** I understand how recognition and rewards work before I participate.

**Why this priority**: The drawer is the only in-app explanation of the SAA 2025 rules; without it
Sunners cannot understand the badge/reward mechanics.

**Independent Test**: From the homepage, open the FAB and click the "Thể lệ" pill → verify the
drawer slides in from the right, shows the title "Thể lệ", the three rule blocks, and both footer
buttons.

**Acceptance Scenarios**:

1. **Given** the homepage is displayed, **When** the user opens the FAB and clicks "Thể lệ", **Then**
   the rules drawer slides in from the right edge over a dimmed, blurred backdrop.
2. **Given** the drawer is open, **When** the user reads the "Người nhận Kudos" block, **Then** the
   four Hero-rank tiers are shown, each with its badge image and the sender-count threshold.
3. **Given** the drawer is open, **When** the user reads the "Người gửi Kudos" block, **Then** the
   six collectible Secret-Box icons are shown in two rows of three, with the mystery-reward footnote.
4. **Given** the drawer content is taller than the viewport, **When** the user scrolls, **Then** the
   body scrolls independently while the drawer stays fixed to the right edge (scrollbar chrome hidden).

---

### User Story 2 - Close the drawer (Priority: P1)

**As a** user,
**I want to** dismiss the rules drawer,
**So that** I can return to the page underneath.

**Why this priority**: An overlay that cannot be dismissed traps the user.

**Independent Test**: Open the drawer → click "Đóng" (or the backdrop, or press `Escape`) → verify
the drawer unmounts and the page scroll is restored.

**Acceptance Scenarios**:

1. **Given** the drawer is open, **When** the user clicks the "Đóng" button, **Then** the drawer
   closes and the page beneath becomes interactive again.
2. **Given** the drawer is open, **When** the user clicks the dimmed backdrop outside the panel,
   **Then** the drawer closes.
3. **Given** the drawer is open, **When** the user presses `Escape`, **Then** the drawer closes.
4. **Given** the drawer is open (body scroll locked), **When** it closes, **Then** the previous
   `document.body` overflow is restored.

---

### User Story 3 - Jump straight to writing a Kudo (Priority: P2)

**As a** user who has just read the rules,
**I want to** click "Viết KUDOS" from the drawer,
**So that** I can act on my understanding without hunting for the compose entry point.

**Why this priority**: Converts rule-reading intent into the core Kudos action, but the compose flow
is independently reachable, so it is not a hard blocker.

**Independent Test**: Open the drawer → click "Viết KUDOS" → verify the drawer closes and the "Viết
KUDOS" compose modal opens.

**Acceptance Scenarios**:

1. **Given** the drawer is open, **When** the user clicks "Viết KUDOS", **Then** the drawer closes
   and the compose modal (`ihQ26W78P2`) opens in its place.
2. **Given** the compose modal was opened from the drawer, **When** the user closes it, **Then**
   focus returns to the page (the drawer does not reopen automatically).

---

### Edge Cases

- **Very long localized copy (EN)**: The English rule text is longer than Vietnamese; the drawer
  body must scroll rather than clip, and the footer action row must stay pinned at the bottom.
- **Small / short viewports**: On short screens the entire drawer content is reachable via internal
  vertical scroll; the footer buttons remain visible at the bottom of the panel.
- **Narrow screens (< 553px)**: The drawer takes the full viewport width (`w-full max-w-[553px]`) so
  content never overflows horizontally; horizontal padding relaxes from `px-6` to `sm:px-10`.
- **Rapid open/close**: Because the drawer is conditionally rendered (`if (!open) return null`), a
  fast close-then-open re-runs the entrance animation cleanly with no stale scroll lock.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors, and typography
> come from that document.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Nội dung thể lệ | 3204:6053 | Scrollable info block holding the panel title ("Thể lệ"), the "Người nhận" receiver-badge rules (4 Hero tiers), the "Người gửi" 6 collectible-icon rules, and the "Kudos Quốc Dân" block | Scroll (vertical) |
| B_Button | 3204:6092 | Footer action row pinned to the bottom of the panel, holding the two buttons | None (container) |
| B.1_Button đóng | 3204:6093 | Secondary / outlined button — X icon + "Đóng" | Click → close drawer |
| B.2_Button viết kudos | 3204:6094 | Primary gold button — pen icon + "Viết KUDOS" | Click → close drawer + open compose modal |

> **Note**: Figma exposes the rule body as a single node (`3204:6053`). Its sub-sections (the four
> Hero-rank tier rows and the six collectible icons) are rendered from repo data — `RULE_HERO_BADGES`
> and `RULE_ICONS` in `lib/saa/kudos.ts` — not as separate Figma nodes. The badge/icon PNGs bake in
> their own styled labels (brand names, identical in both locales).

### Navigation Flow

- **From**:
  - Homepage floating action button — the "Thể lệ" pill (open-state FAB, screen `Sv7DFwBw1h`)
    triggers this drawer.
- **To**:
  - "Viết KUDOS" compose modal (screen `ihQ26W78P2`) — clicking the primary footer button closes
    the drawer and opens the compose modal in its place.
  - Returns to the underlying page on close (Đóng / backdrop / `Escape`).
- **Triggers**:
  - FAB "Thể lệ" pill → `setRulesOpen(true)` in `widget-button.tsx`.
  - "Đóng" / backdrop / `Escape` → `onClose()`.
  - "Viết KUDOS" → `onWriteKudos()` → drawer closes, compose modal opens.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST render the rules drawer only when opened (mounted on demand), sliding in
  from the right over a dimmed, blurred backdrop.
- **FR-002**: System MUST display the three rule blocks — receiver Hero-rank badges (4 tiers),
  sender collectible icons (6), and Kudos Quốc Dân — with localized copy.
- **FR-003**: The drawer body MUST scroll independently when its content exceeds the viewport, while
  the footer action row stays pinned to the bottom.
- **FR-004**: Users MUST be able to close the drawer via the "Đóng" button, a backdrop click, or the
  `Escape` key.
- **FR-005**: Clicking "Viết KUDOS" MUST close the drawer and open the compose modal in its place.
- **FR-006**: While the drawer is open, background page scroll MUST be locked and restored on close.

### Technical Requirements

- **TR-001**: The drawer MUST be a Client Component (`'use client'`) rendered through a React portal
  into `document.body` so it escapes the page's stacking/overflow context.
- **TR-002**: All display copy MUST come from the i18n dictionary (`dict.rules` / `dict.widget`),
  never hard-coded, so VN/EN both render from the `saa_lang` cookie.
- **TR-003**: Badge and icon image sources MUST come from the structural data module
  (`lib/saa/kudos.ts`), consistent with the rest of the Kudos feature.
- **TR-004**: Colors, radii, and animations MUST use the SAA theme tokens (`--color-saa-*`) and the
  `saa-drawer-in` / `saa-fade-in` keyframes defined in `app/globals.css`.

### Key Entities

- **RulesCopy** (`Dictionary["rules"]`): `title`, `close`, `writeKudos`, `receiverHeading`,
  `receiverIntro`, `tiers[]` (`{ count, desc }`), `senderHeading`, `senderIntro`, `senderFootnote`,
  `nationalHeading`, `nationalBody`.
- **RULE_HERO_BADGES** (string[]): four Hero-rank badge image paths (New / Rising / Super / Legend),
  index-aligned with `tiers`.
- **RULE_ICONS** (string[]): six collectible Secret-Box icon image paths.
- No user input, form data, or persisted state — the drawer is read-only content plus two actions.

---

## State Management

- **Owned by the caller** (`WidgetButton`, `app/_components/widget-button.tsx`):
  - `rulesOpen: boolean` — whether the drawer is mounted (`open` prop).
  - `composeOpen: boolean` — set true when "Viết KUDOS" fires `onWriteKudos`.
- **Local to the drawer** (`RulesModal`):
  - No local state. An effect binds the `Escape` handler and locks `document.body` scroll while
    `open` is true, cleaning both up on unmount.
- **Global state**: Language preference (`saa_lang` cookie) selects which dictionary is passed in as
  the `t` prop by the server.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: From the homepage, a user can open the FAB, tap "Thể lệ", and read the full rules with
  no horizontal overflow at any breakpoint ≥ 320px.
- **SC-002**: The drawer can always be dismissed by at least three independent means (button,
  backdrop, `Escape`), and background scroll is restored every time.
- **SC-003**: "Viết KUDOS" opens the compose modal in one tap without a full page navigation.

---

## Out of Scope

- The compose modal itself — specified separately (`ihQ26W78P2`).
- The FAB open/closed states and its pills — specified separately (`_hphd32jN2` / `Sv7DFwBw1h`).
- Editing rule copy through a CMS — rule text is static dictionary content.
- Focus-trap cycling within the drawer — `Escape` + backdrop close are provided; a full focus trap
  is a future accessibility enhancement.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] i18n dictionaries provide `dict.rules` and `dict.widget` in VN + EN (`lib/i18n/dictionaries.ts`)
- [x] Badge / icon assets present under `public/saa/` and referenced from `lib/saa/kudos.ts`
- [x] Host FAB (`widget-button.tsx`) wires `open`, `onClose`, `t`, and `onWriteKudos`

---

## Notes

- The drawer panel background is `#00070C` (near-black), slightly darker than the page background
  `--color-saa-bg` (`#00101a`) so the panel reads as a distinct surface over the dimmed page.
- The "Đóng" and "Viết KUDOS" labels are shared with the FAB pills — both come from the dictionary
  (`dict.rules.close` / `dict.rules.writeKudos`), keeping wording consistent across entry points.
- Both footer icons (`/saa/widget-close.svg`, `/saa/widget-pen.svg`) are decorative (`alt=""`); the
  buttons' text labels carry their meaning.
