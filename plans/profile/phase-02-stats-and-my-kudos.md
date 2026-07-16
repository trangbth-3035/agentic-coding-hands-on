# Phase 02 — Reused StatsCard + Sent/Received filter + Spam ribbon

**Status:** done

## Goal
Render the overview statistics card (`B_Thống kê` `362:5073`) by reusing the Kudos component, then
the "KUDOS" section (`C_Header` + `D_Post all`) with a client Sent/Received filter and the "Spam"
ribbon rule.

## Steps

### Stats card (in `app/profile/page.tsx`)
- `<StatsCard dict={k} className="w-full max-w-[680px]" />` from
  `app/kudos/_components/stats-card.tsx` (extracted from `StatsSidebar` in Phase 03's reuse work).
  Renders the five stat rows (`B.1`–`B.5`: received, sent, likes with 🔥×2 bonus, boxes opened,
  boxes unopened) + the "Mở Secret Box" CTA (`B.6`) via `OpenSecretBox`
  (`app/kudos/_components/open-secret-box.tsx`), driven by `KUDOS_STATS.boxUnopened`.

### KUDOS section (`app/profile/_components/profile-kudos.tsx`, `"use client"`)
- Props: `caption`, `title`, `sent`, `received`, `cardLabels`, `t = { sent, received, spam }`.
- State: `tab: "sent" | "received"` (default `"sent"`) + `open: boolean`.
- Filter trigger (`C.3` `362:5089`): pill `border-saa-gold-muted bg-saa-gold-light/10 ...
  hover:bg-saa-gold-light/20`; label `{tabLabel} ({list.length})`; chevron rotates 180° when open;
  `aria-haspopup="menu"`, `aria-expanded={open}`.
- Menu: `SaaDropdownPanel` (`absolute right-0 z-20 mt-2 min-w-44`) with two `SaaDropdownItem`s
  (`sent`/`received`), `active={tab === key}`; an outside-click backdrop button closes it.
- List: `<SectionHeading caption={caption} title={title} right={filter} />`
  (`app/kudos/_components/section-heading.tsx`) over a `max-w-[752px]` column of `KudosCard`
  (`app/kudos/_components/kudos-card.tsx`), passing
  `status={tab === "sent" && i < 2 ? t.spam : undefined}` so the first two sent cards show the red
  "Spam" corner ribbon (`D.3.1` — `KudosCard`'s `status` prop renders a `bg-saa-red rounded-bl-xl`
  badge).

## Success criteria
- Stats card is the *same* component as the Kudos rail (no profile-specific duplicate).
- Filter defaults to "Đã gửi (n)"; selecting "Đã nhận" swaps the list and updates the label.
- First two "sent" cards carry the "Spam" ribbon; "received" cards carry none.
- Outside-click closes the dropdown without changing selection.

## Todo
- [x] `<StatsCard dict={k} />` reused in the hero — `app/profile/page.tsx`
- [x] `OpenSecretBox` CTA drives the Secret Box modal (`J3-4YFIpMM`) — `app/kudos/_components/open-secret-box.tsx`
- [x] `ProfileKudos` client island: `tab`/`open` state + trigger + dropdown — `app/profile/_components/profile-kudos.tsx`
- [x] `KudosCard` `status?: string` ribbon prop + `i < 2` Spam rule — `app/kudos/_components/kudos-card.tsx`, `app/profile/_components/profile-kudos.tsx`
- [ ] Profile-specific empty state when the active tab has no kudos — DEFERRED
