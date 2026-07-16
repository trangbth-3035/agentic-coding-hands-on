# Implementation Plan: Thể lệ UPDATE

**Frame**: `b1Filzi9i6-the-le-update`
**Date**: 2026-07-16
**Spec**: `specs/b1Filzi9i6-the-le-update/spec.md`
**Design**: `specs/b1Filzi9i6-the-le-update/design-style.md`
**Status**: Implemented (retrospective plan)

---

## Summary

Build the SAA 2025 "Thể lệ" (Rules) drawer — a right-side slide-in panel that explains the receiver
Hero-rank badges, the six collectible Secret-Box icons for senders, and the Kudos Quốc Dân grand
prize, with a pinned footer offering "Đóng" and "Viết KUDOS".

The drawer is a self-contained Client Component (`RulesModal`) portalled into `document.body`. It is
stateless apart from an `Escape`/scroll-lock effect; all open/close and "Viết KUDOS" behavior is
owned by the caller (`WidgetButton`, the homepage FAB). Copy comes from the i18n dictionary; badge
and icon images come from `lib/saa/kudos.ts`.

This plan is retrospective: the screen is already shipped. It records the phases as built and cites
the real files.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI Library**: React 19
**Styling**: TailwindCSS 4 — theme tokens via `@theme` in `app/globals.css`; utility classes only
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/` (`getDict` on the server) — NOT next-intl
**Auth & Data**: Supabase via `lib/supabase/*`; content passed to the drawer as props from the server
**State**: Local React state in the caller; the drawer itself holds no state (effect-only)
**Rendering**: React portal (`react-dom` `createPortal`) into `document.body`
**Tests**: none yet ("unit test làm sau") — test tasks tracked as PENDING in `tasks.md`

### Files & structure (as shipped)

- Shared components live under `app/_components/` (this drawer is shared, not route-scoped).
- The drawer is opened from the homepage FAB, so both live under `app/_components/`.

---

## Constitution Compliance Check

- [x] Follows coding conventions (kebab-case module files, PascalCase component export, 2-space indent, single quotes)
- [x] Uses approved stack (Next.js 16, React 19, TS strict, TailwindCSS 4, Supabase) — no new runtime deps
- [x] Folder structure — shared component under `app/_components/`
- [x] Security — no user input, no secrets; content is static dictionary copy
- [x] Design tokens defined as CSS variables (`@theme` in `app/globals.css`), consumed via Tailwind
- [ ] Test-first (Principle III) — **deferred**: unit tests are PENDING ("unit test làm sau")

**Violations**: none. Test-first is temporarily deferred by team decision and tracked in `tasks.md`.

---

## Architecture Decisions

### Component approach

- **`RulesModal`** (`app/_components/rules-modal.tsx`) — Client Component (`'use client'`). Props:
  `open`, `onClose`, `t: RulesCopy`, `onWriteKudos`. Returns `null` when `!open` (mount-on-demand),
  otherwise `createPortal` of the overlay + panel into `document.body`.
- Two private presentational helpers in the same file: `Heading` (gold 22px section heading) and
  `Body` (justified white 16px body), keeping the render readable and single-responsibility.
- **`RulesCopy`** type is exported from the same module (`Dictionary["rules"]`) and re-imported by
  the caller, so the drawer owns its copy contract.

### Content & data

- Rule text comes entirely from `dict.rules` (`lib/i18n/dictionaries.ts`) — VN + EN. The four tiers
  are `t.tiers[]`; each tier's badge image is `RULE_HERO_BADGES[i]` (index-aligned).
- The six collectible icons come from `RULE_ICONS`, sliced into two rows of three
  (`RULE_ICONS.slice(0,3)` / `.slice(3,6)`).
- Both arrays live in `lib/saa/kudos.ts`; the PNGs (`public/saa/kudos-rule-*.png`) bake in their
  labels.

### Interaction & lifecycle

- An effect (guarded by `open`) adds a `keydown` listener that closes on `Escape` and sets
  `document.body.style.overflow = 'hidden'`, restoring the previous value on cleanup.
- Backdrop is a full-bleed `<button aria-hidden tabIndex={-1}>` calling `onClose`.
- The footer "Viết KUDOS" calls `onWriteKudos`; the caller closes this drawer and opens the compose
  modal — the drawer never imports the compose modal itself (dependency stays one-directional).

### Integration point (caller)

- `WidgetButton` (`app/_components/widget-button.tsx`) owns `rulesOpen`/`composeOpen`, renders
  `<RulesModal open={rulesOpen} onClose=… t={rules} onWriteKudos=…/>`, and swaps the drawer for
  `<WriteKudosModal/>` when "Viết KUDOS" fires.
- `WidgetButton` is mounted on the homepage (`app/page.tsx`) with `rules={dict.rules}` resolved
  server-side from the `saa_lang` cookie.

---

## Project Structure

### Shipped files (this feature)

| File | Role |
|------|------|
| `app/_components/rules-modal.tsx` | The drawer component (`RulesModal`) + `Heading` / `Body` helpers; exports `RulesCopy` |
| `app/_components/widget-button.tsx` | FAB host — owns open/close state, wires `onWriteKudos` to the compose modal |
| `lib/saa/kudos.ts` | `RULE_HERO_BADGES`, `RULE_ICONS` image-path arrays |
| `lib/i18n/dictionaries.ts` | `dict.rules` (title, close, writeKudos, receiver/sender/national copy, tiers) + `dict.widget` |
| `app/globals.css` | `saa-drawer-in`, `saa-fade-in` keyframes; `.saa-no-scrollbar`; `--color-saa-*` tokens |
| `public/saa/kudos-rule-hero-*.png` | Four Hero-rank badge images |
| `public/saa/kudos-rule-*.png` | Six collectible Secret-Box icon images |
| `public/saa/widget-close.svg`, `public/saa/widget-pen.svg` | Footer button icons (24×24) |

---

## Implementation Approach (as built)

### Phase 1 — Copy & data

1. Add the `rules` block to both `vi` and `en` dictionaries (`lib/i18n/dictionaries.ts`): title,
   close, writeKudos, receiver heading/intro, four `tiers`, sender heading/intro/footnote, national
   heading/body.
2. Add `RULE_HERO_BADGES` (4) and `RULE_ICONS` (6) image-path arrays to `lib/saa/kudos.ts`.

### Phase 2 — Drawer component

1. Create `app/_components/rules-modal.tsx` as a Client Component; define the `RulesModal` props and
   export the `RulesCopy` type.
2. Implement the `Escape` + scroll-lock effect and the `if (!open) return null` mount guard.
3. Render the portal overlay: `fixed inset-0 z-[70] flex justify-end`, `role="dialog"`,
   `aria-modal`, `aria-label={t.title}`; add the fading backdrop button.
4. Render the panel `<aside>` with `saa-drawer-in`, right-pinned `max-w-[553px]`, scrollable body,
   and the three rule blocks using the `Heading` / `Body` helpers, tiers, and icon rows.
5. Render the pinned footer with the outlined "Đóng" and gold "Viết KUDOS" buttons.

### Phase 3 — Wire into the FAB / homepage

1. In `widget-button.tsx`, add `rulesOpen`/`composeOpen` state and render `RulesModal`, mapping the
   "Thể lệ" pill to `setRulesOpen(true)` and `onWriteKudos` to swap in the compose modal.
2. Mount `WidgetButton` on the homepage (`app/page.tsx`) with `rules={dict.rules}` and the widget
   labels resolved from the `saa_lang` cookie.

### Phase 4 — Polish (as built)

- Hidden-scrollbar utility on the panel; `sm:` padding/typography step-ups; justified body copy for
  readability of Vietnamese paragraphs.

### Phase 5 — Testing (PENDING)

- Unit tests for open/close (button, backdrop, `Escape`), scroll-lock restore, and `onWriteKudos`
  are deferred ("unit test làm sau") and tracked in `tasks.md` as `[ ]`.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Long EN copy overflowing the panel | Medium | Panel is `overflow-y-auto` with a pinned footer via `justify-between` |
| Body scroll leaking behind the open drawer | Low | Effect locks `document.body` overflow and restores it on cleanup |
| Drawer clipped by an ancestor's `overflow` | Medium | Rendered via `createPortal` into `document.body` |
| No focus trap (a11y) | Low | `Escape` + backdrop close provided; full focus-trap noted as future work |

---

## Open Questions

- [ ] Should the drawer restore focus to the FAB "Thể lệ" pill on close (full focus management)?
- [ ] Add a focus trap so `Tab` cycles within the panel while open?

---

## Next Steps

1. Backfill unit tests (see `tasks.md` PENDING items) once the team lifts the "unit test làm sau"
   hold.
2. Consider focus management / focus-trap as an accessibility follow-up.
