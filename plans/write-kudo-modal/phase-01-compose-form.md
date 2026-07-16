# Phase 01 — Compose form (fields, recipient search, hashtag max-5, anonymous, image)

**Status:** done

## Goal
Build the "Viết Kudo" modal shell and all of its form fields as a self-contained client component
(`app/kudos/_components/write-kudos-modal.tsx`). Presentational + local state only — submit wiring
and launcher integration are Phase 02. Copy arrives via the `t: Dictionary["kudosBoard"]["writeKudos"]`
prop; options via `hashtags` / `recipients` props.

## Steps (all in `app/kudos/_components/write-kudos-modal.tsx`)

### Modal shell (A + Mask)
- `"use client"`; render nothing when `!open`, else `createPortal(..., document.body)`.
- Overlay `fixed inset-0 z-[60] overflow-y-auto bg-black/70 backdrop-blur-sm`, `role="dialog"`
  `aria-modal` `aria-label={t.title}`; a full-screen backdrop `<button>` closes on click.
- Card `form`: `max-w-[752px] rounded-3xl bg-[#FFF8E1] p-6 sm:p-10 text-saa-bg`, centred title
  `{t.title}` ("Gửi lời cám ơn và ghi nhận đến đồng đội").
- `useEffect` (when `open`): Escape → `onClose`, lock `document.body.style.overflow`, restore on
  cleanup. `reset()` clears all fields; `close()` = `reset()` + `onClose()`.

### B — Recipient (searchable dropdown)
- Controlled `recipient` text input inside `FieldRow` (`required`), gold-muted border → `saa-red`
  when `recipientError`; chevron button toggles `recipientOpen` (rotates 180°).
- `filteredRecipients` = `recipients.filter(r => r.toLowerCase().includes(recipient.trim().toLowerCase()))`;
  panel = `SaaDropdownPanel` of `SaaDropdownItem` (`active={r === recipient}`), else `t.noResults`
  ("Không tìm thấy"). `pickRecipient` sets the value + closes + clears error. Outside-click backdrop.

### "Danh hiệu" title (spec "Frame 552") + rich-text body (C + D)
- `title` input (`FieldRow` `required`) with helper `t.titleHint` under it; value defaults to
  `t.titleLabel` on submit if blank.
- Rich-text block: toolbar of six **visual-only** glyph buttons from the `TOOLBAR` const
  (`/saa/kudos-rt-*.svg`) + a "Tiêu chuẩn cộng đồng" (`t.communityStandards`) link; `body` textarea
  `h-[200px]`, placeholder `t.bodyPlaceholder`; `t.mentionHint` line ("@ + tên") below — hint only,
  no autocomplete.

### E — Hashtag multi-select (max 5)
- `MAX_ITEMS = 5`; `toggleTag(tag)` = remove if present, else add while `tags.length < MAX_ITEMS`.
- Selected `tags` render as chips (label + red × that calls `toggleTag`). While `tags.length < 5`,
  show the `AddButton` ("+ {hashtagLabel} / {t.maxFive}") toggling `tagOpen`; open panel =
  `SaaDropdownPanel` of `SaaDropdownItem size="compact" checked={tags.includes(opt)}` over the
  `hashtags` prop. Outside-click backdrop closes it. Screen `p9zO-c4a4x`.

### F — Image gallery (max 5) + G — Anonymous
- `images` (fixed `SAMPLE_IMAGE = "/saa/kudos-write-sample.png"`): thumbnails 80×80 with a red ×
  remove; `AddButton` appends while `images.length < MAX_ITEMS`.
- `anonymous` checkbox (custom gold box + check svg) with label `t.anonymous`.
- Actions row (H): "Hủy" (`t.cancel`, calls `close()`) + "Gửi" (`t.submit`, `type="submit"`).

### Helpers
- `FieldRow` (label-left/control-right, stacks on mobile; `inline` variant for tag/image rows) and
  `AddButton` (shared "+ label / hint" trigger) are local components in the same file.

## Success criteria
- Modal opens centred over a dimmed, scroll-locked board and closes on Escape / backdrop / "Hủy".
- Typing in "Người nhận" filters the dropdown; selecting fills the field; empty search shows
  "Không tìm thấy".
- Hashtags toggle as chips + checked rows; a sixth cannot be added; the add button disappears at
  five and returns after a removal.
- Images add/remove up to five; anonymous toggles; no horizontal overflow at `sm`.

## Todo
- [x] Portal modal shell + Escape/backdrop close + body-scroll lock — `write-kudos-modal.tsx`
- [x] Recipient searchable dropdown (`SaaDropdownPanel`, filter, `t.noResults`) — `write-kudos-modal.tsx`
- [x] "Danh hiệu" title field + helper text — `write-kudos-modal.tsx`
- [x] Rich-text toolbar (visual-only) + body textarea + "@" mention hint — `write-kudos-modal.tsx`
- [x] Hashtag multi-select max-5 (chips + `checked`/`compact` picker, add button hidden at 5) — `write-kudos-modal.tsx`, `app/_components/saa-dropdown.tsx`
- [x] Image gallery max-5 (`SAMPLE_IMAGE` placeholder) + anonymous toggle — `write-kudos-modal.tsx`
- [ ] Unit test: `toggleTag` cap + recipient filter + reset-on-close — PENDING ("unit test làm sau")
- [ ] Real image upload (file picker → upload) replacing `SAMPLE_IMAGE` — DEFERRED
