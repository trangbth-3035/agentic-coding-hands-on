# Phase 02 — Shared primitives

**Status:** done

Presentational building blocks reused across the board (and beyond). Mock/label props; no data fetching.

## Shared dropdown shell — `app/_components/saa-dropdown.tsx`
- `SaaDropdownPanel` — dark `#00070C` panel, 1px gold-muted border, 8px radius, `role="menu"`.
  Matches the Figma "Dropdown-List" shell (screenIds `WXK5AYB_rG` / `JWpsISMAaM` / `54rekaCHG1`).
- `SaaDropdownItem` — 56px (`default`) / 40px (`compact`) rows with the gold text-glow on
  hover/active; supports `active` (single-select) vs `checked` (multi-select + `CheckBadge`), an
  optional trailing `icon`, and `href` (renders an anchor). Consumed here by `kudos-filters.tsx`;
  also by the header account menu and the hashtag picker.

## Rank badge (hero-badge)
- Rendered inline in `KudosCard`'s `PersonBlock` from `RANK_BADGE[person.rank]` — a baked PNG pill
  whose styled label (New/Rising/Legend Hero) is part of the image, so it renders as-is at ~19px
  height. No separate component, no hover tooltip, no 4th "Super" tier (deferred — see clarifications).

## Like toggle — `app/kudos/_components/like-button.tsx`
- Client control: parses the card's `hearts` string ("1.000") → base count, toggles `liked` on
  click (+1, red fill + pop animation, `aria-pressed`), re-groups the count with "." thousands
  separators. Client-only local state — not persisted.

## Card action CTAs (visual-only)
- "Copy Link" and (highlight variant) "Xem chi tiết" live inside `kudos-card.tsx` as styled
  buttons/anchors with icons — **no clipboard/toast/navigation wired** (deferred).

## Stats card — `app/kudos/_components/stats-card.tsx`
- Gold-bordered `#00070C` card: received / sent / likes (🔥 `x2` badge) rows, divider, opened /
  unopened Secret Box counts, and the "Mở Secret Box" button. Driven by `KUDOS_STATS` + `dict`.
  **Shared** with the Profile page (extracted from `StatsSidebar`); mounts `OpenSecretBox`.

## Success criteria
- Dropdown closes on outside-click; active option visibly highlighted.
- Like toggle is accessible (`aria-pressed`) and reversible.
- `StatsCard` renders identically in the Kudos sidebar and Profile page.

## Todo
- [x] `SaaDropdownPanel` + `SaaDropdownItem` (default/compact, active/checked, icon, href)
- [x] Rank badge rendering via `RANK_BADGE` PNGs in `kudos-card.tsx`
- [x] `like-button.tsx` — client toggle + thousands grouping
- [x] Copy Link / Xem chi tiết CTAs in `kudos-card.tsx` (visual-only)
- [x] `stats-card.tsx` — shared stats card + "Mở Secret Box" trigger
