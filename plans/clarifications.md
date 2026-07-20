# Clarifications & Decisions Log — SAA 2025

Cross-screen open questions and design↔implementation decisions surfaced while authoring the
`.momorph/specs/` sets. Each item is grounded in the shipped code + the MoMorph design source
(file key `9ypp4enmFmdK3YAFJLIu6C`), not invented.

## Session 2026-07-16 — spec backfill for 11 screens

### Auth / account menu
- **Q:** Regular-user vs Admin account dropdown — how is the difference handled?
  **Decision (as-shipped):** The menu lives in `app/_components/site-header.tsx` on the shared
  `saa-dropdown.tsx` shell and ships the 2-item **regular-user** variant (`z4sCl3_Qtk` — Profile
  highlighted + Logout, icons inline after labels). The Dashboard row was removed 2026-07-20:
  the user site has no admin, so the Admin (3-item, `54rekaCHG1`) variant is not rendered.
  (specs: `z4sCl3_Qtk-dropdown-profile`, `54rekaCHG1-dropdown-profile-admin`)
- **Q:** Is `/dashboard` restricted to admins?
  **Decision:** `/dashboard` is **auth-gated but not role-gated** (`lib/supabase/middleware.ts`
  `PROTECTED_PREFIXES = ["/dashboard"]`, wired via `proxy.ts` — Next 16's renamed middleware).
  Admin-role enforcement is PENDING.
- **Discrepancy:** MoMorph note says Logout returns to "Homepage"; the shipped `signOut`
  (`app/auth/actions.ts`) redirects to `/login`. As-implemented `/login` behaviour is authoritative.

### Kudos board filters (Phòng ban / Hashtag)
- **Discrepancy:** MoMorph copy says a selected filter applies "toàn trang" (page-wide); the shipped
  code scopes filtering to the Highlight carousel via `HighlightSection`
  (`app/kudos/_components/kudos-filters.tsx` + `highlight-section.tsx`). Documented as-implemented.
- **Q:** Department / hashtag option sources?
  **Decision:** `DEPARTMENTS` / `HASHTAGS` in `lib/saa/kudos.ts` (static demo data standing in for
  the eventual DB-backed lists). (specs: `WXK5AYB_rG-dropdown-phong-ban`,
  `JWpsISMAaM-dropdown-hashtag-filter`)

### Compose hashtag picker (Viết Kudo)
- **Discrepancy / rule:** Figma describes disabling unselected rows once 5 hashtags are chosen; the
  shipped `write-kudos-modal.tsx` instead hides the "+ Hashtag" add control at `MAX_ITEMS = 5`.
  Both enforce the max-5 cap. (spec: `p9zO-c4a4x-dropdown-list-hashtag`)

### Secret Box
- **Discrepancy:** Shipped title `"KHÁM PHÁ SECRET BOX CỦA BẠN"` / hint `"Click vào box để mở"`
  differ from the Figma `A_Title` `"MỞ SECRET BOX THÀNH CÔNG"`. The dictionary strings
  (`lib/i18n/`) are authoritative.
- **PENDING:** Reveal odds (Stay Gold 30% / Flow to Horizon 25% / Touch of Light 20% / Beyond the
  Boundary 10% / Revival 10% / Root Further 5%), count-decrement, and hint-hide / box-disable at
  zero are spec'd as business rules but `onOpenBox` is unwired from `StatsCard` (the opened "đã mở"
  state is a separate frame). (spec: `J3-4YFIpMM-open-secret-box`)

### Floating Action Button
- **Note:** Closed and open are two states of one component (`app/_components/widget-button.tsx`).
  The closed pill's `aria-label` uses the "Viết KUDOS" label though the pill represents both actions
  (Thể lệ + Viết KUDOS) — non-blocking a11y consideration. (specs: `_hphd32jN2`, `Sv7DFwBw1h`)

### Profile
- **Note:** Only `app/profile/page.tsx` + `app/profile/_components/profile-kudos.tsx` are
  profile-specific; the rest is reuse (`StatsCard` extracted from the Kudos `StatsSidebar`,
  `KudosCard` gained a `status` ribbon prop for the "Spam" flag).
- **PENDING / demo placeholders:** `PROFILE_DEPARTMENT = "CEVC3"`, `RANK_BADGE.legend`, and the
  icon-collection slots are still static (should follow icons unlocked via Secret Box).
  (spec: `3FoIx6ALVb-profile-ban-than`)

### Language picker
- **Note:** `language-switcher.tsx` uses a bespoke shell (rounded-full pill + `bg-black/90` panel),
  NOT the shared `SaaDropdownPanel`. Writes the `saa_lang` cookie and calls `router.refresh()`;
  server reads via `getLocale()` / `getDict()`. (spec: `hUyaaugye2-dropdown-ngon-ngu`)

---

> Detailed per-screen specs, design tokens, plans and tasks live under `.momorph/specs/<screen>/`.
> Unit tests shipped 2026-07-17 via `plans/unit-tests/` (Vitest + RTL, 14 suites, coverage-gated
> CI). Covered test tasks are flipped `[x]` in each `tasks.md`; e2e/route-level tasks remain `[ ]`.
