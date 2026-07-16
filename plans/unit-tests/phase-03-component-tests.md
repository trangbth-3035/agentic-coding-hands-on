# Phase 03 — Client component tests (React Testing Library)

**Depends on:** Phase 01 merged. Independent of Phase 02 (run in parallel). **Priority:** high · **Status:** ready
**One branch per component target.**

## Context links
- Overview: [plan.md](./plan.md) · decisions: [clarifications.md](./clarifications.md)
- Sources: [app/_components/](../../app/_components/) · [app/kudos/_components/](../../app/kudos/_components/) · [app/profile/_components/](../../app/profile/_components/)

## Goal
Test the client components that carry state/branching, via RTL + `@testing-library/user-event`.
Presentational-only components are skipped (see out-of-scope). Mock `next/*` at the boundary.

## Shared conventions
- `next/image` mocked globally in `vitest.setup.ts` (Phase 01).
- `next/navigation` (`useRouter`) mocked per-file where used.
- Prefer role/label queries + `userEvent` over `fireEvent`. Assert behavior, not markup.

## Test targets (each = its own branch + co-located file)

### `test/like-button` → `app/kudos/_components/like-button.test.tsx`
`LikeButton({ hearts })`. Props: `hearts="1.000"`.
- renders base count `1.000`, `aria-pressed=false`
- click → `aria-pressed=true`, count increments to `1.001` (grouped)
- click again → back to `1.000`, `aria-pressed=false`

### `test/kudos-filters` → `app/kudos/_components/kudos-filters.test.tsx`
`KudosFilters({ labels, hashtags, departments, value, onChange })`.
- both pills render their labels
- click a pill opens its option list; click an option → `onChange("hashtag", opt)` called once
- reselecting the currently-selected option → `onChange(key, null)` (toggle-off)
- opening one pill closes the other

### `test/profile-kudos` → `app/profile/_components/profile-kudos.test.tsx`
`ProfileKudos({ sent, received, t })` (build small `KudosPost[]` fixtures).
- default tab `sent` → shows sent list; the "Đã gửi" label is active
- switch to `received` → list swaps to received items
- "Spam" ribbon appears only on the first 2 sent cards (`i < 2`)

### `test/widget-button` → `app/_components/widget-button.test.tsx`
`WidgetButton` (default export). Mock the child drawers/modals it renders as needed.
- closed by default; click the pill → open state shows both "Thể lệ" + "Viết KUDOS" actions
- click "Thể lệ" → rules drawer opens (`rulesOpen`)
- click "Viết KUDOS" → compose modal opens in place (`composeOpen`)
- backdrop/overlay click → closes (`open=false`)

### `test/write-kudos-modal` → `app/kudos/_components/write-kudos-modal.test.tsx`
`WriteKudosModal({ hashtags, ... })`. Mock `@/lib/saa/kudos-store` `addKudos` with `vi.fn()`.
- submit with empty recipient → `recipientError` shown, `addKudos`/`onSubmit` NOT called
- hashtag picker: add up to 5 → "+ Hashtag" add control hidden at `MAX_ITEMS = 5`
- happy path: fill recipient + body, submit → `addKudos` called with a `KudosPost`
  (recipient/title/body/tags/anonymous wired); modal closes
- anonymous toggle flips the built post's sender treatment

### `test/language-switcher` → `app/_components/language-switcher.test.tsx`
Mock `next/navigation`: `useRouter` → `{ refresh: vi.fn() }`.
- selecting "EN" writes `document.cookie` containing `saa_lang=en`
- `router.refresh()` called once after the switch

### `test/saa-dropdown` *(optional)* → `app/_components/saa-dropdown.test.tsx`
Shared dropdown shell: opens on trigger click; closes on outside click / Escape.

## Todo
- [ ] `test/like-button`
- [ ] `test/kudos-filters`
- [ ] `test/profile-kudos`
- [ ] `test/widget-button`
- [ ] `test/write-kudos-modal`
- [ ] `test/language-switcher`
- [ ] `test/saa-dropdown` (optional)

## Success criteria
- Each targeted component has a passing behavior-focused suite.
- Interactions asserted via `userEvent` + accessible queries.
- `next/*` mocked at the boundary; no real navigation/cookies side effects leak.

## Risks
- **Portal/modal rendering** — `write-kudos-modal` / drawers use `createPortal`; query within
  `document.body`, not just the container.
- **`user-event` + fake timers** — if a component debounces, advance timers explicitly.
- **Over-mocking** — mock only `next/*` boundaries; test the component's real logic.
