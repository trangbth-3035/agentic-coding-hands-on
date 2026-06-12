"use client";

import { useState } from "react";
import { SaaDropdownPanel, SaaDropdownItem } from "@/app/_components/saa-dropdown";

export type FilterKey = "hashtag" | "department";
export type FilterValue = { hashtag: string | null; department: string | null };

/**
 * The two Highlight-section filter pills ("Hashtag" / "Phòng ban") and their
 * Figma dropdowns (screenIds JWpsISMAaM and WXK5AYB_rG). Controlled: the parent
 * owns the selected values so it can filter the kudos list. The pill shows the
 * chosen value (or the category label when nothing is picked); selecting the
 * already-active option clears it.
 */
export function KudosFilters({
  labels,
  hashtags,
  departments,
  value,
  onChange,
}: {
  labels: { hashtag: string; department: string };
  hashtags: string[];
  departments: string[];
  value: FilterValue;
  onChange: (key: FilterKey, next: string | null) => void;
}) {
  const filters = [
    { key: "hashtag" as const, label: labels.hashtag, options: hashtags, selected: value.hashtag },
    { key: "department" as const, label: labels.department, options: departments, selected: value.department },
  ];
  const [openKey, setOpenKey] = useState<FilterKey | null>(null);

  return (
    <div className="flex items-center gap-2">
      {filters.map((f) => {
        const open = openKey === f.key;
        const active = f.selected != null;
        return (
          <div key={f.key} className="relative">
            {open && (
              <button
                aria-hidden
                tabIndex={-1}
                onClick={() => setOpenKey(null)}
                className="fixed inset-0 -z-10 cursor-default"
              />
            )}
            <button
              type="button"
              onClick={() => setOpenKey((k) => (k === f.key ? null : f.key))}
              aria-haspopup="menu"
              aria-expanded={open}
              className={`inline-flex items-center gap-2 rounded border px-4 py-3 text-sm font-semibold text-white transition ${
                active
                  ? "border-saa-gold bg-saa-gold-light/20"
                  : "border-saa-gold-muted bg-saa-gold-light/10 hover:bg-saa-gold-light/20"
              }`}
            >
              {f.selected ?? f.label}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/saa/chevron-down.svg"
                alt=""
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <SaaDropdownPanel className="absolute right-0 z-50 mt-2 min-w-full">
                {f.options.map((opt) => (
                  <SaaDropdownItem
                    key={opt}
                    active={opt === f.selected}
                    onClick={() => {
                      onChange(f.key, opt === f.selected ? null : opt);
                      setOpenKey(null);
                    }}
                  >
                    {opt}
                  </SaaDropdownItem>
                ))}
              </SaaDropdownPanel>
            )}
          </div>
        );
      })}
    </div>
  );
}
