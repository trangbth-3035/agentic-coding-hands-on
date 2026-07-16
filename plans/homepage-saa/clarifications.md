# Clarifications — Homepage SAA

MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/i87tDx10uM

## Session 2026-07-16

- Q: Event date/time is inconsistent in Figma ("18h30 / Nhà hát nghệ thuật quân đội" vs "26/12/2025 / Âu Cơ Art Center") — which drives the hero? → A: Single source of truth `NEXT_PUBLIC_LAUNCH_AT` (default `2026-12-26T18:30:00+07:00`); the date is formatted with `Intl.DateTimeFormat` (Asia/Ho_Chi_Minh) and the venue/livestream copy lives in `dict.hero` — no hardcoded date in the component.
- Q: What happens when the countdown reaches zero on the homepage? → A: Freeze at "00 00 00" and hide the "Coming soon" label — NO redirect (that behavior belongs to the prelaunch `/countdown` page, not here).
- Q: Where does award data come from — static config or API? → A: Static. Structural fields (slug + title artwork) in `lib/saa/content.ts` (`AWARDS`); all localized title/description in `dict.awards[slug]`. No `/api/awards`.
- Q: What do the award cards link to? → A: In-page hash anchors `#awards-{slug}` on the homepage awards section (not `/award-information#{slug}`) — kept simple; the dedicated awards page owns its own detail anchors.
- Q: Routes — `/awards` as the spec draft implies? → A: No. This repo uses `/award-information` (Award Information) and `/kudos`; `NAV_HREFS` in `lib/saa/content.ts` is the single map. "Tiêu chuẩn chung" footer link points at `/award-information` (no dedicated standards route yet, rendered with `noActive`).
- Q: Notification badge — wire `/api/notifications`? → A: No backend. The bell shows a static unread dot placeholder only.
- Q: How functional are the header overlays and the FAB? → A: Fully working client UI — language switch (writes `saa_lang` cookie + `router.refresh()`), profile dropdown (Profile / Dashboard / Sign out), FAB open/close, and the "Thể lệ" rules drawer. The "Viết KUDOS" compose modal is reused from the Kudos feature (`app/kudos/_components/write-kudos-modal.tsx`) and opens in place — no navigation.
- Q: File structure / conventions? → A: This repo is `app/` (App Router, Next 16 + Turbopack), NOT `src/`; kebab-case component files under `app/_components/`, server components by default with `"use client"` islands. Ignore the spec draft's `src/components/…` PascalCase layout.
