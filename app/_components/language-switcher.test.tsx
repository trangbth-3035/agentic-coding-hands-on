import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSwitcher from "@/app/_components/language-switcher";

const { mockRefresh } = vi.hoisted(() => ({ mockRefresh: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: mockRefresh }) }));
vi.mock("next/image", () => ({
  default: ({ src, alt = "" }: { src: string; alt?: string }) => <img src={src} alt={alt} />,
}));

afterEach(() => {
  vi.clearAllMocks();
  document.cookie = "saa_lang=; path=/; max-age=0";
});

describe("LanguageSwitcher", () => {
  it("opens the menu and switching to EN writes the cookie and refreshes", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher locale="vi" />);

    await user.click(screen.getByRole("button", { name: /VN/ }));
    await user.click(screen.getByRole("menuitemradio", { name: /EN/ }));

    expect(document.cookie).toContain("saa_lang=en");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
