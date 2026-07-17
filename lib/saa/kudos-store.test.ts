import { beforeEach, describe, expect, it, vi } from "vitest";
import type { KudosPost } from "@/lib/saa/kudos";

function makePost(id: string): KudosPost {
  return {
    id,
    sender: { name: "Sender", role: "Sun*", rank: "new", avatar: "" },
    receiver: { name: "Receiver", role: "Sun*", rank: "rising", avatar: "" },
    time: "now",
    hashtagTitle: "Title",
    body: "Body",
    photos: 0,
    tags: "",
    hearts: "0",
    department: "",
    hashtags: [],
  };
}

// Module-level `posts` state persists across imports, so reset the module
// registry before each test to get a fresh, empty store.
describe("kudos-store (session store)", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("starts empty with a stable server snapshot reference", async () => {
    const store = await import("@/lib/saa/kudos-store");
    expect(store.getKudosSnapshot()).toEqual([]);
    expect(store.getKudosServerSnapshot()).toBe(store.getKudosServerSnapshot());
  });

  it("prepends freshly-added kudos and notifies subscribers", async () => {
    const store = await import("@/lib/saa/kudos-store");
    const notify = vi.fn();
    store.subscribeKudos(notify);
    store.addKudos(makePost("a"));
    store.addKudos(makePost("b"));
    expect(notify).toHaveBeenCalledTimes(2);
    expect(store.getKudosSnapshot().map((p) => p.id)).toEqual(["b", "a"]);
  });

  it("stops notifying after unsubscribe", async () => {
    const store = await import("@/lib/saa/kudos-store");
    const notify = vi.fn();
    const unsubscribe = store.subscribeKudos(notify);
    unsubscribe();
    store.addKudos(makePost("a"));
    expect(notify).not.toHaveBeenCalled();
  });
});
