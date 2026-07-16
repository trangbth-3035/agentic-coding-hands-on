import { describe, it, expect } from "vitest";
import { pad2 } from "@/lib/saa/countdown";

// Sanity test — proves the Vitest harness runs and the `@/*` path alias
// resolves. `computeRemaining` + the full `pad2` matrix are covered on the
// test/lib-countdown branch (plans/unit-tests/phase-02).
describe("pad2 (harness sanity)", () => {
  it("pads a single digit to two chars", () => {
    expect(pad2(3)).toBe("03");
  });

  it("leaves a two-digit number unchanged", () => {
    expect(pad2(12)).toBe("12");
  });
});
