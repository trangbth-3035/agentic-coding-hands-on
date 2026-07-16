# Plan — Countdown / Prelaunch page (`/prelaunch`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the `/prelaunch` page: a full-screen pre-launch holding page — dark keyvisual background
+ gradient overlay + centered title ("Sự kiện sẽ bắt đầu sau") + a large LED-style **DSEG
7-segment glass countdown** (Days / Hours / Minutes / Seconds). It ships a **temporary
10-second demo** countdown that lands on the homepage (login → prelaunch → home); the real
launch-date wiring is deferred. Fully client-driven with SSR-safe hydration.

## Phases
Single screen — no separate phase files; the whole feature is captured inline.

| # | Phase | Status | Key files |
|---|-------|--------|-----------|
| 01 | Shared countdown math | done | `lib/saa/countdown.ts` (`computeRemaining`, `pad2`, `Remaining`) |
| 02 | DSEG font registration + tokens | done | `public/fonts/DSEG7Classic-{Regular,Bold}.woff2`, `@font-face` + `--font-dseg` in `app/globals.css` |
| 03 | Prelaunch countdown component | done | `app/prelaunch/_components/prelaunch-countdown.tsx` (`DigitBox`/`Unit`, 4 units, redirect-on-zero) |
| 04 | Prelaunch page + demo flow + i18n | done | `app/prelaunch/page.tsx` (10s demo, tap-to-continue, `dict.prelaunch`) |
| 05 | Homepage hero countdown variant | done | `app/_components/countdown.tsx` (3-unit silver tiles) |
| 06 | Temper + Inspect: tests, responsive, review | tests PENDING | — (unit test làm sau) |

## Key decisions
- **Shared math** in `lib/saa/countdown.ts`: `computeRemaining(targetMs)` returns
  `{ days, hours, minutes, seconds, done }` clamped to 0 when past; consumers ignore fields
  they don't render.
- **Demo mode**: `PrelaunchCountdown` takes a `seconds` prop (10) that counts from load; the
  `target` ISO prop path is reserved for the real launch date. On `done` it navigates via
  `useRouter().push(redirectTo)` with a `navigated` guard against double-push.
- **DSEG "off-segment" technique**: a ghosted `8` at `text-white/[0.07]` sits behind the lit
  digit to reproduce a real 7-segment LCD; DSEG7 Classic is self-hosted (SIL OFL) — no Google
  Fonts for the digits.
- **SSR safety**: `useState<Remaining | null>(null)` + `useEffect` tick; `"00"` placeholders
  render before the first client tick.
- **i18n**: `dict.prelaunch` labels (title / days / hours / minutes / seconds / enterHint) via
  server `getDict()`.
- **Two components by context**: glass DSEG boxes (prelaunch, 4 units) vs silver tiles
  (homepage hero, 3 units, `"--"` placeholder); only the math is shared.

## Out of Scope (Deferred)
- **Real launch-date target** — `NEXT_PUBLIC_LAUNCH_DATE` env + `NEXT_PUBLIC_COUNTDOWN_ACTIVE`
  middleware gate (redirect all routes to the countdown) are **not** shipped; the 10s demo
  stands in. `target` prop is ready for the switch.
- **`<noscript>` no-JS fallback** — spec'd, not shipped.
- **Flip/roll digit animation** — spec'd; digits currently update in place.
- **Unit/e2e tests** — deferred ("unit test làm sau"); tracked `[ ]` PENDING.

## Risks
- The 10s demo is **not** the real launch clock — must swap `seconds` for `target` + the env
  wiring before launch.
- The glass/DSEG look depends on the self-hosted woff2 loading; if `@font-face` fails the
  digits fall back to monospace and lose the 7-segment aesthetic.
- The tap-anywhere `<Link href="/">` overlay (`z-20`) sits above the timer; ensure it doesn't
  trap focus or block future interactive elements once the real flow lands.
