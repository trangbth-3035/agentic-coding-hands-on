# Plan — Homepage SAA (`/`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/i87tDx10uM
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the authenticated SAA 2025 landing page at `/`: fixed header → hero (keyvisual +
live countdown + event info + CTAs) → "Root Further" intro → "Hệ thống giải thưởng" 6-card
grid → Sun\* Kudos banner → footer, plus a persistent floating action button (FAB) and its
"Thể lệ" rules drawer. Fully bilingual (VN/EN via the `saa_lang` cookie). Server component
by default; countdown, header controls, FAB and drawer are `"use client"` islands.
Out of scope: real notification data, an awards detail API, and the compose modal internals
(reused from the Kudos feature).

## Phases
| # | Phase | Status | Depends |
|---|-------|--------|---------|
| 01 | [Layout sections (hero/countdown/awards/kudos/root-further + header/footer)](./phase-01-layout-sections.md) | done | — |
| 02 | [FAB + "Thể lệ" rules drawer](./phase-02-fab-and-rules-drawer.md) | done | 01 |
| 03 | [i18n (`saa_lang` + getDict), header dropdowns, page assembly](./phase-03-i18n-and-integration.md) | done | 01, 02 |
| 04 | [Temper + Inspect: visual validation + review](./phase-04-temper-inspect.md) | done | 03 |

## Key decisions
- Auth gate lives in `app/page.tsx`: Supabase `getUser()` with the `DEMO_COOKIE` demo-session
  fallback; redirect `/login` when neither is present (proxy `proxy.ts` gates in depth too).
- Countdown reuses `lib/saa/countdown.ts` (`computeRemaining` + `pad2`); freezes at "00 00 00"
  and hides "Coming soon" at t=0 — no redirect (contrast the prelaunch page).
- Award catalogue is static: `lib/saa/content.ts` `AWARDS` (slug + `titleImage`) × `dict.awards[slug]`
  (localized title/description). Cards anchor to in-page `#awards-{slug}`.
- Navigation is centralized in `NAV_HREFS` (`lib/saa/content.ts`): `about:/`, `awards:/award-information`,
  `kudos:/kudos`, `standards:/award-information`. Active state via `isNavActive` + `usePathname`.
- i18n is cookie-driven (`saa_lang`) + `lib/i18n/` dictionaries, read per server-section via `getDict()`
  (request-cached `cookies()`). NOT next-intl / `messages/*.json`.
- FAB closed pill ⇄ open red ✕ + two pills is one `"use client"` component (`widget-button.tsx`);
  the rules drawer is `createPortal`'d with `saa-drawer-in`/`saa-fade-in` keyframes.
- Compose modal reused from the Kudos feature (`app/kudos/_components/write-kudos-modal.tsx`);
  both the FAB pill and the drawer's "Viết KUDOS" CTA converge on it in place.

## Out of Scope (Deferred)
- **Notification panel + real unread count**: bell shows a static dot; no `/api/notifications`.
- **Awards detail API**: award data is static config; no Supabase/awards fetch.
- **Compose modal internals**: owned by the Kudos "Viết Kudo" feature (`ihQ26W78P2`); reused here.
- **Community-standards route**: "Tiêu chuẩn chung" footer link points at `/award-information` (no dedicated route yet).
- **Mobile hamburger nav**: header nav links simply hide below `lg` (no drawer menu shipped).
- **Unit/e2e tests**: deferred ("unit test làm sau") — Phase 04 todos marked `[ ]` PENDING.

## Risks (Mitigated)
- Countdown t=0 behavior differing from the prelaunch page — homepage `Countdown` has no redirect path (validated).
- SSR/hydration flicker of countdown digits — renders "--" placeholder until the client effect runs.
- Locale not re-applied after switch — `language-switcher` writes the cookie then `router.refresh()`s so every server section re-reads it.
- FAB/drawer overlaying content or trapping scroll — FAB `z-40`, drawer `z-[70]` with body-scroll lock + Escape/outside-click close.
