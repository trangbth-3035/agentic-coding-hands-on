# Phase 04 — Integration: route wiring + header "Profile" entry + i18n

**Status:** done

## Goal
Assemble the `/profile` route: auth gate, dictionary load, header-user derivation, compose hero +
stats + `ProfileKudos`, wrap in shared chrome, and localize (VN/EN).

## Steps

### Route & auth gate (`app/profile/page.tsx`, async Server Component)
- `const supabase = await createClient()` (`lib/supabase/server`); `await supabase.auth.getUser()`.
- `const cookieStore = await cookies()` (Next.js 16 — `cookies()` is async);
  `hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1"` (`lib/saa/demo.ts`).
- `if (!user && !hasDemoSession) redirect("/login")` — same gate as homepage/kudos; route is also
  covered by `proxy.ts` → `lib/supabase/middleware.ts`.

### Dictionary + header user
- `const { locale, dict } = await getDict()` (`lib/i18n/server`); alias `k = dict.kudosBoard`,
  `p = dict.profile`; `cardLabels = { copyLink: k.copyLink, viewDetails: k.viewDetails }`.
- Derive `headerUser: HeaderUser` from `user.user_metadata` (`full_name`/`name`/`avatar_url`/
  `picture`) with demo fallbacks (`sunner@sun-asterisk.com`, "Bùi Thị Huyền Trang").

### i18n (`lib/i18n/dictionaries.ts`)
- New `dict.profile` in both locales: `collectionTitle` ("Bộ sưu tập icon của tôi" / "My icon
  collection"), `sent` ("Đã gửi" / "Sent"), `received` ("Đã nhận" / "Received"), `spam` ("Spam").
- Reuse existing `dict.kudosBoard` keys for the stats card, "Sun* Annual Awards 2025" caption
  (`awardsCaption`), "KUDOS" unit (`kudosUnit`) and card labels (`copyLink`, `viewDetails`).
- All strings read server-side via `getDict()` and passed down as props (not client-fetched).

### Assembly
- `<SiteHeader user={headerUser} dict={dict} locale={locale} />` (its account menu "Profile" row →
  `/profile`, from Phase 03) + hero (Phase 01) + `StatsCard` (Phase 02) +
  `<ProfileKudos caption={k.awardsCaption} title={k.kudosUnit} sent={KUDOS_POSTS}
  received={KUDOS_POSTS} cardLabels={cardLabels} t={{ sent: p.sent, received: p.received,
  spam: p.spam }} />` + `<SiteFooter />`.

## Success criteria
- Unauthenticated request → redirect `/login`; authenticated → full page renders end-to-end.
- Header/footer chrome present; account menu "Profile" reaches this page.
- VN default + EN via `saa_lang` cookie; no missing-key fallbacks in either locale.

## Todo
- [x] Server-Component route + `getUser()` + demo-cookie gate → `redirect("/login")` — `app/profile/page.tsx`
- [x] `getDict()` load + `headerUser` derivation with demo fallbacks — `app/profile/page.tsx`
- [x] `dict.profile` (VN+EN) + reuse `dict.kudosBoard` keys — `lib/i18n/dictionaries.ts`
- [x] Header "Profile" entry → `/profile` — `app/_components/site-header.tsx`
- [x] Compose hero + `StatsCard` + `ProfileKudos` inside `SiteHeader`/`SiteFooter` — `app/profile/page.tsx`
