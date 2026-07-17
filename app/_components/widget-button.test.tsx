import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WidgetButton from "@/app/_components/widget-button";
import { getDictionary } from "@/lib/i18n/dictionaries";

vi.mock("next/image", () => ({
  default: ({ src, alt = "" }: { src: string; alt?: string }) => <img src={src} alt={alt} />,
}));

const dict = getDictionary("vi");
// Distinct sentinel labels so the pills never collide with dictionary copy.
const labels = { writeKudos: "WRITE_KUDOS_PILL", rules: "RULES_PILL" };

function renderWidget() {
  render(
    <WidgetButton
      labels={labels}
      rules={dict.rules}
      compose={dict.kudosBoard.writeKudos}
      senderName="Tester"
    />,
  );
}

describe("WidgetButton (floating action button)", () => {
  it("is closed initially — no action pills, no open modals", () => {
    renderWidget();
    expect(screen.queryByText(labels.rules)).not.toBeInTheDocument();
    expect(screen.queryByText(labels.writeKudos)).not.toBeInTheDocument();
    expect(screen.queryByText(dict.kudosBoard.writeKudos.title)).not.toBeInTheDocument();
  });

  it("reveals the two action pills when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWidget();
    await user.click(screen.getByRole("button", { name: labels.writeKudos }));
    expect(screen.getByText(labels.rules)).toBeInTheDocument();
    expect(screen.getByText(labels.writeKudos)).toBeInTheDocument();
  });

  it("opens the rules drawer from the 'Thể lệ' pill", async () => {
    const user = userEvent.setup();
    renderWidget();
    await user.click(screen.getByRole("button", { name: labels.writeKudos }));
    await user.click(screen.getByText(labels.rules));
    expect(screen.getByText(dict.rules.title)).toBeInTheDocument();
  });

  it("opens the compose modal from the 'Viết KUDOS' pill", async () => {
    const user = userEvent.setup();
    renderWidget();
    await user.click(screen.getByRole("button", { name: labels.writeKudos }));
    await user.click(screen.getByText(labels.writeKudos));
    expect(screen.getByText(dict.kudosBoard.writeKudos.title)).toBeInTheDocument();
  });
});
