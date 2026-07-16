# Phase 01 — Test harness setup (Vitest + RTL + jsdom)

**Branch:** `test/harness-setup` · **merge this FIRST** — every other test branch depends on it.
**Priority:** blocking · **Status:** ready

## Context links
- Overview: [plan.md](./plan.md) · decisions: [clarifications.md](./clarifications.md)
- Existing config: [tsconfig.json](../../tsconfig.json) (`@/*` → `./*`), [package.json](../../package.json)

## Goal
Install and wire Vitest + React Testing Library so `npm test` runs green against a trivial sanity
test. Establish the co-location convention (`*.test.ts(x)` next to source).

## Related code files
**Create**
- `vitest.config.ts` — Vite/Vitest config
- `vitest.setup.ts` — jest-dom matchers + RTL cleanup + shared `next/*` mocks
- `lib/saa/countdown.test.ts` — one real sanity test proving the harness (2 assertions, expanded in Phase 02)

**Modify**
- `package.json` — devDependencies + `test` scripts
- `tsconfig.json` — add test globals to `types`, ensure config/setup files are picked up
- `eslint.config.*` — (only if lint errors on test globals) allow vitest globals

## Implementation steps
1. Install dev deps (npm):
   ```
   npm i -D vitest @vitejs/plugin-react jsdom vite-tsconfig-paths \
     @testing-library/react @testing-library/dom @testing-library/user-event \
     @testing-library/jest-dom @vitest/coverage-v8
   ```
   Pin `@testing-library/react@^16` (React 19 support). Verify install resolves peer ranges.
2. `vitest.config.ts`:
   ```ts
   import { defineConfig } from "vitest/config";
   import react from "@vitejs/plugin-react";
   import tsconfigPaths from "vite-tsconfig-paths";

   export default defineConfig({
     plugins: [react(), tsconfigPaths()],
     test: {
       environment: "jsdom",
       globals: true,
       setupFiles: ["./vitest.setup.ts"],
       include: ["{lib,app}/**/*.test.{ts,tsx}"],
       coverage: {
         provider: "v8",
         include: ["lib/**", "app/**/_components/**"],
         exclude: ["**/*.test.*", ".momorph/**", "plans/**", ".next/**"],
       },
     },
   });
   ```
   `tsconfigPaths()` mirrors the `@/*` alias so `@/lib/...` imports resolve in tests.
3. `vitest.setup.ts`: `import "@testing-library/jest-dom/vitest";` + `afterEach(() => cleanup())`
   (from `@testing-library/react`). Add a default `next/image` mock (render a plain `<img>`) here so
   component phases inherit it; per-test `next/navigation`/`next/headers` mocks stay in their files.
4. `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`,
   `"test:coverage": "vitest run --coverage"`.
5. `tsconfig.json` → `compilerOptions.types`: add `"vitest/globals"` and
   `"@testing-library/jest-dom"`; confirm `vitest.config.ts` + `vitest.setup.ts` are not excluded.
6. Sanity test `lib/saa/countdown.test.ts`: assert `pad2(3) === "03"` and `pad2(12) === "12"`.
7. Run `npm test` → green. Run `npm run build` → still green (adding test tooling must not break the
   production build; test files are excluded from `next build`).

## Todo
- [ ] Install dev deps (React 19-compatible versions)
- [ ] Write `vitest.config.ts` (jsdom, globals, tsconfig paths, coverage)
- [ ] Write `vitest.setup.ts` (jest-dom + cleanup + next/image mock)
- [ ] Add `test` / `test:watch` / `test:coverage` scripts
- [ ] Update `tsconfig.json` types
- [ ] Sanity test green (`npm test`)
- [ ] `npm run build` still green

## Success criteria
- `npm test` passes with ≥1 real assertion.
- `@/` imports resolve inside tests.
- `npm run build` unaffected.

## Risks
- **React 19 peer conflicts** → pin RTL v16+; if npm errors, resolve versions before proceeding.
- **Alias drift** → without `vite-tsconfig-paths`, `@/*` imports fail only in tests. Verify with the sanity test importing via `@/lib/saa/countdown`.
