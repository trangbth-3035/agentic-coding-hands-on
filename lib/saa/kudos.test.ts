import { describe, expect, it } from "vitest";
import { DEPARTMENTS, HASHTAGS, KUDOS_POSTS, SUNNERS } from "@/lib/saa/kudos";

describe("kudos seed data", () => {
  it("covers every department with at least one post", () => {
    const covered = new Set(KUDOS_POSTS.map((p) => p.department));
    for (const dept of DEPARTMENTS) {
      expect(covered.has(dept)).toBe(true);
    }
  });

  it("only tags posts with hashtags from the HASHTAGS list", () => {
    const allowed = new Set(HASHTAGS);
    for (const post of KUDOS_POSTS) {
      for (const tag of post.hashtags) {
        expect(allowed.has(tag)).toBe(true);
      }
    }
  });

  it("derives the red tag line from each post's hashtags", () => {
    for (const post of KUDOS_POSTS) {
      for (const tag of post.hashtags) {
        expect(post.tags).toContain(tag);
      }
    }
  });

  it("keeps the department / hashtag / sunner lists non-empty and unique", () => {
    for (const list of [DEPARTMENTS, HASHTAGS, SUNNERS]) {
      expect(list.length).toBeGreaterThan(0);
      expect(new Set(list).size).toBe(list.length);
    }
  });
});
