# Phase 03 — i18n + header dropdowns + page assembly

**Status:** done

Grounds on MoMorph screen `hUyaaugye2` (language dropdown) plus the shared dropdown shell. Wires the
cookie-driven bilingual layer and assembles the page.

## Goal
Make every section bilingual via the `saa_lang` cookie + `getDict()`, wire the header language and
profile overlays, and compose all pieces in `app/page.tsx` behind the auth gate.

## Steps
- `lib/i18n/config.ts` — `LOCALES` `["vi","en"]`, `DEFAULT_LOCALE = "vi"`, `LOCALE_COOKIE = "saa_lang"`,
  `isLocale()` guard.
- `lib/i18n/dictionaries.ts` — parallel `vi` + `en` dictionaries (`en: typeof vi`) across the
  namespaces this page reads: `nav`, `header`, `hero`, `awardsSection`, `awards` (keyed by award slug),
  `rootFurther`, `kudos`, `footer`, `widget`, `rules` (+ `kudosBoard.writeKudos` for the reused compose).
- `lib/i18n/server.ts` — `getLocale()` reads the `saa_lang` cookie (defaults `vi`); `getDict()` returns
  `{ locale, dict }`. `cookies()` is request-cached, so each server section calls `getDict()` on its own.
- `app/_components/language-switcher.tsx` (`"use client"`) — VN/EN pill trigger + its own dark dropdown
  (`role="menuitemradio"` + `aria-checked`, single-select); `selectLocale` writes the `saa_lang` cookie
  (`max-age` 1y) then `router.refresh()` so server sections re-render in the new locale. Uses its own
  visual shell (not `SaaDropdownPanel`), matching the distinct Figma treatment.
- `app/_components/saa-dropdown.tsx` — shared `SaaDropdownPanel` + `SaaDropdownItem` (dark `#00070C`
  panel, gold-muted border, 56px rows with the gold text-glow hover/active state). Consumed by the
  header profile menu (Profile / Dashboard / Sign out).
- `app/page.tsx` (async server component) — assembly + auth gate: Supabase `getUser()` with the
  `DEMO_COOKIE` fallback → `redirect("/login")` when absent; build `HeaderUser` (email/name/avatar from
  user metadata with safe fallbacks); `const { locale, dict } = await getDict()`. Render
  `<SiteHeader user dict locale>` → `<main>{Hero, RootFurtherSection, AwardSystem, KudosBanner}</main>`
  → `<SiteFooter>` → `<WidgetButton labels={dict.widget} rules={dict.rules} compose={dict.kudosBoard.writeKudos} senderName>`.

## Success criteria
- Switching VN↔EN via the header flips every server-rendered section (nav, hero, awards, kudos, footer, drawer).
- Locale persists across reloads via the `saa_lang` cookie; default is Vietnamese.
- Profile dropdown routes to `/profile`, `/dashboard`, and submits the `signOut` action.
- Unauthenticated (no Supabase user AND no demo cookie) → redirect `/login`.

## Todo
- [x] `lib/i18n/config.ts` — locales, default, `saa_lang` cookie name, `isLocale`
- [x] `lib/i18n/dictionaries.ts` — vi + en across all homepage namespaces
- [x] `lib/i18n/server.ts` — `getLocale()` + `getDict()` (request-cached)
- [x] `language-switcher.tsx` — VN/EN, cookie write + `router.refresh()`, radio semantics
- [x] `saa-dropdown.tsx` — shared panel/item shell for the profile menu
- [x] `app/page.tsx` — auth gate + demo fallback + full section assembly, dict/locale threaded down
