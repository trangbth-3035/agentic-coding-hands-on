"use client";

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Shared "Dropdown-List" shell from the SAA Figma (screenIds WXK5AYB_rG /
 * JWpsISMAaM / 54rekaCHG1): a dark `#00070C` panel with a 1px gold-muted
 * border, 8px radius and 6px padding. Rows are 56px tall; the active/hovered
 * row gets a faint gold wash plus the gold text-glow.
 */
export function SaaDropdownPanel({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="menu"
      className={`flex flex-col rounded-lg border border-saa-gold-muted bg-[#00070C] p-1.5 shadow-2xl ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

// Arbitrary-property utilities kept as literal strings so Tailwind's JIT picks
// them up. The glow is the design's `0 0 6px #FAE287` (= saa-gold) shadow.
const ITEM_BASE =
  "flex h-14 items-center gap-2 whitespace-nowrap rounded px-4 text-left text-base font-bold tracking-[0.5px] text-white transition hover:bg-saa-gold-light/10 hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]";
const ITEM_ACTIVE =
  "bg-saa-gold-light/10 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]";

export function SaaDropdownItem({
  children,
  icon,
  active = false,
  className = "",
  href,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  /** Optional trailing glyph (profile menu rows have one). */
  icon?: ReactNode;
  /** Persistently highlighted (the currently-selected filter value). */
  active?: boolean;
  className?: string;
  /** When set, the row renders as a navigating anchor instead of a button. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls = `${ITEM_BASE} ${active ? ITEM_ACTIVE : ""} ${className}`;
  const inner = (
    <>
      <span className="flex-1">{children}</span>
      {icon}
    </>
  );
  if (href !== undefined) {
    return (
      <a role="menuitem" href={href} onClick={onClick} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} role="menuitem" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
