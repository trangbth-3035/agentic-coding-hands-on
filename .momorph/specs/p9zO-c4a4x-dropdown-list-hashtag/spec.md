# Feature Specification: Dropdown list hashtag (Compose Multi-select)

**Frame ID**: `p9zO-c4a4x`
**Figma Frame ID**: `1002:13013`
**Frame Name**: `Dropdown list hashtag`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown list hashtag** is the **multi-select** hashtag picker inside the "Viết Kudo" compose
form (screen `ihQ26W78P2`, `WriteKudosModal`). Unlike the board's single-select hashtag *filter*
(screen `JWpsISMAaM`), this control lets the author attach **up to five** hashtags to the kudos
being written. Selected rows show a gold check-in-circle badge and a stronger wash; once five are
chosen the picker no longer offers new selections.

It opens from the "+ Hashtag / Tối đa 5" add button on the Hashtag row of the compose form. Chosen
hashtags also render as removable chips next to that button. The list is dynamic (from the hashtag
directory); the demo build uses the `HASHTAGS` array.

**Target users**: Sun* employees composing a kudos who want to tag it with the values it celebrates.

**Business context**: Hashtags categorise each kudos by Sun* value; capping at five keeps tagging
meaningful and the card readable.

---

## User Scenarios & Testing

### User Story 1 - Attach up to five hashtags (Priority: P1)

**As a** kudos author,
**I want to** open the hashtag picker and select several hashtags,
**So that** my kudos is tagged with the values it celebrates.

**Why this priority**: Hashtags are a required field of the compose form.

**Independent Test**: In the compose modal, click "+ Hashtag" → the picker opens → click three rows
→ each shows a check badge and appears as a chip → the picker still allows more.

**Acceptance Scenarios**:

1. **Given** the compose form is open, **When** the user clicks the "+ Hashtag" add button, **Then**
   the picker panel opens listing all hashtags.
2. **Given** the picker is open, **When** the user clicks an unselected hashtag, **Then** it gains
   the gold check badge + gold/20 wash and is added as a chip in the Hashtag row.
3. **Given** a hashtag is selected, **When** the user clicks it again (in the picker or via the
   chip's × button), **Then** it is de-selected and its chip is removed.
4. **Given** the picker is open, **When** the user clicks outside it, **Then** the picker closes and
   the current selection is retained.

---

### User Story 2 - Enforce the five-item cap (Priority: P1)

**As** the compose form,
**I want** to stop the author selecting more than five hashtags,
**So that** the cap is respected.

**Why this priority**: A hard business rule ("tối đa 5").

**Acceptance Scenarios**:

1. **Given** four hashtags are selected, **When** the user selects a fifth, **Then** it is added and
   the count reaches the cap.
2. **Given** five hashtags are already selected, **When** the user attempts to add a sixth, **Then**
   the selection is unchanged (the toggle keeps the list at five).
3. **Given** five hashtags are selected, **When** the user views the Hashtag row, **Then** the
   "+ Hashtag" add button is no longer offered, so no further hashtags can be added until one is
   removed.
   > **Implementation note**: The Figma design disables the *unselected rows* inside the open panel
   > once five are chosen; the shipped code achieves the same cap by removing the add button (and
   > thus the panel) when `tags.length === 5`. Selected chips stay removable, so the count can drop
   > below five and the button returns.

---

### Edge Cases

- **Duplicate selection**: Toggling an already-selected hashtag removes it (no duplicates possible).
- **Remove from chip vs. panel**: Both the chip × and the panel row toggle the same state.
- **Reset on close**: Closing/submitting the compose modal resets the selected hashtags.
- **Empty list**: If the directory returns no hashtags, the panel renders empty (no rows).

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md).

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Selected row A | 1002:13185 | A selected hashtag row: dark background, label + check badge | Click → de-select |
| Selected row B | 1002:13207 | A selected hashtag row (as above) | Click → de-select |
| Selected row C | 1002:13216 | A selected hashtag row (as above) | Click → de-select |
| A.1/B.1/C.1 Hashtag label | children of the rows above | The tag text, `'#' + name` (dynamic, e.g. "#High-performing", "#BE PROFESSIONAL", "#BE OPTIMISTIC") | None |
| A.2/B.2/C.2 Check icon | children of the rows above | Gold check-in-circle (24×24), shown only when the row is selected | None (state indicator) |
| D_Hashtag chưa chọn | 1002:13104 | An unselected row: lighter background, no check icon (e.g. "#BE A TEAM", "#THINK OUTSIDE THE BOX", "#GET RISKY", "#GO FAST", "#WASSHOI") | Click → select (if under the cap) |
| Add button "+ Hashtag / Tối đa 5" | N/A in this frame (compose form) | The trigger that opens the picker; implemented as `AddButton` in `write-kudos-modal.tsx`; hidden at five selections | Click → toggle picker |

### Navigation Flow

- **From**: The Hashtag row's "+ Hashtag" add button in the "Viết Kudo" compose modal.
- **To**: No route change — an in-form overlay. Selections update the compose form's `tags` state.
- **Triggers**:
  - Click add button → open/close picker
  - Click a row → toggle that hashtag (subject to the five-item cap)
  - Click outside → close picker (selection retained)

---

## Requirements

### Functional Requirements

- **FR-001**: The picker MUST open from the "+ Hashtag" add button and close on a second click or an
  outside click.
- **FR-002**: The picker MUST list all available hashtags and mark selected rows with a check badge
  + stronger wash.
- **FR-003**: Clicking a row MUST toggle that hashtag in the compose form's selection.
- **FR-004**: The selection MUST never exceed five hashtags; attempts to add a sixth MUST be ignored.
- **FR-005**: Selected hashtags MUST also appear as removable chips; removing a chip MUST de-select
  it.
- **FR-006**: Closing or submitting the compose modal MUST reset the selection.

### Technical Requirements

- **TR-001**: The picker MUST reuse `SaaDropdownPanel` / `SaaDropdownItem`
  (`app/_components/saa-dropdown.tsx`), using the `checked` prop and `size="compact"`.
- **TR-002**: Selection state MUST live in the compose form (`WriteKudosModal`) as `tags: string[]`.
- **TR-003**: The hashtag list MUST come from data (`HASHTAGS` in `lib/saa/kudos.ts`), passed in as
  the `hashtags` prop.

### Key Entities

- **Hashtag**: A `string` tag (e.g. `"#High-performing"`).
- **tags**: `string[]` — the compose form's selected hashtags (`MAX_ITEMS = 5`).

---

## State Management

- **Local state** (`WriteKudosModal`): `tags: string[]`, `tagOpen: boolean` (picker open).
- **Toggle**: `toggleTag` adds when under the cap, removes when present:
  `cur.includes(tag) ? remove : cur.length < 5 ? [...cur, tag] : cur`.
- **Derived UI**: chips = `tags.map(...)`; checked state = `tags.includes(opt)`; add button shown
  only while `tags.length < 5`.
- **Reset**: `reset()` clears `tags` and `tagOpen` on close/submit.
- **Cache requirements**: None — form-local; the submitted kudos carries `hashtags: tags`.

---

## Success Criteria

- **SC-001**: A user can select and de-select hashtags with immediate visual feedback (badge +
  chip).
- **SC-002**: The selection never exceeds five.
- **SC-003**: Selected hashtags are carried onto the submitted kudos (`KudosPost.hashtags`).

---

## Out of Scope

- Board-level filtering — that is the single-select filter (screen `JWpsISMAaM`).
- Searching / creating new hashtags within the picker.
- Reordering selected hashtags.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared Dropdown-List shell with `checked` + `compact` support
  (`app/_components/saa-dropdown.tsx`)
- [x] "Viết Kudo" compose modal (`app/kudos/_components/write-kudos-modal.tsx`)
- [x] Hashtag data source (`HASHTAGS` in `lib/saa/kudos.ts`)

---

## Notes

- This control is visually and behaviourally distinct from the board hashtag filter: **multi-select
  + check badges + gold/20 wash**, versus the filter's **single-select + gold/10 active wash, no
  badge**. Both share the same shell.
- The cap is enforced in the shipped build by hiding the add button at five selections, which also
  hides the panel; the Figma design instead disables the unselected rows in the open panel. Both
  prevent a sixth selection.
