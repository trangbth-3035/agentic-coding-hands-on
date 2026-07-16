# Tasks: Profile bản thân

**Frame**: `3FoIx6ALVb-profile-ban-than`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅
**Status**: Implemented (test tasks PENDING)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | path
```

- **[x]** implemented and shipped · **[ ]** PENDING (not yet done)
- **[P]**: parallelizable (independent file, no dependency on sibling tasks)
- **[Story]**: originating user story (US1–US4)
- **|**: primary file affected

> **Testing note**: the team convention is "unit test làm sau" — no test runner is set up in this
> repo yet. Test tasks below are enumerated and marked `[ ]` PENDING; they are NOT claimed as done.

---

## Phase 0: Reuse Prerequisites (shared components)

**Purpose**: Make the Kudos-feature components profile-ready so the profile is composition, not
rebuild. These shipped with / alongside the Kudos board.

- [x] T001 [P] Extract `StatsCard` from the Kudos `StatsSidebar` into its own component taking `dict={dict.kudosBoard}` + optional `className`, so it renders in both the Kudos rail and the Profile hero | `app/kudos/_components/stats-card.tsx`
- [x] T002 [P] Add the optional `status?: string` corner-ribbon prop to `KudosCard` (red `bg-saa-red` badge, `rounded-bl-xl`, top-right) for the profile's "Spam" flag | `app/kudos/_components/kudos-card.tsx`
- [x] T003 [P] Confirm `SectionHeading` exposes a `right` slot for the filter control | `app/kudos/_components/section-heading.tsx`
- [x] T004 [P] Confirm `SaaDropdownPanel` / `SaaDropdownItem` are exported from the shared dropdown shell | `app/_components/saa-dropdown.tsx`
- [x] T005 [US4] Add the "Profile" item (→ `/profile`) to the `SiteHeader` account menu | `app/_components/site-header.tsx`

**Checkpoint**: `StatsCard` and `KudosCard` render standalone with the new props; header account
menu links to `/profile`.

---

## Phase 1: Localization

**Purpose**: Profile copy in both locales; reuse existing kudos-board keys where possible.

- [x] T006 Add `dict.profile` to both locales — `collectionTitle` ("Bộ sưu tập icon của tôi" / "My icon collection"), `sent` ("Đã gửi" / "Sent"), `received` ("Đã nhận" / "Received"), `spam` ("Spam") | `lib/i18n/dictionaries.ts`
- [x] T007 [P] Reuse existing `dict.kudosBoard` keys for the stats card, the "Sun* Annual Awards 2025" caption (`awardsCaption`), the "KUDOS" unit (`kudosUnit`) and card labels (`copyLink`, `viewDetails`) | `lib/i18n/dictionaries.ts`

**Checkpoint**: `getDict()` returns `dict.profile` + `dict.kudosBoard` with no missing keys in VN or
EN.

---

## Phase 2: Route & Auth Gate (US1)

**Purpose**: The `/profile` Server Component — auth gate, dictionary, header-user derivation.

- [x] T008 [US1] Create the `/profile` route as an async Server Component: `createClient()` from `lib/supabase/server`, `supabase.auth.getUser()` | `app/profile/page.tsx`
- [x] T009 [US1] Read the demo cookie via async `cookies()` (Next.js 16); `hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1"`; `if (!user && !hasDemoSession) redirect("/login")` | `app/profile/page.tsx`
- [x] T010 [US1] Load copy via `getDict()`; alias `k = dict.kudosBoard`, `p = dict.profile`; build `cardLabels = { copyLink: k.copyLink, viewDetails: k.viewDetails }` | `app/profile/page.tsx`
- [x] T011 [US1] Derive `headerUser` from `user.user_metadata` (`full_name`/`name`/`avatar_url`/`picture`) with demo fallbacks; `avatar = headerUser.avatarUrl ?? "/saa/kudos-avatar-2.png"`; `badge = RANK_BADGE.legend`; `PROFILE_DEPARTMENT = "CEVC3"` | `app/profile/page.tsx`

**Checkpoint**: unauthenticated request → redirect `/login`; authenticated request → page renders.

---

## Phase 3: Hero — Identity, Collection, Stats (US1, US3)

**Purpose**: The hero band (`A_Info` + icon collection + `B_Thống kê`).

- [x] T012 [US1] Render the KV band (`/saa/kudos-kv-bg.png`, `absolute -z-10 h-[360px] object-cover`) + gradient fade (`from-transparent via-saa-bg/50 to-saa-bg`); container `mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pb-14 pt-36` | `app/profile/page.tsx`
- [x] T013 [US1] Identity block (`A_Info` `362:5052`): gold-bordered avatar `h-28 w-28 rounded-full border-4 border-saa-gold-light sm:h-32 sm:w-32` (`A.1` `362:5053`); name `text-3xl font-bold text-saa-gold-light sm:text-[32px]` (`A.2` `362:5054`); `CEVC3` + white/40 dot + Legend badge `h-[19px]` (`A.3` `362:5064`) | `app/profile/page.tsx`
- [x] T014 [US1] Icon collection (`B2–B7` `362:5066–5071`): six slots `h-12 w-12 rounded-full border border-saa-gold-muted/50 bg-[#00070C] sm:h-14 sm:w-14` + label `p.collectionTitle` | `app/profile/page.tsx`
- [x] T015 [US1] Render `<StatsCard dict={k} className="w-full max-w-[680px]" />` (`B_Thống kê` `362:5073`; rows `B.1`–`B.5` `362:5076–5081`) | `app/profile/page.tsx`
- [x] T016 [US3] "Mở Secret Box" CTA (`B.6` `362:5082`) via `OpenSecretBox` inside `StatsCard` → opens the Secret Box modal (`J3-4YFIpMM`), driven by `KUDOS_STATS.boxUnopened` | `app/kudos/_components/open-secret-box.tsx`

**Checkpoint**: hero shows avatar/name/dept/badge, six grey slots, and the full stats card with the
🔥×2 likes row and "Mở Secret Box" button.

---

## Phase 4: KUDOS Section — Sent/Received Filter (US2)

**Purpose**: The client filter + kudos list (`C_Header Giải thưởng` + `D_Post all`).

- [x] T017 [US2] Create `ProfileKudos` (`"use client"`) with props `caption`, `title`, `sent`, `received`, `cardLabels`, `t = { sent, received, spam }`; state `tab: "sent"|"received"` (default `"sent"`) + `open: boolean` | `app/profile/_components/profile-kudos.tsx`
- [x] T018 [US2] Filter trigger (`C.3` `362:5089`): `inline-flex ... rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-3 text-sm font-semibold text-white hover:bg-saa-gold-light/20`; label `{tabLabel} ({list.length})`; chevron `/saa/chevron-down.svg` rotates 180° when open; `aria-haspopup="menu"`, `aria-expanded` | `app/profile/_components/profile-kudos.tsx`
- [x] T019 [US2] Dropdown menu: `SaaDropdownPanel absolute right-0 z-20 mt-2 min-w-44` with two `SaaDropdownItem`s (`sent`/`received`), `active` = current tab; outside-click backdrop (`fixed inset-0 -z-10`) closes it | `app/profile/_components/profile-kudos.tsx`
- [x] T020 [US2] Compose `SectionHeading caption/title right={filter}` (`C.1` `362:5085`, `C.2` `362:5088`) over `mx-auto flex w-full max-w-[752px] flex-col gap-6` of `KudosCard` (`D_Post all` `362:5091`) | `app/profile/_components/profile-kudos.tsx`
- [x] T021 [US2] "Spam" ribbon rule (`D.3.1` `3127:24095`): `status={tab === "sent" && i < 2 ? t.spam : undefined}` on the first two sent kudos | `app/profile/_components/profile-kudos.tsx`

**Checkpoint**: filter defaults to "Đã gửi (n)"; selecting "Đã nhận" swaps the list; first two sent
kudos show the red Spam ribbon; received kudos show none.

---

## Phase 5: Page Assembly (US1, US4)

- [x] T022 [US1] Wire `<ProfileKudos caption={k.awardsCaption} title={k.kudosUnit} sent={KUDOS_POSTS} received={KUDOS_POSTS} cardLabels={cardLabels} t={{ sent: p.sent, received: p.received, spam: p.spam }} />` into the KUDOS section (`mx-auto max-w-[1200px] px-6 pb-20 pt-4`) | `app/profile/page.tsx`
- [x] T023 [US4] Wrap the page with shared `<SiteHeader user={headerUser} dict={dict} locale={locale} />` and `<SiteFooter />` | `app/profile/page.tsx`

**Checkpoint**: full `/profile` page renders end-to-end with shared header/footer chrome, VN default
locale, EN via `saa_lang`.

---

## Phase 6: Polish & Cross-Cutting

- [x] T024 [P] VN/EN parity — verify hero, stats and list copy render in both locales via the `saa_lang` cookie | `lib/i18n/dictionaries.ts`
- [ ] T025 [P] Responsive QA at 320 / 768 / 1024 / 1200px — no horizontal overflow; avatar, icon slots and stat rows scale at `sm`; content centered under `max-w` caps | Manual QA
- [ ] T026 [P] Accessibility audit — filter `aria-haspopup`/`aria-expanded`, dropdown `role="menu"`/`menuitem`, decorative images `alt=""`, keyboard operability of the filter | Manual QA
- [ ] T027 Wire Secret-Box open result (`J3-4YFIpMM`) into the six icon-collection slots so unlocked icons replace the grey placeholders | `app/profile/page.tsx` |
- [ ] T028 Add a profile-specific empty state when the active tab has no kudos | `app/profile/_components/profile-kudos.tsx`

---

## Phase 7: Tests (PENDING — "unit test làm sau")

**Purpose**: No test runner is configured yet; these are the tests to add. All PENDING.

- [ ] T029 [P] Route test: unauthenticated (no user, no demo cookie) → redirect `/login`; authenticated → renders | `app/profile/__tests__/page.test.tsx`
- [ ] T030 [P] `ProfileKudos` test: defaults to "Đã gửi (n)"; clicking the filter toggles `aria-expanded`; selecting "Đã nhận" swaps the list and updates the button label | `app/profile/__tests__/profile-kudos.test.tsx`
- [ ] T031 [P] `ProfileKudos` test: first two "sent" cards render the "Spam" ribbon; "received" cards render none | `app/profile/__tests__/profile-kudos.test.tsx`
- [ ] T032 [P] `ProfileKudos` test: outside-click backdrop closes the dropdown without changing selection | `app/profile/__tests__/profile-kudos.test.tsx`
- [ ] T033 [P] `StatsCard` test: renders all five stat rows + the 🔥×2 badge on the likes row; "Mở Secret Box" present | `app/kudos/__tests__/stats-card.test.tsx`
- [ ] T034 [P] i18n test: `dict.profile` keys (`collectionTitle`, `sent`, `received`, `spam`) exist and differ across VN/EN | `lib/i18n/__tests__/dictionaries.test.ts`

---

## Dependencies & Execution Order

```
Phase 0 (reuse prereqs) ──> Phase 1 (i18n) ──> Phase 2 (route/auth)
                                                     │
                                   ┌─────────────────┤
                                   ▼                 ▼
                          Phase 3 (hero)     Phase 4 (KUDOS filter)
                                   └────────┬────────┘
                                            ▼
                                   Phase 5 (assembly)
                                            ▼
                                   Phase 6 (polish)  ·  Phase 7 (tests — PENDING)
```

- **Phase 0**: shipped with the Kudos feature; unblocks reuse.
- **Phase 2**: requires Phase 0 (shared components) + Phase 1 (dict keys).
- **Phases 3 & 4**: parallel after Phase 2 (hero is server output; filter is a client island).
- **Phase 5**: requires Phases 3 + 4.
- **Phase 7**: independent of shipping; blocked only by "set up a test runner".

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| 0 — Reuse prerequisites | T001–T005 | ✅ shipped |
| 1 — Localization | T006–T007 | ✅ shipped |
| 2 — Route & auth gate | T008–T011 | ✅ shipped |
| 3 — Hero | T012–T016 | ✅ shipped |
| 4 — KUDOS filter | T017–T021 | ✅ shipped |
| 5 — Assembly | T022–T023 | ✅ shipped |
| 6 — Polish | T024 ✅; T025–T028 | partial (4 PENDING) |
| 7 — Tests | T029–T034 | ⏳ all PENDING |

---

## Notes

- Only two files are truly profile-specific: `app/profile/page.tsx` and
  `app/profile/_components/profile-kudos.tsx`. The rest is deliberate reuse of the Kudos feature.
- Demo facts (`PROFILE_DEPARTMENT = "CEVC3"`, `RANK_BADGE.legend`) are placeholders for real profile
  data pending final auth wiring.
- Test file paths above are proposed locations; no test runner exists in the repo yet.
