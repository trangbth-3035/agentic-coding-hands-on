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
  "flex items-center gap-2 whitespace-nowrap text-left font-bold tracking-[0.5px] text-white transition hover:bg-saa-gold-light/10 hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]";
// Single-select "current value" highlight (filters / profile menu): gold/10.
const ITEM_ACTIVE =
  "bg-saa-gold-light/10 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]";
// Multi-select "checked" highlight (hashtag picker, screenId p9zO-c4a4x): gold/20.
const ITEM_CHECKED =
  "bg-saa-gold-light/20 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]";
const SIZE = {
  default: "h-14 rounded px-4 text-base",
  compact: "h-10 rounded-sm px-4 text-sm",
};

export function SaaDropdownItem({
  children,
  icon,
  active = false,
  checked = false,
  size = "default",
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
  /** Multi-select selected state: gold/20 wash + a trailing check badge. */
  checked?: boolean;
  /** `compact` = 40px rows (the hashtag multi-select); `default` = 56px. */
  size?: "default" | "compact";
  className?: string;
  /** When set, the row renders as a navigating anchor instead of a button. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const state = checked ? ITEM_CHECKED : active ? ITEM_ACTIVE : "";
  const cls = `${ITEM_BASE} ${SIZE[size]} ${state} ${className}`;
  const inner = (
    <>
      <span className="flex-1">{children}</span>
      {checked ? <CheckBadge /> : icon}
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

/** Gold check-in-circle badge shown on a selected multi-select row. */
function CheckBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0">
      <circle cx="12" cy="12" r="10" fill="#FFEA9E" />
      <path
        d="M7.5 12.4l3 3 6-6.3"
        fill="none"
        stroke="#00101A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
