# Implementation Plan: Profile bản thân

**Frame**: `3FoIx6ALVb-profile-ban-than`
**Date**: 2026-07-16
**Spec**: `specs/3FoIx6ALVb-profile-ban-than/spec.md`
**Design**: `specs/3FoIx6ALVb-profile-ban-than/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the authenticated `/profile` page for SAA 2025 — a single-column personal page showing
the logged-in Sunner's identity (avatar, name, department, Hero badge), a six-slot icon collection,
an overview statistics card, and their kudos with a Sent/Received filter.

The defining design decision is **reuse over rebuild**: the statistics card, kudos card, section
heading and dropdown shell already exist in the Kudos feature, so the profile is mostly composition.
Only two profile-specific files were added — the route (`app/profile/page.tsx`) and the client
filter (`app/profile/_components/profile-kudos.tsx`) — plus small, additive extensions to shared
components (a reusable `StatsCard`, a `status` ribbon prop on `KudosCard`, a `/profile` link in the
header account menu).

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19 Server Components by default; client islands only where interaction requires it
**Styling**: TailwindCSS 4 with `@theme` tokens in `app/globals.css` (SAA palette `--color-saa-*`)
**Auth/Data**: Supabase via `lib/supabase/*` (server client for the route gate); temporary
demo-session cookie (`DEMO_COOKIE = "saa_demo"`) stands in for real Google OAuth
**i18n**: Cookie `saa_lang` (vi/en) + dictionaries in `lib/i18n/`; `getDict()` read server-side —
NOT next-intl
**Routing/files**: Under `app/` (NOT `src/`). Shared components in `app/_components/`; route-scoped
components in `app/<route>/_components/`
**Testing**: None yet ("unit test làm sau") — test tasks are tracked as PENDING in `tasks.md`
**Deployment**: Standard Next.js (no Cloudflare/OpenNext in this repo)

---

## Constitution Compliance Check

- [x] Follows coding conventions (kebab-case modules, PascalCase components, 2-space indent)
- [x] Uses the approved stack (Next.js App Router, React 19, TailwindCSS 4, Supabase via
  `lib/supabase/*`)
- [x] Adheres to folder structure (`app/profile/`, route-scoped `_components/`, shared
  `app/_components/`, `app/kudos/_components/` reuse)
- [x] Design tokens sourced from `app/globals.css` `@theme`, consumed via Tailwind utilities
- [x] Security: auth enforced server-side (`supabase.auth.getUser()` + demo cookie) before render
- [ ] Test-First (Principle III): **not yet** — this screen shipped ahead of its tests; see the
  PENDING test tasks in `tasks.md`

**Deviations**:

| Deviation | Justification |
|-----------|---------------|
| Tests written after implementation | Team decision "unit test làm sau"; test tasks are enumerated and marked PENDING in `tasks.md`, not omitted |
| Demo values hard-coded (`PROFILE_DEPARTMENT`, Legend badge) | The temporary demo-session cookie carries no rich profile metadata; documented in the route and to be replaced when a real profiles source lands |

---

## Architecture Decisions

### Rendering & Composition

- **Route** `app/profile/page.tsx` is a **Server Component**. It:
  1. Resolves the Supabase user via `createClient()` from `lib/supabase/server`.
  2. Reads the demo cookie (`DEMO_COOKIE`) from `next/headers` `cookies()`.
  3. Redirects to `/login` when neither a user nor the demo session is present (same gate as the
     homepage and `/kudos`; the route is also protected by `lib/supabase/proxy.ts`).
  4. Loads copy via `getDict()` → `dict.profile` (`p`) + `dict.kudosBoard` (`k`).
  5. Builds `headerUser` from `user.user_metadata` with demo fallbacks, then composes the hero,
     `StatsCard`, and `ProfileKudos`.
- **Client island**: only `ProfileKudos` (`"use client"`) — it owns the Sent/Received tab and the
  dropdown open/close state. Everything else (hero, stats card render, section heading) is server
  output.
- **Styling**: Tailwind utilities backed by `--color-saa-*` tokens; the only literal values are the
  shared `#00070C` card/slot fill and `#FFF8E1` cream card, both pre-existing in the Kudos feature.

### Reuse Strategy (the core of this plan)

- `StatsCard` was **extracted** from the Kudos `StatsSidebar` into its own file
  (`app/kudos/_components/stats-card.tsx`) so both the Kudos board rail *and* the profile hero can
  render the identical stats block. It takes `dict={dict.kudosBoard}` and an optional `className`.
- `KudosCard` (`app/kudos/_components/kudos-card.tsx`) gained an optional `status?: string` prop that
  renders the red corner ribbon — used by the profile to stamp "Spam" on the first two sent kudos.
- `SectionHeading` (`app/kudos/_components/section-heading.tsx`) already supported a `right` slot,
  so the profile's filter dropdown drops straight into the heading row.
- The dropdown uses the shared `SaaDropdownPanel` / `SaaDropdownItem` shell
  (`app/_components/saa-dropdown.tsx`).
- `SiteHeader` (`app/_components/site-header.tsx`) already contained the account menu; its "Profile"
  row links to `/profile`, which is how users reach this page.

### Integration Points

- **Existing services**: `lib/supabase/server.ts` (route auth), `lib/i18n/server.ts` (`getDict`),
  `lib/saa/demo.ts` (`DEMO_COOKIE`).
- **Shared data**: `lib/saa/kudos.ts` — `KUDOS_POSTS` (backing both lists), `KUDOS_STATS` (stat
  values), `RANK_BADGE.legend` (the hero badge).
- **Shared chrome**: `SiteHeader`, `SiteFooter` (`app/_components/`).

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/3FoIx6ALVb-profile-ban-than/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Design specifications
├── plan.md              ✅ This file
├── tasks.md             ✅ Task breakdown
└── assets/
    └── frame.url.txt    ✅ Figma frame image URL
```

### Files Created

| File | Purpose |
|------|---------|
| `app/profile/page.tsx` | Route: Server Component — auth gate, dict load, hero + stats + list composition |
| `app/profile/_components/profile-kudos.tsx` | Client: "KUDOS" section — Sent/Received filter dropdown + list, Spam ribbon rule |

### Files Extended / Reused (shipped elsewhere, leveraged here)

| File | Role on Profile |
|------|-----------------|
| `app/kudos/_components/stats-card.tsx` | Overview stats card (`B_Thống kê`); extracted from `StatsSidebar` so Profile can reuse it |
| `app/kudos/_components/open-secret-box.tsx` | "Mở Secret Box" CTA (`B.6`) → opens the Secret Box modal (`J3-4YFIpMM`) |
| `app/kudos/_components/kudos-card.tsx` | Per-kudos card (`D_Post all`); gained `status` prop for the "Spam" ribbon (`D.3.1`) |
| `app/kudos/_components/section-heading.tsx` | Caption + "KUDOS" heading + `right` filter slot (`C_Header Giải thưởng`) |
| `app/_components/saa-dropdown.tsx` | `SaaDropdownPanel` / `SaaDropdownItem` for the filter menu (`C.3`) |
| `app/_components/site-header.tsx` | Fixed header (`mms_1_Button`); account menu "Profile" → `/profile` |
| `app/_components/site-footer.tsx` | Shared footer |
| `lib/saa/kudos.ts` | `KUDOS_POSTS`, `KUDOS_STATS`, `RANK_BADGE` |
| `lib/i18n/dictionaries.ts` | `dict.profile` (`collectionTitle`, `sent`, `received`, `spam`) + `dict.kudosBoard` |
| `lib/i18n/server.ts` | `getDict()` server-side locale + dictionary |
| `lib/supabase/server.ts` | `createClient()` for the auth check |
| `lib/saa/demo.ts` | `DEMO_COOKIE` demo-session flag |
| `app/globals.css` | SAA `@theme` tokens + `.saa-zoom-in` modal keyframes |

### Dependencies

No new runtime dependencies. Everything is built on the existing Next.js 16 / React 19 /
TailwindCSS 4 / Supabase stack already in the repo.

---

## Implementation Approach (retrospective phases)

### Phase 0 — Reuse Prerequisites (shared components)

These landed with the Kudos board and were made profile-ready:

1. Extract `StatsCard` from `StatsSidebar` (`app/kudos/_components/stats-card.tsx`) with a `dict` +
   `className` API so it can render outside the Kudos sidebar.
2. Add the optional `status?: string` ribbon prop to `KudosCard`.
3. Confirm `SectionHeading` exposes a `right` slot and `SaaDropdown*` are exported for reuse.
4. Add the "Profile" item (→ `/profile`) to the `SiteHeader` account menu.

### Phase 1 — Localization

1. Add `dict.profile` to both locales in `lib/i18n/dictionaries.ts`:
   `collectionTitle` ("Bộ sưu tập icon của tôi" / "My icon collection"), `sent` ("Đã gửi" /
   "Sent"), `received` ("Đã nhận" / "Received"), `spam` ("Spam").
2. Reuse existing `dict.kudosBoard` keys for the stats card, the "Sun* Annual Awards 2025" caption
   (`awardsCaption`), the "KUDOS" unit (`kudosUnit`) and card labels (`copyLink`, `viewDetails`).

### Phase 2 — Route & Auth Gate (`app/profile/page.tsx`)

1. Server Component: `const supabase = await createClient(); const { data: { user } } = await
   supabase.auth.getUser();`
2. `const cookieStore = await cookies(); hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value ===
   "1";` — Next.js 16 `cookies()` is async.
3. `if (!user && !hasDemoSession) redirect("/login");`
4. `const { locale, dict } = await getDict();` → `k = dict.kudosBoard`, `p = dict.profile`.
5. Build `headerUser` from `user.user_metadata` (`full_name`/`name`/`avatar_url`/`picture`) with
   demo fallbacks; `avatar = headerUser.avatarUrl ?? "/saa/kudos-avatar-2.png"`;
   `badge = RANK_BADGE.legend`; `PROFILE_DEPARTMENT = "CEVC3"`.

### Phase 3 — Hero (`A_Info` + `B_Thống kê`)

1. Render the KV band (`/saa/kudos-kv-bg.png`, `-z-10 h-[360px]`) + gradient fade.
2. Identity block: gold-bordered avatar, gold name, `CEVC3 • [Legend badge]`.
3. Icon collection: six `#00070C` circular slots (`border-saa-gold-muted/50`) + `p.collectionTitle`.
4. `<StatsCard dict={k} className="w-full max-w-[680px]" />` — includes the "Mở Secret Box" CTA.

### Phase 4 — KUDOS Section (`app/profile/_components/profile-kudos.tsx`)

1. `"use client"`; props: `caption`, `title`, `sent`, `received`, `cardLabels`,
   `t = { sent, received, spam }`.
2. State: `tab: "sent" | "received"` (default `"sent"`), `open: boolean`.
3. Filter trigger: `{tabLabel} ({list.length})` + chevron; `SaaDropdownPanel` with two
   `SaaDropdownItem`s; outside-click backdrop closes it.
4. `<SectionHeading caption={caption} title={title} right={filter} />` over a
   `max-w-[752px]` column of `KudosCard`, with `status={tab === "sent" && i < 2 ? t.spam :
   undefined}`.

### Phase 5 — Wire into the page

1. `<ProfileKudos caption={k.awardsCaption} title={k.kudosUnit} sent={KUDOS_POSTS}
   received={KUDOS_POSTS} cardLabels={cardLabels} t={{ sent: p.sent, received: p.received, spam:
   p.spam }} />`.
2. Wrap with `SiteHeader` / `SiteFooter`.

### Phase 6 — Polish (partly pending)

- Verify VN/EN parity across the hero, stats and list.
- Verify responsive stacking at 320/768/1024px with no horizontal overflow.
- Confirm dropdown ARIA (`aria-haspopup`, `aria-expanded`, `role="menu"`/`menuitem`).
- **Pending**: real Secret-Box → icon-collection wiring; profile empty-state; automated tests.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Demo values (`CEVC3`, Legend) diverge from real profile data | High (demo only) | Low | Documented as demo facts; swap when a profiles source exists |
| Icon-collection slots stay static (never reflect unlocked icons) | High | Medium | Tracked as PENDING; slots already match the "grey when empty" Figma spec |
| `StatsCard` reuse couples Profile to Kudos dict shape | Low | Low | `StatsCard` takes `dict.kudosBoard` explicitly; keys are stable |
| No tests yet | High | Medium | Test tasks enumerated + marked PENDING in `tasks.md` |

---

## Open Questions

- [ ] Where do the real department and Hero rank come from once Google auth / a profiles table
  lands (replacing `PROFILE_DEPARTMENT` and the hard-coded Legend badge)?
- [ ] How does opening a Secret Box (screen `J3-4YFIpMM`) persist an unlocked icon back into the six
  collection slots?
- [ ] Should the sent/received lists use distinct data (currently both are `KUDOS_POSTS`), and is
  the "first two sent = Spam" rule a placeholder or a real moderation flag?

---

## Next Steps

1. Add the automated tests enumerated in `tasks.md` (currently PENDING).
2. Wire Secret-Box results into the icon-collection slots.
3. Replace demo profile facts with real user data when auth is finalized.
