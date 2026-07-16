# Phase 02 — FAB + "Thể lệ" rules drawer

**Status:** done

Grounds on MoMorph screens `_hphd32jN2` (FAB closed) + `Sv7DFwBw1h` (FAB open) + `b1Filzi9i6`
(rules drawer). One `"use client"` component owns both FAB states; the drawer is a portal.

## Goal
Add the persistent floating action button (open/closed) pinned bottom-right, and the right-side
"Thể lệ" rules drawer it launches, over a dimmed page. Wire both "Viết KUDOS" entry points to the
reused compose modal in place (no navigation).

## Steps
- `app/globals.css` keyframes — `saa-fab-in` (opacity + `translateY/scale` pill entrance),
  `saa-drawer-in` (`translateX(100%) → 0` slide from the right), `saa-fade-in` (backdrop opacity).
- `app/_components/widget-button.tsx` (`"use client"`) — fixed `bottom-6 right-6 z-40`. Local
  `open` / `rulesOpen` / `composeOpen` state. Closed: gold pill = pen (`/saa/widget-pen.svg`) + "/" +
  rules mark (`/saa/widget-rules-logo.svg`). Open: trigger swaps to a red ✕ circle
  (`/saa/widget-close.svg`) and two `saa-fab-in` pills slide in above it (staggered `animationDelay`) —
  "Thể lệ" (→ `setRulesOpen`) and "Viết KUDOS" (→ `setComposeOpen`). Escape + an invisible
  outside-click catcher collapse the menu; `aria-expanded` reflects `open`. Props: `labels`
  (`dict.widget`), `rules` (`dict.rules`), `compose` (`dict.kudosBoard.writeKudos`), `senderName`.
- `app/_components/rules-modal.tsx` (`"use client"`) — `createPortal(…, document.body)`; right drawer
  `max-w-[553px]`, `#00070C` surface, `saa-drawer-in` panel over a `saa-fade-in` `bg-black/60` backdrop;
  Escape close + body-scroll lock while open; `role="dialog"` + `aria-modal`. Renders `dict.rules`:
  title, "Người nhận" heading/intro + `tiers[]` each paired with a `RULE_HERO_BADGES[i]` badge,
  "Người gửi" heading/intro + the 6 `RULE_ICONS` in two rows + `senderFootnote`, and "Kudos Quốc Dân"
  heading/body. Bottom action row: "Đóng" (`onClose`) + "Viết KUDOS" (`onWriteKudos`). Badge/icon
  asset arrays imported from `lib/saa/kudos.ts` (`RULE_HERO_BADGES`, `RULE_ICONS`).
- Compose reuse — `WriteKudosModal` from `app/kudos/_components/write-kudos-modal.tsx` (Kudos feature)
  is mounted by `widget-button.tsx`; the FAB "Viết KUDOS" pill and the drawer's "Viết KUDOS" CTA both
  land on `setComposeOpen(true)`, swapping the drawer for the modal rather than navigating to `/kudos`.

## Success criteria
- Closed pill is visible/tappable from any scroll position; one tap toggles to the open menu and back.
- "Thể lệ" opens the drawer (slides in, backdrop dims, page scroll locked); Escape / backdrop / "Đóng" close it.
- "Viết KUDOS" from either the pill or the drawer opens the compose modal in place.
- No raw hex in `widget-button.tsx` — colors from `@theme` tokens (`saa-gold`, `saa-gold-light`, `saa-red`, `saa-bg`).

## Todo
- [x] `globals.css` keyframes — `saa-fab-in`, `saa-drawer-in`, `saa-fade-in`
- [x] `widget-button.tsx` — closed pill ⇄ open red ✕ + two staggered pills, Esc/outside-click close
- [x] `rules-modal.tsx` — portal right drawer, tiers + 6 icons + Quốc Dân, scroll-lock, action row
- [x] Wire both "Viết KUDOS" entry points → reused `WriteKudosModal` in place
