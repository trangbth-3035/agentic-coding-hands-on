"use client";

import Image from "next/image";
import { useState } from "react";

export type WidgetLabels = { writeKudos: string; rules: string };

/** Floating quick-action widget pinned to the right edge (mms_6). */
export default function WidgetButton({ labels }: { labels: WidgetLabels }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 z-40 -translate-y-1/2">
      {open && (
        <div className="absolute right-0 bottom-full mb-3 w-44 overflow-hidden rounded-xl border border-white/10 bg-saa-panel/95 py-1 shadow-2xl backdrop-blur">
          <a href="#kudos" className="block px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/5">
            {labels.writeKudos}
          </a>
          <a href="#standards" className="block px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/5">
            {labels.rules}
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={labels.writeKudos}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-2xl bg-saa-gold px-4 py-3 shadow-xl shadow-black/40 transition hover:bg-saa-gold-light"
      >
        <Image src="/saa/icon-pen.svg" alt="" width={20} height={20} className="h-5 w-5" />
        <span className="text-[#1a1300]">/</span>
        <Image
          src="/saa/widget-kudos-logo.svg"
          alt="Kudos"
          width={20}
          height={19}
          className="h-5 w-auto"
        />
      </button>
    </div>
  );
}
