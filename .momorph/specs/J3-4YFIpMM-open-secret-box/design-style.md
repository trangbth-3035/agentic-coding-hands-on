# Design Style: Open Secret Box — Chưa Mở

**Frame ID**: `J3-4YFIpMM`
**Figma Frame ID**: `1466:7676`
**Frame Name**: `Open secret box - chưa mở`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1466:7676
**Frame Image**: see [`assets/frame.url.txt`](./assets/frame.url.txt)
**Extracted At**: 2026-07-16

---

## Design Tokens

All tokens are consumed from `app/globals.css` (`@theme` block + `saa-*` keyframes). Values below
cite the token and the Tailwind class used in `app/kudos/_components/secret-box-modal.tsx` and
`app/kudos/_components/open-secret-box.tsx`.

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-saa-bg` | #00101a | 100% | Modal card background (`bg-saa-bg`); trigger button text (`text-saa-bg`) |
| `--color-saa-gold-light` | #ffea9e | 100% | Title, unopened count, "Mở Secret Box" trigger fill |
| `--color-saa-divider` | #2e3940 | 100% | Two 1px dividers (header/body and body/footer) |
| `#FFFFFF` | #ffffff | 100% | Hint text and count label (`text-white`) |
| black | #000000 | 70% | Dimmed backdrop (`bg-black/70`) |

### Typography

Font family is the global `--font-sans` (Montserrat).

| Role | Size | Weight | Line Height | Letter Spacing | Tailwind |
|------|------|--------|-------------|----------------|----------|
| Title | 20px → 25px (sm) | 700 | 32px | — | `text-xl font-bold leading-8 sm:text-[25px]` |
| Hint | 13px | 700 | — | 0.4px | `text-[13px] font-bold tracking-[0.4px]` |
| Count label | 13px | 700 | — | 0.4px | `text-[13px] font-bold tracking-[0.4px]` |
| Count number | 30px | 700 | 36px | — | `text-3xl font-bold leading-9` |
| Trigger label | 22px | 700 | — | — | `text-[22px] font-bold` |

### Spacing

| Value | Usage | Tailwind |
|-------|-------|----------|
| 16px | Overlay padding (keeps card off the viewport edge) | `p-4` |
| 22px | Vertical gap between modal sections | `gap-[22px]` |
| 12px / 16px (sm) | Modal card horizontal padding | `px-3 sm:px-4` |
| 24px | Modal card vertical padding | `py-6` |
| 8px | Header side padding | `px-2` |
| 6px | Label ↔ number gap in the footer count | `gap-1.5` |
| 8px | Trigger label ↔ gift icon gap | `gap-2` |
| 16px | Trigger padding | `px-4 py-4` |
| 8px | Trigger top margin within the stats card | `mt-2` |

### Border & Radius

| Value | Usage | Tailwind |
|-------|-------|----------|
| 12px (xl) | Modal card corners | `rounded-xl` |
| 8px (lg) | Box image wrapper + trigger button | `rounded-lg` |
| 1px `--color-saa-divider` | Two horizontal dividers | `h-px w-full bg-saa-divider` |

### Sizes (px, from Figma / component)

| Element | Size | Tailwind |
|---------|------|----------|
| Modal card max width | 652px | `max-w-[652px]` |
| Modal card max height | 92vh | `max-h-[92vh]` |
| Box image max width | 557px | `max-w-[557px]` |
| Close (✕) hit area | 32×32 | `h-8 w-8` |
| Close (✕) glyph | 20×20 | `h-5 w-5` |
| Gift icon (trigger) | 24×24 | `h-6 w-6` |

### Shadows & Effects

| Effect | Usage | Tailwind / CSS |
|--------|-------|----------------|
| Backdrop blur | Dimmed page behind the modal | `bg-black/70 backdrop-blur-sm` |
| Box hover / press | Gift-box affordance | `hover:brightness-110 active:scale-[0.99]` |
| Hidden scrollbar | Modal keeps internal scroll, hides chrome | `.saa-no-scrollbar` |

### Animations

| Name | Keyframe (globals.css) | Applied To |
|------|------------------------|-----------|
| `saa-zoom-in` | `opacity 0 + scale(0.96) → none`, 0.2s ease-out | Modal card entrance (`.saa-zoom-in`) |
| `saa-fade-in` | `opacity 0 → 1`, 0.25s ease-out | Backdrop fade (`.saa-fade-in`) |

---

## Layout Specifications

### Overlay (root)

| Property | Value | Tailwind |
|----------|-------|----------|
| Position | fixed, full-viewport | `fixed inset-0` |
| Z-index | 70 | `z-[70]` |
| Alignment | center the card | `flex items-center justify-center` |
| Padding | 16px | `p-4` |
| Role | dialog | `role="dialog" aria-modal="true" aria-label={t.title}` |
| Rendered via | `createPortal(..., document.body)` | — |

### Modal card

| Property | Value | Tailwind |
|----------|-------|----------|
| Width | full, capped 652px | `w-full max-w-[652px]` |
| Max height | 92vh | `max-h-[92vh]` |
| Background | #00101a | `bg-saa-bg` |
| Radius | 12px | `rounded-xl` |
| Layout | column, centered, 22px gap | `flex flex-col items-center gap-[22px]` |
| Overflow | vertical scroll, hidden scrollbar | `overflow-y-auto saa-no-scrollbar` |
| Padding | `py-6`, `px-3` → `sm:px-4` | `px-3 py-6 sm:px-4` |

---

## Layout Structure (ASCII)

```
              dimmed + blurred backdrop (bg-black/70, fade-in)
   ┌──────────────── modal card (max-w 652px, #00101a, rounded-xl, zoom-in) ───────────────┐
   │                                                                                        │
   │   A_Title:      KHÁM PHÁ SECRET BOX CỦA BẠN                                      [✕]   │
   │                 (centered, 20/25px gold)                            (32px hit, top-right)│
   │   ───────────────────────────── divider (1px #2E3940) ───────────────────────────────  │
   │                                                                                        │
   │   B_Group 396:  Click vào box để mở                (centered, 13px white)              │
   │                                                                                        │
   │   C_Box image:  ┌──────────────────────────────────────┐                              │
   │                 │      [ gilded gift-box art ]          │  (max-w 557px, aspect-square,│
   │                 │      baked JPG, clickable             │   rounded-lg, hover-brighten)│
   │                 └──────────────────────────────────────┘                              │
   │   ───────────────────────────── divider (1px #2E3940) ───────────────────────────────  │
   │                                                                                        │
   │   D_Số box chưa mở:   Secretbox chưa mở   04        (13px white label + 30px gold no.) │
   │                                                                                        │
   └────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Title — Header (`1466:7678`)

- Container `relative w-full px-2`.
- `<h2>` `text-center text-xl font-bold leading-8 text-saa-gold-light sm:text-[25px]` → `t.title`.
- Close `<button>` `absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center
  hover:opacity-80`, `onClick={onClose}`, `aria-label={t.title}`, glyph `<img src="/saa/widget-close.svg"
  className="h-5 w-5" alt="">`.
- Followed by a `h-px w-full bg-saa-divider` divider.

### B_Group 396 — Hint (`1466:7681`)

- `<p>` `text-center text-[13px] font-bold tracking-[0.4px] text-white` → `t.hint`.

### C_Box image — Clickable gift box (`1466:7684`)

- `<button>` `block w-full max-w-[557px] overflow-hidden rounded-lg transition hover:brightness-110
  active:scale-[0.99]`, `onClick={onOpenBox}`.
- `<img src="/saa/secretbox-closed.jpg" className="aspect-square w-full object-cover" alt="">` — a
  single baked composite (box + podium + sparkle).
- Followed by a second `h-px w-full bg-saa-divider` divider.

### D_Số box chưa mở — Unopened count (`1466:7689`)

- Container `flex items-center gap-1.5`.
- Label `<span>` `text-[13px] font-bold tracking-[0.4px] text-white` → `t.unopenedLabel`.
- Number `<span>` `text-3xl font-bold leading-9 text-saa-gold-light` → `String(count).padStart(2,'0')`.

### Trigger — "Mở Secret Box" button (`open-secret-box.tsx`)

- `<button>` `mt-2 flex items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4
  text-[22px] font-bold text-saa-bg transition hover:brightness-105`, `onClick={() => setOpen(true)}`.
- `label` text + `<img src="/saa/kudos-ic-gift.svg" className="h-6 w-6" alt="">`.

---

## Responsive Specifications

| Breakpoint | Behavior |
|------------|----------|
| Mobile (≥320px) | Card is full width inside `p-4` overlay padding; `px-3`; title 20px; box scales to full width |
| `sm` (≥640px) | Card padding steps to `px-4`; title steps to 25px |
| Desktop | Card caps at `max-w-[652px]`, box at `max-w-[557px]`, centered; backdrop fills the rest |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | Source |
|----------------|---------------|----------------|--------|
| Overlay root | 1466:7676 | `fixed inset-0 z-[70] flex items-center justify-center p-4` | `SecretBoxModal` |
| Backdrop | — | `saa-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm` | `SecretBoxModal` |
| Modal card | 1466:7676 | `saa-zoom-in saa-no-scrollbar max-h-[92vh] w-full max-w-[652px] flex flex-col items-center gap-[22px] overflow-y-auto rounded-xl bg-saa-bg px-3 py-6 sm:px-4` | `SecretBoxModal` |
| Header + ✕ | 1466:7678 | `relative w-full px-2` + centered `h2` + absolute `h-8 w-8` close | `SecretBoxModal` |
| Hint | 1466:7681 | `text-center text-[13px] font-bold tracking-[0.4px] text-white` | `SecretBoxModal` |
| Box image | 1466:7684 | `block w-full max-w-[557px] overflow-hidden rounded-lg hover:brightness-110 active:scale-[0.99]` + `img aspect-square object-cover` | `SecretBoxModal` |
| Divider (×2) | — | `h-px w-full bg-saa-divider` | `SecretBoxModal` |
| Unopened count | 1466:7689 | `flex items-center gap-1.5` + 13px label + `text-3xl text-saa-gold-light` number | `SecretBoxModal` |
| Trigger button | — | `mt-2 flex items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4 text-[22px] font-bold text-saa-bg` | `OpenSecretBox` |

---

## Notes

- **Color mode**: dark-mode only. No light-mode overrides.
- **Box art**: `secretbox-closed.jpg` is a single pre-baked composite; do not attempt to layer the
  podium/sparkle at runtime.
- **Icons decorative**: the ✕ (`widget-close.svg`) and gift (`kudos-ic-gift.svg`) images use `alt=""`;
  the ✕ button carries an `aria-label`, and the trigger button carries its visible text label.
- **Count formatting**: always two digits via `padStart(2, '0')` — a design requirement, not cosmetic.
