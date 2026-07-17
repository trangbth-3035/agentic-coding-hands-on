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
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 xl:flex-nowrap xl:gap-12">
      {items.map((item) => {
        const active = !item.noActive && isNavActive(item.href, pathname);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "whitespace-nowrap bg-saa-gold-light/10 px-3 py-3 text-base font-bold leading-6 tracking-[0.15px] text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] lg:p-4"
                : "whitespace-nowrap px-3 py-3 text-base font-bold leading-6 tracking-[0.15px] text-white lg:p-4"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
