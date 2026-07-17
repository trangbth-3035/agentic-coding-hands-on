import { afterEach, describe, expect, it, vi } from "vitest";
import { cookies } from "next/headers";
import { getDict, getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));

function mockCookie(value: string | undefined) {
  vi.mocked(cookies).mockResolvedValue({
    get: (name: string) => (value === undefined ? undefined : { name, value }),
  } as unknown as Awaited<ReturnType<typeof cookies>>);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("getLocale", () => {
  it("returns the cookie locale when it is valid", async () => {
    mockCookie("en");
    expect(await getLocale()).toBe("en");
  });

  it("falls back to vi when the cookie is missing", async () => {
    mockCookie(undefined);
    expect(await getLocale()).toBe("vi");
  });

  it("falls back to vi when the cookie value is not a locale", async () => {
    mockCookie("fr");
    expect(await getLocale()).toBe("vi");
  });
});

describe("getDict", () => {
  it("returns the resolved locale and its dictionary", async () => {
    mockCookie("en");
    const { locale, dict } = await getDict();
    expect(locale).toBe("en");
    expect(dict).toBe(getDictionary("en"));
  });
});
