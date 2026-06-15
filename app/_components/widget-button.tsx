"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_HREFS } from "@/lib/saa/content";

export type WidgetLabels = { writeKudos: string; rules: string };

/**
 * Floating action button pinned bottom-right (Figma "phim nổi chức năng" 1 & 2).
 * Closed (state 1): a gold pill showing pen / Sun* mark. Open (state 2): the
 * trigger becomes a red ✕ circle with two action pills ("Thể lệ", "Viết KUDOS")
 * sliding in above it.
 */
export default function WidgetButton({ labels }: { labels: WidgetLabels }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* outside-click catcher (no dimming, matching the design) */}
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 cursor-default"
        />
      )}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-5">
        {open && (
          <>
            {/* A — Thể lệ (rules) */}
            <Link
              href={NAV_HREFS.standards}
              onClick={() => setOpen(false)}
              style={{ animationDelay: "60ms" }}
              className="saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 transition hover:brightness-105"
            >
              <Image src="/saa/widget-rules-logo.svg" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-2xl font-bold leading-8 text-saa-bg">{labels.rules}</span>
            </Link>

            {/* B — Viết KUDOS */}
            <Link
              href={NAV_HREFS.kudos}
              onClick={() => setOpen(false)}
              style={{ animationDelay: "0ms" }}
              className="saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 transition hover:brightness-105"
            >
              <Image src="/saa/widget-pen.svg" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-2xl font-bold leading-8 text-saa-bg">{labels.writeKudos}</span>
            </Link>
          </>
        )}

        {/* C — trigger: gold pill (closed) ⇄ red ✕ circle (open) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={labels.writeKudos}
          className={
            open
              ? "grid h-14 w-14 place-items-center rounded-full bg-saa-red shadow-xl shadow-black/40 transition hover:brightness-110"
              : "flex items-center gap-2 rounded-full bg-saa-gold px-5 py-3.5 shadow-xl shadow-black/40 transition hover:bg-saa-gold-light"
          }
        >
          {open ? (
            <Image src="/saa/widget-close.svg" alt="" width={24} height={24} className="h-6 w-6" />
          ) : (
            <>
              <Image src="/saa/widget-pen.svg" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-xl font-bold text-saa-bg">/</span>
              <Image src="/saa/widget-rules-logo.svg" alt="" width={24} height={24} className="h-6 w-6" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
