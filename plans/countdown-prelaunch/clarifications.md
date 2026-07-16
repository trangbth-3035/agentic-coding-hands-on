# Clarifications — Countdown / Prelaunch page

MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU

## Session 2026-07-16

- Q: What route (spec said `/countdown`)? → A: Shipped at **`/prelaunch`** per this repo's route naming (`app/prelaunch/page.tsx`).
- Q: Which digit font (spec said self-hosted "Digital Numbers")? → A: Uses **DSEG7 Classic** (keshikan/DSEG, SIL OFL) at `public/fonts/DSEG7Classic-{Regular,Bold}.woff2`, registered via `@font-face` in `app/globals.css` and exposed as the `--font-dseg` / `font-dseg` token.
- Q: Real launch-date countdown or a stand-in (spec wanted `NEXT_PUBLIC_LAUNCH_DATE` + a `NEXT_PUBLIC_COUNTDOWN_ACTIVE` middleware gate)? → A: Ships a **temporary demo** — `DEMO_COUNTDOWN_SECONDS = 10` counts 10s from page load then `router.push("/")`. No env var and **no middleware countdown gate**. `PrelaunchCountdown` still accepts a real `target` ISO prop for when the launch date is wired.
- Q: Does it show seconds (spec said DAYS/HOURS/MINUTES only)? → A: The prelaunch timer shows **4 units incl. SECONDS** (the 10s demo needs second-level granularity). The separate homepage hero countdown keeps the 3-unit D/H/M form.
- Q: Why two countdown components? → A: `PrelaunchCountdown` (prelaunch page — DSEG glass digit boxes, 4 units, redirect-on-zero) vs `Countdown` (`app/_components/countdown.tsx` — homepage hero, silver tiles, 3 units, `"--"` placeholder). Both share `lib/saa/countdown.ts` (`computeRemaining`, `pad2`, `Remaining`).
- Q: How does the user proceed before zero? → A: A full-screen `<Link href="/">` overlay (demo) lets the user tap anywhere to skip to the homepage; the hint text comes from `dict.prelaunch.enterHint`.
- Q: SSR/CSR hydration handling? → A: `remaining` starts `null` on the server and renders `"00"` placeholders until the first client tick (`useEffect`), avoiding a hydration mismatch (matches spec TR-007).
