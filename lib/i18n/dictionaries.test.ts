import { describe, expect, it } from "vitest";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Collect dotted key paths of an object; arrays and primitives are leaves. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("getDictionary", () => {
  it("returns a dictionary object for each locale", () => {
    expect(typeof getDictionary("vi")).toBe("object");
    expect(typeof getDictionary("en")).toBe("object");
  });

  it("keeps vi and en on the exact same key structure (no missing translations)", () => {
    const vi = keyPaths(getDictionary("vi")).sort();
    const en = keyPaths(getDictionary("en")).sort();
    expect(en).toEqual(vi);
  });

  it("resolves a known nav label in both locales", () => {
    expect(getDictionary("vi").nav.kudos).toBeTruthy();
    expect(getDictionary("en").nav.kudos).toBeTruthy();
  });
});
