# Design Style: Dropdown Phòng ban (Department Filter)

**Frame ID**: `WXK5AYB_rG`
**Figma Frame ID**: `721:5684`
**Frame Name**: `Dropdown Phòng ban`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5684
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16
**Status**: Implemented

---

## Design Tokens

All tokens are defined in `app/globals.css` (`@theme`) and consumed as Tailwind utilities. The panel
uses the shared Dropdown-List shell (`app/_components/saa-dropdown.tsx`).

### Colors

| Token / Value | Hex | Usage |
|---------------|-----|-------|
| `#00070C` (literal in shell) | #00070C | Panel background (darker than page bg) |
| `--color-saa-gold-muted` | #998C5F | 1px panel border; default pill border |
| `--color-saa-gold` | #FAE287 | Active pill border; text-glow color (`0 0 6px`) |
| `--color-saa-gold-light` | #FFEA9E | Active/hover row wash (`/10`), pill fills (`/10`,`/20`) |
| `--color-saa-bg` | #00101A | Page background behind the board |
| text | #FFFFFF | Row + pill label text |

### Typography

| Element | Font Family | Size | Weight | Tracking |
|---------|-------------|------|--------|----------|
| Option row label | Montserrat (`--font-sans`) | 16px (`text-base`) | 700 (`font-bold`) | 0.5px (`tracking-[0.5px]`) |
| Trigger pill label | Montserrat (`--font-sans`) | 14px (`text-sm`) | 600 (`font-semibold`) | — |

### Spacing

| Value | Utility | Usage |
|-------|---------|-------|
| 6px | `p-1.5` | Panel inner padding |
| 16px | `px-4` | Row horizontal padding |
| 16px / 12px | `px-4 py-3` | Pill padding |
| 8px | `mt-2` | Panel offset below the pill |
| 8px | `gap-2` | Pill icon/label gap |

### Radius

| Value | Utility | Usage |
|-------|---------|-------|
| 8px | `rounded-lg` | Panel corners |
| 4px | `rounded` | Option row corners; pill corners |

### Shadows / Effects

| Value | Usage |
|-------|-------|
| `shadow-2xl` | Panel drop shadow |
| `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Row text-glow on hover / active (`[text-shadow:…]`) |

---

## Layout Specifications

### Panel (A_Dropdown-List — `SaaDropdownPanel`)

| Property | Value |
|----------|-------|
| Figma size | 101 × 348 px |
| Position | `absolute right-0 mt-2`, aligned to the pill; `z-50` |
| Min width | `min-w-full` (matches the pill width, grows to content) |
| Background | #00070C |
| Border | 1px `--color-saa-gold-muted` |
| Radius | 8px |
| Padding | 6px |
| Overflow | vertical scroll when the list is long |

### Option Row (`SaaDropdownItem`, `size="default"`)

| Property | Value |
|----------|-------|
| Height | 56px (`h-14`) |
| Padding | `px-4` |
| Font | Montserrat 16px / 700, `tracking-[0.5px]`, white |
| Default | transparent |
| Hover | `bg-saa-gold-light/10` + text-glow |
| Active (selected) | `bg-saa-gold-light/10` + text-glow (persistent) |

### Trigger Pill ("Phòng ban" — `kudos-filters.tsx`)

| Property | Value |
|----------|-------|
| Layout | `inline-flex items-center gap-2 rounded border px-4 py-3` |
| Font | `text-sm font-semibold text-white` |
| Default | `border-saa-gold-muted bg-saa-gold-light/10 hover:bg-saa-gold-light/20` |
| Active | `border-saa-gold bg-saa-gold-light/20` |
| Chevron | `/saa/chevron-down.svg`, `h-4 w-4`, `rotate-180` when open |

---

## Layout Structure (ASCII)

```
        ┌───────────────────────┐
        │ Phòng ban          ▾  │  ← trigger pill (active: gold border)
        └───────────────────────┘
        ┌───────────────────────┐  ← A_Dropdown-List (101×348)
        │  CEVC2            (◍) │  ← selected: gold/10 wash + glow
        │  CEVC3               │
        │  CEVC4               │   rows: h-14, px-4, Montserrat 16/700
        │  CEVC1               │
        │  OPD                 │
        │  Infra               │
        │  …(scroll)           │
        └───────────────────────┘
   bg:#00070C · border:1px #998C5F · radius:8px · pad:6px · shadow-2xl
```

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Panel | 563:8027 | `flex flex-col rounded-lg border border-saa-gold-muted bg-[#00070C] p-1.5 shadow-2xl` | `SaaDropdownPanel` |
| Positioned panel | — | `absolute right-0 z-50 mt-2 min-w-full` | `kudos-filters.tsx` |
| Option row | 563:8027 › row | `flex items-center gap-2 h-14 rounded px-4 text-base font-bold tracking-[0.5px] text-white hover:bg-saa-gold-light/10` | `SaaDropdownItem` |
| Active row | 563:8027 › active | `bg-saa-gold-light/10 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `SaaDropdownItem active` |
| Trigger pill | N/A (board) | `inline-flex items-center gap-2 rounded border px-4 py-3 text-sm font-semibold text-white` | `kudos-filters.tsx` |

---

## Notes

- Dark-mode only (`color-scheme: dark`) — no light overrides.
- The panel background `#00070C` is a deliberate literal in the shared shell (slightly darker than
  `--color-saa-bg`); it is the single non-tokenised color and is intentional.
- Row size `default` (56px) matches the Figma row height; the compact 40px variant is used only by
  the compose hashtag picker (screen `p9zO-c4a4x`).
