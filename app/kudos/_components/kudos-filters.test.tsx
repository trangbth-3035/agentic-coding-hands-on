import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KudosFilters } from "@/app/kudos/_components/kudos-filters";

const labels = { hashtag: "Hashtag", department: "Phòng ban" };
const hashtags = ["#A", "#B"];
const departments = ["CEVC1", "CEVC2"];
const empty = { hashtag: null, department: null };

describe("KudosFilters", () => {
  it("shows both filter pills by their category labels", () => {
    render(
      <KudosFilters
        labels={labels}
        hashtags={hashtags}
        departments={departments}
        value={empty}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: labels.hashtag })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: labels.department })).toBeInTheDocument();
  });

  it("opens a pill and reports the chosen option to onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <KudosFilters
        labels={labels}
        hashtags={hashtags}
        departments={departments}
        value={empty}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: labels.hashtag }));
    await user.click(screen.getByRole("menuitem", { name: "#A" }));
    expect(onChange).toHaveBeenCalledWith("hashtag", "#A");
  });

  it("clears the value when the already-selected option is re-picked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <KudosFilters
        labels={labels}
        hashtags={hashtags}
        departments={departments}
        value={{ hashtag: "#A", department: null }}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "#A" }));
    await user.click(screen.getByRole("menuitem", { name: "#A" }));
    expect(onChange).toHaveBeenCalledWith("hashtag", null);
  });
});
