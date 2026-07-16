# Implementation Plan: Floating Action Button 2 (open state)

**Frame**: `Sv7DFwBw1h-floating-action-button-2`
**Date**: 2026-07-16
**Spec**: `specs/Sv7DFwBw1h-floating-action-button-2/spec.md`
**Design**: `specs/Sv7DFwBw1h-floating-action-button-2/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Ship the expanded (open) state of the homepage Floating Action Button: two light-gold action pills
("Thể lệ", "Viết KUDOS") that slide in above a red circular "Hủy" (×) button, with an
outside-click catcher and `Escape`-to-close. The two pills launch the rules drawer (`b1Filzi9i6`)
and the compose modal (`ihQ26W78P2`) in place. This state shares one component and one file with the
closed pill (screen `_hphd32jN2`), selected by the local `open` boolean.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19 client component (`"use client"`)
**Styling**: TailwindCSS 4 utilities backed by `@theme` tokens + `saa-fab-in` keyframes in
`app/globals.css`
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/`; labels resolved server-side via
`getDict()` and passed as props (`dict.widget`, `dict.rules`, `dict.kudosBoard.writeKudos`)
**Assets**: static SVGs under `public/saa/`, rendered with `next/image`
**State Management**: local `useState` — `open`, `rulesOpen`, `composeOpen`; `useEffect` for the
`Escape` keydown listener
**Testing**: none yet ("unit test làm sau") — test tasks are PENDING

---

## Architecture Decisions

### Component structure

- **Single shared component**: `app/_components/widget-button.tsx` renders both FAB states. When
  `open` is `true` it renders the two `saa-fab-in` pills and swaps the trigger `<button>` from the
  gold pill to the red × circle. This keeps the closed⇄open transition inside one element tree.
- **In-place overlays, not navigation**: both pills set `open = false` and flip a sibling modal flag
  (`rulesOpen` / `composeOpen`). The rules drawer and compose modal are rendered as siblings in the
  same component (`<RulesModal />`, `<WriteKudosModal />`). The rules drawer's own "Viết KUDOS" CTA
  also routes to `setComposeOpen(true)`, so all write-kudos entry points converge.
- **No page dimming**: the outside-click catcher (`fixed inset-0 z-30 cursor-default`) is transparent
  by design — the FAB menu floats over undimmed content, unlike the drawer/modal it launches.

### Styling / animation

- Action pills: `bg-saa-gold-light`, `rounded`, `shadow-xl shadow-black/30`, entering with
  `saa-fab-in` (defined in `app/globals.css`) and a staggered `animationDelay` (Viết KUDOS 0ms, Thể
  lệ 60ms).
- "Hủy" circle: `h-14 w-14 rounded-full bg-saa-red` (56×56) with the white × icon.
- All colors are SAA `@theme` tokens — Constitution §II forbids raw hex in components.

### Integration

- Mounted once, after `<SiteFooter />`, in `app/page.tsx`, which passes the server-resolved
  dictionaries and `senderName` (forwarded to the compose modal).

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/Sv7DFwBw1h-floating-action-button-2/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Design specifications
├── plan.md              ✅ This file
├── tasks.md             ✅ Task breakdown
└── assets/
    └── frame.url.txt    ✅ Figma frame image URL
```

### Shipped Files (already implemented)

| File | Role |
|------|------|
| `app/_components/widget-button.tsx` | FAB component — open-state pills, red × trigger, `Escape`/outside-click handling, modal wiring |
| `app/_components/rules-modal.tsx` | `RulesModal` opened by the "Thể lệ" pill (`b1Filzi9i6`) |
| `app/kudos/_components/write-kudos-modal.tsx` | `WriteKudosModal` opened by the "Viết KUDOS" pill (`ihQ26W78P2`) |
| `app/page.tsx` | Homepage host; passes `labels`, `rules`, `compose`, `senderName` |
| `lib/i18n/dictionaries.ts` | `widget.*`, `rules.*`, `kudosBoard.writeKudos` labels (vi + en) |
| `app/globals.css` | `saa-fab-in` keyframes + SAA color tokens |
| `public/saa/widget-pen.svg` · `widget-rules-logo.svg` · `widget-close.svg` | Pill + × icons |

---

## Implementation Approach (retrospective)

### Phase 1: Expanded layout — DONE

- Conditionally rendered (`open &&`) the two action pills inside the shared container, ordered Thể lệ
  → Viết KUDOS, each `bg-saa-gold-light rounded px-4 py-4 shadow-xl shadow-black/30`.
- Swapped the trigger to the red × circle (`grid h-14 w-14 place-items-center rounded-full
  bg-saa-red`) when `open`.

### Phase 2: Entrance animation — DONE

- Added the `saa-fab-in` keyframes to `app/globals.css` (opacity + translateY + scale) and applied
  the `saa-fab-in` class to each pill with staggered `animationDelay` (0ms / 60ms).

### Phase 3: Dismiss & actions — DONE

- Added the transparent outside-click catcher (`fixed inset-0 z-30`), the `Escape` keydown listener
  (registered only while `open`), and the red circle click — all calling `setOpen(false)`.
- Wired "Viết KUDOS" → `setComposeOpen(true)` and "Thể lệ" → `setRulesOpen(true)`, and mounted
  `<RulesModal />` + `<WriteKudosModal />` as siblings.

### Phase 4: Tests — PENDING

- Unit tests deferred ("unit test làm sau"). See tasks.md.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Undimmed menu confused with page content | Low | Low | High-contrast gold pills + red circle; outside click / `Escape` collapse |
| `Escape` listener leak | Low | Medium | Listener added only while `open`, removed in the effect cleanup |
| z-index conflict with launched drawer/modal | Low | Medium | Menu at `z-40`, catcher at `z-30`; drawer/modal own higher stacking |

---

## Notes

- This is one of two states of a single component; the closed-state plan
  ([`_hphd32jN2`](../_hphd32jN2-floating-action-button/plan.md)) shares this file.
- No `src/`, Vitest, or Cloudflare specifics — this repo uses `app/`-rooted routing and has no test
  runner configured yet.
</content>
