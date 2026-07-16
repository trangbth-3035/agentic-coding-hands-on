# Phase 01 — Data layer: seed + session store

**Status:** done

## Goal
Provide all board content as demo data — no Supabase tables. Structural/UGC seed lives in
`lib/saa/kudos.ts`; kudos composed this session live in a client-only store `lib/saa/kudos-store.ts`.

## `lib/saa/kudos.ts`
- Types: `KudosRank` (`new` | `rising` | `legend`), `KudosPerson`, `KudosPost`
  (sender/receiver, `time`, `hashtagTitle`, `body`, `photos`, `tags`, `hearts`, `department`,
  `hashtags[]`).
- `RANK_BADGE` — map rank → baked PNG pill (`/saa/kudos-badge-*.png`) + label (New/Rising/Legend).
- `KUDOS_POSTS` — built from `POST_SEEDS`: **one post per department** so every "Phòng ban" option
  yields a result; hashtags overlap across posts so every "Hashtag" option does too. `tagLine()`
  repeats a post's hashtags into the long red tag line the card renders.
- Filter option sources: `DEPARTMENTS` (CEVC1–4, OPD, Infra) and `HASHTAGS` (the SAA value-tags
  from the Figma hashtag dropdown `p9zO-c4a4x`); `SUNNERS` for the compose recipient picker.
- Sidebar data: `KUDOS_STATS` (received/sent/likes + `likeMultiplier: "x2"` + box counts),
  `GIFT_RECIPIENTS` (D.3 "10 Sunner nhận quà").
- Spotlight (B.7): `SPOTLIGHT_TOTAL`, `SPOTLIGHT_TICKER`, and `SPOTLIGHT_NAMES` — a deterministic
  `CloudName[]` scatter (top/left %, size, opacity, one `highlight`) so there is no runtime randomness.
- Also hosts `RULE_HERO_BADGES` / `RULE_ICONS` consumed by the shared "Thể lệ" rules drawer.

## `lib/saa/kudos-store.ts`
- Tiny external store: `addKudos(post)` prepends, `subscribeKudos`, `getKudosSnapshot`, and a stable
  `getKudosServerSnapshot()` (empty) for SSR. Consumed by `LiveKudosList` via `useSyncExternalStore`
  and fed by the "Viết Kudo" compose modal. Not persisted — session-only, separate from `KUDOS_POSTS`.

## Success criteria
- Every `DEPARTMENTS` / `HASHTAGS` option matches at least one `KUDOS_POSTS` entry.
- UGC (names, hashtags, bodies) kept verbatim; localized labels stay out of this file.

## Todo
- [x] `lib/saa/kudos.ts` — types + `RANK_BADGE` + `KUDOS_POSTS` (6 seeds, one/department) + `tagLine`
- [x] Filter/picker option lists — `DEPARTMENTS`, `HASHTAGS`, `SUNNERS`
- [x] Sidebar + spotlight seed — `KUDOS_STATS`, `GIFT_RECIPIENTS`, `SPOTLIGHT_TOTAL/TICKER/NAMES`
- [x] `lib/saa/kudos-store.ts` — session store (`addKudos`/`subscribeKudos`/snapshots)
