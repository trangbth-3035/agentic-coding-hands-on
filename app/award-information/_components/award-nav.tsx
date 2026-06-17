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
    <nav aria-label={ariaLabel} className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = item.slug === active;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            aria-current={isActive ? "true" : undefined}
            className={`group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
              isActive ? "text-saa-gold" : "text-white/70 hover:text-white"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/saa/ic-target.svg"
              alt=""
              width={20}
              height={20}
              className={`size-5 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
            />
            <span className={isActive ? "underline decoration-saa-gold decoration-2 underline-offset-4" : ""}>
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
