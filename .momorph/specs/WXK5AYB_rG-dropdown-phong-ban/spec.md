# Feature Specification: Dropdown Phòng ban (Department Filter)

**Frame ID**: `WXK5AYB_rG`
**Figma Frame ID**: `721:5684`
**Frame Name**: `Dropdown Phòng ban`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown Phòng ban** is the department (org-unit) filter on the SAA 2025 **Kudos** board. It
is the option panel that opens from the "Phòng ban" filter pill in the Highlight Kudos section
header. Selecting a department scopes the visible kudos to those addressed to recipients in that
department; re-selecting the active department clears the filter.

The panel is a single-select list rendered inside the shared **Dropdown-List** shell
(`SaaDropdownPanel`). The department list is dynamic — sourced from the organisation's department
directory (the seeded demo set is `CEVC2`, `CEVC3`, `CEVC4`, `CEVC1`, `OPD`, `Infra`, with the full
DB set including `CTO`, `SPD`, `FCOV`, `STVC-R&D`, `CEVC2-CySS`, `FCOV-LRM`, …).

**Target users**: All Sun* employees browsing the Kudos board who want to narrow it to a department.

**Business context**: The board can hold hundreds of kudos; department scoping lets a viewer focus
on their own or another team's recognition without scrolling the full feed.

---

## User Scenarios & Testing

### User Story 1 - Filter kudos by department (Priority: P1)

**As a** Kudos board viewer,
**I want to** open the "Phòng ban" filter and pick a department,
**So that** the board shows only kudos addressed to that department.

**Why this priority**: It is the sole purpose of this control.

**Independent Test**: On the Kudos board, click the "Phòng ban" pill → panel opens → click a
department → panel closes, the pill shows the chosen department, and the Highlight carousel
re-renders to only matching kudos.

**Acceptance Scenarios**:

1. **Given** the board is loaded, **When** the user clicks the "Phòng ban" pill, **Then** the
   Dropdown-List panel opens directly beneath it with one row per department.
2. **Given** the panel is open, **When** the user clicks a department row, **Then** the panel
   closes, the pill label becomes the selected department, and the pill switches to its active
   (gold-bordered) style.
3. **Given** a department is selected, **When** the Highlight section re-renders, **Then** only
   kudos whose recipient department equals the selection are shown.
4. **Given** a department is already selected, **When** the user reopens the panel and clicks the
   same department, **Then** the filter is cleared (value → none) and the pill returns to its
   default label "Phòng ban".
5. **Given** the panel is open, **When** the user clicks anywhere outside it, **Then** the panel
   closes with no change to the current selection.
6. **Given** the "Hashtag" filter panel is open, **When** the user clicks the "Phòng ban" pill,
   **Then** the Hashtag panel closes and the Department panel opens (only one panel open at a time).

---

### Edge Cases

- **No matching kudos**: When a department has no kudos in the current data set, the Highlight
  carousel is replaced by the empty-state message ("Không tìm thấy Kudos phù hợp với bộ lọc").
- **Long department list**: The panel scrolls vertically when the list exceeds the frame height
  (Figma panel = 101×348).
- **Combined filters**: Department and Hashtag filters combine with AND — selecting both narrows to
  kudos matching both.
- **i18n**: The pill label ("Phòng ban" / "Department") follows the `saa_lang` cookie; department
  values themselves are proper nouns and are not translated.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). Colors, sizes and typography come from
> that document and `app/globals.css`.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Dropdown-List | 563:8027 | Vertical dark rounded panel (101×348) holding the department options; rendered via the shared `SaaDropdownPanel` shell | Scrolls when the list overflows |
| A.1–A.3 List item (option row) | 563:8027 › rows | One 56px row per department ("CEVC3", "CEVC4", "CEVC1", "OPD", "Infra", …); text label only | Click → select department, close panel, apply filter |
| Selected item ("CEVC2") | 563:8027 › active row | The current value, shown raised on a lighter cell (gold/10 wash + gold text-glow) | Click → clears the filter (toggles back to none) |
| Trigger pill "Phòng ban" | N/A in this frame (board header) | The Highlight-section filter pill that opens/closes this panel; implemented in `kudos-filters.tsx` | Click → toggle panel |

### Navigation Flow

- **From**: The "Phòng ban" pill in the Highlight Kudos section header of the Kudos board
  (`/kudos`).
- **To**: No route change — this is an in-page overlay. Selecting a value updates client-side filter
  state on the board.
- **Triggers**:
  - Click pill → open/close panel
  - Click option → set/clear department filter, close panel
  - Click outside / open the sibling Hashtag panel → close panel

---

## Requirements

### Functional Requirements

- **FR-001**: The system MUST open the department panel when the "Phòng ban" pill is clicked and
  close it on a second click.
- **FR-002**: The system MUST render one selectable row per available department.
- **FR-003**: Selecting a department MUST close the panel and filter the board to kudos for that
  department.
- **FR-004**: Selecting the currently-active department MUST clear the filter.
- **FR-005**: The system MUST close the panel on an outside click without altering the selection.
- **FR-006**: At most one filter panel (Department or Hashtag) MUST be open at any time.

### Technical Requirements

- **TR-001**: The panel MUST reuse the shared `SaaDropdownPanel` / `SaaDropdownItem` shell
  (`app/_components/saa-dropdown.tsx`).
- **TR-002**: Filter state MUST be controlled by the parent (`HighlightSection`) so the same value
  drives both the pill label and the filtered list.
- **TR-003**: The department list MUST come from data (`DEPARTMENTS` in `lib/saa/kudos.ts`), never
  hard-coded in the component.

### Key Entities

- **Department**: A `string` org-unit code (e.g. `"CEVC2"`). No local persistence — selection lives
  in component state for the session.
- **FilterValue**: `{ hashtag: string | null; department: string | null }` — the combined
  Highlight-section filter state.

---

## State Management

- **Local state** (`KudosFilters`): `openKey: "hashtag" | "department" | null` — which panel is open.
- **Lifted state** (`HighlightSection`): `value: FilterValue` — the selected department/hashtag;
  passed down as `value` and mutated via `onChange`.
- **Derived**: `filtered = posts.filter(p => (!department || p.department === department) && …)`.
- **Cache requirements**: None — purely client-side, no persistence.

---

## Success Criteria

- **SC-001**: Selecting a department updates the visible kudos within one render (no reload).
- **SC-002**: The pill always reflects the active department (or the default label when cleared).
- **SC-003**: Only one filter panel is ever open at a time.

---

## Out of Scope

- Multi-select of departments (single-select only).
- Filtering the "All Kudos" list and Spotlight board — the shipped filter currently scopes the
  **Highlight** carousel only. *(Note: the Figma copy describes a page-wide filter; see Notes.)*
- Persisting the selected department across page loads.
- Server-side / URL-param filtering.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared Dropdown-List shell implemented (`app/_components/saa-dropdown.tsx`)
- [x] Kudos board + Highlight section implemented (`app/kudos/`)
- [x] Department data source (`DEPARTMENTS` in `lib/saa/kudos.ts`)

---

## Notes

- The Figma annotation states the filter applies "toàn trang" (page-wide). The shipped
  implementation scopes it to the Highlight Kudos carousel via `HighlightSection`; extending it to
  the All Kudos list is a future enhancement.
- The department directory is dynamic in production; the demo build seeds six departments in
  `DEPARTMENTS`.
