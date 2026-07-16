# Feature Specification: Dropdown-ngôn ngữ (Language Picker)

**Frame ID**: `hUyaaugye2`
**Figma Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Dropdown-ngôn ngữ** is the language-picker overlay anchored to the language toggle in the SAA
2025 site header. It lets any user switch the interface between Vietnamese (`vi` / "VN") and English
(`en` / "EN"). The choice is persisted in the `saa_lang` cookie so every server-rendered section
re-reads it on the next render.

This is a small header overlay — not a page — so the spec is intentionally short. It is shared across
every authenticated screen because the header (`app/_components/site-header.tsx`) is rendered on all
of them.

**Target users**: All Sun* employees using the SAA 2025 app.

**Business context**: SAA 2025 ships bilingual copy; the language toggle is the single control that
flips the whole UI locale without a hard navigation.

---

## User Scenarios & Testing

### User Story 1 - Switch interface language (Priority: P1)

**As a** user,
**I want to** open the language picker and choose VN or EN,
**So that** the whole interface renders in my preferred language.

**Why this priority**: Core i18n control; the toggle is useless without it.

**Independent Test**: Click the "VN" pill in the header → dropdown opens → click "EN" → dropdown
closes, header label reads "EN", and page copy re-renders in English.

**Acceptance Scenarios**:

1. **Given** the header is displayed, **When** the user clicks the language toggle, **Then** the
   dropdown opens showing two rows: "VN" (Vietnam flag) and "EN" (UK flag).
2. **Given** the dropdown is open, **When** the user reads it, **Then** the currently-active locale
   row is visually highlighted (filled background) and marked `aria-checked`.
3. **Given** the dropdown is open, **When** the user clicks a locale row, **Then** the `saa_lang`
   cookie is written, the dropdown closes, and the interface re-renders in the chosen language
   (via `router.refresh()`, no full page reload).
4. **Given** the dropdown is open, **When** the user clicks the already-active locale, **Then** the
   cookie is re-written to the same value and the dropdown closes (idempotent).

---

### User Story 2 - Dismiss without choosing (Priority: P2)

**As a** user,
**I want to** close the dropdown without changing my language,
**So that** an accidental open does not force a selection.

**Independent Test**: Open the dropdown → click anywhere outside it → dropdown closes, locale
unchanged.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks outside the panel, **Then** the dropdown
   closes and the locale is unchanged (an invisible full-viewport backdrop button handles this).
2. **Given** the dropdown is open, **When** the user clicks the toggle again, **Then** the dropdown
   closes (toggle behaviour).

### Edge Cases

- **No/invalid cookie**: `getLocale()` falls back to `DEFAULT_LOCALE` (`vi`) so the toggle always
  shows a valid current value.
- **Cookie persistence**: `saa_lang` is set with `max-age=31536000` (1 year) so the choice survives
  future sessions.
- **Rapid re-open**: The backdrop button and toggle both drive the same `open` boolean, so state
  cannot desync.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md).

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Dropdown-List | 525:11713 | The language-select panel: a selected zone (dark-grey wash, VN flag + "VN") over an option zone (dark, EN flag + "EN") | Opens on toggle click; closes on outside click |
| A.1_tiếng Việt | I525:11713;362:6085 | Vietnamese row — flag + "VN" label | Click → set `saa_lang=vi`, close, refresh |
| A.2_tiếng Anh | I525:11713;362:6128 | English row (110×56) — flag + "EN" label, dark background | Click → set `saa_lang=en`, close, refresh |
| Toggle (anchor) | N/A (in `A_Header`) | The pill button that opens the dropdown: current flag + code + chevron | Click → toggle open |
| Backdrop | N/A (implementation) | Invisible full-viewport button behind the open panel | Click → close |

### Navigation Flow

- **From**: The language toggle in the header (`app/_components/site-header.tsx`), present on every
  authenticated screen (Homepage, Award Information, Kudos, Profile, …).
- **To**: No route change — selecting a locale calls `router.refresh()` to re-render the current
  route server-side in the new language.
- **Triggers**:
  - Click toggle → open/close dropdown
  - Click a locale row → write cookie → close → refresh
  - Click outside / toggle again → close

---

## Requirements

### Functional Requirements

- **FR-001**: The toggle MUST show the current locale (flag + "VN"/"EN" + chevron).
- **FR-002**: Clicking the toggle MUST open/close the dropdown.
- **FR-003**: The dropdown MUST list both supported locales (VN, EN) with flags.
- **FR-004**: The active locale row MUST be visually highlighted and expose `aria-checked`.
- **FR-005**: Selecting a locale MUST persist it to the `saa_lang` cookie and re-render the UI in
  that language without a full page reload.
- **FR-006**: Clicking outside the panel MUST close it without changing the locale.

### Technical Requirements

- **TR-001**: The switcher is a Client Component (`"use client"`) — it needs `useState` and
  `useRouter`.
- **TR-002**: Locale codes MUST come from `lib/i18n/config.ts` (`LOCALES`, `Locale`); the cookie key
  MUST be `LOCALE_COOKIE` (`saa_lang`) — no hard-coded strings duplicated elsewhere.
- **TR-003**: The cookie MUST be written client-side with `path=/; max-age=31536000; samesite=lax`.
- **TR-004**: Server sections MUST read the locale via `getLocale()` / `getDict()`
  (`lib/i18n/server.ts`), which is request-cached.

### Key Entities

- **Locale**: `"vi" | "en"` (from `lib/i18n/config.ts`). Default `vi`.
- **`saa_lang` cookie**: string locale value; the single source of truth for interface language.

---

## State Management

- **Local component state**: `open: boolean` (dropdown visibility). No selection state is stored
  locally — the "current" value is derived from the `locale` prop passed down from the server.
- **Global/persisted state**: `saa_lang` cookie. Written on selection; read server-side on the next
  render by `getLocale()`.
- **Cache requirements**: `router.refresh()` re-fetches the current route's Server Component output;
  no client cache of translated strings.

---

## Success Criteria

- **SC-001**: Selecting a locale flips the visible interface language within one server refresh
  (no hard reload / no white flash of a full navigation).
- **SC-002**: The chosen locale persists across page navigations and browser restarts (1-year cookie).
- **SC-003**: The active locale is unambiguously indicated in the open dropdown.

---

## Out of Scope

- Additional languages beyond VN/EN.
- Auto-detection from `Accept-Language` (default is always `vi`).
- Per-user server-stored language preference (cookie-only for now).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] i18n config + dictionaries exist (`lib/i18n/config.ts`, `lib/i18n/dictionaries.ts`,
      `lib/i18n/server.ts`)
- [x] Header host component exists (`app/_components/site-header.tsx`)

---

## Notes

- The shipped switcher (`app/_components/language-switcher.tsx`) uses its **own** visual shell — a
  rounded-full pill trigger and a `bg-black/90` rounded-xl dropdown — and does **not** reuse the
  shared `SaaDropdownPanel` used by the profile menu. This matches the distinct Figma treatment of
  the language overlay (dark-grey "selected" zone over a darker option zone). See design-style.md.
- Rows use `role="menuitemradio"` + `aria-checked` (single-select semantics), which is the correct
  ARIA for a mutually-exclusive language choice.
