# Phase 02 — Submit → session store + launcher wiring + i18n

**Status:** done

## Goal
Turn the composed form into a posted kudos and wire the modal into its three launchers. Submit is a
**mock create** against a client session store — no backend — and the All Kudos list reacts live.

## Steps

### Submit → `KudosPost` (in `write-kudos-modal.tsx`)
- `handleSubmit(e)`: `preventDefault()`; if `!recipient.trim()` set `recipientError` + reopen the
  dropdown and bail (recipient is the only required field).
- Build a `KudosPost` (`lib/saa/kudos.ts`): `id = "u" + Date.now()`; `sender.name =
  anonymous ? t.anonymousName : senderName`; `receiver.name = recipient.trim()`; `time = t.justNow`
  ("Vừa xong"); `hashtagTitle = title.trim() || t.titleLabel`; `body = body.trim() ||
  t.bodyPlaceholder`; `photos = images.length`; `tags = tags.join(" ")`; `hearts = "0"`;
  `hashtags = tags`. Demo avatars/ranks are fixed.
- `addKudos(post)` → `close()` → `requestAnimationFrame(() =>
  document.getElementById("all-kudos")?.scrollIntoView({ behavior: "smooth" }))` so the new card is
  visible.

### Session store (`lib/saa/kudos-store.ts`)
- Module-level `posts` array + listener `Set`. `addKudos` prepends and notifies; `subscribeKudos` /
  `getKudosSnapshot` back a `useSyncExternalStore` in the All Kudos list;
  `getKudosServerSnapshot` returns a stable empty array so SSR starts clean. Kept separate from the
  static `KUDOS_POSTS` seed.

### Launcher wiring (three entry points, one modal)
- **`/kudos` hero** — `WriteKudosLauncher` (`app/kudos/_components/write-kudos-launcher.tsx`): a
  prompt-bar button holding `open` state; renders `WriteKudosModal` with `hashtags={HASHTAGS}`,
  `recipients={SUNNERS}` (`lib/saa/kudos.ts`) and `senderName`. Mounted in
  `app/kudos/_components/kudos-hero.tsx`.
- **Homepage FAB** — `app/_components/widget-button.tsx`: the "Viết KUDOS" pill and the rules
  drawer's "Viết KUDOS" both set `onWriteKudos` → open the same `WriteKudosModal` in place (imported
  directly), passing `compose={dict.kudosBoard.writeKudos}`, `HASHTAGS`, `SUNNERS`.

### i18n
- `dict.kudosBoard.writeKudos` authored in **both** vi/en (`lib/i18n/dictionaries.ts`): `title`,
  `recipientLabel`/`recipientPlaceholder`/`recipientRequired`/`noResults`, `titleLabel`/
  `titlePlaceholder`/`titleHint`, `communityStandards`, `bodyPlaceholder`, `mentionHint`,
  `hashtagLabel`, `maxFive`, `imageLabel`, `anonymous`, `anonymousName`, `cancel`, `submit`,
  `justNow`. Read server-side via `getDict()` and passed down as the `t` prop.

## Success criteria
- Submitting a valid form closes the modal and the new kudos appears at the top of All Kudos,
  scrolled into view; the composed hashtags ride along on `KudosPost.hashtags`.
- Anonymous submit shows "Ẩn danh" as the sender.
- All three launchers open the identical modal in place (no navigation).
- VI/EN strings resolve from `dict.kudosBoard.writeKudos`.

## Todo
- [x] `handleSubmit` builds `KudosPost` + recipient guard + scroll-to-`#all-kudos` — `write-kudos-modal.tsx`
- [x] `addKudos` session store + `useSyncExternalStore` subscription — `lib/saa/kudos-store.ts`, `app/kudos/_components/live-kudos-list.tsx`
- [x] `WriteKudosLauncher` prompt bar wired into the `/kudos` hero — `write-kudos-launcher.tsx`, `kudos-hero.tsx`
- [x] Homepage FAB + rules-drawer "Viết KUDOS" open the modal in place — `app/_components/widget-button.tsx`
- [x] `dict.kudosBoard.writeKudos` vi + en — `lib/i18n/dictionaries.ts`
- [ ] Unit test: `handleSubmit` payload (anonymous name, defaults, `photos` count) — PENDING ("unit test làm sau")
- [ ] E2E: open from each launcher → submit → card appears in All Kudos — PENDING
- [ ] Real `POST /api/kudos` + persistence replacing the session store — DEFERRED
