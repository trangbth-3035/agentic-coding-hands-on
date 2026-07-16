# Clarifications — Profile

MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/3FoIx6ALVb

## Session 2026-07-16

- Q: How much of `/profile` is net-new vs. reused? → A: Reuse-first. Only `app/profile/page.tsx` and `app/profile/_components/profile-kudos.tsx` are profile-specific; the stats card, kudos card, section heading and dropdown shell all come from the Kudos feature. `StatsCard` was extracted out of `StatsSidebar` and `KudosCard` gained a `status` ribbon prop precisely so the profile could compose rather than rebuild.
- Q: Where do department + Hero rank come from? → A: Demo placeholders — `PROFILE_DEPARTMENT = "CEVC3"` and `RANK_BADGE.legend` are hard-coded in `app/profile/page.tsx` / `lib/saa/kudos.ts` because the temporary demo-session cookie carries no rich profile metadata. To be sourced from a real profiles record when Google auth lands (deferred).
- Q: Are the six icon-collection slots functional? → A: No — they render as static grey placeholders (`bg-[#00070C]`). The Figma intent is that they fill from icons unlocked via Secret Box (`J3-4YFIpMM`), but that data wiring is deferred; "grey when empty" already matches the design.
- Q: Do "Đã gửi" / "Đã nhận" use different data, and is the "Spam" flag real? → A: Both lists render the same `KUDOS_POSTS`; the first two "sent" cards carry the red "Spam" ribbon via `status={tab === "sent" && i < 2 ? t.spam : undefined}` — a placeholder rule, not a real moderation flag.
- Q: How is the regular-user vs. admin account menu handled? → A: One shared menu on the `SaaDropdown` shell in `app/_components/site-header.tsx`. It ships the 3-item **Admin** variant ("Trang cá nhân" / "Dashboard" / "Đăng xuất") unconditionally for everyone; the 2-item regular-user variant (`z4sCl3_Qtk`) and role-conditional hiding of "Dashboard" are deferred.
- Q: Is `/dashboard` admin-restricted, and where does Logout land? → A: `/dashboard` is auth-gated but **not** role-gated (`PROTECTED_PREFIXES = ["/dashboard"]` in `lib/supabase/middleware.ts`, wired via `proxy.ts`); role enforcement is deferred. Logout runs `signOut` (`app/auth/actions.ts`) → redirects to `/login` (the MoMorph note says "Homepage"; as-shipped `/login` is authoritative).
