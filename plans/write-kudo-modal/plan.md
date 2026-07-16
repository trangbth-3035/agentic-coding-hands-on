# Plan — Viết Kudo compose modal (`/kudos` · homepage FAB)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/ihQ26W78P2
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the "Viết Kudo" compose modal — "Gửi lời cám ơn và ghi nhận đến đồng đội" — a cream card
floating over a dimmed board (`createPortal` to `document.body`). It carries a searchable **recipient**
dropdown, a **"Danh hiệu"** title field, a rich-text body (visual toolbar + textarea), a
**multi-select hashtag picker (max 5)**, an **image gallery (max 5)**, and an **anonymous** toggle.
Submitting prepends a new `KudosPost` to a client session store so it appears at the top of the All
Kudos list. Launched in place from the `/kudos` hero, the homepage floating action button, and the
FAB rules drawer. Mock/demo — no backend; fully VN/EN via `getDict()` props.

## Phases
| # | Phase | Status | Depends |
|---|-------|--------|---------|
| 01 | [Compose form (fields, recipient search, hashtag max-5, anonymous, image)](./phase-01-compose-form.md) | done | — |
| 02 | [Submit → session store + launcher wiring + i18n](./phase-02-submit-and-integration.md) | done | 01 |

## Key decisions
- **Client modal, no route**: `WriteKudosModal` (`"use client"`) renders via `createPortal` to
  `document.body`, gated on an `open` prop from whichever launcher owns it. Escape + backdrop close;
  body scroll locked while open; `role="dialog"` + `aria-modal`.
- **No backend (demo)**: submit constructs a `KudosPost` and calls `addKudos()`
  (`lib/saa/kudos-store.ts`); the All Kudos list re-renders via `useSyncExternalStore`
  (`subscribeKudos`/`getKudosSnapshot`, empty server snapshot). No API, no persistence.
- **Recipient-only validation**: empty "Người nhận" → red border + `t.recipientRequired` + reopen
  dropdown; every other field defaults if blank; "Gửi" always enabled.
- **Hashtag cap by hiding the add button**: `MAX_ITEMS = 5`; `toggleTag` adds under the cap /
  removes when present; the "+ Hashtag" `AddButton` (hence the picker) is hidden at five. Picker =
  `SaaDropdownPanel`/`SaaDropdownItem` (`app/_components/saa-dropdown.tsx`) with `checked` +
  `size="compact"` (screenId `p9zO-c4a4x`).
- **Data from `lib/saa/kudos.ts`**: `HASHTAGS` (picker options) and `SUNNERS` (recipient list),
  passed as props; recipient filtering is a client `.includes()` (no debounce/API).
- **Anonymous** = fixed `t.anonymousName` ("Ẩn danh") sender label; images are a fixed
  `SAMPLE_IMAGE`, only `photos` count is carried.
- **i18n**: all copy from `dict.kudosBoard.writeKudos` (vi/en) in `lib/i18n/dictionaries.ts`, threaded
  as the `t` prop; user-generated content (names, hashtags) stays verbatim.
- **Three launchers, one modal**: `WriteKudosLauncher` (`/kudos` hero), `widget-button.tsx` (homepage
  FAB), and the FAB rules drawer all mount the same `WriteKudosModal`.

## Out of Scope (Deferred)
- **Real backend**: `POST /api/kudos`, image upload / Supabase Storage, server-side sanitize — none
  implemented; session store only.
- **Campaign/award-type selector** (spec "Frame 552"): shipped as the "Danh hiệu" title field.
- **Rich-text formatting + "@mention" autocomplete**: toolbar and "@" hint are visual-only.
- **Full validation set**: message/hashtag required-field errors, submit spinner, error toast.
- **Focus trap**: Escape/backdrop close only; no Tab cycle containment.
- **Automated tests**: enumerated but `[ ]` PENDING ("unit test làm sau").

## Risks
- Session-store posts vanish on reload — acceptable for the demo; documented as non-persistent.
- Relaxed validation lets defaulted title/body/hashtags through — intentional for demo; real rules
  deferred with the backend.
- `createPortal` + `z-[60]` must sit above the FAB/header — validated visually across all three
  launchers.
- No tests yet — test tasks enumerated + marked PENDING in
  [phase-02](./phase-02-submit-and-integration.md).
