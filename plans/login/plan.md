# Plan — Login (`/login`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the `/login` page: the SAA 2025 entry point — a dark, full-bleed keyvisual hero
("ROOT FURTHER" logo + tagline + CTA) with a header (logo + language switcher) and a
copyright footer, wired to Supabase Auth via `@supabase/ssr`. Google OAuth is deferred, so
the CTA ships a **temporary demo-session flow** (`saa_demo` cookie → `/prelaunch` → home).
The auth gate lives in Next 16's `proxy.ts`; already-authed users are server-redirected off
`/login` with no flash.

## Phases
Single screen — no separate phase files; the whole feature is captured inline.

| # | Phase | Status | Key files |
|---|-------|--------|-----------|
| 01 | Foundation: Supabase clients + `proxy.ts` auth gate | done | `lib/supabase/{server,client}.ts`, `lib/supabase/proxy.ts`, root `proxy.ts` |
| 02 | Auth actions + OAuth callback | done | `app/auth/actions.ts` (`startDemo`/`signOut`), `app/auth/callback/route.ts`, `lib/saa/demo.ts` |
| 03 | Login page + chrome (hero, header, footer, CTA) | done | `app/login/page.tsx`, `app/login/fonts.ts` |
| 04 | Figma-faithful real-auth components (unwired) | done | `app/login/_components/{login-hero,login-header,login-footer,google-login-button}.tsx` |
| 05 | i18n + language switcher | done | `lib/i18n/*` (`dict.login`, `dict.footer`), `app/_components/language-switcher.tsx` |
| 06 | Temper + Inspect: tests, a11y, visual review | tests PENDING | — (unit test làm sau) |

## Key decisions
- **Temporary demo flow**: `startDemo` sets an httpOnly `saa_demo` cookie (8h) and
  `redirect("/prelaunch")`; swap for `supabase.auth.signInWithOAuth({ provider: "google" })`
  once Google credentials exist (`app/auth/actions.ts`).
- **Auth gate** in `proxy.ts` → `lib/supabase/proxy.ts`: `getUser()` refresh + demo-cookie
  check; unauth on a non-public path → `/login?next=<path>`; authed on `/login` → `/`.
  Public prefixes: `/login`, `/auth`.
- **Server-side redirect** in `app/login/page.tsx` (`getUser()` → `redirect(next ?? "/")`)
  prevents a flash of login content for authenticated users.
- **Fonts**: Montserrat + Montserrat Alternates via `next/font/google` in `app/login/fonts.ts`
  (latin + vietnamese subsets, 700).
- **i18n**: server-side `getDict()` (`dict.login` tagline/CTA/error, `dict.footer.copyright`);
  language via the shared `LanguageSwitcher` writing the `saa_lang` cookie. Not next-intl.
- **Env**: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Real-auth components retained**: `login-hero`/`login-header`/`login-footer`/
  `google-login-button` are authored to the Figma frame (node IDs annotated in comments) but
  not mounted by the demo `page.tsx`; kept for the real-OAuth restore.

## Out of Scope (Deferred)
- **Real Google OAuth wiring** — `google-login-button.tsx` exists and is correct; the demo
  `startDemo` flow stands in until credentials are available.
- **Domain restriction** (`@sun-asterisk.com`) — spec TODO Q1; not enforced.
- **Full language-dropdown UX** beyond the shared switcher — the `login-header.tsx` static
  "VN" button is decorative and unused by the shipped page.
- **Unit/e2e tests** — deferred ("unit test làm sau"); tracked `[ ]` PENDING.

## Risks
- The demo cookie is **not** a real Supabase session, so `getUser()` returns no user during a
  demo run — features must tolerate the stand-in. Mitigated: the proxy treats `saa_demo` as
  authed for gating.
- OAuth `redirectTo` is built from `window.location.origin`; verify per-environment redirect
  URLs when real auth is restored.
- Two middleware files coexist — only `proxy.ts` → `lib/supabase/proxy.ts` is active;
  `lib/supabase/middleware.ts` (PROTECTED_PREFIXES) is dead code and a source of confusion.
