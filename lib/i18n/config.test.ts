import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALES,
  isLocale,
} from "@/lib/i18n/config";

describe("i18n config", () => {
  it("exposes the vi/en locale set with a vi default and the saa_lang cookie", () => {
    expect(LOCALES).toEqual(["vi", "en"]);
    expect(DEFAULT_LOCALE).toBe("vi");
    expect(LOCALE_COOKIE).toBe("saa_lang");
  });

  it("isLocale accepts the supported locales", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("isLocale rejects anything else", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
