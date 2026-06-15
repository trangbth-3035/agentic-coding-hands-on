"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { HASHTAGS, SUNNERS } from "@/lib/saa/kudos";
import { WriteKudosModal } from "./write-kudos-modal";

/** The hero's "Viết Kudo" prompt bar — opens the compose modal (screenId
 * ihQ26W78P2). Mirrors the styling of the adjacent search-profile bar. */
export function WriteKudosLauncher({
  label,
  t,
  senderName,
  className = "",
}: {
  label: string;
  t: Dictionary["kudosBoard"]["writeKudos"];
  senderName: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-4 rounded-[68px] border border-saa-gold-muted bg-saa-gold-light/10 px-5 py-5 text-left transition hover:bg-saa-gold-light/20 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saa/kudos-ic-pen.svg" alt="" className="h-6 w-6 shrink-0" />
        <span className="text-sm font-bold tracking-[0.15px] text-white sm:text-base">
          {label}
        </span>
      </button>

      <WriteKudosModal
        open={open}
        onClose={() => setOpen(false)}
        t={t}
        hashtags={HASHTAGS}
        recipients={SUNNERS}
        senderName={senderName}
      />
    </>
  );
}
