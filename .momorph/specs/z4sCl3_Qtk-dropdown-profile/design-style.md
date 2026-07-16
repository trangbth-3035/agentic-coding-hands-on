# Design Style: Dropdown-profile (Account Menu — Regular User)

**Frame ID**: `z4sCl3_Qtk`
**Figma Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5223
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

> Shell component: `app/_components/saa-dropdown.tsx` (`SaaDropdownPanel` + `SaaDropdownItem`).
> Host: `app/_components/site-header.tsx`. This is the 2-item (regular-user) variant of the shared
> account menu; the 3-item Admin variant is [`54rekaCHG1`](../54rekaCHG1-dropdown-profile-admin/design-style.md).

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

### Figma sizes

| Element | Size | Node |
|---------|------|------|
| A.1_Profile row | 119×56px | `I666:9601;563:7844` |
| Rows | 56px tall | `A_Dropdown-List` (666:9601) |

---

## Layout Specifications

- The panel is `absolute right-0 z-50 mt-2 min-w-52`, right-aligned under the avatar button, inside
  the header's `relative` wrapper.
- It is a vertical stack (`SaaDropdownPanel` → `flex flex-col`) of two `SaaDropdownItem` rows.
- Each row shows a left-aligned label (`flex-1`) with a trailing 24×24 glyph.
- An invisible `fixed inset-0 -z-10` backdrop button (in `site-header.tsx`) closes the menu on
  outside click.

### Layout Structure (ASCII)

```
                    ┌────────┐
                    │  (av)  │  ← avatar trigger (h-10 w-10, rounded-full)
                    └────────┘
                         │ (click → open)
                         ▼
   ┌──────────────────────────────┐  min-w-52, rounded-lg, bg-#00070C,
   │  Trang cá nhân        [user] │   border-saa-gold-muted, p-1.5, shadow-2xl
   │  Đăng xuất             [ ›  ]│   ← rows: h-14, hover → gold wash + glow
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

| Property | Value | Tailwind |
|----------|-------|----------|
| height | 56px | `h-14` |
| layout | flex row | `flex items-center gap-2` |
| padding-x | 16px | `px-4` |
| text | 16px / 700, `tracking-[0.5px]`, white | `text-base font-bold text-white` |
| hover | gold wash + gold text-glow | `hover:bg-saa-gold-light/10 hover:[text-shadow:…]` |
| radius | 4px | `rounded` |
| Profile row | anchor (`href="/profile"`), trailing `/saa/icon-user.svg` | — |
| Logout row | `type="submit"` inside `<form action={signOut}>`, trailing `/saa/icon-chevron-right.svg` | — |

---

## Notes

- **Dark-mode only**; the shell's gold-muted border + gold text-glow are the signature SAA dropdown
  treatment (shared with the Phòng ban / Hashtag filters).
- Row icons are decorative (`alt=""`); the text label carries meaning.
- This variant is visually identical to the Admin menu minus the middle "Dashboard" row.
