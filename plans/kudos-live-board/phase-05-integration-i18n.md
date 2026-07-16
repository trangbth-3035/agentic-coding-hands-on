# Phase 05 — Integration: page assembly + i18n

**Status:** done

## Goal
Assemble `/kudos`, gate access, and wire the `saa_lang` + `lib/i18n` dictionaries through every section.

## `app/kudos/page.tsx` (async server component)
- **Auth gate** (mirrors homepage/awards): `createClient()` → `supabase.auth.getUser()`; also read
  the `DEMO_COOKIE`. `if (!user && !hasDemoSession) redirect("/login")`. The demo cookie is the
  temporary Google-OAuth stand-in (`app/auth/actions.ts`).
- **i18n**: `const { locale, dict } = await getDict(); const k = dict.kudosBoard;` — pass `k`
  (and a `cardLabels = { copyLink, viewDetails }`) down; build `headerUser` from Supabase
  `user_metadata` with sensible demo fallbacks.
- **Compose layout** — render order: `SiteHeader` → `KudosHero` (with the "Viết Kudo" launcher +
  static Sunner search pill) → Highlight section (`HighlightSection` with `KUDOS_POSTS`,
  `HASHTAGS`, `DEPARTMENTS`) → Spotlight (`SectionHeading` + `SpotlightBoard`) → All Kudos
  (`SectionHeading` + `LiveKudosList` + first 4 `KUDOS_POSTS` as `KudosCard` + `StatsSidebar`) →
  `SiteFooter`. Sections use `mx-auto max-w-[1200px] px-6`; page background from the `saa-bg` token.

## i18n — `lib/i18n/dictionaries.ts`
- `kudosBoard` namespace (vi + en): `heroTitle`, `writePrompt`, `searchProfile`, `awardsCaption`,
  `highlight`, `hashtag`, `department`, `spotlight`, `all`, `search`, `kudosUnit`, `tickerSuffix`,
  `copyLink`, `viewDetails`, `noResults`, nested `stats` (received/sent/likes/boxOpened/boxUnopened/
  openBox), nested `secretBox` (title/hint/unopenedLabel), `recipientsTitle`, `recipientGift`, and
  the `writeKudos` compose block. Read server-side via `getDict()` (`lib/i18n/server.ts`), locale
  from the `saa_lang` cookie (`lib/i18n/config.ts`).

## Reuse
- `SiteHeader` / `SiteFooter` (`app/_components/`) for shared chrome; `NAV_HREFS.kudos = /kudos`.

## Success criteria
- `/kudos` renders end-to-end with seed data for both `vi` and `en`.
- Unauthenticated + no demo cookie → redirect `/login`; `npm run build` + `lint` clean.

## Todo
- [x] `app/kudos/page.tsx` — auth gate (Supabase user OR `DEMO_COOKIE`), `getDict`, section assembly
- [x] Pass `dict.kudosBoard` + `cardLabels` into hero / highlight / spotlight / feed / sidebar
- [x] `kudosBoard` namespace in `lib/i18n/dictionaries.ts` (vi + en) incl. `stats` / `secretBox`
- [x] Reuse `SiteHeader` / `SiteFooter`; `LiveKudosList` mounted above the static feed
- [x] `npm run build` + `npm run lint` clean
