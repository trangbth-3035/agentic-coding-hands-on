import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Unmount React trees between tests so the jsdom document starts clean each
// time. Component-specific `next/*` boundary mocks live in the component test
// branches (plans/unit-tests/phase-03), not here.
afterEach(() => {
  cleanup();
});
