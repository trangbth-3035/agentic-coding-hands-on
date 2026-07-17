import { describe, expect, it } from "vitest";
import { AWARDS, NAV_HREFS, isNavActive } from "@/lib/saa/content";

describe("isNavActive", () => {
  it("matches the homepage only on an exact '/'", () => {
    expect(isNavActive("/", "/")).toBe(true);
    expect(isNavActive("/", "/kudos")).toBe(false);
  });

  it("matches a section href exactly and on its sub-routes", () => {
    expect(isNavActive("/award-information", "/award-information")).toBe(true);
    expect(isNavActive("/award-information", "/award-information/top-talent")).toBe(true);
  });

  it("does not match an unrelated or merely prefix-similar pathname", () => {
    expect(isNavActive("/award-information", "/kudos")).toBe(false);
    expect(isNavActive("/kudos", "/kudos-live")).toBe(false);
  });
});

describe("nav + award data", () => {
  it("exposes the four navigation hrefs", () => {
    expect(NAV_HREFS).toMatchObject({
      about: "/",
      awards: "/award-information",
      kudos: "/kudos",
      standards: "/award-information",
    });
  });

  it("lists six unique award slugs", () => {
    const slugs = AWARDS.map((a) => a.slug);
    expect(slugs).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
  });
});
