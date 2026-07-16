# Phase 04 — Temper + Inspect

**Status:** done

## Tempering (tester / debugger)
- `npm run build` and `npm run lint` must pass clean (no type/lint errors).
- Visual validation via Playwright MCP against `npm run dev`, load `/`:
  - Header renders; "About SAA 2025" is the active tab; countdown tiles show 2-digit values and tick.
  - Award grid = 6 cards; hover lifts a card (glow); descriptions clamp to 2 lines.
  - FAB: click to open (red ✕ + two pills), click "Thể lệ" → drawer slides in, page scroll locks,
    Escape / backdrop / "Đóng" close it; "Viết KUDOS" opens the compose modal in place.
  - Language switch VN↔EN flips all section copy and persists across reload (`saa_lang` cookie).
  - Profile dropdown opens (Profile / Dashboard / Sign out).
- Responsive check at mobile/tablet/desktop (award grid 1/2/3-col; header nav hides below `lg`; no horizontal overflow).
- Auth: hitting `/` without a session redirects to `/login`.

## Inspection (reviewer — MUST)
- Correctness; no raw hex in components (colors from `@theme` tokens); no secrets client-side.
- DRY reuse (`ArrowUpRight`, `NAV_HREFS`/`isNavActive`, `SaaDropdownPanel`, reused `WriteKudosModal`).
- a11y: `aria-current` on active nav, `aria-expanded`/`aria-haspopup` on toggles, `role="dialog"` +
  `aria-modal` + Escape/scroll-lock on the drawer, `menuitemradio`/`aria-checked` on the language menu.
- Countdown t=0 freezes (no redirect); SSR renders "--" placeholder (no hydration flash).

## Success criteria
- 100% build/lint pass; visual states verified; reviewer 0 critical / 0 security findings.

## Todo
- [x] `npm run build` + `npm run lint` — clean
- [x] Playwright visual validation of all sections + FAB/drawer/language/profile interactions
- [x] responsive + auth-gate smoke check
- [x] reviewer pass + address findings
- [ ] PENDING — unit tests (countdown math, `isNavActive`, award grid render) — "unit test làm sau"
- [ ] PENDING — e2e (language persistence, FAB → drawer → compose flow) — deferred
