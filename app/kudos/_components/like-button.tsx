"use client";

import { useState } from "react";

/** Group an integer with "." thousands separators (vi style: 1000 → "1.000"). */
const groupThousands = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/**
 * Heart / like control on a Kudos card. Clicking gives your heart: the count
 * ticks +1 and the control turns red with a little pop; clicking again
 * un-likes. The starting count comes from the card's `hearts` string
 * ("1.000"); the like is client-only (demo, not persisted).
 */
export function LikeButton({ hearts }: { hearts: string }) {
  const base = parseInt(hearts.replace(/\D/g, ""), 10) || 0;
  const [liked, setLiked] = useState(false);
  const count = base + (liked ? 1 : 0);

  return (
    <button
      type="button"
      onClick={() => setLiked((v) => !v)}
      aria-pressed={liked}
      className="group flex items-center gap-1 rounded transition"
    >
      <span
        className={`text-2xl font-bold tabular-nums transition-colors ${
          liked ? "text-saa-red" : "text-saa-bg"
        }`}
      >
        {groupThousands(count)}
      </span>
      {/* Hollow grey heart until you like it, solid red once you do. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`h-8 w-8 origin-center transition-transform duration-200 group-hover:scale-110 group-active:scale-125 ${
          liked ? "scale-110" : "scale-100"
        }`}
      >
        <path
          d="M12.3364 21.1076L10.8864 19.7876C5.73643 15.1176 2.33643 12.0276 2.33643 8.25757C2.33643 5.16757 4.75643 2.75757 7.83643 2.75757C9.57643 2.75757 11.2464 3.56757 12.3364 4.83757C13.4264 3.56757 15.0964 2.75757 16.8364 2.75757C19.9164 2.75757 22.3364 5.16757 22.3364 8.25757C22.3364 12.0276 18.9364 15.1176 13.7864 19.7876L12.3364 21.1076Z"
          fill={liked ? "#D4271D" : "none"}
          stroke={liked ? "#D4271D" : "#A8A29A"}
          strokeWidth="1.7"
        />
      </svg>
    </button>
  );
}
