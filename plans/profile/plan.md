# Plan — Profile (`/profile`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/3FoIx6ALVb
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the authenticated `/profile` page for SAA 2025 — a single-column personal page showing the
logged-in Sunner's **identity** (avatar, name, department, Hero rank badge), a **six-slot icon
collection**, an **overview statistics card**, and their **kudos** with a "Đã gửi" / "Đã nhận"
(Sent / Received) filter. The defining decision is **reuse over rebuild**: only the route and the
client filter island are profile-specific; everything else composes the Kudos feature's components.
Auth-gated (redirect `/login`), fully VN/EN via `saa_lang` + `getDict()`.

Out of scope: real Secret-Box → icon-collection wiring, real profile data (department/rank are demo
placeholders), role-gated account menu / `/dashboard`, profile empty-state, automated tests.

## Phases
| # | Phase | Status | Depends |
|---|-------|--------|---------|
| 01 | [Profile hero + rank badge + icon-collection slots](./phase-01-profile-hero-and-badges.md) | done | — |
| 02 | [Reused StatsCard + Sent/Received filter + Spam ribbon](./phase-02-stats-and-my-kudos.md) | done | 01 |
| 03 | [Account dropdown restyle (SaaDropdown; user vs admin)](./phase-03-account-dropdown-restyle.md) | done | — |
| 04 | [Integration: route wiring + header "Profile" entry + i18n](./phase-04-integration-i18n.md) | done | 01-03 |
| 05 | [Temper + Inspect: visual validation + review (tests PENDING)](./phase-05-temper-inspect.md) | done | 04 |

## Key decisions
- **Reuse-first**: only `app/profile/page.tsx` + `app/profile/_components/profile-kudos.tsx` are
  net-new. `StatsCard` extracted from `StatsSidebar` (`app/kudos/_components/stats-card.tsx`);
  `KudosCard` gained an optional `status?: string` ribbon prop; `SectionHeading` `right` slot and
  `SaaDropdownPanel`/`SaaDropdownItem` reused as-is.
- **Server shell + one client island**: `page.tsx` is a Server Component (auth gate, `getDict()`,
  hero, `StatsCard`); only `ProfileKudos` is `"use client"` (Sent/Received tab + dropdown open state).
- **Auth gate** mirrors homepage/kudos: `supabase.auth.getUser()` + `DEMO_COOKIE` (`lib/saa/demo.ts`);
  `if (!user && !hasDemoSession) redirect("/login")`. Route also covered by `proxy.ts` protection.
- **Demo facts**: `PROFILE_DEPARTMENT = "CEVC3"` and `RANK_BADGE.legend` hard-coded; both lists use
  `KUDOS_POSTS`; first two "sent" cards flagged "Spam".
- **i18n**: new `dict.profile` (`collectionTitle`, `sent`, `received`, `spam`) in
  `lib/i18n/dictionaries.ts`; reuse `dict.kudosBoard` for the stats card, "Sun* Annual Awards 2025"
  caption and "KUDOS" heading. Read server-side via `getDict()`, passed down as props.
- **Account menu**: shared `SaaDropdown`-based menu in `site-header.tsx` ships the 3-item Admin
  layout unconditionally; the "Profile" row (→ `/profile`) is how users reach this page.

## Out of Scope (Deferred)
- **Icon-collection wiring**: the six slots are static grey placeholders; unlocking from Secret Box
  (`J3-4YFIpMM`) back into the slots is not implemented.
- **Real profile data**: `PROFILE_DEPARTMENT` and the Legend badge are demo placeholders pending a
  real profiles source / Google auth.
- **Role-gated account menu + `/dashboard`**: menu renders the Admin (3-item) variant for everyone;
  the regular-user 2-item variant (`z4sCl3_Qtk`) and admin-role guard on `/dashboard` are pending.
- **Profile empty-state**: no dedicated message when the active tab has no kudos.
- **Automated tests**: enumerated but `[ ]` PENDING ("unit test làm sau").

## Risks
- Demo values (`CEVC3`, Legend) diverge from real profile data — documented as demo; swap on real auth.
- `StatsCard` reuse couples Profile to the `dict.kudosBoard` shape — mitigated: it takes `dict`
  explicitly and the keys are stable.
- Icon slots may look "broken" if a viewer expects them populated — matches the "grey when empty"
  Figma spec; tracked as deferred.
- No tests yet — test tasks enumerated + marked PENDING in [phase-05](./phase-05-temper-inspect.md).
