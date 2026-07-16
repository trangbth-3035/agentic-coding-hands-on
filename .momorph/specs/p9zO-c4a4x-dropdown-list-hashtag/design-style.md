# Design Style: Dropdown list hashtag (Compose Multi-select)

**Frame ID**: `p9zO-c4a4x`
**Figma Frame ID**: `1002:13013`
**Frame Name**: `Dropdown list hashtag`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1002:13013
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16
**Status**: Implemented

---

## Design Tokens

Tokens live in `app/globals.css` (`@theme`). The picker uses the shared Dropdown-List shell
(`app/_components/saa-dropdown.tsx`) with the **compact** row size and the **checked** state — the
key visual differences from the single-select board filters.

### Colors

| Token / Value | Hex | Usage |
|---------------|-----|-------|
| `#00070C` (literal in shell) | #00070C | Picker panel background |
| `--color-saa-gold-muted` | #998C5F | 1px panel border |
| `--color-saa-gold` | #FAE287 | Text-glow color on hover / checked rows |
| `--color-saa-gold-light` | #FFEA9E | Checked-row wash (`/20`); hover wash (`/10`); check-badge circle fill |
| `--color-saa-bg` | #00101A | Check-badge tick stroke (#00101A) |
| text | #FFFFFF | Row label text |

### Typography

| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| Compact row label | Montserrat (`--font-sans`) | 14px (`text-sm`) | 700 (`font-bold`) | 0.5px (`tracking-[0.5px]`) |

### Spacing / Sizing

| Value | Utility | Usage |
|-------|---------|-------|
| 6px | `p-1.5` | Panel inner padding |
| 16px | `px-4` | Row horizontal padding |
| 40px | `h-10` | Compact row height |
| 24×24 | viewBox `0 0 24 24` (`h-5 w-5` rendered) | Check-in-circle badge |
| 8px | `mt-2` | Panel offset below the add button |
| max-h 288px | `max-h-72` | Scroll cap on the panel |
| min-w 224px | `min-w-56` | Panel minimum width |

### Radius

| Value | Utility | Usage |
|-------|---------|-------|
| 8px | `rounded-lg` | Panel corners |
| 2px | `rounded-sm` | Compact row corners |

### Shadows / Effects

| Value | Usage |
|-------|-------|
| `shadow-2xl` | Panel drop shadow |
| `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Row text-glow on hover / checked |

---

## Layout Specifications

### Picker Panel (`SaaDropdownPanel`)

| Property | Value |
|----------|-------|
| Position | `absolute left-0 mt-2`; `z-20` (inside the compose modal) |
| Sizing | `min-w-56 max-h-72 overflow-y-auto saa-no-scrollbar` |
| Background | #00070C |
| Border | 1px `--color-saa-gold-muted` |
| Radius | 8px |
| Padding | 6px |

### Row — Unselected (D_Hashtag chưa chọn) (`SaaDropdownItem size="compact"`)

| Property | Value |
|----------|-------|
| Height | 40px (`h-10`) |
| Padding | `px-4` |
| Font | Montserrat 14px / 700, `tracking-[0.5px]`, white |
| Background | transparent (lighter than a checked row) |
| Hover | `bg-saa-gold-light/10` + text-glow |
| Trailing | none |

### Row — Selected (A/B/C) (`SaaDropdownItem checked`)

| Property | Value |
|----------|-------|
| Background | `bg-saa-gold-light/20` + text-glow |
| Trailing | Gold check-in-circle badge (`CheckBadge`, `h-5 w-5`) |

### Check Badge (`CheckBadge`)

| Property | Value |
|----------|-------|
| Container | `h-5 w-5 shrink-0`, viewBox `0 0 24 24` |
| Circle | `r=10`, fill #FFEA9E |
| Tick | stroke #00101A, `stroke-width 2.2`, round caps |

### Chips + Add Button (compose Hashtag row — `write-kudos-modal.tsx`)

| Element | Value |
|---------|-------|
| Chip | `inline-flex h-12 items-center gap-1.5 rounded-lg border border-saa-gold-muted bg-white px-3 text-sm font-bold text-saa-bg`; × on a `#D4271D` circle |
| Add button | `flex h-12 items-center gap-1 rounded-lg border border-saa-gold-muted bg-white px-2`; plus icon + "Hashtag" (13px) / "Tối đa 5" (11px, #999); hidden once five are selected |

---

## Layout Structure (ASCII)

```
Hashtag *   [ #BE OPTIMISTIC ✕ ] [ #GET RISKY ✕ ]  [ + Hashtag       ]
                                                    [   Tối đa 5      ]
                                                    ┌──────────────────────┐
                                                    │ #High-performing  (✔)│ ← checked: gold/20 + badge
                                                    │ #BE PROFESSIONAL     │ ← unselected: hover gold/10
                                                    │ #BE OPTIMISTIC    (✔)│
                                                    │ #BE A TEAM           │  rows: h-10, px-4, 14/700
                                                    │ #THINK OUTSIDE …     │
                                                    │ …(scroll, max-h-72)  │
                                                    └──────────────────────┘
        bg:#00070C · border:1px #998C5F · radius:8px · pad:6px · shadow-2xl
```

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Picker panel | 1002:13013 (frame) | `flex flex-col rounded-lg border border-saa-gold-muted bg-[#00070C] p-1.5 shadow-2xl` + `absolute left-0 z-20 mt-2 max-h-72 min-w-56 overflow-y-auto saa-no-scrollbar` | `SaaDropdownPanel` in `write-kudos-modal.tsx` |
| Selected row | 1002:13185 / 1002:13207 / 1002:13216 | `h-10 rounded-sm px-4 text-sm … bg-saa-gold-light/20 [text-shadow:…]` | `SaaDropdownItem checked size="compact"` |
| Unselected row | 1002:13104 | `h-10 rounded-sm px-4 text-sm … hover:bg-saa-gold-light/10` | `SaaDropdownItem size="compact"` |
| Check badge | A.2/B.2/C.2 (row children) | `h-5 w-5`, circle #FFEA9E, tick #00101A | `CheckBadge` |
| Add button / chips | N/A (compose form) | see table above | `AddButton` in `write-kudos-modal.tsx` |

---

## Notes

- Dark-mode only — no light overrides.
- The **checked** wash is `saa-gold-light/20` (stronger) vs. the single-select filters' `active`
  wash of `saa-gold-light/10` — this is the deliberate multi-select vs. single-select distinction.
- The check badge appears only on selected rows; unselected rows have no trailing glyph.
- The panel background `#00070C` is the shared intentional literal used across all SAA dropdowns.
