"use client";

import { useEffect, useState } from "react";

type NavItem = { slug: string; label: string };

/**
 * Left-rail award navigation (design item C). Highlights the entry whose section
 * is currently in view and smooth-scrolls to it on click (anchor + CSS smooth).
 */
export function AwardNav({ items, ariaLabel }: { items: NavItem[]; ariaLabel: string }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // trigger when a section reaches the upper third of the viewport
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    // Horizontal scroll row on mobile; sticky vertical rail at lg (reference).
    <nav
      aria-label={ariaLabel}
      className="flex w-full flex-row gap-1 overflow-x-auto lg:sticky lg:top-24 lg:w-[178px] lg:shrink-0 lg:flex-col lg:gap-4 lg:overflow-visible"
    >
      {items.map((item) => {
        const isActive = item.slug === active;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "flex shrink-0 items-center gap-1 whitespace-nowrap border-b border-saa-gold-light px-3 py-4 text-sm font-bold leading-5 tracking-[0.25px] text-saa-gold-light lg:whitespace-normal"
                : "flex shrink-0 items-center gap-1 whitespace-nowrap rounded px-3 py-4 text-sm font-bold leading-5 tracking-[0.25px] text-white transition-colors hover:bg-white/10 lg:whitespace-normal"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/saa/ic-target.svg"
              alt=""
              width={20}
              height={20}
              className={`size-5 shrink-0 ${isActive ? "" : "opacity-80"}`}
            />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
