# Implementation Plan: Dropdown-ngôn ngữ (Language Picker)

**Frame**: `hUyaaugye2-dropdown-ngon-ngu`
**Date**: 2026-07-16
**Spec**: `specs/hUyaaugye2-dropdown-ngon-ngu/spec.md`
**Design**: `specs/hUyaaugye2-dropdown-ngon-ngu/design-style.md`
**Status**: Implemented (retrospective)

---

## Summary

Implement the header language picker for SAA 2025 — a small Client-Component overlay that toggles the
interface between Vietnamese and English. Selection writes the `saa_lang` cookie and calls
`router.refresh()` so every Server Component on the current route re-renders in the new locale. The
overlay has its own dark shell (rounded-full pill + `bg-black/90` panel), distinct from the shared
`SaaDropdownPanel`.

The i18n plumbing already exists (`lib/i18n/*`); this feature is only the trigger + overlay UI plus
the cookie write.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 16 (App Router, Turbopack)
**UI**: React 19, TailwindCSS 4 (`@theme` tokens in `app/globals.css`)
**i18n**: Cookie `saa_lang` + dictionaries in `lib/i18n/` (`getDict` / `getLocale` on the server).
NOT next-intl.
**Routing/files**: `app/` (App Router). Shared components in `app/_components/`.
**State**: Local `useState` for open/closed; `useRouter().refresh()` for re-render.
**Testing**: None yet ("unit test làm sau") — test tasks are PENDING.

---

## Architecture Decisions

- **Client Component**: `app/_components/language-switcher.tsx` is `"use client"` — it needs
  `useState` (open state), `useRouter` (refresh), and `document.cookie`.
- **Server reads, client writes**: The client writes `saa_lang`; server sections read it through
  `getLocale()` (`lib/i18n/server.ts`), which is request-cached, so a single `router.refresh()`
  re-localises the whole tree.
- **Config-driven codes**: Locale union + cookie key come from `lib/i18n/config.ts`
  (`LOCALES`, `Locale`, `LOCALE_COOKIE`) — no duplicated string literals.
- **Own shell, not shared**: The overlay uses a bespoke pill + panel rather than `saa-dropdown.tsx`,
  matching the distinct Figma treatment.

---

## Project Structure

```
.momorph/specs/hUyaaugye2-dropdown-ngon-ngu/
├── spec.md            ✅
├── design-style.md    ✅
├── plan.md            ✅ (this file)
├── tasks.md           ✅
└── assets/
    └── frame.url.txt  ✅ (do not touch)
```

### Shipped Files (cite)

| File | Role |
|------|------|
| `app/_components/language-switcher.tsx` | The toggle + dropdown overlay (Client Component) |
| `lib/i18n/config.ts` | `LOCALES`, `Locale`, `DEFAULT_LOCALE`, `LOCALE_COOKIE` (`saa_lang`) |
| `lib/i18n/server.ts` | `getLocale()` / `getDict()` — server-side locale read |
| `lib/i18n/dictionaries.ts` | VN/EN string tables consumed by server sections |
| `app/_components/site-header.tsx` | Host — renders `<LanguageSwitcher locale={locale} />` |

### Assets (already in `public/saa/`)

| Asset | Path |
|-------|------|
| VN flag | `/saa/flag-vn.svg` |
| EN flag | `/saa/flag-en.svg` |
| Chevron down | `/saa/chevron-down.svg` |

---

## Implementation Approach (Retrospective)

### Phase 1 — i18n foundation (pre-existing)

- `lib/i18n/config.ts`: locale union, default `vi`, cookie key `saa_lang`.
- `lib/i18n/server.ts`: `getLocale()` reads the cookie (`await cookies()` — Next.js 16 async
  cookies) with a `vi` fallback; `getDict()` returns `{ locale, dict }`.
- `lib/i18n/dictionaries.ts`: VN + EN dictionaries.

### Phase 2 — Toggle + overlay UI

- Build the toggle pill (flag + code + chevron) in `language-switcher.tsx`; derive `current` from
  the `locale` prop.
- Render the dropdown panel conditionally on `open`, right-aligned under the toggle.
- Add the invisible `fixed inset-0` backdrop button for outside-click dismissal.

### Phase 3 — Selection + persistence

- `selectLocale(next)`: write `document.cookie = "saa_lang=<next>; path=/; max-age=31536000;
  samesite=lax"`, `setOpen(false)`, `router.refresh()`.
- Rows use `role="menuitemradio"` + `aria-checked` for the active locale.

### Phase 4 — Host wiring (pre-existing)

- `site-header.tsx` receives `locale` and passes it to `<LanguageSwitcher />`; server pages fetch
  `{ locale, dict }` via `getDict()` and feed the header.

### Phase 5 — Polish / PENDING

- Keyboard support (`Escape` to close, arrow-key roving between rows) — not yet wired.
- Unit tests — PENDING.

---

## Risks & Notes

| Risk | Mitigation |
|------|------------|
| Locale desync if cookie key duplicated | Always import `LOCALE_COOKIE` from `lib/i18n/config.ts` |
| Stale UI after switch | `router.refresh()` re-renders Server Components; no client string cache |
| Overlay style drift toward shared shell | Documented as intentionally separate in design-style.md |

---

## Next Steps

1. Add keyboard navigation (`Escape` + arrow keys) for full WCAG 2.1 AA.
2. Add unit tests once the project test runner is set up.
