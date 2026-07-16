# Design Style: Dropdown-ngôn ngữ (Language Picker)

**Frame ID**: `hUyaaugye2`
**Figma Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:4942
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

> Shipped component: `app/_components/language-switcher.tsx` (Client Component). This overlay uses a
> standalone shell — it does **not** reuse `app/_components/saa-dropdown.tsx`.

---

## Design Tokens

### Colors

| Token / Value | Hex | Usage |
|---------------|-----|-------|
| `--color-saa-bg` | #00101a | Page background behind the header |
| Panel background | `bg-black/90` (rgba(0,0,0,0.9)) | Dropdown panel background (`backdrop-blur`) |
| Selected-row wash | `#2e3940` | Active locale row fill (= `--color-saa-divider`) |
| Trigger border | `border-white/15` | Toggle pill border |
| Trigger fill | `bg-white/5` → `hover:bg-white/10` | Toggle pill background |
| Panel border | `border-white/10` | 1px dropdown border |
| Text (primary) | #FFFFFF | "VN"/"EN" label, active row text |
| Text (idle row) | `text-white/80` → `hover:bg-white/5` | Non-selected row |

### Typography

| Element | Family | Size | Weight | Notes |
|---------|--------|------|--------|-------|
| Toggle code ("VN"/"EN") | Montserrat (`--font-sans`) | 14px (`text-sm`) | 500 (`font-medium`) | White |
| Row label | Montserrat | 14px (`text-sm`) | 500 (`font-medium`) | — |

### Spacing

| Element | Value | Tailwind |
|---------|-------|----------|
| Toggle height | 40px | `h-10` |
| Toggle padding-x | 12px | `px-3` |
| Toggle gap | 8px | `gap-2` |
| Panel offset from toggle | 8px | `mt-2` |
| Panel width | 112px | `w-28` |
| Row padding | 12px / 16px | `px-4 py-3` |
| Row gap (flag → text) | 10px | `gap-2.5` |

### Radius

| Element | Value | Tailwind |
|---------|-------|----------|
| Toggle pill | full | `rounded-full` |
| Panel | 12px | `rounded-xl` |
| Flag image | 3px | `rounded-[3px]` |

### Shadows / Effects

| Element | Value | Tailwind |
|---------|-------|----------|
| Panel | large drop shadow | `shadow-2xl` |
| Panel | blur behind | `backdrop-blur` |

### Icon / Image sizes

| Asset | Size | Source |
|-------|------|--------|
| Flag (VN / EN) | 24×18px | `/saa/flag-vn.svg`, `/saa/flag-en.svg` |
| Chevron-down | 12×12px | `/saa/chevron-down.svg` |
| EN row (A.2, Figma) | 110×56px | Figma node `I525:11713;362:6128` |

---

## Layout Specifications

- The overlay is anchored to the toggle via a `relative` wrapper; the panel is
  `absolute right-0 mt-2` (right-aligned under the toggle).
- The panel is a vertical stack of full-width rows (`flex flex-col`), `overflow-hidden` so row
  backgrounds are clipped to the 12px radius.
- An invisible `fixed inset-0 -z-10` backdrop button sits behind the open panel to capture
  outside-clicks.
- Figma renders the panel as two zones: a top "selected" zone on a dark-grey (`#2e3940`) wash and a
  bottom option zone on near-black — the shipped code expresses this as a highlighted vs. idle row.

### Layout Structure (ASCII)

```
        ┌──────────────────────┐
        │ 🇻🇳  VN         ▾    │  ← toggle pill (h-10, rounded-full, bg-white/5)
        └──────────────────────┘
                     │ (click → open)
                     ▼
        ┌───────────────┐  w-28, rounded-xl, bg-black/90, border-white/10
        │ 🇻🇳  VN        │  ← A.1 active row  (bg #2e3940, text-white)
        │ 🇬🇧  EN        │  ← A.2 idle row    (text-white/80, hover bg-white/5)
        └───────────────┘
        (invisible fixed inset-0 backdrop behind panel → click closes)
```

---

## Component Style Details

### Toggle (anchor pill)

| Property | Value | Tailwind |
|----------|-------|----------|
| height | 40px | `h-10` |
| layout | flex row, centred | `flex items-center gap-2` |
| padding-x | 12px | `px-3` |
| radius | full | `rounded-full` |
| border | 1px white/15 | `border border-white/15` |
| background | white/5 → white/10 hover | `bg-white/5 hover:bg-white/10` |
| transition | default | `transition` |
| a11y | `aria-haspopup="menu"`, `aria-expanded={open}` | — |

### A.1 / A.2 — Locale rows

| Property | Value | Tailwind |
|----------|-------|----------|
| layout | flex row, full width | `flex w-full items-center gap-2.5` |
| padding | 12px 16px | `px-4 py-3` |
| text | 14px / 500, left | `text-left text-sm font-medium` |
| active | `#2e3940` fill, white text | `bg-[#2e3940] text-white` |
| idle | 80% white, subtle hover | `text-white/80 hover:bg-white/5` |
| a11y | `role="menuitemradio"`, `aria-checked={selected}` | — |

---

## Notes

- **Dark-mode only** (`color-scheme: dark` in `app/globals.css`); no light-mode overrides.
- Flag images use `object-cover` at 24×18 with a 3px radius; `alt=""` (decorative — the text label
  carries meaning).
- This overlay deliberately diverges from the shared gold-bordered `SaaDropdownPanel` shell; keep
  the two styles independent.
