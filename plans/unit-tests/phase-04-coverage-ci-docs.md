# Phase 04 — Coverage gate + CI + docs sync

**Branch:** `test/coverage-ci` · **merge LAST** (after Phase 02 + 03 test files exist).
**Depends on:** Phase 02 + Phase 03. **Priority:** medium · **Status:** ready

## Context links
- Overview: [plan.md](./plan.md) · Phase 01 config: [phase-01-test-harness-setup.md](./phase-01-test-harness-setup.md)

## Goal
Lock in a coverage floor, wire a minimal CI that runs lint + tests on every PR, and sync the docs
(README testing section + the AIDD `tasks.md` test checkboxes).

## Implementation steps
1. **Coverage thresholds** in `vitest.config.ts` → `test.coverage.thresholds`:
   - Global: `lines: 70, functions: 70, branches: 60, statements: 70` (realistic starting floor)
   - Per-directory bump for pure logic: `lib/**` at `90` lines/functions (highest ROI, no excuse)
   - Adjust once the real numbers land — do not set a floor the suite can't meet, and do not lower a
     threshold just to go green (add the missing test instead).
2. **CI (net-new — no `.github/workflows/` exists yet)** → create `.github/workflows/test.yml`:
   - triggers: `pull_request` + `push` to `main`
   - steps: checkout · setup-node (match local major) · `npm ci` · `npm run lint` · `npm run test:coverage`
   - keep it one job, no matrix. This is the gate that makes the per-test PRs meaningful.
3. **Docs sync:**
   - Add a "Testing" section to the repo README / `docs/` (how to run: `npm test`, `test:watch`,
     `test:coverage`; the co-location convention; what's covered vs deferred to e2e).
   - Flip the test `[ ]` → `[x]` items in the matching `.momorph/specs/*/tasks.md` as each area gets
     covered. **Cross-branch caveat:** those files live on `docs/aidd-artifacts` — reconcile when that
     branch and these test branches converge on `main` (note it in the PR, don't edit a stale copy).
4. Run `npm run test:coverage` locally → meets thresholds; open the CI PR and confirm the workflow
   goes green.

## Todo
- [ ] Coverage thresholds in `vitest.config.ts` (global + `lib/**` bump)
- [ ] `.github/workflows/test.yml` (lint + coverage on PR/push)
- [ ] README/docs Testing section
- [ ] Reconcile `.momorph/specs/*/tasks.md` test checkboxes (on merge)
- [ ] `test:coverage` green locally + in CI

## Success criteria
- `npm run test:coverage` passes the configured thresholds.
- CI runs lint + tests on every PR and blocks on failure.
- Docs describe how to run and extend the suite; deferred e2e is called out.

## Risks
- **Threshold set too high** → flakey red CI. Start from measured coverage, raise deliberately.
- **CI node version drift** → pin the major to match local; `npm ci` needs the committed `package-lock.json`.

## Next steps (follow-up plan)
- `plans/e2e-playwright/` — route-level flows deferred here: login → prelaunch → home redirect,
  `/dashboard` auth gate, `/kudos` filters end-to-end, `/profile` tabs, i18n cookie at route level.
  Playwright MCP is already available in this environment.
