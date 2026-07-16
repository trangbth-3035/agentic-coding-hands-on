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
      exclude: ["**/*.test.*", ".momorph/**", "plans/**", ".next/**"],
    },
  },
});
