"use client";

import { useState } from "react";
import type { KudosPost } from "@/lib/saa/kudos";
import { KudosCard, type CardLabels } from "./kudos-card";

function Chevron({ dir, className }: { dir: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Top-by-hearts carousel (reference B.2/B.5): three cards at a time —
 * previous / current / next — with the centre card prominent and the sides
 * faded behind the edge gradients (non-interactive). Arrows disable at both
 * ends; the pager reads "n/total". No physics-accurate sliding (YAGNI).
 */
export function HighlightCarousel({
  posts,
  labels,
}: {
  posts: KudosPost[];
  labels: CardLabels;
}) {
  const [index, setIndex] = useState(0);
  const total = posts.length;
  const prevDisabled = index === 0;
  const nextDisabled = index === total - 1;

  const slots = [index - 1, index, index + 1].map((i) =>
    i >= 0 && i < total ? posts[i] : null,
  );

  return (
    // Break out of the page column so the side cards can peek to the viewport
    // edges like the reference (Frame 528/527).
    <div className="isolate -mx-4 flex flex-col items-center gap-8 sm:-mx-9 lg:-mx-36">
      <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden">
        {slots.map((post, slot) =>
          post ? (
            <div
              key={post.id}
              inert={slot !== 1 ? true : undefined}
              className={`flex shrink-0 transition-opacity duration-300 ${
                slot === 1 ? "opacity-100" : "pointer-events-none"
              }`}
            >
              <KudosCard post={post} labels={labels} variant="highlight" />
            </div>
          ) : (
            <div key={`empty-${slot}`} className="hidden w-[320px] shrink-0 sm:block" aria-hidden />
          ),
        )}

        {/* Edge fades (Frame 528/527): dissolve the peeking side cards into the
            page bg #00101A; the nav chevron sits inside the dark part. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] flex w-[calc((100%-320px)/2)] min-w-[64px] items-center justify-start pl-3 sm:w-[calc((100%-420px)/2)] lg:w-[calc((100%-528px)/2)] lg:pl-20"
          style={{ background: "linear-gradient(90deg, #00101A 40%, rgba(0,16,26,0) 100%)" }}
        >
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={prevDisabled}
            aria-label="Previous"
            className="pointer-events-auto flex items-center justify-center p-2 text-white transition-opacity disabled:opacity-30"
          >
            <Chevron dir="left" className="h-10 w-10 lg:h-14 lg:w-14" />
          </button>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] flex w-[calc((100%-320px)/2)] min-w-[64px] items-center justify-end pr-3 sm:w-[calc((100%-420px)/2)] lg:w-[calc((100%-528px)/2)] lg:pr-20"
          style={{ background: "linear-gradient(270deg, #00101A 40%, rgba(0,16,26,0) 100%)" }}
        >
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            disabled={nextDisabled}
            aria-label="Next"
            className="pointer-events-auto flex items-center justify-center p-2 text-white transition-opacity disabled:opacity-30"
          >
            <Chevron dir="right" className="h-10 w-10 lg:h-14 lg:w-14" />
          </button>
        </div>
      </div>

      {/* Pager — big gold current + dimmed grey total */}
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={prevDisabled}
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center rounded text-white transition-opacity disabled:opacity-30"
        >
          <Chevron dir="left" className="h-7 w-7" />
        </button>
        <span className="font-bold">
          <span className="text-[45px] leading-none text-saa-gold-light">{index + 1}</span>
          <span className="text-[28px] text-[#999]">/{total}</span>
        </span>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          disabled={nextDisabled}
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center rounded text-white transition-opacity disabled:opacity-30"
        >
          <Chevron dir="right" className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
