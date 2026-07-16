# Clarifications — Login

MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz

## Session 2026-07-16

- Q: Real Google OAuth or a stand-in? → A: Google OAuth can't be configured in this environment, so `/login` ships a **temporary demo flow** — the `startDemo` server action (`app/auth/actions.ts`) sets an httpOnly `saa_demo` cookie and redirects to `/prelaunch`. The Figma-faithful Google button + hero/header/footer (`app/login/_components/*`, `google-login-button.tsx`) are authored to the design but **not wired** into `page.tsx`; they stay for restoring real auth.
- Q: Where does login land the user (spec TODO Q2 assumed `/`)? → A: An already-authed user hitting `/login` is server-redirected to `next ?? "/"`; the demo path deliberately routes through `/prelaunch` first (login → prelaunch → home).
- Q: Which middleware enforces the gate under Next.js 16? → A: Next 16 renamed `middleware.ts` → `proxy.ts`; the active gate is `lib/supabase/proxy.ts` (`updateSession`), keyed on `PUBLIC_PREFIXES = ["/login", "/auth"]`, treating the demo cookie **or** a real Supabase user as authed. A second `lib/supabase/middleware.ts` (PROTECTED_PREFIXES) exists but is **not** wired.
- Q: Env var name for the Supabase key (spec plan said `…PUBLISHABLE_KEY`)? → A: The shipped clients read `NEXT_PUBLIC_SUPABASE_ANON_KEY` (+ `NEXT_PUBLIC_SUPABASE_URL`). As-shipped names are authoritative.
- Q: How is the header language selector handled (spec had a placeholder)? → A: Replaced by the real shared `LanguageSwitcher` (`app/_components/language-switcher.tsx`) writing the `saa_lang` cookie; all copy comes from `getDict()` (`dict.login`, `dict.footer`) — not next-intl.
- Q: Error display and domain restriction? → A: `/auth/callback` failure redirects to `/login?error=auth` and the page shows an inline `dict.login.error` banner. `@sun-asterisk.com` domain restriction (spec TODO Q1) is **not** enforced.
- Q: What does the OAuth callback do? → A: `app/auth/callback/route.ts` exchanges `?code` for a session honoring a `next` param on success, otherwise redirects to `/login?error=auth`.
