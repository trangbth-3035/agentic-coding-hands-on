# Phase 02 — `lib/` unit tests (pure + stateful + mocked)

**Depends on:** Phase 01 merged. **Priority:** high · **Status:** ready
**One branch per test target** (all branch off `main` after `test/harness-setup` lands).

## Context links
- Overview: [plan.md](./plan.md) · decisions: [clarifications.md](./clarifications.md)
- Sources: [lib/](../../lib/)

## Goal
Cover the logic-bearing `lib/` modules. Pure functions first (no mocks), then the stateful store and
the cookie-reading i18n server helpers (boundary mocks only). `lib/supabase/*` is OUT of scope.

## Test targets (each = its own branch + co-located file)

### `test/lib-countdown` → `lib/saa/countdown.test.ts`
`computeRemaining(targetMs)` + `pad2(n)`. Use `vi.useFakeTimers()` / `vi.setSystemTime(...)` to pin
`Date.now()`; restore in `afterEach`.
- future target → correct `{days,hours,minutes,seconds, done:false}` (e.g. 1d 2h 3m 4s ahead)
- `targetMs === now` and past → `{0,0,0,0, done:true}` (clamp; boundary `diff <= 0`)
- `pad2`: `3→"03"`, `12→"12"`, `0→"00"`

### `test/lib-i18n-config` → `lib/i18n/config.test.ts`
- `isLocale("vi")` / `isLocale("en")` → true
- `isLocale("fr")` / `undefined` / `null` / `""` → false
- constants: `LOCALES === ["vi","en"]`, `DEFAULT_LOCALE === "vi"`, `LOCALE_COOKIE === "saa_lang"`

### `test/lib-saa-content` → `lib/saa/content.test.ts`
- `isNavActive("/","/")` → true; `isNavActive("/","/kudos")` → false
- section href: `isNavActive("/award-information","/award-information")` → true;
  `.../award-information/foo` → true (sub-route via `startsWith`); `/kudos` → false
- `NAV_HREFS` has about/awards/kudos/standards; `AWARDS` has 6 slugs

### `test/lib-i18n-dictionaries` → `lib/i18n/dictionaries.test.ts`
- `getDictionary("vi")` and `getDictionary("en")` return objects
- **deep key-parity**: recursively assert vi and en share the exact same key set (guards missing
  translations) — write a small `collectKeys(obj)` helper in the test
- spot-check one known leaf (e.g. `nav.kudos`) differs/exists per locale

### `test/lib-saa-awards` → `lib/saa/awards.test.ts`
Cross-file invariants (the "dictionary keyed by slug, index-aligned to prizes" contract):
- slug set of `awards.ts::AWARDS` === slug set of `content.ts::AWARDS`
- every award: `prizes.length >= 1`, `quantity.value` non-empty, `medalSide ∈ {"left","right"}`
- slugs unique

### `test/lib-saa-kudos` → `lib/saa/kudos.test.ts`
- `KUDOS_POSTS` covers every `DEPARTMENTS` entry (one seed per department)
- every `post.hashtags` ⊆ `HASHTAGS`; `post.tags` contains each hashtag (derived `tagLine` 3×)
- `DEPARTMENTS`, `HASHTAGS`, `SUNNERS` non-empty and unique

### `test/lib-saa-kudos-store` → `lib/saa/kudos-store.test.ts`
Module-level state (`let posts`) persists across tests → **reset with `vi.resetModules()` + dynamic
`await import("@/lib/saa/kudos-store")` inside each test** (or `beforeEach`).
- fresh module: `getKudosSnapshot()` → `[]`; `getKudosServerSnapshot()` returns the **same** stable
  empty reference on repeated calls (`toBe`)
- `addKudos(post)` prepends (new post at index 0) and notifies subscribers
- `subscribeKudos(fn)` returns an unsubscribe that stops further notifications

### `test/lib-i18n-server` → `lib/i18n/server.test.ts`
Mock `next/headers`: `vi.mock("next/headers", () => ({ cookies: vi.fn() }))`, set the mock to return
`{ get: () => ({ value }) }`.
- cookie `saa_lang="en"` → `getLocale()` resolves `"en"`
- cookie absent / invalid (`"fr"`) → `getLocale()` resolves `DEFAULT_LOCALE` `"vi"`
- `getDict()` → `{ locale, dict }` with `dict` matching `getDictionary(locale)`

## Todo
- [ ] `test/lib-countdown`
- [ ] `test/lib-i18n-config`
- [ ] `test/lib-saa-content`
- [ ] `test/lib-i18n-dictionaries`
- [ ] `test/lib-saa-awards`
- [ ] `test/lib-saa-kudos`
- [ ] `test/lib-saa-kudos-store`
- [ ] `test/lib-i18n-server`

## Success criteria
- All `lib/` targets (except `supabase/*`) have a passing co-located suite.
- Dictionary key-parity test fails loudly if vi/en drift.
- No real timers/cookies leak between tests (fake timers restored, modules reset).

## Risks
- **`kudos-store` bleed** — forgetting the module reset makes tests order-dependent; enforce
  `vi.resetModules()` + dynamic import.
- **`next/headers` mock shape** — `cookies()` is async in Next 16; the mock's `get()` returns
  `{ value }`. Match the real signature used in `server.ts`.
