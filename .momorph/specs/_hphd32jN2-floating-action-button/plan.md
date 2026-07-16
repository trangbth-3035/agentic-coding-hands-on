# Implementation Plan: Floating Action Button (closed state)

**Frame**: `_hphd32jN2-floating-action-button`
**Date**: 2026-07-16
**Spec**: `specs/_hphd32jN2-floating-action-button/spec.md`
**Design**: `specs/_hphd32jN2-floating-action-button/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Ship the resting (closed) state of the homepage Floating Action Button: a gold pill pinned
bottom-right showing a pen icon, a "/", and the Sun*/rules mark. Clicking it expands the FAB into its
open menu. Both states live in one client component; this plan covers the closed pill and the
`open` toggle that reveals the open state (screen `Sv7DFwBw1h`).

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19 client component (`"use client"`)
**Styling**: TailwindCSS 4 utilities backed by `@theme` tokens in `app/globals.css`
**i18n**: cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/`; labels resolved on the server via
`getDict()` and passed down as props (`dict.widget`)
**Assets**: static SVGs under `public/saa/`, rendered with `next/image`
**State Management**: local `useState` (`open`) — no server data
**Testing**: none yet ("unit test làm sau") — test tasks are PENDING

---

## Architecture Decisions

### Component structure

- **Single shared component**: `app/_components/widget-button.tsx` renders both the closed pill and
  the open menu. A local `open` boolean selects which class set / contents the trigger shows and
  whether the action pills render. This avoids a second component and keeps the closed⇄open
  transition atomic.
- **Client component**: needs `useState` for `open` and a keydown listener (Escape closes) — hence
  `"use client"`.
- **Server-provided labels**: the homepage (`app/page.tsx`, Server Component) resolves the
  dictionary via `getDict()` and passes `labels={dict.widget}` so the button carries no i18n logic.

### Styling

- Colors come exclusively from SAA `@theme` tokens (`bg-saa-gold`, `hover:bg-saa-gold-light`,
  `text-saa-bg`) — Constitution §II forbids raw hex in components.
- The container is `fixed bottom-6 right-6 z-40` so the pill floats above all homepage sections.

### Integration

- Mounted once, after `<SiteFooter />`, in `app/page.tsx`.

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/_hphd32jN2-floating-action-button/
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
| `app/_components/widget-button.tsx` | The FAB component — closed pill trigger + `open` toggle |
| `app/page.tsx` | Homepage host that mounts `<WidgetButton labels={dict.widget} … />` |
| `lib/i18n/dictionaries.ts` | `widget.writeKudos` / `widget.rules` labels (vi + en) |
| `app/globals.css` | SAA `@theme` color tokens + `saa-fab-in` keyframes (used by open state) |
| `public/saa/widget-pen.svg` | Pen icon (A.1) |
| `public/saa/widget-rules-logo.svg` | Rules mark (A.2) |

---

## Implementation Approach (retrospective)

### Phase 1: Trigger & positioning — DONE

- Added the fixed bottom-right container (`fixed bottom-6 right-6 z-40 flex flex-col items-end
  gap-5`) in `app/_components/widget-button.tsx`.
- Built the closed pill `<button>`: `rounded-full bg-saa-gold px-5 py-3.5 shadow-xl shadow-black/40`
  with `hover:bg-saa-gold-light`; contents = pen icon + "/" + rules mark.
- Wired `onClick={() => setOpen((o) => !o)}` and `aria-expanded={open}`.

### Phase 2: i18n & host wiring — DONE

- Added `widget.writeKudos` / `widget.rules` to `lib/i18n/dictionaries.ts` (vi + en).
- Mounted `<WidgetButton labels={dict.widget} … />` in `app/page.tsx`, passing server-resolved
  labels.

### Phase 3: Tests — PENDING

- Unit tests deferred ("unit test làm sau"). See tasks.md.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| FAB overlaps important footer content on short viewports | Low | Low | Fixed offset + high z-index; menu closes on outside click |
| `aria-label` uses the "Viết KUDOS" label though the pill covers two actions | Low | Low | Revisit label copy; non-blocking |

---

## Notes

- This is one of two states of a single component; the open-state plan
  ([`Sv7DFwBw1h`](../Sv7DFwBw1h-floating-action-button-2/plan.md)) shares this component and file.
- No `src/`, Vitest, or Cloudflare specifics — this repo uses `app/`-rooted routing and has no test
  runner configured yet.
</content>
