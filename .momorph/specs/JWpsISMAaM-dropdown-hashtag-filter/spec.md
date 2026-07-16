# Feature Specification: Dropdown Hashtag filter

**Frame ID**: `JWpsISMAaM`
**Figma Frame ID**: `721:5580`
**Frame Name**: `Dropdown Hashtag filter`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown Hashtag filter** is the single-select hashtag filter on the SAA 2025 **Kudos** board.
It opens from the "Hashtag" filter pill in the Highlight Kudos section header. Choosing a hashtag
scopes the visible kudos to those tagged with it; re-selecting the active hashtag clears the filter.

It is the sibling of the department filter (screen `WXK5AYB_rG`) — both pills live in the same
`KudosFilters` control and share the Dropdown-List shell (`SaaDropdownPanel`), but only one panel is
open at a time. The hashtag list is dynamic; SAA hashtags map to the award value tags (e.g.
"Toàn diện", "Giỏi chuyên môn", "Hiệu suất cao", "Truyền cảm hứng", "Cống hiến", "Aim High",
"Be Agile", "Wasshoi", "Hướng mục tiêu", "Hướng khách hàng", "Chuẩn quy trình", "Giải pháp sáng tạo",
"Quản lý xuất sắc"). The seeded demo set uses the English value hashtags in `HASHTAGS`.

**Target users**: Kudos board viewers filtering recognition by a shared value/hashtag.

**Business context**: Hashtags group kudos by the Sun* value they celebrate; the filter lets viewers
browse a single value's highlights.

---

## User Scenarios & Testing

### User Story 1 - Filter kudos by hashtag (Priority: P1)

**As a** Kudos board viewer,
**I want to** open the "Hashtag" filter and pick a hashtag,
**So that** the board shows only kudos tagged with it.

**Why this priority**: It is the sole purpose of this control.

**Independent Test**: On the Kudos board, click the "Hashtag" pill → panel opens → click a hashtag →
panel closes, the pill shows the chosen hashtag, and the Highlight carousel re-renders to matching
kudos only.

**Acceptance Scenarios**:

1. **Given** the board is loaded, **When** the user clicks the "Hashtag" pill, **Then** the
   Dropdown-List panel opens beneath it with one row per hashtag.
2. **Given** the panel is open, **When** the user clicks a hashtag row, **Then** the panel closes,
   the pill label becomes the selected hashtag, and the pill switches to its active style.
3. **Given** a hashtag is selected, **When** the Highlight section re-renders, **Then** only kudos
   whose `hashtags` include the selection are shown.
4. **Given** a hashtag is already selected, **When** the user reopens the panel and clicks the same
   hashtag, **Then** the filter clears and the pill returns to the default label "Hashtag".
5. **Given** the panel is open, **When** the user clicks outside it, **Then** it closes with no
   change to the selection.
6. **Given** the "Phòng ban" panel is open, **When** the user clicks the "Hashtag" pill, **Then**
   the Department panel closes and the Hashtag panel opens (single-open invariant).

---

### Edge Cases

- **No matching kudos**: When no kudos carry the chosen hashtag, the Highlight carousel is replaced
  by the empty-state message ("Không tìm thấy Kudos phù hợp với bộ lọc").
- **Long hashtag list**: The panel scrolls vertically when the list overflows the frame height.
- **Combined filters**: Hashtag and Department combine with AND.
- **i18n**: The pill label ("Hashtag" is the same in both locales) follows `saa_lang`; hashtag
  values are tags and are not translated.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md).

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Dropdown-List | 563:8026 | Dark rounded panel holding the hashtag options; rendered via the shared `SaaDropdownPanel` shell; scrolls when long | Scroll on overflow |
| A.1 Tag ("#Dedicated") | 563:8026 › active row | The current value, a text-only tag (Figma 131×56) shown raised with the gold/10 wash + gold text-glow | Click → clears the filter (toggles to none) |
| A.2–A.3 List item (option row) | 563:8026 › rows | One 56px row per hashtag ("#Inspiring", …); text label only | Click → select hashtag, close panel, apply filter |
| Trigger pill "Hashtag" | N/A in this frame (board header) | The Highlight-section filter pill that opens/closes this panel; implemented in `kudos-filters.tsx` | Click → toggle panel |

### Navigation Flow

- **From**: The "Hashtag" pill in the Highlight Kudos section header (`/kudos`).
- **To**: No route change — in-page overlay; selecting a value updates client-side filter state.
- **Triggers**:
  - Click pill → open/close panel
  - Click option → set/clear hashtag filter, close panel
  - Click outside / open the sibling Department panel → close panel

---

## Requirements

### Functional Requirements

- **FR-001**: The system MUST open the hashtag panel on pill click and close it on a second click.
- **FR-002**: The system MUST render one selectable row per available hashtag.
- **FR-003**: Selecting a hashtag MUST close the panel and filter the board to kudos carrying it.
- **FR-004**: Selecting the currently-active hashtag MUST clear the filter.
- **FR-005**: The system MUST close the panel on an outside click without altering the selection.
- **FR-006**: At most one filter panel (Department or Hashtag) MUST be open at a time.

### Technical Requirements

- **TR-001**: The panel MUST reuse `SaaDropdownPanel` / `SaaDropdownItem`
  (`app/_components/saa-dropdown.tsx`).
- **TR-002**: Filter state MUST be controlled by `HighlightSection` so the same value drives the
  pill label and the filtered list.
- **TR-003**: The hashtag list MUST come from data (`HASHTAGS` in `lib/saa/kudos.ts`).

### Key Entities

- **Hashtag**: A `string` tag (e.g. `"#High-performing"`). Matched against `KudosPost.hashtags`.
- **FilterValue**: `{ hashtag: string | null; department: string | null }` — combined filter state.

---

## State Management

- **Local state** (`KudosFilters`): `openKey: "hashtag" | "department" | null`.
- **Lifted state** (`HighlightSection`): `value: FilterValue`; mutated via `onChange`.
- **Derived**: `filtered = posts.filter(p => (!hashtag || p.hashtags.includes(hashtag)) && …)`.
- **Cache requirements**: None — client-side only, no persistence.

---

## Success Criteria

- **SC-001**: Selecting a hashtag updates the visible kudos within one render (no reload).
- **SC-002**: The pill always reflects the active hashtag (or the default label when cleared).
- **SC-003**: Only one filter panel is open at a time.

---

## Out of Scope

- Multi-select of hashtags on the board (single-select here; multi-select is the compose picker,
  screen `p9zO-c4a4x`).
- Filtering the "All Kudos" list and Spotlight board — the shipped filter scopes the **Highlight**
  carousel only *(Figma copy says page-wide; see Notes).*
- Persisting the selection across page loads.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared Dropdown-List shell (`app/_components/saa-dropdown.tsx`)
- [x] Kudos board + Highlight section (`app/kudos/`)
- [x] Hashtag data source (`HASHTAGS` in `lib/saa/kudos.ts`)

---

## Notes

- The Figma annotation states the filter applies "toàn trang" (page-wide). The shipped
  implementation scopes it to the Highlight carousel via `HighlightSection`.
- The hashtag directory is dynamic; the demo seeds eight value hashtags in `HASHTAGS`. The Figma
  reference lists thirteen SAA value tags.
- This filter and the department filter are rendered by the same component (`KudosFilters`) and
  differ only in data + label.
