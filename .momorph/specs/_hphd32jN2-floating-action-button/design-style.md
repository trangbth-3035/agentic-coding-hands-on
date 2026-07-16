# Design Style: Floating Action Button (closed state)

**Frame ID**: `_hphd32jN2`
**Figma Frame ID**: `313:9137`
**Frame Name**: `Floating Action Button`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:9137
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

---

## Design Tokens

### Colors

All tokens are defined in `app/globals.css` under `@theme` and consumed as Tailwind utilities.

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `--color-saa-gold` | #fae287 | Closed pill background (`bg-saa-gold`) |
| `--color-saa-gold-light` | #ffea9e | Closed pill hover background (`hover:bg-saa-gold-light`) |
| `--color-saa-bg` | #00101a | "/" separator + icon-on-gold foreground (`text-saa-bg`) |

### Typography

| Token Name | Font Family | Size | Weight | Usage |
|------------|-------------|------|--------|-------|
| `--font-sans` (Montserrat) | var(--font-montserrat) | 20px (`text-xl`) | 700 (`font-bold`) | "/" separator glyph |

### Spacing

| Property | Value | CSS |
|----------|-------|-----|
| Pill horizontal padding | 20px | `px-5` |
| Pill vertical padding | 14px | `py-3.5` |
| Gap between icons / "/" | 8px | `gap-2` |
| Container offset from viewport edges | 24px | `bottom-6 right-6` |

### Radius

| Property | Value | CSS |
|----------|-------|-----|
| Pill | fully rounded | `rounded-full` |

### Shadows

| Property | Value | CSS |
|----------|-------|-----|
| Pill drop shadow | large, `black/40` | `shadow-xl shadow-black/40` |

---

## Layout Specifications

### Container (shared with open state)

| Property | Value | CSS |
|----------|-------|-----|
| Position | fixed, bottom-right | `fixed bottom-6 right-6` |
| Z-index | 40 | `z-40` |
| Layout | column, right-aligned | `flex flex-col items-end gap-5` |

In the closed state the container holds only the trigger pill (the two action pills render only when
`open` is `true`).

### A_Widget Button — Closed Pill (313:9138)

| Property | Value | CSS |
|----------|-------|-----|
| Icon-cluster region | 41×32px (Figma) | — |
| Background | #fae287 | `bg-saa-gold` |
| Radius | full | `rounded-full` |
| Padding | 14px 20px | `px-5 py-3.5` |
| Layout | row, centered | `flex items-center gap-2` |
| Shadow | large / black 40% | `shadow-xl shadow-black/40` |
| Hover | lighten to #ffea9e | `hover:bg-saa-gold-light transition` |
| Contents | pen (24×24) · "/" · rules mark (24×24) | see icons below |
| `aria-expanded` | `false` (closed) | — |

### Icons

| Icon | Node ID | Asset | Size | CSS |
|------|---------|-------|------|-----|
| Pen (A.1_icon viết kudos) | I313:9138;214:3839;186:1935 | `public/saa/widget-pen.svg` | 24×24 | `h-6 w-6` |
| Rules mark (A.2_icon thể lệ saa) | I313:9138;214:3839;186:1766 | `public/saa/widget-rules-logo.svg` | 24×24 | `h-6 w-6` |
| "/" separator | — | text glyph | — | `text-xl font-bold text-saa-bg` |

---

## Layout Structure (ASCII)

```
 (homepage content …)
                                                  ┌───────────────────────┐
                                                  │  🖊  /  ✦    (gold)    │  ← A_Widget Button
                                                  └───────────────────────┘     (closed pill)
                                              bottom-6 / right-6, fixed, z-40
```

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Closed pill | background-color | ~150ms | default `transition` | Hover |

> The staggered entrance animation (`saa-fab-in`, defined in `app/globals.css`) applies to the
> **open-state** action pills, not the closed pill itself.

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Container | 313:9137 | `fixed bottom-6 right-6 z-40 flex flex-col items-end gap-5` | `app/_components/widget-button.tsx` |
| Closed pill trigger | 313:9138 | `flex items-center gap-2 rounded-full bg-saa-gold px-5 py-3.5 shadow-xl shadow-black/40 transition hover:bg-saa-gold-light` | `app/_components/widget-button.tsx` |
| Pen icon | I313:9138;214:3839;186:1935 | `<Image src="/saa/widget-pen.svg" width={24} height={24} className="h-6 w-6" />` | `public/saa/widget-pen.svg` |
| "/" separator | — | `<span className="text-xl font-bold text-saa-bg">/</span>` | `app/_components/widget-button.tsx` |
| Rules mark | I313:9138;214:3839;186:1766 | `<Image src="/saa/widget-rules-logo.svg" width={24} height={24} className="h-6 w-6" />` | `public/saa/widget-rules-logo.svg` |

---

## Notes

- **Dark-mode only** (`color-scheme: dark` on `:root`). No light-mode variant.
- The closed pill and the open-state red circle are the **same** `<button>`; only the class set and
  contents swap on `open`. See the open-state spec
  ([`Sv7DFwBw1h`](../Sv7DFwBw1h-floating-action-button-2/design-style.md)) for the red-circle styling.
- No raw hex in the component — every color is an SAA `@theme` token from `app/globals.css`.
</content>
