# Feature Specification: Open Secret Box — Chưa Mở

**Frame ID**: `J3-4YFIpMM`
**Figma Frame ID**: `1466:7676`
**Frame Name**: `Open secret box - chưa mở`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The Secret Box modal is the reward-reveal surface of the **Sun Annual Awards 2025 (SAA 2025)** Kudos
programme. This frame is the **"chưa mở"** (unopened) state: a centered dialog over a dimmed page
showing the title, a "click the box to open" hint, the gilded gift-box image, and a footer count of
how many Secret Boxes the Sunner still has to open.

Sunners earn Secret Boxes by receiving hearts on the Kudos they send (one box per five ❤️). Opening
a box reveals one of six exclusive SAA icons at weighted odds; collecting all six wins a mystery
reward. This spec covers the **unopened** entry state and the click that initiates a reveal — the
opened ("đã mở") result state is a separate frame, wired later.

**Target users**: All Sun* employees who have unopened Secret Boxes.

**Business context**: The modal is opened from the Kudos live-board stats sidebar via the "Mở Secret
Box" button (`Dropdown` stats card, shared with the Profile page). It turns accumulated hearts into a
tangible, collectible reward moment.

---

## User Scenarios & Testing

### User Story 1 - Open the Secret Box modal (Priority: P1)

**As a** Sunner with unopened Secret Boxes,
**I want to** open the Secret Box modal from the stats sidebar,
**So that** I can see how many boxes I have and start opening them.

**Why this priority**: This is the entry point to the entire reward-reveal flow.

**Independent Test**: On the Kudos board, click the "Mở Secret Box" button in the stats sidebar →
verify the centered modal appears with the title, hint, gift-box image, and the unopened count.

**Acceptance Scenarios**:

1. **Given** the Kudos board is displayed, **When** the user clicks "Mở Secret Box", **Then** the
   Secret Box modal appears centered over a dimmed, blurred backdrop with a zoom-in animation.
2. **Given** the modal is open, **When** the user reads the header, **Then** the title and a close
   (✕) button are shown, separated from the body by a divider.
3. **Given** the modal is open, **When** the user reads the footer, **Then** the "Secretbox chưa mở"
   label and the remaining count (zero-padded to two digits, e.g. `04`, `25`) are shown in gold.
4. **Given** the modal is open, **When** its content exceeds the viewport (`max-h-[92vh]`), **Then**
   the modal body scrolls internally with hidden scrollbar chrome.

---

### User Story 2 - Close the modal (Priority: P1)

**As a** user,
**I want to** dismiss the Secret Box modal,
**So that** I can return to the Kudos board.

**Why this priority**: An undismissable modal traps the user.

**Independent Test**: Open the modal → click the ✕, the backdrop, or press `Escape` → verify the
modal unmounts and page scroll is restored.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the ✕ button, **Then** the modal closes.
2. **Given** the modal is open, **When** the user clicks the dimmed backdrop, **Then** the modal
   closes.
3. **Given** the modal is open, **When** the user presses `Escape`, **Then** the modal closes.
4. **Given** the modal locked page scroll on open, **When** it closes, **Then** the previous
   `document.body` overflow is restored.

---

### User Story 3 - Click the box to reveal an icon (Priority: P2)

**As a** Sunner,
**I want to** click the gift box to open it,
**So that** I can reveal one of the six collectible SAA icons.

**Why this priority**: The reveal is the payoff of the feature; in the current build the unopened
modal fires the open intent (`onOpenBox`) but the reveal ("đã mở") result state is a separate,
not-yet-wired frame.

**Independent Test**: Open the modal → click the gift-box image → verify the `onOpenBox` callback
fires (currently a no-op from the stats sidebar until the reveal frame is wired).

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the gift-box image, **Then** the
   `onOpenBox` callback fires (box has hover-brighten + active-press affordances).
2. **Given** a box is opened, **When** the reveal resolves, **Then** one of six icons is granted at
   the weighted odds below, the unopened count decrements by one, and the icon is added to the
   Sunner's collection.
   > **Reveal / count-decrement behavior is pending** — the "đã mở" result frame and the odds engine
   > are out of scope for this unopened-state frame.

**Reveal odds** (per box, business rule from Figma):

| Icon | Probability |
|------|-------------|
| Stay Gold | 30% |
| Flow to Horizon | 25% |
| Touch of Light | 20% |
| Beyond the Boundary | 10% |
| Revival | 10% |
| Root Further | 5% |

---

### Edge Cases

- **Zero unopened boxes**: Per Figma, when the count is 0 the "click the box" hint should be hidden
  and the box click disabled. The shipped unopened modal always renders the hint and a clickable box
  (the count-guard is deferred with the reveal engine); the button that opens the modal is itself
  gated by the sidebar.
- **Count display**: The count is zero-padded to two digits (`String(count).padStart(2, '0')`) so a
  single-digit count reads `04`, not `4`.
- **Long / localized titles**: The header title centers and wraps; the ✕ stays pinned to the right
  via absolute positioning independent of the title length.
- **Short viewports**: The modal caps at `max-h-[92vh]` and scrolls internally so the footer count
  stays reachable.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors, and typography
> come from that document.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Title | 1466:7678 | Modal header — centered gold title + close (✕) button | Click ✕ → close modal |
| B_Group 396 | 1466:7681 | Instruction line "Click vào box để mở" (hidden when unopened count = 0) | None (display only) |
| C_Box image | 1466:7684 | Clickable gilded gift-box card; opening reveals one random icon at the weighted odds; disabled when unopened count = 0 | Click → `onOpenBox` (reveal) |
| D_Số box chưa mở | 1466:7689 | Footer — "Secretbox chưa mở" label + bold gold count | None (display only) |

> **Copy note**: The shipped modal renders `dict.kudosBoard.secretBox` — title
> **"KHÁM PHÁ SECRET BOX CỦA BẠN"**, hint **"Click vào box để mở"**, label **"Secretbox chưa mở"**.
> The Figma `A_Title` node label reads "MỞ SECRET BOX THÀNH CÔNG" and the Figma hint reads "Click
> vào box để tiếp tục mở"; the implementation uses the localized dictionary strings above (kept in
> VN + EN), which supersede the raw node labels.

### Navigation Flow

- **From**:
  - Kudos live-board stats sidebar — the "Mở Secret Box" button (`OpenSecretBox` island inside
    `StatsCard`, screen `MaZUn5xHXZ`). The same stats card is reused on the Profile page (`3FoIx6ALVb`).
- **To**:
  - The opened ("đã mở") reveal result frame — **pending / not yet wired**; clicking the box fires
    `onOpenBox` which is currently unset from the sidebar.
  - Returns to the Kudos board on close (✕ / backdrop / `Escape`).
- **Triggers**:
  - "Mở Secret Box" button → `setOpen(true)` in `open-secret-box.tsx`.
  - ✕ / backdrop / `Escape` → `onClose()`.
  - Gift-box click → `onOpenBox()`.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST render the Secret Box modal only when opened, centered over a dimmed,
  blurred backdrop with a zoom-in entrance.
- **FR-002**: System MUST display the title, the "click the box" hint, the gift-box image, and the
  remaining unopened count (zero-padded to two digits).
- **FR-003**: Users MUST be able to close the modal via the ✕ button, a backdrop click, or `Escape`.
- **FR-004**: The gift-box image MUST be clickable and fire the `onOpenBox` callback, with hover and
  active-press visual affordances.
- **FR-005**: While the modal is open, background page scroll MUST be locked and restored on close.
- **FR-006** *(pending)*: When the unopened count is 0, the hint MUST be hidden and the box click
  disabled; opening a box MUST reveal one icon at the weighted odds and decrement the count. Tracked
  with the "đã mở" reveal frame.

### Technical Requirements

- **TR-001**: The modal MUST be a Client Component (`'use client'`) rendered via `createPortal` into
  `document.body`.
- **TR-002**: The trigger button MUST be a small client island (`OpenSecretBox`) so the surrounding
  `StatsCard` / `StatsSidebar` can remain server-rendered.
- **TR-003**: All display copy MUST come from `dict.kudosBoard.secretBox` (VN/EN via `saa_lang`),
  never hard-coded.
- **TR-004**: Colors, radius, and the `saa-zoom-in` / `saa-fade-in` animations MUST use SAA theme
  tokens and keyframes from `app/globals.css`.

### Key Entities

- **SecretBoxCopy** (`Dictionary["kudosBoard"]["secretBox"]`): `title`, `hint`, `unopenedLabel`.
- **count** (number): remaining unopened boxes; from `KUDOS_STATS.boxUnopened` in `lib/saa/kudos.ts`
  (sample data) — displayed zero-padded.
- Box art is a single baked composite image (`public/saa/secretbox-closed.jpg`): the box, podium,
  and sparkle are pre-rendered into one asset.

---

## State Management

- **Owned by the trigger island** (`OpenSecretBox`, `app/kudos/_components/open-secret-box.tsx`):
  - `open: boolean` — whether the modal is mounted.
- **Local to the modal** (`SecretBoxModal`):
  - No local state. An effect (guarded by `open`) binds the `Escape` handler and locks
    `document.body` scroll, restoring both on cleanup.
- **Global state**: Language preference (`saa_lang` cookie) selects the dictionary passed as `t`.
- The unopened `count` is passed in as a prop (`unopenedCount` → `KUDOS_STATS.boxUnopened`).

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: From the Kudos board, a user can open the Secret Box modal in one click and read the
  title, hint, box art, and remaining count with no horizontal overflow at any breakpoint ≥ 320px.
- **SC-002**: The modal can be dismissed by ✕, backdrop, or `Escape`, and background scroll is
  restored every time.
- **SC-003**: The count always displays as two digits (e.g. `04`).

---

## Out of Scope

- The opened ("đã mở") reveal result frame — separate frame; the reveal odds engine and count
  decrement live there.
- Persisting opened boxes / collected icons to Supabase — the modal uses sample `KUDOS_STATS`.
- The stats sidebar card layout itself — specified with the Kudos board (`MaZUn5xHXZ`) / Profile
  (`3FoIx6ALVb`).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] i18n dictionaries provide `dict.kudosBoard.secretBox` in VN + EN (`lib/i18n/dictionaries.ts`)
- [x] `KUDOS_STATS.boxUnopened` sample count available (`lib/saa/kudos.ts`)
- [x] Box art asset present (`public/saa/secretbox-closed.jpg`); gift + close icons under `public/saa/`
- [x] Host stats card wires `label`, `t`, and `unopenedCount` (`app/kudos/_components/stats-card.tsx`)
- [ ] Opened ("đã mở") reveal frame + odds engine — needed to complete FR-006 and US3

---

## Notes

- The box artwork is a **single baked JPG** (`secretbox-closed.jpg`), not composited from layers at
  runtime — so it renders as one `<img aspect-square object-cover>`.
- The modal background uses `--color-saa-bg` (`#00101a`), matching the page, with a `rounded-xl`
  card edge and a stronger `bg-black/70` backdrop than the rules drawer's `bg-black/60`.
- In the current wiring, `StatsCard` mounts `<OpenSecretBox>` without an `onOpenBox` handler, so a
  box click is a no-op until the reveal frame is built — this is intentional and honest to the
  shipped state.
