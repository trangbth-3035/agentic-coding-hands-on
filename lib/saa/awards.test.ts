import { describe, expect, it } from "vitest";
import { AWARDS } from "@/lib/saa/awards";
import { AWARDS as CONTENT_AWARDS } from "@/lib/saa/content";

describe("award catalogue invariants", () => {
  it("aligns its slug set with lib/saa/content.ts", () => {
    const catalogue = AWARDS.map((a) => a.slug).sort();
    const structural = CONTENT_AWARDS.map((a) => a.slug).sort();
    expect(catalogue).toEqual(structural);
  });

  it("gives every award at least one prize and a quantity", () => {
    for (const award of AWARDS) {
      expect(award.prizes.length).toBeGreaterThanOrEqual(1);
      expect(award.quantity.value).toBeTruthy();
    }
  });

  it("places each medal on a valid side", () => {
    for (const award of AWARDS) {
      expect(["left", "right"]).toContain(award.medalSide);
    }
  });

  it("keeps slugs unique", () => {
    const slugs = AWARDS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
