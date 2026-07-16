# Design Style: Profile bản thân

**Frame ID**: `3FoIx6ALVb`
**Figma Frame ID**: `362:5037`
**Frame Name**: `Profile bản thân`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=362:5037
**Frame Image**: see `assets/frame.url.txt`
(`https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/362:5037/4917c83ce2aca2b4f17bdb64ed978c8d.png`)
**Extracted At**: 2026-07-16

---

## Design Tokens

All tokens are defined in `app/globals.css` under `@theme` (the SAA 2025 palette) and consumed via
Tailwind utilities (`text-saa-gold-light`, `border-saa-gold-muted`, `bg-saa-bg`, …). Two literal
surfaces (`#00070C` card fill, `17px` card radius) are arbitrary values used directly in the
component classes.

### Colors

| Token / Value | Hex / RGBA | Usage on this screen |
|---------------|-----------|----------------------|
| `--color-saa-bg` | `#00101a` | Page background; bottom stop of the hero gradient (`via-saa-bg/50 to-saa-bg`) |
| `--color-saa-gold` | `#fae287` | "KUDOS" section heading; active nav tab; dropdown text-glow |
| `--color-saa-gold-light` | `#ffea9e` | Name text; avatar border; stat values; filter/hover tints |
| `--color-saa-gold-muted` | `#998c5f` | Stats-card border; icon-slot border; filter button border; dropdown panel border |
| `--color-saa-red` | `#d4271d` | "Spam" corner ribbon (`bg-saa-red`) |
| `--color-saa-divider` | `#2e3940` | Divider inside the stats card; `SectionHeading` rule |
| `#00070C` (literal) | `#00070C` | Stats-card fill; icon-slot fill; `SaaDropdownPanel` fill |
| `#FFF8E1` (literal) | `#FFF8E1` | `KudosCard` surface (cream) |
| white / `white/40` / `white/80` / `white/5` | `#ffffff` @ α | Department + collection labels; nav; header border; dot separators |

### Typography

Single family — `--font-sans: var(--font-montserrat)` (Montserrat), set on `body` in
`app/globals.css`. Sizes below are the Tailwind utilities used in the shipped components.

| Element | Tailwind | Size / Weight / Line-height |
|---------|----------|-----------------------------|
| Name (`A.2_Name`) | `text-3xl font-bold sm:text-[32px]` | 30px → 32px / 700 |
| Department | `text-base font-bold` | 16px / 700 |
| Collection label | `text-base font-bold` | 16px / 700 |
| Stat row label | `text-lg font-bold leading-7 sm:text-[22px]` | 18px → 22px / 700 / 28px |
| Stat row value | `text-2xl font-bold sm:text-[32px]` | 24px → 32px / 700 |
| Section caption (`C.1`) | `text-2xl font-bold` | 24px / 700 |
| Section title "KUDOS" (`C.2`) | `text-4xl font-bold tracking-[-0.25px] md:text-[57px] md:leading-[64px]` | 36px → 57px / 700 / 64px |
| Filter button (`C.3`) | `text-sm font-semibold` | 14px / 600 |
| "Spam" ribbon | `text-sm font-bold` | 14px / 700 |

### Spacing

| Value | Tailwind | Usage |
|-------|----------|-------|
| 144px top | `pt-36` | Hero container top padding (clears the fixed 64px header + KV band) |
| 56px | `pb-14` | Hero container bottom padding |
| 32px | `gap-8` | Gap between hero blocks (identity / collection / stats) |
| 24px | `px-6` | Page horizontal padding |
| 16px | `gap-4` / `p-6` | Identity/collection inner gaps; stats-card padding |
| 12→16px | `gap-3 sm:gap-4` | Icon-slot grid gap |
| 40px | `gap-10` | `ProfileKudos` outer gap (heading ↔ list) |
| 24px | `gap-6` | Gap between kudos cards |
| 80px | `pb-20` | KUDOS section bottom padding |
| 16/12px | `px-4 py-3` | Filter button padding |

### Border & Radius

| Value | Tailwind | Usage |
|-------|----------|-------|
| full | `rounded-full` | Avatar; six icon slots; white/40 separator dots |
| 4px border | `border-4 border-saa-gold-light` | Avatar ring |
| 1px border | `border border-saa-gold-muted` | Stats card; filter button; dropdown panel |
| 1px @50% | `border border-saa-gold-muted/50` | Icon-slot outline |
| 17px | `rounded-[17px]` | Stats card |
| 4px | `rounded` | Filter button |
| 8px | `rounded-lg` | `SaaDropdownPanel` |
| 24/16px | `rounded-3xl` / `rounded-2xl` | `KudosCard` (full / highlight) |
| bottom-left | `rounded-bl-xl` | "Spam" ribbon corner |

### Shadows & Effects

| Value | Tailwind | Usage |
|-------|----------|-------|
| backdrop blur | `backdrop-blur-md` | Fixed header |
| 2xl shadow | `shadow-2xl` | Dropdown panel |
| gold text-glow | `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | Active/hover dropdown row |
| zoom-in | `.saa-zoom-in` (globals.css keyframes) | Secret Box modal entrance |

### Sizes (from the shipped components)

| Element | Value |
|---------|-------|
| Avatar | `h-28 w-28` (112px) → `sm:h-32 sm:w-32` (128px) |
| Icon slot | `h-12 w-12` (48px) → `sm:h-14 sm:w-14` (56px) |
| Hero KV band height | `h-[360px]` |
| Hero rank badge | `h-[19px] w-auto` (PNG bakes the label; Figma node ~109×19) |
| Content container | `max-w-[1200px]` |
| Stats card width | `w-full max-w-[680px]` |
| Kudos list width | `w-full max-w-[752px]` |
| Fire (🔥) badge | `h-8 w-8` grid, `x2` overlay `text-[11px]` |

---

## Layout Specifications

The page is a single centered column (`max-w-[1200px]`, `px-6`) under the fixed `SiteHeader`,
followed by `SiteFooter`.

### Header (shared `SiteHeader`)

| Property | Value |
|----------|-------|
| Position | `fixed inset-x-0 top-0 z-50` |
| Height | `h-16` (64px), inner `max-w-7xl` |
| Background | `bg-gradient-to-b from-saa-bg/95 to-saa-bg/40 backdrop-blur-md`, `border-b border-white/5` |

### Hero Section (`A_Info` + `B_Thống kê`)

| Property | Value |
|----------|-------|
| Wrapper | `relative isolate overflow-hidden` |
| KV band | `absolute inset-x-0 top-0 -z-10 h-[360px]`; `<img src="/saa/kudos-kv-bg.png" object-cover>` |
| KV fade | `absolute inset-0 bg-gradient-to-b from-transparent via-saa-bg/50 to-saa-bg` |
| Container | `mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pb-14 pt-36` |
| Identity block | `flex flex-col items-center gap-4` |
| Collection block | `flex flex-col items-center gap-4`; grid `flex flex-wrap justify-center gap-3 sm:gap-4` |
| Stats card | `StatsCard` `w-full max-w-[680px]` |

### KUDOS Section (`C_Header Giải thưởng` + `D_Post all`)

| Property | Value |
|----------|-------|
| Wrapper | `mx-auto max-w-[1200px] px-6 pb-20 pt-4` |
| Composition | `<ProfileKudos>` → `SectionHeading` (caption + "KUDOS" + filter) over the list |
| List | `mx-auto flex w-full max-w-[752px] flex-col gap-6` of `KudosCard` |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────── SiteHeader (fixed, h-16) ─────────────────┐
│ [logo]  About  Awards  Kudos            🔔  [VN ▾]  [ avatar ]            │
└───────────────────────────────────────────────────────────────────────────┘
┌── HERO (relative isolate) ────────────────────────────────────────────────┐
│  ▓▓▓ KV band  /saa/kudos-kv-bg.png  (absolute, -z-10, h-[360px]) ▓▓▓       │
│  ▒ gradient  from-transparent → via-saa-bg/50 → to-saa-bg ▒               │
│                                                                            │
│        ┌─ A_Info (identity) — items-center, gap-8, pt-36 ──┐              │
│        │            (   AVATAR  112/128px   )               │  A.1_Avatar  │
│        │              ● gold ring (border-4)                │              │
│        │           Bùi Thị Huyền Trang  (gold, 32px)        │  A.2_Name    │
│        │        CEVC3  •  [Legend Hero badge h-[19px]]      │  A.3_Huy Hiệu│
│        └────────────────────────────────────────────────────┘             │
│        ┌─ icon collection (6 slots) ──────────────────────┐               │
│        │  ( )  ( )  ( )  ( )  ( )  ( )    48/56px, grey    │  B2..B7       │
│        │        "Bộ sưu tập icon của tôi"                   │              │
│        └────────────────────────────────────────────────────┘             │
│        ┌─ B_Thống kê  (StatsCard, max-w-[680px]) ──────────┐              │
│        │  Số Kudos bạn nhận được:               25          │  B.1         │
│        │  Số Kudos bạn đã gửi:                  25          │  B.2         │
│        │  Số tim bạn nhận được:          🔥x2   25          │  B.3         │
│        │  ────────────────────────────────────────────     │              │
│        │  Số Secret Box bạn đã mở:              25          │  B.4         │
│        │  Số Secret Box chưa mở:                25          │  B.5         │
│        │  [           Mở Secret Box            ]            │  B.6         │
│        └────────────────────────────────────────────────────┘             │
└────────────────────────────────────────────────────────────────────────────┘
┌── KUDOS SECTION (max-w-[1200px], px-6, pb-20) ───────────────────────────┐
│  Sun* Annual Awards 2025                                       C.1_title   │
│  ─────────────────────────────────────────────────────────────           │
│  KUDOS                                    [ Đã gửi (6) ▾ ]     C.2 / C.3   │
│                                                                            │
│     ┌──────────── KudosCard (max-w-[752px]) ─────────────┐ [Spam]  D.3.1  │
│     │ sender  → (send)  receiver                          │               │
│     │ 10:00 - 10/30/2025   IDOL GIỚI TRẺ                  │  D_Post all   │
│     │ ┌ body (cream #FFF8E1) ┐                             │               │
│     │ #tags…    ❤ 1.000        Copy Link                  │               │
│     └──────────────────────────────────────────────────────┘             │
│     ┌──────────── KudosCard … ─────────────┐                              │
└────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────── SiteFooter ──────────────────────────────┐
│ [logo]  About  Awards  Kudos  …          Bản quyền thuộc về Sun* © 2025   │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A.1_Avatar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5053` | — |
| size | 112px → 128px | `h-28 w-28 sm:h-32 sm:w-32` |
| shape | circle | `rounded-full object-cover` |
| ring | 4px gold | `border-4 border-saa-gold-light` |
| src | `avatarUrl ?? "/saa/kudos-avatar-2.png"` | `<img>` |

### A.2_Name / A.3_Huy Hiệu

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5054` / `362:5064` | — |
| name | gold, 30→32px bold | `text-3xl font-bold text-saa-gold-light sm:text-[32px]` |
| department | white, 16px bold | `text-base font-bold text-white` |
| separator | 4px white dot | `h-1 w-1 rounded-full bg-white/40` |
| badge | `RANK_BADGE.legend` PNG | `h-[19px] w-auto` |

### B2–B7 Icon Collection Slots

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5066`–`362:5071` | — |
| count | 6 | `Array.from({ length: 6 })` |
| size | 48px → 56px | `h-12 w-12 sm:h-14 sm:w-14` |
| shape/fill | circle, `#00070C` | `rounded-full bg-[#00070C]` |
| outline | 1px gold-muted @50% | `border border-saa-gold-muted/50` |
| label | "Bộ sưu tập icon của tôi" | `text-base font-bold text-white` |

**States**: today all six are static placeholders (grey). Figma intent: filled per unlocked icon.

### B_Thống kê (StatsCard)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5073` | — |
| container | `#00070C`, gold-muted border, 17px radius, 24px pad | `rounded-[17px] border border-saa-gold-muted bg-[#00070C] p-6` |
| row gap | 16px | `flex flex-col gap-4` |
| row layout | label ↔ value | `flex items-center justify-between gap-3` |
| label | white, 18→22px bold | `text-lg font-bold leading-7 text-white sm:text-[22px]` |
| value | gold-light, 24→32px bold | `text-2xl font-bold text-saa-gold-light sm:text-[32px]` |
| 🔥×2 badge | emoji + stroked "x2" | `text-[11px] font-bold text-white [-webkit-text-stroke:0.8px_#000]` |
| divider (`B.4`↑) | 1px | `h-px w-full bg-saa-divider` |
| CTA (`B.6`) | "Mở Secret Box" → modal | `OpenSecretBox` (opens `J3-4YFIpMM`) |

### C_Header Giải thưởng (SectionHeading)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5084` (`C.1` `362:5085`, `C.2` `362:5088`, `C.3` `362:5089`) | — |
| caption | white, 24px bold | `text-2xl font-bold text-white` |
| rule | 1px | `h-px w-full bg-saa-divider` |
| title | gold, 36→57px bold | `text-4xl font-bold tracking-[-0.25px] text-saa-gold md:text-[57px] md:leading-[64px]` |
| right slot | filter dropdown | passed as `right={filter}` |

### C.3_Button — Sent/Received Filter

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5089` | — |
| trigger | gold-muted border, gold/10 fill | `inline-flex items-center gap-2 rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-3 text-sm font-semibold text-white` |
| hover | gold/20 fill | `hover:bg-saa-gold-light/20` |
| label | "{Đã gửi\|Đã nhận} (n)" | text + count |
| chevron | `/saa/chevron-down.svg` | `h-4 w-4 transition-transform`, `rotate-180` when open |
| ARIA | `aria-haspopup="menu"`, `aria-expanded` | — |
| panel | `SaaDropdownPanel` | `absolute right-0 z-20 mt-2 min-w-44` |
| items | "Đã gửi" / "Đã nhận" | `SaaDropdownItem` `active` = current tab |

**States**: closed / open (backdrop `fixed inset-0 -z-10` closes on outside click); active row gets
`bg-saa-gold-light/10` + gold text-glow.

### D_Post all / D.3.1_Status (KudosCard + Spam ribbon)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `362:5091` / `3127:24095` | — |
| card | cream surface, 24px radius | `rounded-3xl bg-[#FFF8E1] p-6 pb-4 sm:p-10 sm:pb-4` |
| ribbon | red, top-right | `absolute right-0 top-0 z-10 rounded-bl-xl bg-saa-red px-4 py-1.5 text-sm font-bold text-white` |
| ribbon rule | first 2 sent kudos only | `status={tab === "sent" && i < 2 ? t.spam : undefined}` |
| actions | Copy Link (+ hearts) | per `CardLabels` |

---

## Responsive Specifications

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | Single column; avatar 112px, icon slots 48px, stat rows 18px labels / 24px values; icon grid `gap-3`; stats/list are `w-full` under `px-6` |
| `sm` (≥640px) | Avatar 128px, icon slots 56px, stat labels 22px / values 32px, icon grid `gap-4` |
| `md` (≥768px) | "KUDOS" heading scales to 57px / 64px line-height |
| Desktop (≥1024px) | Full layout; content capped at `max-w-[1200px]`, stats `max-w-[680px]`, list `max-w-[752px]`, all centered |

No horizontal overflow at any width — everything is a centered flex column with `max-w` caps.

---

## Component Hierarchy with Styles

```
ProfilePage (Server) — app/profile/page.tsx
├── SiteHeader (Client) — fixed, h-16, backdrop-blur   [mms_1_Button]
├── <main>
│   ├── section.hero (relative isolate overflow-hidden)
│   │   ├── KV band img /saa/kudos-kv-bg.png (-z-10, h-[360px])  [mms_3_Keyvisual]
│   │   ├── gradient overlay (via-saa-bg/50 → to-saa-bg)
│   │   └── container (max-w-[1200px], gap-8, pt-36)
│   │       ├── A_Info identity (avatar / name / dept · badge)   [362:5052/5053/5054/5064]
│   │       ├── icon collection (6 × slot + label)               [362:5066–5071]
│   │       └── StatsCard (max-w-[680px])                        [362:5073 → B.1–B.6]
│   │           └── OpenSecretBox → Secret Box modal             [362:5082 → J3-4YFIpMM]
│   └── section.kudos (max-w-[1200px], pb-20)
│       └── ProfileKudos (Client)                                [362:5091]
│           ├── SectionHeading (caption / KUDOS / filter)        [362:5084/5085/5088/5089]
│           │   └── filter → SaaDropdownPanel + SaaDropdownItem×2
│           └── list (max-w-[752px]) → KudosCard×n
│               └── Spam ribbon on first 2 "sent"                [3127:24095]
└── SiteFooter (Server)
```

---

## Icon / Asset Specifications

| Asset | Path | Notes |
|-------|------|-------|
| Hero KV background | `/saa/kudos-kv-bg.png` | Decorative (`alt=""`) |
| Fallback avatar | `/saa/kudos-avatar-2.png` | Used when metadata has no avatar |
| Legend Hero badge | `/saa/kudos-badge-legend.png` | `RANK_BADGE.legend`; label baked into PNG |
| Filter chevron | `/saa/chevron-down.svg` | Rotates 180° on open |
| Header logo | `/saa/logo-header.png` | Shared `SiteHeader` |
| Fire emoji | 🔥 (text) + stroked "x2" | Likes-received bonus badge |

---

## Notes

- **Palette source of truth**: `app/globals.css` `@theme` (`--color-saa-*`). Consume via Tailwind
  utilities; the only literal surfaces are the `#00070C` dark card/slot/panel fill and the
  `#FFF8E1` cream `KudosCard`, both pre-existing across the Kudos feature.
- **Font**: Montserrat only (`--font-sans` on `body`). The `DSEG7 Classic` face in globals.css is
  for the prelaunch countdown and is not used here.
- **Shared components**: `StatsCard`, `OpenSecretBox`, `KudosCard`, `SectionHeading` and the
  `SaaDropdown` shell are imported from the Kudos feature — the profile adds no bespoke visual
  primitives, only composition.
- Dark theme only; `color-scheme: dark` is set globally.
