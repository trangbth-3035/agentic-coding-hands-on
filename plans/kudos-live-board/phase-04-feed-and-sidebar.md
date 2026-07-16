# Phase 04 — All Kudos feed + Spotlight + sidebar + Secret Box modal

**Status:** done

Files in `app/kudos/_components/`. The lower board: a two-column All Kudos feed + right rail, the
Spotlight word-cloud, and the Secret Box modal launched from the stats card.

## `kudos-card.tsx` — `variant="full"`
- The full-width post card (rounded-3xl, cream `#FFF8E1`): sender · send-icon · receiver, timestamp,
  centered `hashtagTitle` + pen icon, `body`, an image gallery (up to `post.photos` × 80px
  thumbnails), red `tags` line, and the action row (`LikeButton` + Copy Link). Optional `status`
  ribbon prop (e.g. "Spam") — used by the Profile page, not the board.

## `live-kudos-list.tsx` (client)
- Subscribes to `lib/saa/kudos-store.ts` via `useSyncExternalStore` and renders session-composed
  kudos (newest first) **above** the static feed. Renders nothing until the user sends one.

## `spotlight-board.tsx` (B.7)
- Dark word-cloud board: faint feather art + gradient wash, a search pill (static), the running
  total `SPOTLIGHT_TOTAL KUDOS`, the deterministic `SPOTLIGHT_NAMES` scatter (one red `highlight`),
  a `SPOTLIGHT_TICKER` bottom-left, and a pan-zoom hint glyph. Presentational only — search/pan/zoom
  not interactive.

## `stats-sidebar.tsx`
- Right rail: the shared `StatsCard` (D.1) + the D.3 "10 SUNNER NHẬN QUÀ MỚI NHẤT" list from
  `GIFT_RECIPIENTS` (avatar + name + gift line). `lg:w-[422px]`, stacks under the feed on mobile.

## Secret Box — `open-secret-box.tsx` + `secret-box-modal.tsx`
- `OpenSecretBox` (client island) renders the "Mở Secret Box" button and holds the modal open state,
  keeping `StatsCard` server-only.
- `SecretBoxModal` (screenId `J3-4YFIpMM`, unopened state) — `createPortal` centered dialog over a
  dimmed backdrop: title, "click the box to open" hint, the clickable baked gift-box image
  (`/saa/secretbox-closed.jpg`), and the remaining-unopened count. Closes on Escape / backdrop /
  close button; locks body scroll while open. **`onOpenBox` is intentionally unwired** — the opened
  "đã mở" reveal frame + odds engine + count-decrement are deferred (see clarifications).

## Success criteria
- Feed renders the static posts; a session-composed kudos appears at the top immediately.
- Sidebar stats + recipients render from seed; Secret Box modal opens/closes cleanly.

## Todo
- [x] `kudos-card.tsx` full variant — post card + image gallery + `status` ribbon prop
- [x] `live-kudos-list.tsx` — `useSyncExternalStore` session feed (empty until first send)
- [x] `spotlight-board.tsx` — total + word-cloud scatter + ticker + pan-zoom hint (visual)
- [x] `stats-sidebar.tsx` — shared `StatsCard` + `GIFT_RECIPIENTS` list
- [x] `open-secret-box.tsx` + `secret-box-modal.tsx` — unopened modal (portal, Esc/scroll-lock); `onOpenBox` deferred
