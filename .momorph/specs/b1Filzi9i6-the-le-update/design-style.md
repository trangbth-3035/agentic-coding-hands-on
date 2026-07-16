# Design Style: Thể lệ UPDATE

**Frame ID**: `b1Filzi9i6`
**Figma Frame ID**: `3204:6051`
**Frame Name**: `Thể lệ UPDATE`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=3204:6051
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

---

## Design Tokens

All tokens are consumed from `app/globals.css` (`@theme` block, SAA palette + `saa-*` keyframes).
Values below cite the token and the Tailwind class actually used in
`app/_components/rules-modal.tsx`.

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-saa-gold-light` | #ffea9e | 100% | Panel title, section headings, primary "Viết KUDOS" button fill |
| `--color-saa-gold-muted` | #998c5f | 100% | "Đóng" button border |
| `--color-saa-bg` | #00101a | 100% | Primary button text color (`text-saa-bg`) |
| `#00070C` | #00070c | 100% | Drawer panel background (`bg-[#00070C]`) — near-black, one step darker than the page |
| `#FFFFFF` | #ffffff | 100% / 90% | Body copy (`text-white`, tier body at `text-white/90`) |
| black | #000000 | 60% | Dimmed backdrop (`bg-black/60`) behind the panel |

### Typography

Font family is the global `--font-sans` (Montserrat) from `app/globals.css`.

| Role | Size | Weight | Line Height | Tailwind |
|------|------|--------|-------------|----------|
| Panel title ("Thể lệ") | 40px → 45px (sm) | 700 | tight → 52px (sm) | `text-[40px] font-bold leading-tight sm:text-[45px] sm:leading-[52px]` |
| Section heading | 22px | 700 | 28px | `text-[22px] font-bold leading-7` |
| Body copy | 16px | 700 | 24px | `text-base font-bold leading-6 tracking-[0.5px]` |
| Tier count label | 16px | 700 | 24px | `text-base font-bold leading-6 tracking-[0.5px]` |
| Tier description | 14px | 700 | 20px | `text-sm font-bold leading-5 tracking-[0.1px]` |
| Button label | 16px | 700 | — | `text-base font-bold` |

### Spacing

| Value | Usage | Tailwind |
|-------|-------|----------|
| 24px (px) / 40px (sm px) | Panel horizontal padding | `px-6 sm:px-10` |
| 24px top / 40px bottom | Panel vertical padding | `pt-6 pb-10` |
| 40px | Gap between the scroll body and the pinned footer | `gap-10` (with `justify-between`) |
| 24px | Gap between title and rule blocks / between rule items | `gap-6` |
| 16px | Gap between rule paragraphs and between footer buttons | `gap-4` |
| 20px | Left indent of each tier row | `pl-5` |
| 24px | Left/right padding of the icon grid | `px-6` |
| 8px | Icon ↔ label gap inside buttons and tier rows | `gap-2` |

### Border & Radius

| Value | Usage | Tailwind |
|-------|-------|----------|
| 4px (rounded) | Both footer buttons | `rounded` |
| 1px solid `--color-saa-gold-muted` | "Đóng" button outline | `border border-saa-gold-muted` |

### Shadows & Effects

| Effect | Usage | Tailwind / CSS |
|--------|-------|----------------|
| Backdrop blur | Dimmed page behind the panel | `bg-black/60 backdrop-blur-sm` |
| Hidden scrollbar | Panel keeps scroll but hides chrome | `.saa-no-scrollbar` (globals.css) |

### Animations

| Name | Keyframe (globals.css) | Applied To |
|------|------------------------|-----------|
| `saa-drawer-in` | `translateX(100%) → none`, 0.25s ease-out | Drawer panel entrance (`.saa-drawer-in`) |
| `saa-fade-in` | `opacity 0 → 1`, 0.25s ease-out | Backdrop fade (`.saa-fade-in`) |

---

## Layout Specifications

### Overlay (root)

| Property | Value | Tailwind |
|----------|-------|----------|
| Position | fixed, full-viewport | `fixed inset-0` |
| Z-index | 70 | `z-[70]` |
| Alignment | push panel to the right edge | `flex justify-end` |
| Role | dialog | `role="dialog" aria-modal="true"` |
| Rendered via | `createPortal(..., document.body)` | — |

### Panel (aside)

| Property | Value | Tailwind |
|----------|-------|----------|
| Width | full width, capped at 553px | `w-full max-w-[553px]` |
| Height | full viewport | `h-full` |
| Background | #00070C | `bg-[#00070C]` |
| Layout | column, body/footer split | `flex flex-col justify-between gap-10` |
| Overflow | vertical scroll, hidden scrollbar | `overflow-y-auto saa-no-scrollbar` |
| Padding | `pt-6 pb-10`, `px-6` → `sm:px-10` | `px-6 pb-10 pt-6 sm:px-10` |

### Footer action row

| Property | Value | Tailwind |
|----------|-------|----------|
| Layout | row, 16px gap | `flex gap-4` |
| "Đóng" | outlined, gold-tinted fill | `rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-4 text-white hover:bg-saa-gold-light/20` |
| "Viết KUDOS" | grows to fill, gold fill | `flex-1 rounded bg-saa-gold-light px-4 py-4 text-saa-bg hover:brightness-105` |
| Button icons | 24×24 | `<Image w=24 h=24 className="h-6 w-6">` |

---

## Layout Structure (ASCII)

```
        dimmed + blurred backdrop (bg-black/60, fade-in)   ┌── panel (max-w 553px, #00070C) ──┐
                                                           │  slides in from right →          │
                                                           │                                  │
                                                           │  Thể lệ            (40/45px gold) │
                                                           │                                  │
                                                           │  NGƯỜI NHẬN KUDOS  (22px heading) │
                                                           │  <intro body 16px white>          │
                                                           │    [badge] 1-4 người gửi…         │
                                                           │    <desc 14px white/90>           │
                                                           │    [badge] 5-9 người gửi…         │
                                                           │    [badge] 10-20 người gửi…       │
                                                           │    [badge] 20+ người gửi…         │
                                                           │                                  │
                                                           │  NGƯỜI GỬI KUDOS   (22px heading) │
                                                           │  <intro body 16px white>          │
                                                           │   ┌ icon ┐ ┌ icon ┐ ┌ icon ┐      │
                                                           │   └──────┘ └──────┘ └──────┘      │
                                                           │   ┌ icon ┐ ┌ icon ┐ ┌ icon ┐      │
                                                           │   └──────┘ └──────┘ └──────┘      │
                                                           │  <footnote body 16px white>       │
                                                           │                                  │
                                                           │  KUDOS QUỐC DÂN    (22px heading) │
                                                           │  <body 16px white>                │
                                                           │  ─── (scrolls if long) ───        │
                                                           │ ┌──────────┐ ┌────────────────┐  │
                                                           │ │ ✕  Đóng  │ │ ✎  Viết KUDOS  │  │
                                                           │ │(outlined)│ │  (gold, flex-1)│  │
                                                           │ └──────────┘ └────────────────┘  │
                                                           └──────────────────────────────────┘
```

---

## Component Style Details

### A_Nội dung thể lệ — Rules body (`3204:6053`)

- Title: `<h2>` "Thể lệ", `text-[40px]/[45px] font-bold text-saa-gold-light`.
- Three blocks, each a `Heading` (`text-[22px] font-bold leading-7 text-saa-gold-light`) + `Body`
  (`text-justify text-base font-bold leading-6 tracking-[0.5px] text-white`).
- Receiver tiers: mapped from `t.tiers`, each row indented `pl-5`, badge `img` at `h-[22px] w-auto`
  from `RULE_HERO_BADGES[i]`, count label `text-base`, description `text-sm text-white/90`.
- Sender icons: `RULE_ICONS` in two rows of three (`flex justify-between`, container `px-6 gap-4`),
  each icon `w-20` (80px), `self-start`.

### B.1_Button đóng — Close button (`3204:6093`)

- Outlined secondary: `rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-4`,
  `text-base font-bold text-white`, hover `bg-saa-gold-light/20`.
- Leading icon `/saa/widget-close.svg` 24×24, then `t.close` ("Đóng").
- `onClick={onClose}`.

### B.2_Button viết kudos — Write-KUDOS button (`3204:6094`)

- Primary: `flex-1 rounded bg-saa-gold-light px-4 py-4`, `text-base font-bold text-saa-bg`, hover
  `brightness-105`.
- Leading icon `/saa/widget-pen.svg` 24×24, then `t.writeKudos` ("Viết KUDOS").
- `onClick={onWriteKudos}` — closes the drawer and opens the compose modal.

---

## Responsive Specifications

| Breakpoint | Behavior |
|------------|----------|
| Mobile (≥320px) | Panel is full width (`w-full`), padding `px-6`, title 40px; content scrolls vertically |
| `sm` (≥640px) | Padding relaxes to `px-10`, title steps up to 45px/52px line-height |
| Desktop | Panel caps at `max-w-[553px]` pinned to the right; backdrop fills the rest |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Overlay root | 3204:6051 | `fixed inset-0 z-[70] flex justify-end` | `RulesModal` |
| Backdrop | — | `saa-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm` | `RulesModal` |
| Panel | 3204:6051 | `saa-drawer-in saa-no-scrollbar h-full w-full max-w-[553px] flex flex-col justify-between gap-10 overflow-y-auto bg-[#00070C] px-6 pb-10 pt-6 sm:px-10` | `RulesModal` |
| Rules body | 3204:6053 | `flex flex-col gap-6` | `RulesModal` |
| Section heading | (within 3204:6053) | `text-[22px] font-bold leading-7 text-saa-gold-light` | `Heading` |
| Body copy | (within 3204:6053) | `text-justify text-base font-bold leading-6 tracking-[0.5px] text-white` | `Body` |
| Footer row | 3204:6092 | `flex gap-4` | `RulesModal` |
| Close button | 3204:6093 | `rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-4 text-white hover:bg-saa-gold-light/20` | `RulesModal` |
| Write-KUDOS button | 3204:6094 | `flex-1 rounded bg-saa-gold-light px-4 py-4 text-saa-bg hover:brightness-105` | `RulesModal` |

---

## Notes

- **Color mode**: dark-mode only (page `color-scheme: dark`). No light-mode overrides.
- **Fonts**: Montserrat via the global `--font-sans`; no per-component font override.
- **Icons**: rendered as decorative images (`alt=""`) via `next/image` at 24×24; the badge/icon PNGs
  in `RULE_HERO_BADGES` / `RULE_ICONS` bake in their own styled labels.
- **Panel surface** `#00070C` is intentionally darker than the page `--color-saa-bg` (`#00101a`) to
  separate the drawer from the dimmed page behind it.
