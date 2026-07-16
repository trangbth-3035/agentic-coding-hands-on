# Implementation Plan: Open Secret Box — Chưa Mở

**Frame**: `J3-4YFIpMM-open-secret-box`
**Date**: 2026-07-16
**Spec**: `specs/J3-4YFIpMM-open-secret-box/spec.md`
**Design**: `specs/J3-4YFIpMM-open-secret-box/design-style.md`
**Status**: Implemented (retrospective plan)

---

## Summary

Build the SAA 2025 Secret Box modal — the **unopened ("chưa mở")** state — a centered dialog opened
from the Kudos stats sidebar. It shows a title, a "click the box" hint, a clickable gilded gift-box
image, and a footer count of remaining unopened boxes.

The modal is a self-contained Client Component (`SecretBoxModal`) portalled into `document.body`,
stateless apart from an `Escape`/scroll-lock effect. It is opened by a tiny client island
(`OpenSecretBox`) so that the surrounding `StatsCard` / `StatsSidebar` stay server-rendered. Copy
comes from `dict.kudosBoard.secretBox`; the box art is a single baked JPG.

This plan is retrospective: the unopened modal is shipped. The opened ("đã mở") reveal frame and the
odds engine are explicitly out of scope and noted as future work.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI Library**: React 19
**Styling**: TailwindCSS 4 — theme tokens via `@theme` in `app/globals.css`; utility classes only
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/` (`getDict` on the server) — NOT next-intl
**Auth & Data**: Supabase via `lib/supabase/*`; sample stats from `lib/saa/kudos.ts` for this frame
**State**: `open` boolean in the `OpenSecretBox` island; the modal itself is effect-only
**Rendering**: React portal (`react-dom` `createPortal`) into `document.body`
**Tests**: none yet ("unit test làm sau") — test tasks tracked as PENDING in `tasks.md`

### Files & structure (as shipped)

- The modal is route-scoped to the Kudos feature, so both files live under
  `app/kudos/_components/` (route-scoped components), not `app/_components/`.

---

## Constitution Compliance Check

- [x] Follows coding conventions (kebab-case module files, PascalCase component export, 2-space indent, single quotes)
- [x] Uses approved stack (Next.js 16, React 19, TS strict, TailwindCSS 4, Supabase) — no new runtime deps
- [x] Folder structure — route-scoped components under `app/kudos/_components/`
- [x] Security — no user input, no secrets; count is a numeric prop
- [x] Design tokens defined as CSS variables (`@theme` in `app/globals.css`), consumed via Tailwind
- [ ] Test-first (Principle III) — **deferred**: unit tests are PENDING ("unit test làm sau")

**Violations**: none. Test-first is temporarily deferred by team decision and tracked in `tasks.md`.

---

## Architecture Decisions

### Component approach

- **`SecretBoxModal`** (`app/kudos/_components/secret-box-modal.tsx`) — Client Component
  (`'use client'`). Props: `open`, `onClose`, `t: SecretBoxCopy`, `count`, `onOpenBox?`. Returns
  `null` when `!open`; otherwise `createPortal` of the overlay + card into `document.body`. Exports
  the `SecretBoxCopy` type (`Dictionary["kudosBoard"]["secretBox"]`).
- **`OpenSecretBox`** (`app/kudos/_components/open-secret-box.tsx`) — Client Component. Owns the
  `open` boolean, renders the "Mở Secret Box" trigger button + the `SecretBoxModal`. Split out as a
  client island so `StatsCard` / `StatsSidebar` remain Server Components (Principle: server-first).

### Content & data

- Copy comes from `dict.kudosBoard.secretBox` (`title`, `hint`, `unopenedLabel`) — VN + EN.
- The unopened `count` is passed from `KUDOS_STATS.boxUnopened` (`lib/saa/kudos.ts`, sample data),
  displayed zero-padded via `String(count).padStart(2, '0')`.
- Box art is a single baked composite (`public/saa/secretbox-closed.jpg`).

### Interaction & lifecycle

- An effect (guarded by `open`) binds a `keydown` listener that closes on `Escape` and locks
  `document.body` overflow, restoring both on cleanup — identical pattern to the rules drawer.
- Backdrop is a full-bleed `<button aria-hidden tabIndex={-1}>` → `onClose`.
- The gift-box `<button>` fires `onOpenBox`. In the current wiring `StatsCard` does not pass
  `onOpenBox`, so the click is a no-op pending the reveal frame — intentional and documented.

### Integration point (caller)

- `StatsCard` (`app/kudos/_components/stats-card.tsx`) renders `<OpenSecretBox label={dict.stats.openBox}
  t={dict.secretBox} unopenedCount={KUDOS_STATS.boxUnopened} />`.
- `StatsCard` is used by `StatsSidebar` (Kudos board, `MaZUn5xHXZ`) and reused on the Profile page
  (`3FoIx6ALVb`).

---

## Project Structure

### Shipped files (this feature)

| File | Role |
|------|------|
| `app/kudos/_components/secret-box-modal.tsx` | The modal component (`SecretBoxModal`); exports `SecretBoxCopy` |
| `app/kudos/_components/open-secret-box.tsx` | Trigger island (`OpenSecretBox`) — owns `open`, mounts the modal |
| `app/kudos/_components/stats-card.tsx` | Host stats card wiring `label` / `t` / `unopenedCount` |
| `lib/saa/kudos.ts` | `KUDOS_STATS.boxUnopened` sample count |
| `lib/i18n/dictionaries.ts` | `dict.kudosBoard.secretBox` (title, hint, unopenedLabel) + `stats.openBox` |
| `app/globals.css` | `saa-zoom-in`, `saa-fade-in` keyframes; `.saa-no-scrollbar`; `--color-saa-*` tokens |
| `public/saa/secretbox-closed.jpg` | Baked gift-box composite art |
| `public/saa/widget-close.svg`, `public/saa/kudos-ic-gift.svg` | ✕ glyph + trigger gift icon |

---

## Implementation Approach (as built)

### Phase 1 — Copy & data

1. Add `secretBox` (`title`, `hint`, `unopenedLabel`) and `stats.openBox` to the `vi` and `en`
   dictionaries.
2. Ensure `KUDOS_STATS.boxUnopened` exists in `lib/saa/kudos.ts`.

### Phase 2 — Modal component

1. Create `secret-box-modal.tsx` as a Client Component; define props and export `SecretBoxCopy`.
2. Implement the `Escape` + scroll-lock effect and the `if (!open) return null` mount guard.
3. `createPortal` the overlay (`fixed inset-0 z-[70] flex items-center justify-center p-4`,
   `role="dialog"`, `aria-modal`, `aria-label={t.title}`) + fading backdrop.
4. Render the card: header (centered title + absolute ✕), divider, hint, clickable box `<button>`
   with the baked JPG, divider, and the zero-padded count.

### Phase 3 — Trigger island + wiring

1. Create `open-secret-box.tsx` with `open` state, the "Mở Secret Box" button, and the mounted
   `SecretBoxModal`.
2. Render `<OpenSecretBox>` inside `StatsCard`, passing `dict.stats.openBox`, `dict.secretBox`, and
   `KUDOS_STATS.boxUnopened`; keep `StatsCard` / `StatsSidebar` server-rendered.

### Phase 4 — Polish (as built)

- `saa-zoom-in` entrance, `max-h-[92vh]` + `.saa-no-scrollbar` internal scroll, `sm:` padding/type
  step-ups, hover-brighten / active-press affordances on the box.

### Phase 5 — Testing (PENDING)

- Unit tests for open/close (✕, backdrop, `Escape`), scroll-lock restore, count zero-padding, and
  `onOpenBox` firing are deferred ("unit test làm sau"), tracked in `tasks.md` as `[ ]`.

### Deferred — Opened ("đã mở") reveal frame (out of scope)

- The reveal result state, the weighted-odds engine (Stay Gold 30% / Flow to Horizon 25% / Touch of
  Light 20% / Beyond the Boundary 10% / Revival 10% / Root Further 5%), the count decrement, and the
  hint-hide / box-disable at count = 0 all belong to the separate opened frame.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Making the modal client-only would force the whole stats card client-side | Medium | Split the trigger into the small `OpenSecretBox` island; keep `StatsCard`/`StatsSidebar` server components |
| Body scroll leaking behind the open modal | Low | Effect locks `document.body` overflow, restores on cleanup |
| Modal clipped by an ancestor's `overflow` | Medium | Rendered via `createPortal` into `document.body` |
| Single-digit count reading as `4` not `04` | Low | `String(count).padStart(2, '0')` |
| Clicking the box appears to do nothing | Low (known) | Documented: `onOpenBox` is unwired until the reveal frame exists |

---

## Open Questions

- [ ] When is the opened ("đã mở") reveal frame + odds engine scheduled? (Unblocks FR-006 / US3.)
- [ ] Should the unopened count come from Supabase instead of sample `KUDOS_STATS` before launch?

---

## Next Steps

1. Backfill unit tests (see `tasks.md` PENDING items) once "unit test làm sau" is lifted.
2. Build the opened reveal frame and wire `onOpenBox` + count decrement.
