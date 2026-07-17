import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WriteKudosModal } from "@/app/kudos/_components/write-kudos-modal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { addKudos } from "@/lib/saa/kudos-store";

vi.mock("@/lib/saa/kudos-store", () => ({ addKudos: vi.fn() }));

const t = getDictionary("vi").kudosBoard.writeKudos;
const hashtags = ["#A", "#B", "#C", "#D", "#E", "#F"];
const recipients = ["Alice", "Bob", "Charlie"];

function renderModal(open = true) {
  const onClose = vi.fn();
  render(
    <WriteKudosModal
      open={open}
      onClose={onClose}
      t={t}
      hashtags={hashtags}
      recipients={recipients}
      senderName="Me"
    />,
  );
  return { onClose, add: vi.mocked(addKudos) };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("WriteKudosModal", () => {
  it("renders nothing when closed", () => {
    renderModal(false);
    expect(screen.queryByText(t.title)).not.toBeInTheDocument();
  });

  it("blocks submit and shows the required error when no recipient is chosen", async () => {
    const user = userEvent.setup();
    const { onClose, add } = renderModal();
    await user.click(screen.getByRole("button", { name: t.submit }));
    expect(screen.getByText(t.recipientRequired)).toBeInTheDocument();
    expect(add).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("submits a kudos to the chosen recipient and closes", async () => {
    const user = userEvent.setup();
    const { onClose, add } = renderModal();
    await user.type(screen.getByPlaceholderText(t.recipientPlaceholder), "Bob");
    await user.click(screen.getByRole("menuitem", { name: "Bob" }));
    await user.click(screen.getByRole("button", { name: t.submit }));
    expect(add).toHaveBeenCalledTimes(1);
    expect(add.mock.calls[0][0].receiver.name).toBe("Bob");
    expect(onClose).toHaveBeenCalled();
  });

  it("caps hashtags at five and drops the add control", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: new RegExp(t.hashtagLabel) }));
    for (const tag of hashtags.slice(0, 5)) {
      await user.click(screen.getByRole("menuitem", { name: tag }));
    }
    expect(screen.getAllByRole("button", { name: /remove #/ })).toHaveLength(5);
    expect(screen.queryByRole("menuitem", { name: "#F" })).not.toBeInTheDocument();
  });
});
