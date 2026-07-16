# Clarifications — Sun* Kudos Live Board

MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ

## Session 2026-07-16

- Q: Where does board data come from — no Supabase tables or queries exist for kudos? → A: Static seed in `lib/saa/kudos.ts` (`KUDOS_POSTS` — one post per department, `DEPARTMENTS`/`HASHTAGS`/`SUNNERS`/`KUDOS_STATS`/`GIFT_RECIPIENTS`/`SPOTLIGHT_*`) plus a client-only session store `lib/saa/kudos-store.ts` (`useSyncExternalStore`) for kudos sent via the compose modal. **No Supabase migration/seed** — this is demo content, not persisted.
- Q: Filter scope — the Figma annotation says a selected filter applies "toàn trang" (page-wide)? → A: As-shipped the Hashtag / "Phòng ban" filters scope the **Highlight carousel only** (via `HighlightSection`); the All Kudos feed and Spotlight board are not filtered. Documented as-implemented (see specs `WXK5AYB_rG-dropdown-phong-ban`, `JWpsISMAaM-dropdown-hashtag-filter`).
- Q: How functional should card interactions be? → A: Local UI states only — filter select/clear, carousel scroll + pager, and the Like heart toggle (client-only, not persisted). "Copy Link" and "Xem chi tiết" are visual-only CTAs (no clipboard/toast, no detail navigation).
- Q: Secret Box — build the reveal? → A: Only the unopened-state modal (screenId `J3-4YFIpMM`), opened from the stats card "Mở Secret Box" button. `onOpenBox` is intentionally left unwired — the opened ("đã mở") reveal frame + odds engine (Stay Gold 30% / Flow to Horizon 25% / …) is a separate frame, deferred.
- Q: Is `/kudos` public or gated? → A: Gated — the page redirects to `/login` unless a Supabase user **or** the demo-session cookie (`DEMO_COOKIE`) is present, same gate as the homepage / awards page. The demo cookie is the temporary stand-in for Google OAuth.
- Q: Hero-rank badges and the 4-tier tooltip system from Figma? → A: Rank pill badges are baked PNGs (`RANK_BADGE`: New / Rising / Legend) rendered inline in the card; no hover tooltip and no 4th "Super Hero" tier — the Figma tooltip/campaign-chip system was not built.
- Q: i18n copy source? → A: `kudosBoard` namespace in `lib/i18n/dictionaries.ts` (vi/en) read via `getDict()` server-side; user-generated content (Sunner names, hashtags, thank-you bodies) is kept verbatim in both locales inside `lib/saa/kudos.ts`.
