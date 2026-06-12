"use client";

import { useState } from "react";
import type { KudosPost } from "@/lib/saa/kudos";
import { SectionHeading } from "./section-heading";
import { KudosFilters, type FilterValue } from "./kudos-filters";
import { HighlightCarousel } from "./highlight-carousel";
import type { CardLabels } from "./kudos-card";

/**
 * Highlight Kudos section: heading + the Hashtag/Phòng ban filter pills, and a
 * carousel that re-renders to only the matching posts. Filters combine (AND);
 * when nothing matches, an empty-state message is shown instead of the carousel.
 */
export function HighlightSection({
  posts,
  cardLabels,
  filterLabels,
  hashtags,
  departments,
  caption,
  title,
  emptyText,
}: {
  posts: KudosPost[];
  cardLabels: CardLabels;
  filterLabels: { hashtag: string; department: string };
  hashtags: string[];
  departments: string[];
  caption: string;
  title: string;
  emptyText: string;
}) {
  const [value, setValue] = useState<FilterValue>({ hashtag: null, department: null });

  const filtered = posts.filter(
    (p) =>
      (!value.department || p.department === value.department) &&
      (!value.hashtag || p.hashtags.includes(value.hashtag)),
  );

  return (
    <>
      <SectionHeading
        caption={caption}
        title={title}
        right={
          <KudosFilters
            labels={filterLabels}
            hashtags={hashtags}
            departments={departments}
            value={value}
            onChange={(key, next) => setValue((v) => ({ ...v, [key]: next }))}
          />
        }
      />
      <div className="mt-10">
        {filtered.length > 0 ? (
          <HighlightCarousel
            // Remount on filter change so scroll position + pager reset.
            key={`${value.department ?? "all"}-${value.hashtag ?? "all"}`}
            posts={filtered}
            labels={cardLabels}
          />
        ) : (
          <p className="rounded-2xl border border-saa-gold-muted/40 bg-saa-panel/40 px-6 py-16 text-center text-lg font-semibold text-white/60">
            {emptyText}
          </p>
        )}
      </div>
    </>
  );
}
