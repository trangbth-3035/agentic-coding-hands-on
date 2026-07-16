# Plan — Hệ thống giải thưởng (`/award-information`)

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
Refs: [clarifications.md](./clarifications.md)

## Goal
Build the authenticated `/award-information` page for SAA 2025 — the full "Hệ thống giải thưởng SAA
2025" catalogue. A keyvisual hero, a centred title block, a **sticky scroll-spy nav rail** (design
item C), the **six award cards** (D.1–D.6: medal orb + title + copy + quantity + prize value, with
Signature carrying a dual prize), and the **Sun\* Kudos promo block** (D1) whose "Chi tiết" CTA
routes to `/kudos`. Server-rendered shell with one small client island for the nav; fully VN/EN via
`saa_lang` + `getDict()`; auth-gated like the homepage.

## Phases
This is a self-contained retrospective plan (no separate phase files). All phases shipped `done`.

| # | Phase | Status | Key files |
|---|-------|--------|-----------|
| 01 | Data + route + auth gate | done | `lib/saa/awards.ts`, `lib/saa/content.ts` (`AwardSlug`, `NAV_HREFS`), `app/award-information/page.tsx` |
| 02 | Static UI: keyvisual, title, medal, award card | done | `app/award-information/_components/{keyvisual-hero,award-medal,award-card}.tsx` |
| 03 | Interactive nav rail (scroll-spy client island) | done | `app/award-information/_components/award-nav.tsx` |
| 04 | Sun\* Kudos promo block + i18n (VN/EN) | done | `app/award-information/_components/kudos-block.tsx`, `lib/i18n/dictionaries.ts` (`awardInfo`) |
| 05 | Temper + Inspect: build/lint + visual validation | done | — (tests `[ ]` PENDING) |

**Phase 01** — `AWARDS: Award[]` in `lib/saa/awards.ts` holds structural data only (slug, `navLabel`,
`title`, `medalName`, `titleImage`, `quantity.value`, `prizes[]`, `medalSide`); `AwardSlug` is the
single source of truth in `lib/saa/content.ts`. `page.tsx` is an `async` Server Component that runs
the homepage auth gate (`getUser()` + `DEMO_COOKIE` → `redirect("/login")`), pulls `getDict()`, and
maps `AWARDS` → nav items + cards.

**Phase 02** — `KeyvisualHero` (CSS-ribbon placeholder + `ROOT FURTHER` wordmark); title block
inline in `page.tsx` (`t.subtitle` / gold `t.heading`, `saa-divider` rule); `AwardMedal` (shared
`/saa/award-bg.png` orb + per-award gold name overlay, gold-glow `boxShadow`); `AwardCard`
(medal on `medalSide`, content on the other via `lg:flex-row` / `lg:flex-row-reverse`; `ic-target`
+ gold title; localized paragraphs; `saa-divider` rules; `ic-diamond` "Số lượng giải thưởng:" block;
`ic-license` "Giá trị giải thưởng:" block iterating `prizes` with "Hoặc" + index-aligned notes).

**Phase 03** — `AwardNav` (`"use client"`): `IntersectionObserver` (`rootMargin
"-30% 0px -60% 0px"`) sets the active slug; renders `#{slug}` anchor links, active row gets
`text-saa-gold` + gold underline; each `AwardCard` article carries `id={slug}` + `scroll-mt-28`,
smooth scroll via CSS.

**Phase 04** — `KudosBlock` (`async`, reads `dict.kudos`): bg art, label/title/caption/description,
Kudos logo, "Chi tiết" → `NAV_HREFS.kudos` (`/kudos`). `dict.awardInfo` authored in **both** vi/en
(subtitle, heading, nav aria-label, medal alt prefix, quantity/value labels, "Hoặc", and per-slug
`{ paragraphs, unit, notes }`).

**Phase 05** — `npm run build` + `npm run lint` clean; visual validation of scroll-spy, dual-prize
card, and the Kudos CTA. Automated tests enumerated but `[ ]` PENDING ("unit test làm sau").

## Key decisions
- **Structural / localized split**: `lib/saa/awards.ts` = numbers + medal art (transcribed verbatim
  from Figma, e.g. `10` / `7.000.000 VNĐ`, `02` / `15.000.000 VNĐ`); `dict.awardInfo.awards` = all
  prose keyed by slug, `notes` index-aligned to `prizes`. One catalogue, two locales, zero copy in
  the component tree.
- **Server shell + one client island**: `page.tsx` and every card/section are Server Components;
  only `AwardNav` is `"use client"` (it owns the `IntersectionObserver` + active-slug state).
- **Auth gate** mirrors homepage/kudos/profile: `supabase.auth.getUser()` + `DEMO_COOKIE`
  (`lib/saa/demo.ts`), `redirect("/login")`; route also protected by `proxy.ts`.
- **Single responsive nav**: one `AwardNav` sticky rail at all breakpoints (stacks above the list on
  mobile) rather than a separate PC sidebar + SP dropdown.
- **`prizes` as an array** so the Signature card renders two values with a "Hoặc" separator; every
  other award has a single-element array.
- **Shared orb medal**: `AwardMedal` layers `/saa/award-bg.png` + `/saa/award-<slug>.png` (`next/image`
  `fill`), `priority` on the first card only.
- **Design tokens** from `app/globals.css` `@theme`: `saa-bg`, `saa-gold`, `saa-gold-muted`,
  `saa-divider`; justified body copy via the `saa-justify` utility.

## Out of Scope (Deferred)
- **Real keyvisual artwork**: `KeyvisualHero` is a documented CSS placeholder; swap the real export
  when the flat-raster hero is available.
- **Dedicated mobile dropdown selector**: the responsive sticky rail covers mobile; the SP-only
  dropdown nav from the Figma is not built.
- **Static data → CMS/DB**: award copy and amounts are hard-coded (`awards.ts` + `dict.awardInfo`);
  no fetch/admin editing, no filtering or search.
- **Automated tests**: enumerated but `[ ]` PENDING ("unit test làm sau").

## Risks
- Placeholder keyvisual diverges from the intended artwork — documented; a single-component swap.
- `notes`/`prizes` index alignment is positional — a mismatched array length would drop a note;
  mitigated by both living beside each other per slug and being covered in visual validation.
- `IntersectionObserver` scroll-spy margins are viewport-tuned — validated visually; degrades to
  anchor jump if the observer never fires.
- No tests yet — test tasks enumerated + marked PENDING (Phase 05).
