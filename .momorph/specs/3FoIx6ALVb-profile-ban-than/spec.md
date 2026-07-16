# Feature Specification: Profile bản thân

**Frame ID**: `3FoIx6ALVb`
**Figma Frame ID**: `362:5037`
**Frame Name**: `Profile bản thân`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-07-16
**Status**: Implemented

---

## Overview

The **Profile bản thân** ("My Profile") screen is the authenticated Sunner's personal page in the
**Sun* Annual Awards 2025 (SAA 2025)** application. Route: `/profile`. It presents, in a single
scrolling column:

- A hero band with the logged-in user's **avatar**, **display name**, **department** and **Hero
  rank badge** (Legend / Rising / New).
- The user's **icon collection** — six collectible Secret-Box icons; unowned slots render as
  greyed-out placeholders.
- An **overview statistics card** (Kudos received, Kudos sent, likes with the 🔥×2 bonus, Secret
  Boxes opened / unopened) with a **"Mở Secret Box"** call-to-action. This card is the *same*
  component used in the Kudos board's right rail.
- A **"KUDOS"** section listing the user's own kudos with a **"Đã gửi (n) / Đã nhận (n)"**
  ("Sent / Received") filter. Sent kudos that were flagged carry a red **"Spam"** ribbon.

The page reuses the shared `SiteHeader` (with the account menu that links here) and `SiteFooter`
chrome, so it inherits the app's navigation, language switching and dark SAA theme.

**Target users**: All Sun* employees (Sunners) participating in SAA 2025 who want to review their
own recognition activity and reward progress.

**Business context**: The Kudos programme is gamified — sending kudos earns hearts, hearts earn
Secret Boxes, and Secret Boxes unlock the six collectible icons; receiving kudos raises the Hero
rank badge. The profile page is where a Sunner sees all of that progress in one place.

---

## User Scenarios & Testing

### User Story 1 - View My Profile (Priority: P1)

**As an** authenticated Sunner,
**I want to** open my profile and see my avatar, name, department, Hero badge, icon collection and
kudos statistics,
**So that** I can review my recognition activity and reward progress.

**Why this priority**: This is the core read experience of the page — everything else is a control
layered on top of it.

**Independent Test**: With a valid session (or the demo-session cookie), navigate to `/profile` and
verify the hero, badge, six icon slots and stats card all render with data.

**Acceptance Scenarios**:

1. **Given** the user is authenticated, **When** they visit `/profile`, **Then** the hero band
   renders their avatar (circular, gold-bordered), display name (gold), department (`CEVC3` in the
   demo) and the Hero rank badge.
2. **Given** the profile hero is rendered, **When** the user has no avatar in their profile
   metadata, **Then** the fallback avatar (`/saa/kudos-avatar-2.png`) is shown.
3. **Given** the profile is rendered, **When** the user inspects the icon collection, **Then** six
   circular slots appear under the label "Bộ sưu tập icon của tôi" ("My icon collection"); slots
   for icons the user has not yet unlocked render as grey placeholders.
4. **Given** the profile is rendered, **When** the user views the statistics card, **Then** it
   shows Kudos received, Kudos sent, likes received (with the 🔥×2 bonus badge), Secret Boxes
   opened and Secret Boxes unopened, followed by the "Mở Secret Box" button.
5. **Given** the profile is rendered, **When** the user scrolls to the KUDOS section, **Then** the
   "Sun* Annual Awards 2025" caption + "KUDOS" heading appear above a list of the user's kudos
   cards.

---

### User Story 2 - Filter My Kudos (Sent / Received) (Priority: P1)

**As a** Sunner,
**I want to** switch the KUDOS list between the kudos I sent and the kudos I received,
**So that** I can inspect each side of my recognition activity.

**Why this priority**: The list is the primary interactive content of the page; the sent/received
toggle is how the user makes sense of it.

**Independent Test**: On `/profile`, click the "Đã gửi (n)" dropdown → select "Đã nhận" → verify the
list swaps and the button label updates.

**Acceptance Scenarios**:

1. **Given** the profile loads, **When** the KUDOS section renders, **Then** the filter defaults to
   "Đã gửi" ("Sent") and the button shows the sent count in parentheses, e.g. "Đã gửi (6)".
2. **Given** the filter dropdown is closed, **When** the user clicks the filter button, **Then** a
   dropdown opens listing "Đã gửi" and "Đã nhận", with the current selection highlighted, and the
   chevron rotates 180°.
3. **Given** the dropdown is open, **When** the user selects "Đã nhận" ("Received"), **Then** the
   dropdown closes, the button label becomes "Đã nhận (n)", and the list re-renders with the
   received kudos.
4. **Given** the dropdown is open, **When** the user clicks outside it, **Then** the dropdown closes
   without changing the selection (a transparent backdrop button handles the outside click).
5. **Given** the "Đã gửi" tab is active, **When** the list renders, **Then** the first two sent
   kudos display the red "Spam" corner ribbon; the "Đã nhận" tab shows no ribbons.

---

### User Story 3 - Open a Secret Box from the Stats Card (Priority: P2)

**As a** Sunner with unopened Secret Boxes,
**I want to** open a Secret Box from my profile's statistics card,
**So that** I can reveal a new collectible icon toward my set of six.

**Why this priority**: Gamification reward loop — engaging but not required to read the profile.

**Independent Test**: On `/profile`, click "Mở Secret Box" and verify the Secret Box modal opens.

**Acceptance Scenarios**:

1. **Given** the stats card is rendered, **When** the user clicks "Mở Secret Box", **Then** the
   Secret Box modal (screen `J3-4YFIpMM`) opens.
2. **Given** the modal is open, **When** a box is opened, **Then** one of the six collectible icons
   is revealed and the corresponding profile icon slot should reflect the newly-unlocked icon.
   > **TODO**: Wiring the revealed icon back into the profile's collection slots is not yet
   > implemented — the slots are currently static placeholders (see Notes).
3. **Given** the user has zero unopened boxes, **When** they view the stats card, **Then** the
   "Mở Secret Box" affordance is disabled / non-actionable (driven by `boxUnopened`).

---

### User Story 4 - Account Menu & Navigation (Priority: P2)

**As a** signed-in Sunner,
**I want** the shared header's account menu and navigation to work from my profile,
**So that** I can move between pages, switch language, or sign out.

**Why this priority**: Consistent chrome across pages; the account menu's "Profile" item is how
users reach this page.

**Independent Test**: On `/profile`, open the header account menu and confirm "Profile",
"Dashboard" and "Sign out" appear; confirm the "Kudos" nav item is a working link.

**Acceptance Scenarios**:

1. **Given** the header is rendered, **When** the user opens the account menu, **Then** it shows
   "Profile" (→ `/profile`), "Dashboard" (→ `/dashboard`) and "Sign out" (submits the `signOut`
   server action).
2. **Given** the header is rendered, **When** the user clicks the language switcher, **Then** the
   locale changes via the `saa_lang` cookie and all copy on the profile re-renders in the selected
   language (VN/EN).
3. **Given** the header is rendered, **When** the user clicks a nav tab (About / Awards / Kudos),
   **Then** they navigate to the corresponding route.

---

### Edge Cases

- **Unauthenticated access**: A request without a Supabase session *and* without the demo-session
  cookie is redirected to `/login` before the page renders (matches the homepage / kudos gate).
- **Missing profile metadata**: If `full_name` / `name` are absent, the name falls back to the
  email local-part, then to the demo name "Bùi Thị Huyền Trang"; email falls back to
  `sunner@sun-asterisk.com`.
- **Empty kudos list**: If the user has no kudos on the active tab, the list area renders empty.
  > **TODO**: A dedicated empty-state message is not yet designed for the profile list.
- **No unlocked icons**: All six collection slots render as grey placeholders (per the Figma note
  on `A_Info`: "chưa có icon nào thì để icon xám").
- **Very small screens (<360px)**: The single-column layout stacks without horizontal overflow;
  avatar, icon slots and stat rows scale down at the `sm` breakpoint.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors and typography
> come from that document. Frame render: `assets/frame.url.txt`.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | `mms_1_Button` | Shared `SiteHeader` — logo, About/Awards/Kudos nav, notification bell, language switcher, account avatar | Nav links; open account menu; switch language |
| Keyvisual band | `mms_3_Keyvisual` | Full-bleed hero KV image (`/saa/kudos-kv-bg.png`) behind the identity block, faded into the page bg by a vertical gradient | None (decorative) |
| A_Info | `362:5052` | Identity block for the logged-in user: avatar + name + department + Hero badge, plus the "my icon collection" grid ("bộ sưu tập icon của tôi theo icon mở được trong Secret box; chưa có icon nào thì để icon xám") | None (display) |
| A.1_Avatar | `362:5053` | Circular avatar image with a 4px gold border | None |
| A.2_Name | `362:5054` | Display name rendered in gold | None |
| A.3_Huy Hiệu | `362:5064` | Hero rank badge shown beside the name (Legend in the demo) | None |
| B2_Huy hiệu … B7_Huy hiệu | `362:5066`–`362:5071` | Six collectible Secret-Box icon slots; unowned slots render grey | None (unlocked via Secret Box) |
| B_Thống kê | `362:5073` | Overview statistics card (the same component as the Kudos sidebar's stats block) | Contains the "Mở Secret Box" CTA |
| B.1_Số kudos bạn nhận được | `362:5076` | "Kudos received" stat row | None |
| B.2_Số kudos bạn đã gửi | `362:5077` | "Kudos sent" stat row | None |
| B.3_Số tim bạn nhận được | `362:5078` | "Likes received" stat row with the 🔥×2 bonus badge | None |
| B.4_Số box đã mở | `362:5080` | "Secret Boxes opened" stat row | None |
| B.5_Số box chưa mở | `362:5081` | "Secret Boxes unopened" stat row | None |
| B.6_Button mở quà | `362:5082` | "Mở Secret Box" primary CTA | Click → Secret Box modal (`J3-4YFIpMM`) |
| C_Header Giải thưởng | `362:5084` | Section heading block above the kudos list | None |
| C.1_title | `362:5085` | "Sun* Annual Awards 2025" caption | None |
| C.2_KUDOS title | `362:5088` | Large gold "KUDOS" heading | None |
| C.3_Button | `362:5089` | "Đã gửi (n) / Đã nhận (n)" filter dropdown | Click → toggle Sent / Received |
| D_Post all | `362:5091` | List of the user's kudos cards | Copy link; view details (per card) |
| D.3.1_Status | `3127:24095` | Red "Spam" corner ribbon on flagged sent kudos | None (display) |
| Floating IC button | `mms_7.4_Button-IC` | Shared floating action button present in the Figma frame | Not rendered in the shipped `/profile` route (lives on the homepage) |

### Navigation Flow

- **From**:
  - Header account menu → "Profile" item (`SiteHeader`, links to `/profile`) — the primary entry.
  - Direct URL access (authenticated).
- **To**:
  - Secret Box modal (screen `J3-4YFIpMM`) — on "Mở Secret Box" click (opens in place, no route
    change).
  - `/dashboard` — via the header account menu's "Dashboard" item.
  - About (`/`) / Awards (`/award-information`) / Kudos (`/kudos`) — via the header/footer nav.
  - `/login` — server-side redirect if the request is unauthenticated.
- **Triggers**:
  - Filter dropdown "Đã gửi" / "Đã nhận" → swaps the rendered kudos list (client-side state).
  - Language switcher → sets `saa_lang` cookie → re-render in the chosen locale.

### Visual Requirements

- See [design-style.md](./design-style.md) for complete visual specs.
- **Responsive breakpoints**: Mobile (≥320px), Tablet (≥768px), Desktop (≥1024px); content capped at
  `max-w-[1200px]` and centered.
- **Theme**: Dark SAA theme only (`--color-saa-bg` background, gold accents). No light-mode variant.
- **Animations/Transitions**:
  - Filter chevron rotates 180° when the dropdown opens.
  - Filter button background lightens on hover (`bg-saa-gold-light/10 → /20`).
  - Secret Box modal uses the shared zoom-in entrance (`.saa-zoom-in`).
- **Accessibility**: WCAG 2.1 AA — the filter button exposes `aria-haspopup="menu"` and
  `aria-expanded`; the dropdown panel is `role="menu"` with `role="menuitem"` rows; decorative
  images (`alt=""`) are hidden from assistive tech.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST redirect unauthenticated requests (no Supabase session and no demo-session
  cookie) to `/login` before rendering the profile.
- **FR-002**: System MUST display the logged-in user's avatar, display name, department and Hero
  rank badge in the hero band.
- **FR-003**: System MUST render six icon-collection slots; unowned icons MUST render as grey
  placeholders.
- **FR-004**: System MUST display the overview statistics (received, sent, likes with ×2 bonus,
  boxes opened, boxes unopened) and a "Mở Secret Box" CTA.
- **FR-005**: Users MUST be able to toggle the kudos list between "Đã gửi" (Sent) and "Đã nhận"
  (Received); each option MUST show its item count.
- **FR-006**: System MUST render a red "Spam" ribbon on flagged sent kudos.
- **FR-007**: Clicking "Mở Secret Box" MUST open the Secret Box modal (`J3-4YFIpMM`).
- **FR-008**: All user-facing copy MUST be localized (VN/EN) via the dictionary system.

### Technical Requirements

- **TR-001**: The route (`app/profile/page.tsx`) MUST be a Next.js Server Component that resolves
  auth via `lib/supabase/server` (`supabase.auth.getUser()`) and the demo cookie (`DEMO_COOKIE`).
- **TR-002**: Interactive filtering MUST be isolated to a Client Component
  (`app/profile/_components/profile-kudos.tsx`); the page shell stays a Server Component.
- **TR-003**: The statistics card MUST be the shared `StatsCard`
  (`app/kudos/_components/stats-card.tsx`) — no profile-specific duplicate.
- **TR-004**: Design tokens MUST come from `app/globals.css` `@theme` (`--color-saa-*`) consumed via
  Tailwind utilities; no hard-coded palette values beyond the pre-existing `#00070C` card surface.
- **TR-005**: Localized strings MUST be read server-side via `getDict()` and passed down as props
  (dictionaries in `lib/i18n/`), not fetched on the client.

### Key Entities

- **HeaderUser**: `{ email: string; name: string; avatarUrl: string | null }` — derived from the
  Supabase user + `user_metadata`, with demo fallbacks.
- **KudosPost** (`lib/saa/kudos.ts`): `{ id, sender, receiver, time, hashtagTitle, body, photos,
  tags, hearts, department, hashtags[] }` — the sample data backing both the sent and received
  lists.
- **KUDOS_STATS** (`lib/saa/kudos.ts`): `{ received, sent, likes, likeMultiplier, boxOpened,
  boxUnopened }` — the overview stat values.
- **RANK_BADGE** (`lib/saa/kudos.ts`): New / Rising / Legend Hero pill PNGs; the profile uses
  `RANK_BADGE.legend`.

---

## State Management

- **Server (route)**:
  - Supabase user + demo-session cookie → auth gate.
  - Current locale + dictionary via `getDict()`; department constant (`PROFILE_DEPARTMENT = "CEVC3"`,
    a demo fact not carried by the demo session).
- **Client (`ProfileKudos`)**:
  - `tab: "sent" | "received"` — which list is shown (default `"sent"`).
  - `open: boolean` — filter dropdown visibility; closed by an outside-click backdrop.
- **Client (`OpenSecretBox`, inside `StatsCard`)**:
  - Secret Box modal open/closed state; driven by `unopenedCount`.
- **Cache requirements**: The page is user-specific and gated; it MUST NOT be statically cached.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: An authenticated user opening `/profile` sees their identity, badge, six icon slots
  and full stats card on first render (no client round-trip for the primary content).
- **SC-002**: Toggling "Đã gửi" ↔ "Đã nhận" swaps the list instantly (client state, no navigation).
- **SC-003**: An unauthenticated request never renders profile HTML — it redirects to `/login`.
- **SC-004**: All labels render correctly in both VN and EN with no missing-key fallbacks.

---

## Out of Scope

- Viewing *another* Sunner's profile (`/profile/{id}`) — this screen is the current user's own
  profile only.
- Editing profile fields (name, avatar, department) — read-only page.
- Real Secret Box open mechanic / persistence of unlocked icons back into the collection slots
  (the modal opens, but slot state is static — see Notes).
- Real kudos data / pagination — the lists use shared sample data (`KUDOS_POSTS`).
- The full Secret Box modal specification — covered by screen `J3-4YFIpMM`.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Shared `SiteHeader` / `SiteFooter` chrome shipped (`app/_components/`)
- [x] Shared `StatsCard` + `OpenSecretBox` shipped (`app/kudos/_components/`)
- [x] Shared `KudosCard` + `SectionHeading` + `SaaDropdown` shipped
- [x] i18n dictionaries carry `dict.profile` and `dict.kudosBoard` (VN + EN)
- [ ] Secret Box open result → profile icon-collection wiring (pending; see Notes)

---

## Notes

- **Reuse first**: The stats block is not re-built for the profile — the page imports the exact
  `StatsCard` used on the Kudos board (extracted from the Kudos `StatsSidebar`). `KudosCard` gained
  an optional `status` prop specifically so the profile could stamp the "Spam" ribbon on sent kudos.
- **Demo facts**: `PROFILE_DEPARTMENT` ("CEVC3") and the Legend badge are hard-coded demo values
  because the temporary demo-session cookie does not carry rich profile metadata. When real Google
  auth / a profiles table lands, these should be sourced from the user record.
- **Icon collection is presentational**: the six slots are static grey placeholders today. The
  Figma intent (`A_Info` node note) is that they fill in with icons the user has unlocked via
  Secret Boxes; that data wiring is not yet implemented.
- The hero KV band and its gradient overlay are decorative (`alt=""`) and sit behind the content at
  `-z-10`.
