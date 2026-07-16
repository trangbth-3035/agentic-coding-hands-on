# Phase 05 — Temper + Inspect (mandatory)

**Status:** done

## Tempering (tester / debugger)
- `npm run build` and `npm run lint` must pass clean (no type/syntax errors).
- Visual validation via Playwright MCP against `npm run dev`: load `/profile`, verify the hero
  (avatar/name/`CEVC3`/Legend badge), six grey icon slots, the `StatsCard` (five rows + 🔥×2 likes
  badge + "Mở Secret Box"), and the KUDOS section. Open the account menu (avatar) and confirm
  "Trang cá nhân" / "Dashboard" / "Đăng xuất".
- Exercise the Sent/Received filter: defaults to "Đã gửi (n)"; open dropdown (chevron rotates 180°,
  `aria-expanded` flips); select "Đã nhận" → list swaps + label updates; outside-click closes
  without changing selection. Confirm the first two "sent" cards show the red "Spam" ribbon and the
  "received" list shows none.
- Confirm the unauthenticated gate redirects `/profile` → `/login`.
- Toggle `saa_lang` and confirm VN/EN parity across hero, stats and list.

## Inspection (reviewer — MUST)
- Reuse discipline: only `page.tsx` + `profile-kudos.tsx` net-new; `StatsCard`/`KudosCard`/
  `SectionHeading`/`SaaDropdown` reused (no duplicated components).
- Correctness of the auth gate; no secrets; file sizes small; server/client split (only
  `ProfileKudos` is `"use client"`).
- a11y on the filter dropdown (`aria-haspopup="menu"`, `aria-expanded`, `role="menu"`/`menuitem`,
  keyboard operability) and decorative images (`alt=""`).
- Confirm deferred items are documented, not silently missing: static icon slots, demo
  department/rank, unconditional Admin account menu, `/dashboard` not role-gated, no empty-state.

## Success criteria
- 100% build/lint pass; reviewer: 0 critical / documented deferrals accepted.
- Retrospective status: implementation `[x]`; automated tests `[ ]` PENDING ("unit test làm sau").

## Todo
- [x] build + lint clean
- [x] Playwright visual validation of hero, stats, account menu + Sent/Received filter + Spam ribbon
- [x] reviewer pass — reuse discipline, auth gate, a11y, deferrals documented
- [ ] Route test: unauthenticated → redirect `/login`; authenticated → renders — `app/profile/__tests__/page.test.tsx` — PENDING
- [ ] `ProfileKudos` test: default "Đã gửi (n)"; toggle `aria-expanded`; "Đã nhận" swaps list + label — `app/profile/__tests__/profile-kudos.test.tsx` — PENDING
- [ ] `ProfileKudos` test: first two "sent" cards show "Spam" ribbon; "received" show none — `app/profile/__tests__/profile-kudos.test.tsx` — PENDING
- [ ] `ProfileKudos` test: outside-click backdrop closes dropdown without changing selection — `app/profile/__tests__/profile-kudos.test.tsx` — PENDING
- [ ] `StatsCard` test: five stat rows + 🔥×2 badge + "Mở Secret Box" present — `app/kudos/__tests__/stats-card.test.tsx` — PENDING
- [ ] i18n test: `dict.profile` keys exist and differ across VN/EN — `lib/i18n/__tests__/dictionaries.test.ts` — PENDING
