import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { KudosPost } from "@/lib/saa/kudos";
import { ProfileKudos } from "@/app/profile/_components/profile-kudos";

vi.mock("next/image", () => ({
  default: ({ src, alt = "" }: { src: string; alt?: string }) => <img src={src} alt={alt} />,
}));

const t = { sent: "Đã gửi", received: "Đã nhận", spam: "Spam" };
const cardLabels = { copyLink: "Copy link", viewDetails: "Details" };

function makePost(id: string, receiverName: string): KudosPost {
  return {
    id,
    sender: { name: `Sender ${id}`, role: "Sun*", rank: "new", avatar: "/a.png" },
    receiver: { name: receiverName, role: "Sun*", rank: "rising", avatar: "/b.png" },
    time: "10:00",
    hashtagTitle: "TITLE",
    body: "body text",
    photos: 0,
    tags: "#x",
    hearts: "0",
    department: "",
    hashtags: ["#x"],
  };
}

const sent = [
  makePost("s1", "SentTo One"),
  makePost("s2", "SentTo Two"),
  makePost("s3", "SentTo Three"),
];
const received = [makePost("r1", "GotFrom One")];

function renderProfileKudos() {
  render(
    <ProfileKudos
      caption="Sun* Annual Awards 2025"
      title="KUDOS"
      sent={sent}
      received={received}
      cardLabels={cardLabels}
      t={t}
    />,
  );
}

describe("ProfileKudos", () => {
  it("shows the sent list by default with a Spam ribbon on the first two", () => {
    renderProfileKudos();
    expect(screen.getByText("SentTo One")).toBeInTheDocument();
    expect(screen.queryByText("GotFrom One")).not.toBeInTheDocument();
    expect(screen.getAllByText(t.spam)).toHaveLength(2);
  });

  it("switches to the received list without Spam ribbons", async () => {
    const user = userEvent.setup();
    renderProfileKudos();
    await user.click(screen.getByRole("button", { name: new RegExp(t.sent) }));
    await user.click(screen.getByRole("menuitem", { name: t.received }));
    expect(screen.getByText("GotFrom One")).toBeInTheDocument();
    expect(screen.queryByText("SentTo One")).not.toBeInTheDocument();
    expect(screen.queryByText(t.spam)).not.toBeInTheDocument();
  });
});
