"use client";

import { useEffect, useRef, useState } from "react";
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

export function HighlightCarousel({
  posts,
  labels,
}: {
  posts: KudosPost[];
  labels: CardLabels;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const step = () => {
    const el = trackRef.current;
    if (!el) return 552;
    const card = el.querySelector("article");
    return card ? card.getBoundingClientRect().width + 24 : 552;
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setPage(Math.min(posts.length, Math.round(el.scrollLeft / step()) + 1));
  };

  const go = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta * step(), behavior: "smooth" });
  };

  // Open on the second slide so cards peek in from BOTH edges (the design's
  // resting state); at slide 1 the left half of the bleed would sit empty.
  useEffect(() => {
    const el = trackRef.current;
    if (el && posts.length > 1) el.scrollLeft = step();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Full-bleed centre-mode carousel: the active card snaps to the
          viewport centre and the neighbours peek in from both edges. */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="saa-no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
          style={{ paddingInline: "max(16px, calc(50vw - 276px))" }}
        >
          {posts.map((post) => (
            <div key={post.id} className="flex shrink-0 snap-center">
              <KudosCard post={post} labels={labels} variant="highlight" />
            </div>
          ))}
        </div>

        {/* Edge scrims + big arrows: the fades span the whole peeking side
            card (up to the centre card's edge) so the neighbours read dimmed
            into the dark page like the design, not full-brightness cream. */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          style={{ width: "max(96px, calc(50vw - 288px))" }}
          className="absolute inset-y-0 left-0 hidden items-center justify-start bg-gradient-to-r from-saa-bg from-25% via-saa-bg/70 to-transparent pl-3 text-white transition hover:text-saa-gold-light md:flex"
        >
          <Chevron dir="left" className="h-12 w-12" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          style={{ width: "max(96px, calc(50vw - 288px))" }}
          className="absolute inset-y-0 right-0 hidden items-center justify-end bg-gradient-to-l from-saa-bg from-25% via-saa-bg/70 to-transparent pr-3 text-white transition hover:text-saa-gold-light md:flex"
        >
          <Chevron dir="right" className="h-12 w-12" />
        </button>
      </div>

      {/* pager */}
      <div className="flex items-center justify-center gap-8">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="grid h-10 w-10 place-items-center text-white transition hover:text-saa-gold-light"
        >
          <Chevron dir="left" className="h-5 w-5" />
        </button>
        {/* current page highlighted gold, the /total dimmed (design pager) */}
        <span className="flex items-baseline gap-0.5">
          <span className="text-[32px] font-bold leading-10 text-saa-gold-light">{page}</span>
          <span className="text-lg font-bold text-[#999]">/{posts.length}</span>
        </span>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="grid h-10 w-10 place-items-center text-white transition hover:text-saa-gold-light"
        >
          <Chevron dir="right" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
