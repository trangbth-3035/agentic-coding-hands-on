import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computeRemaining, pad2 } from "@/lib/saa/countdown";

describe("pad2", () => {
  it("pads a single digit to two chars", () => {
    expect(pad2(3)).toBe("03");
  });
  it("leaves a two-digit number unchanged", () => {
    expect(pad2(12)).toBe("12");
  });
  it("renders zero as '00'", () => {
    expect(pad2(0)).toBe("00");
  });
});

describe("computeRemaining", () => {
  const NOW = new Date("2026-01-01T00:00:00.000Z").getTime();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("breaks a future target into d/h/m/s with done=false", () => {
    const ahead = (1 * 86_400 + 2 * 3_600 + 3 * 60 + 4) * 1_000;
    expect(computeRemaining(NOW + ahead)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      done: false,
    });
  });

  it("clamps to zero and done=true at the target instant", () => {
    expect(computeRemaining(NOW)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });

  it("clamps to zero and done=true once the target is past", () => {
    expect(computeRemaining(NOW - 10_000)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });
});
