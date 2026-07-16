# Design Style: Floating Action Button 2 (open state)

**Frame ID**: `Sv7DFwBw1h`
**Figma Frame ID**: `313:9139`
**Frame Name**: `Floating Action Button 2`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:9139
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

---

## Design Tokens

All tokens are defined in `app/globals.css` under `@theme` and consumed as Tailwind utilities.

### Colors

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `--color-saa-gold-light` | #ffea9e | Action-pill background (`bg-saa-gold-light`) |
| `--color-saa-red` | #d4271d | "Hủy" (×) circular button background (`bg-saa-red`) |
| `--color-saa-bg` | #00101a | Pill label text (`text-saa-bg`) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Usage |
|------------|-------------|------|--------|-------------|-------|
| `--font-sans` (Montserrat) | var(--font-montserrat) | 24px (`text-2xl`) | 700 (`font-bold`) | 32px (`leading-8`) | Pill labels "Thể lệ" / "Viết KUDOS" |

### Spacing

| Property | Value | CSS |
|----------|-------|-----|
| Pill padding | 16px all sides | `px-4 py-4` |
| Icon ↔ label gap (pills) | 8px | `gap-2` |
| Vertical gap between stack items | 20px | `gap-5` (container) |
| Container offset from viewport edges | 24px | `bottom-6 right-6` |

### Radius

| Property | Value | CSS |
|----------|-------|-----|
| Action pills | small rounded | `rounded` |
| "Hủy" button | circle | `rounded-full` |

### Shadows

| Property | Value | CSS |
|----------|-------|-----|
| Action pills | large / black 30% | `shadow-xl shadow-black/30` |
| "Hủy" circle | large / black 40% | `shadow-xl shadow-black/40` |

---

## Layout Specifications

### Container (shared with closed state)

| Property | Value | CSS |
|----------|-------|-----|
| Position | fixed, bottom-right | `fixed bottom-6 right-6` |
| Z-index | 40 | `z-40` |
| Layout | column, right-aligned, gap 20px | `flex flex-col items-end gap-5` |

Top-to-bottom order: **A_Button thể lệ** → **B_Button viết kudos** → **C_Button huỷ**.

### A_Button thể lệ — "Thể lệ" pill (I313:9140;214:3799)

| Property | Value | CSS |
|----------|-------|-----|
| Size (Figma) | 149×64px | — |
| Background | #ffea9e | `bg-saa-gold-light` |
| Radius | small | `rounded` |
| Padding | 16px | `px-4 py-4` |
| Layout | row, centered, gap 8px | `flex items-center gap-2` |
| Shadow | large / black 30% | `shadow-xl shadow-black/30` |
| Hover | `hover:brightness-105 transition` | — |
| Contents | rules mark (24×24) + "Thể lệ" label | — |
| Entrance | `saa-fab-in`, `animationDelay: 60ms` | `className="saa-fab-in"` |

### B_Button viết kudos — "Viết KUDOS" pill (I313:9140;214:3732)

| Property | Value | CSS |
|----------|-------|-----|
| Background | #ffea9e | `bg-saa-gold-light` |
| Radius | small | `rounded` |
| Padding | 16px | `px-4 py-4` |
| Layout | row, centered, gap 8px | `flex items-center gap-2` |
| Shadow | large / black 30% | `shadow-xl shadow-black/30` |
| Hover | `hover:brightness-105 transition` | — |
| Contents | pen (24×24) + "Viết KUDOS" label | — |
| Entrance | `saa-fab-in`, `animationDelay: 0ms` | `className="saa-fab-in"` |

### C_Button huỷ — "Hủy" (×) circle (I313:9140;214:3827)

| Property | Value | CSS |
|----------|-------|-----|
| Size | 56×56px | `h-14 w-14` |
| Background | #d4271d | `bg-saa-red` |
| Radius | circle | `rounded-full` |
| Layout | centered contents | `grid place-items-center` |
| Shadow | large / black 40% | `shadow-xl shadow-black/40` |
| Hover | `hover:brightness-110 transition` | — |
| Contents | white × icon (24×24) | `public/saa/widget-close.svg` |
| `aria-expanded` | `true` (open) | — |

### Outside-click catcher

| Property | Value | CSS |
|----------|-------|-----|
| Position | full-screen | `fixed inset-0` |
| Z-index | 30 (below menu) | `z-30` |
| Appearance | transparent, no dimming | `cursor-default` |
| Behavior | click collapses menu | `onClick={() => setOpen(false)}` |

### Icons

| Icon | Asset | Size | CSS |
|------|-------|------|-----|
| Rules mark (Thể lệ) | `public/saa/widget-rules-logo.svg` | 24×24 | `h-6 w-6` |
| Pen (Viết KUDOS) | `public/saa/widget-pen.svg` | 24×24 | `h-6 w-6` |
| Close × (Hủy) | `public/saa/widget-close.svg` | 24×24 | `h-6 w-6` |

---

## Layout Structure (ASCII)

```
 (homepage content — NOT dimmed) …
                                        ┌──────────────────────────┐
                                        │  ✦  Thể lệ      (light)   │  ← A_Button thể lệ (149×64)
                                        └──────────────────────────┘
                                        ┌──────────────────────────┐
                                        │  🖊  Viết KUDOS  (light)  │  ← B_Button viết kudos
                                        └──────────────────────────┘
                                                              ( ✕ )     ← C_Button huỷ (red, 56×56)
                                            gap-5 · items-end · bottom-6/right-6 · z-40
   [ transparent full-screen catcher at z-30 — click to collapse ]
```

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger | Source |
|---------|----------|----------|--------|---------|--------|
| Action pills | opacity + translateY(8px→0) + scale(0.96→1) | 180ms | ease-out | Menu opens (`saa-fab-in`) | `app/globals.css` |
| "Viết KUDOS" pill | `animationDelay` | 0ms | — | stagger | inline `style` |
| "Thể lệ" pill | `animationDelay` | 60ms | — | stagger | inline `style` |
| Pills / "Hủy" circle | brightness | ~150ms | default `transition` | Hover | component |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Container | 313:9139 | `fixed bottom-6 right-6 z-40 flex flex-col items-end gap-5` | `app/_components/widget-button.tsx` |
| Outside-click catcher | — | `fixed inset-0 z-30 cursor-default` | `app/_components/widget-button.tsx` |
| "Thể lệ" pill | I313:9140;214:3799 | `saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 transition hover:brightness-105` | `app/_components/widget-button.tsx` |
| "Viết KUDOS" pill | I313:9140;214:3732 | (same class set as above, `animationDelay: 0ms`) | `app/_components/widget-button.tsx` |
| Pill label | — | `text-2xl font-bold leading-8 text-saa-bg` | `app/_components/widget-button.tsx` |
| "Hủy" (×) circle | I313:9140;214:3827 | `grid h-14 w-14 place-items-center rounded-full bg-saa-red shadow-xl shadow-black/40 transition hover:brightness-110` | `app/_components/widget-button.tsx` |
| Close × icon | — | `<Image src="/saa/widget-close.svg" width={24} height={24} className="h-6 w-6" />` | `public/saa/widget-close.svg` |

---

## Notes

- **Dark-mode only** (`color-scheme: dark`). No light-mode variant.
- The red "Hủy" circle and the closed gold pill are the **same** `<button>` element; the class set
  and contents swap on the `open` branch. See the closed-state spec
  ([`_hphd32jN2`](../_hphd32jN2-floating-action-button/design-style.md)).
- No raw hex in the component — colors resolve through SAA `@theme` tokens in `app/globals.css`.
</content>
