import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vitest harness for the SAA app. `resolve.tsconfigPaths` is Vite's native
// tsconfig-paths resolution, so `@/lib/...` imports (tsconfig `@/*` → `./*`)
// resolve in tests without an extra plugin. Coverage thresholds are added
// later (see plans/unit-tests/phase-04).
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["{lib,app}/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "app/**/_components/**"],
      // lib/supabase is thin infra glue (out of unit-test scope — see
      // plans/unit-tests/clarifications.md); it belongs to the e2e plan.
      exclude: ["**/*.test.*", "lib/supabase/**", ".momorph/**", "plans/**", ".next/**"],
      // Floors ratchet UP as more components gain tests — never lower one to
      // go green; add the missing test instead (plans/unit-tests/phase-04).
      thresholds: {
        lines: 45,
        functions: 38,
        branches: 45,
        statements: 45,
        "lib/**": {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
      },
    },
  },
});
