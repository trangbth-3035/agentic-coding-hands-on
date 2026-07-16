# Design Style: Dropdown-profile Admin (Account Menu — Admin)

**Frame ID**: `54rekaCHG1`
**Figma Frame ID**: `721:5277`
**Frame Name**: `Dropdown-profile Admin`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5277
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

> Shell component: `app/_components/saa-dropdown.tsx` (`SaaDropdownPanel` + `SaaDropdownItem`; the
> shell's docstring names `54rekaCHG1` as one of its source frames). Host:
> `app/_components/site-header.tsx`. This is the 3-item Admin variant; the 2-item regular variant is
> [`z4sCl3_Qtk`](../z4sCl3_Qtk-dropdown-profile/design-style.md).

---

## Design Tokens

### Colors (from `app/globals.css` `@theme`)

| Token | Hex | Usage |
|-------|-----|-------|
| Panel background | `#00070C` (literal) | Dropdown panel fill (`bg-[#00070C]`) |
| `--color-saa-gold-muted` | #998c5f | 1px panel border (`border-saa-gold-muted`) |
| `--color-saa-gold` | #fae287 | Text-glow color (`0 0 6px #FAE287`) on hover/active rows |
| `--color-saa-gold-light` | #ffea9e | Row highlight wash (`bg-saa-gold-light/10`) |
| Text | #FFFFFF | Row labels (`text-white`, `font-bold`) |
| Trigger border | `border-white/10` | Avatar button border |
| Trigger fill | `bg-white/5` → `hover:bg-white/10` | Avatar button background |

### Typography

| Element | Family | Size | Weight | Notes |
|---------|--------|------|--------|-------|
| Row label | Montserrat (`--font-sans`) | 16px (`text-base`) | 700 (`font-bold`) | `tracking-[0.5px]`, white |

### Spacing

| Element | Value | Tailwind |
|---------|-------|----------|
| Panel padding | 6px | `p-1.5` |
| Panel min-width | 208px | `min-w-52` |
| Panel offset | 8px | `mt-2` |
| Row height | 56px | `h-14` |
| Row padding-x | 16px | `px-4` |
| Row gap (label → icon) | 8px | `gap-2` |
| Avatar button | 40×40px | `h-10 w-10` |
| Icon | 24×24px | `h-6 w-6` |

### Radius

| Element | Value | Tailwind |
|---------|-------|----------|
| Panel | 8px | `rounded-lg` |
| Row | 4px | `rounded` |
| Avatar button | full | `rounded-full` |

### Shadows / Effects

| Element | Value | Tailwind / CSS |
|---------|-------|----------------|
| Panel | large drop shadow | `shadow-2xl` |
| Row hover/active glow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | `[text-shadow:…]` (gold glow) |
| Row hover/active wash | gold/10 | `bg-saa-gold-light/10` |
| Open animation | none | per Figma (`A_Dropdown-List`: no animation) |

### Figma sizes

| Element | Size | Node |
|---------|------|------|
| Rows | 56px tall | `A_Dropdown-List` (666:9728) |

---

## Layout Specifications

- Panel is `absolute right-0 z-50 mt-2 min-w-52`, right-aligned under the avatar, inside the
  header's `relative` wrapper.
- `SaaDropdownPanel` stacks **three** `SaaDropdownItem` rows (`flex flex-col`).
- Each row: left-aligned label (`flex-1`) + trailing 24×24 glyph.
- Invisible `fixed inset-0 -z-10` backdrop button (in `site-header.tsx`) handles outside-click close.

### Layout Structure (ASCII)

```
                    ┌────────┐
                    │  (av)  │  ← avatar trigger (h-10 w-10, rounded-full)
                    └────────┘
                         │ (click → open)
                         ▼
   ┌──────────────────────────────┐  min-w-52, rounded-lg, bg-#00070C,
   │  Trang cá nhân        [user] │   border-saa-gold-muted, p-1.5, shadow-2xl
   │  Dashboard            [grid] │   ← rows: h-14, hover → gold wash + glow
   │  Đăng xuất             [ ›  ]│
   └──────────────────────────────┘
   (invisible fixed inset-0 backdrop → click closes)
```

---

## Component Style Details

### Avatar trigger

| Property | Value | Tailwind |
|----------|-------|----------|
| size | 40×40px | `h-10 w-10` |
| layout | grid, centred | `grid place-items-center` |
| radius | full | `rounded-full` |
| border | 1px white/10 | `border border-white/10` |
| background | white/5 → white/10 hover | `bg-white/5 hover:bg-white/10` |
| content | avatar `<img>` (cover) or `/saa/icon-user.svg` fallback | — |
| a11y | `aria-haspopup="menu"`, `aria-expanded`, `aria-label={dict.header.account}` | — |

### SaaDropdownItem rows

| Row | Element | Trailing icon | Label |
|-----|---------|---------------|-------|
| A.1_Profile | anchor (`href="/profile"`) | `/saa/icon-user.svg` | `dict.header.profile` |
| A.2_Dashboard | anchor (`href="/dashboard"`) | `/saa/icon-grid.svg` | `dict.header.dashboard` |
| A.3_Logout | `type="submit"` inside `<form action={signOut}>` | `/saa/icon-chevron-right.svg` | `dict.header.signOut` |

| Property | Value | Tailwind |
|----------|-------|----------|
| height | 56px | `h-14` |
| padding-x | 16px | `px-4` |
| text | 16px / 700, `tracking-[0.5px]`, white | `text-base font-bold text-white` |
| hover | gold wash + gold text-glow | `hover:bg-saa-gold-light/10 hover:[text-shadow:…]` |
| radius | 4px | `rounded` |

---

## Notes

- **Dark-mode only**; gold-muted border + gold text-glow are the signature SAA dropdown treatment.
- Visually identical to `z4sCl3_Qtk` plus the middle "Dashboard" row.
- Row icons are decorative (`alt=""`); the text label carries meaning.
- Figma specifies **no open animation** for this panel.
