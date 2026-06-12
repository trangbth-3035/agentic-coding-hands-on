"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavActive } from "@/lib/saa/content";

export type FooterNavItem = {
  label: string;
  href: string;
  /** Skip active highlighting (e.g. links with no dedicated route). */
  noActive?: boolean;
};

/** Footer nav links with active state derived from the current route. */
export function FooterNav({ items }: { items: FooterNavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
      {items.map((item) => {
        const active = !item.noActive && isNavActive(item.href, pathname);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-sm font-semibold text-saa-gold"
                : "text-sm text-white/70 transition hover:text-white"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
