# Phase 01 — Profile hero + rank badge + icon-collection slots

**Status:** done

## Goal
Render the hero band (`A_Info` `362:5052`): keyvisual backdrop, gold-bordered avatar, gold name,
department + Hero rank badge, and the six-slot "my icon collection" grid. Server output only — no
client JS in this section.

## Steps (all in `app/profile/page.tsx`)
- KV band: `/saa/kudos-kv-bg.png` at `absolute -z-10 h-[360px] object-cover` behind the identity
  block, faded into the page bg with `bg-gradient-to-b from-transparent via-saa-bg/50 to-saa-bg`.
  Decorative (`alt=""`, `pointer-events-none`). Container
  `mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pb-14 pt-36`.
- Identity block (`A.1`–`A.3`): avatar `h-28 w-28 rounded-full border-4 border-saa-gold-light
  object-cover sm:h-32 sm:w-32`, falling back to `/saa/kudos-avatar-2.png` when
  `headerUser.avatarUrl` is null; name `text-3xl font-bold text-saa-gold-light sm:text-[32px]`;
  a row of `PROFILE_DEPARTMENT` ("CEVC3") · white/40 dot · `RANK_BADGE.legend` badge img (`h-[19px]`).
- Icon collection (`B2`–`B7` `362:5066–5071`): label `p.collectionTitle` ("Bộ sưu tập icon của
  tôi") over six circular slots `h-12 w-12 rounded-full border border-saa-gold-muted/50
  bg-[#00070C] sm:h-14 sm:w-14` — static grey placeholders (see Deferred).
- Demo facts sourced from `lib/saa/kudos.ts` (`RANK_BADGE.legend`) and the local const
  `PROFILE_DEPARTMENT = "CEVC3"` in `page.tsx`.

## Success criteria
- Hero shows avatar (gold border), gold name, `CEVC3 • [Legend]`, and six grey icon slots.
- No horizontal overflow at `sm`; slots and avatar scale down on small screens.
- Section is pure server output (no `"use client"`).

## Todo
- [x] KV band + gradient fade + centered `max-w-[1200px]` container — `app/profile/page.tsx`
- [x] Avatar (gold border + fallback) + gold name — `app/profile/page.tsx`
- [x] Department + Hero rank badge row (`PROFILE_DEPARTMENT`, `RANK_BADGE.legend`) — `app/profile/page.tsx`
- [x] Six icon-collection slots + `p.collectionTitle` label — `app/profile/page.tsx`
- [ ] Wire Secret-Box unlocks (`J3-4YFIpMM`) into the slots — DEFERRED (slots stay static grey)
