# Phase 06 — Temper + Inspect (mandatory)

**Status:** done

## Tempering (tester / debugger)
- `npm run build` and `npm run lint` pass clean (no type/syntax errors).
- Visual validation via Playwright MCP against `npm run dev`: load `/kudos` (with demo-session
  cookie set), verify KV hero + Highlight carousel + Spotlight board + All Kudos feed + stats
  sidebar render; open both filter dropdowns and confirm the carousel refilters + pager resets;
  toggle a Like (grey↔red, count +1); open the Secret Box modal (Esc / backdrop close); switch
  `saa_lang` vi↔en and confirm all `kudosBoard` copy swaps. Screenshot key states.
- Verify the empty-filter state (`k.noResults`) and that a kudos composed via the "Viết Kudo" modal
  appears at the top of the feed (session store).

## Inspection (reviewer — MUST)
- Correctness of the auth gate (Supabase user OR demo cookie → else `/login`), demo-only data (no
  secrets, no real Supabase kudos tables), file sizes reasonable, DRY reuse of `SaaDropdown` /
  `StatsCard` / `KudosCard` variants / shared tokens, a11y on the dropdowns and Secret Box modal
  (`role`, `aria-*`, Escape, scroll-lock, outside-click).
- Confirm the deferred items are honestly represented: `onOpenBox` unwired, Copy Link / Xem chi
  tiết / profile-nav visual-only, filters scoped to the Highlight carousel (not page-wide).

## Success criteria
- 100% build/lint pass; reviewer 0 critical / 0 security findings before advancing.

## Todo
- [x] `npm run build` + `npm run lint` clean
- [x] Playwright visual pass — hero/carousel/spotlight/feed/sidebar render; filters, Like, Secret
  Box modal, vi↔en swap verified; empty-filter + session-compose states checked
- [x] Reviewer pass — auth gate, DRY reuse, a11y, deferred-items honesty confirmed
- [ ] Unit tests (carousel filtering, like toggle, filter clear, Secret Box modal open/close) — PENDING ("unit test làm sau")
- [ ] E2E test (`/kudos` gated load → filter → like → open Secret Box) — PENDING ("unit test làm sau")
