import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LikeButton } from "@/app/kudos/_components/like-button";

describe("LikeButton", () => {
  it("renders the base count from the hearts string, unpressed", () => {
    render(<LikeButton hearts="1.000" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("1.000")).toBeInTheDocument();
  });

  it("gives a heart on click (+1, pressed) and takes it back on a second click", async () => {
    const user = userEvent.setup();
    render(<LikeButton hearts="1.000" />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("1.001")).toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("1.000")).toBeInTheDocument();
  });
});
