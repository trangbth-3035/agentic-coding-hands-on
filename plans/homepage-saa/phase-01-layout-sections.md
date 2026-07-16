# Phase 01 — Layout sections

**Status:** done

## Goal
Build the six stacked page sections plus the shared header/footer chrome. Server components by
default; only the live countdown is a client island. All copy comes from `dict` (Phase 03); all
routing from `NAV_HREFS`.

## Steps
- `lib/saa/content.ts` — `AwardSlug` union + `AWARDS` (slug + gold `titleImage` PNG); `NAV_HREFS`
  (`about:/`, `awards:/award-information`, `kudos:/kudos`, `standards:/award-information`);
  `isNavActive(href, pathname)` (`/` matches exactly, section routes match sub-paths).
- `lib/saa/countdown.ts` — `computeRemaining(targetMs) → { days, hours, minutes, seconds, done }`
  (clamps to 0 when past); `pad2`.
- `app/_components/hero.tsx` (server) — full-bleed `/saa/keyvisual-bg.png` + left/bottom gradient
  overlays; `/saa/root-further-logo.png` wordmark; mounts `<Countdown target={LAUNCH_AT} labels=…>`
  where `LAUNCH_AT = NEXT_PUBLIC_LAUNCH_AT ?? "2026-12-26T18:30:00+07:00"`; event line formats the
  date via `Intl.DateTimeFormat` (`Asia/Ho_Chi_Minh`) + `dict.hero` venue/livestream; two CTAs —
  "ABOUT AWARDS" (gold → `NAV_HREFS.awards`) and "ABOUT KUDOS" (bordered → `NAV_HREFS.kudos`) with `ArrowUpRight`.
- `app/_components/countdown.tsx` (`"use client"`) — `useEffect` 1s interval → `computeRemaining`;
  three `Tile`s (days/hours/minutes) with `pad2`; renders "--" until the effect runs (no SSR flicker);
  hides the "Coming soon" line when `done`.
- `app/_components/root-further-section.tsx` (server) — centered `root-further-logo.png` + justified
  `dict.rootFurther.intro[]` paragraphs, a `quoteMain`/`quoteSub` blockquote, and `outro[]`.
- `app/_components/award-system.tsx` (server) — caption + gold heading (`dict.awardsSection`) then a
  responsive grid (1 / 2 / 3-col) over `AWARDS`; each card is an `<a href={`#awards-${slug}`}>` with
  `/saa/award-bg.png` orb + `award.titleImage` overlay, `dict.awards[slug].title`,
  `line-clamp-2` description, hover lift/glow, and a "Chi tiết" (`dict.awardsSection.detail`) link.
- `app/_components/kudos-banner.tsx` (server) — `/saa/kudos-bg.png` + `/saa/kudos-logo.svg`; `dict.kudos`
  label/caption/description; "Chi tiết" → `NAV_HREFS.kudos`.
- `app/_components/site-header.tsx` (`"use client"`) — fixed, blurred top bar: logo → `NAV_HREFS.about`;
  nav (about/awards/kudos) with active underline via `isNavActive` + `usePathname` + `aria-current`;
  bell (static unread dot); `<LanguageSwitcher>`; avatar → `SaaDropdownPanel` (Profile → `/profile`,
  Dashboard → `/dashboard`, Sign out → `signOut` action). (Overlays wired in Phase 03.)
- `app/_components/site-footer.tsx` (server) + `app/_components/footer-nav.tsx` (`"use client"`) —
  logo + four nav links (about/awards/kudos/standards, `standards` with `noActive`) + `dict.footer.copyright`.
- `app/_components/arrow-up-right.tsx` — shared ↗ glyph (inherits `currentColor`) used by CTAs and "Chi tiết".

## Success criteria
- All six sections render top-to-bottom with correct assets from `public/saa/`.
- Countdown ticks each second and pads to 2 digits; "Coming soon" hides at t=0.
- Award grid shows 6 cards, 3-col desktop / 2-col tablet / 1-col mobile, descriptions clamped to 2 lines.
- Header active state highlights the current route; footer renders 4 links + copyright.

## Todo
- [x] `lib/saa/content.ts` — `AWARDS`, `NAV_HREFS`, `isNavActive`
- [x] `lib/saa/countdown.ts` — `computeRemaining` + `pad2`
- [x] `hero.tsx` + `countdown.tsx` — keyvisual, wordmark, live timer, event info, 2 CTAs
- [x] `root-further-section.tsx` — intro/quote/outro from dict
- [x] `award-system.tsx` — 6-card responsive grid, hover lift, `#awards-{slug}` anchors, clamped desc
- [x] `kudos-banner.tsx` — KV banner + wordmark + "Chi tiết" → `/kudos`
- [x] `site-header.tsx` + `site-footer.tsx` + `footer-nav.tsx` + `arrow-up-right.tsx` — chrome with active-state nav
