---
title: UI align to demoUI reference
status: completed
work_type: feature
spec_waived: "Visual-parity fix pass against the demoUI reference app (user-supplied ground truth); no new behavior."
created: 2026-07-17
---

# UI align — match demoUI reference (4 screens)

Ground truth: `demoUI/agentic-coding-hands-on-main` run at :3001, compared screen-by-screen
against ours at :3000 via Playwright full-page screenshots (JS-off; lazy `next/image` gaps
accounted for). Assets `keyvisual-bg.png`, `kudos-bg.png`, `prelaunch bg` are byte-identical
to the demo's — deltas are CSS/markup/copy, plus 2 new assets (login art, DSEG7 Bold).

| Screen | Deltas → fix |
|---|---|
| Login | wrong art (use `/saa/login-keyvisual-art.png` via CSS bg to keep grain) · 400px bottom fade · transparent header · tagline normal weight with bold "SAA 2025" only · button label "ĐĂNG NHẬP với Google"/"LOGIN With Google" via dict · footer bold white no divider · language pill borderless |
| Prelaunch | DSEG digits render thin — Regular weight picked; force **bold** (demo uses DSEG7 Bold) · drop visible "Nhấn vào màn hình…" hint (keep click-through Link) |
| Home | keyvisual must flow past hero behind ROOT FURTHER essay (`aspect-[1512/1392]`, 100% auto, top-anchored + fade), not clipped in hero · hero countdown tiles → demo md spec (DSEG bold digits, 2 tiles/unit, #FFEA9E border) · dict: "Comming soon"→"Coming soon", livestream "Tường thuật trực tiếp…", event date hard "26/12/2025" (decoupled from countdown target) · CTAs uppercase · essay max-w-[1152px] bold text-base→2xl justify |
| Awards | `KeyvisualHero` is a documented CSS-blob placeholder → replace with real art band per demo (`aspect-[1440/547]`, cover 50% 62%, bottom fade, logo + title overlaid) |

Non-bugs found: homepage Kudos banner swoosh only missing in JS-off screenshots (lazy image) — no change.
Out of scope: /kudos (demo ships a placeholder page only), /profile, /dashboard (no demo counterpart).

Verify: re-screenshot 4 routes on :3000 vs demo · `npm test` (48) · lint · build.
Branch `fix/ui-align-demo`, one commit per screen.
