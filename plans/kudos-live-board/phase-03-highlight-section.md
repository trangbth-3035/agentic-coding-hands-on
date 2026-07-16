# Phase 03 — Highlight section: carousel + filters

**Status:** done

Files in `app/kudos/_components/`. The Highlight section = heading + Hashtag / Phòng ban filter
pills + a carousel that re-renders to only the matching posts.

## `section-heading.tsx`
- "Sun* Annual Awards 2025" caption + divider + big gold heading, with an optional `right` slot for
  a control cluster (Highlight passes the filter pills into it). Also reused by the Spotlight and
  All Kudos section headers.

## `kudos-filters.tsx` (client)
- The two filter pills ("Hashtag" / "Phòng ban") and their dropdowns (screenIds `JWpsISMAaM` /
  `WXK5AYB_rG`) built on `SaaDropdownPanel`/`SaaDropdownItem`. **Controlled** — parent owns
  `FilterValue { hashtag, department }`. Pill shows the chosen value or the category label; picking
  the already-active option clears it. One `openKey` at a time; outside-click backdrop closes.

## `kudos-card.tsx` — `variant="highlight"`
- The dark-page card in its highlight form: fixed-width (`w-[300px]` → `sm:420` → `lg:528`),
  `border-4 border-saa-gold-light`, cream `#FFF8E1` body, `PersonBlock` sender · send-icon ·
  receiver, timestamp, centered `hashtagTitle`, `line-clamp-4` body, red `tags` line, and the
  action row (`LikeButton` + Xem chi tiết + Copy Link). Same component serves the feed via `variant="full"`.

## `highlight-carousel.tsx` (client)
- Horizontal scroll track (`overflow-x-auto`, hidden scrollbar) of the highlight cards, with
  left/right edge-fade gradient arrow buttons (md+) and a center pager showing `page/total`. `step()`
  measures a card's width + 24px gap; `go(±1)` smooth-scrolls; `onScroll` derives the current page
  from `scrollLeft / step`.

## `highlight-section.tsx` (client)
- Owns `FilterValue` state; `filtered = posts.filter(...)` combines department + hashtag with AND.
  Renders `SectionHeading` (filters in `right`) then either the `HighlightCarousel` (keyed on the
  filter pair so scroll + pager **reset** on change) or the empty-state text (`emptyText`) when
  nothing matches. **Scope: Highlight carousel only** — the All Kudos feed is unaffected.

## Success criteria
- Selecting a hashtag/department narrows the carousel; clearing restores all 6 posts.
- No-match shows `k.noResults`; carousel pager resets to `1/n` on every filter change.

## Todo
- [x] `section-heading.tsx` — caption + divider + heading + `right` slot
- [x] `kudos-filters.tsx` — controlled Hashtag/Phòng ban pills on the shared dropdown shell
- [x] `kudos-card.tsx` highlight variant — 4px-gold fixed-width card
- [x] `highlight-carousel.tsx` — scroll track + edge arrows + `page/total` pager
- [x] `highlight-section.tsx` — AND filtering scoped to the carousel + remount-on-change + empty state
