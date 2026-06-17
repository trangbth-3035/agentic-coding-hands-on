"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { HASHTAGS, SUNNERS } from "@/lib/saa/kudos";
import { WriteKudosModal } from "@/app/kudos/_components/write-kudos-modal";
import { RulesModal, type RulesCopy } from "./rules-modal";

export type WidgetLabels = { writeKudos: string; rules: string };

/**
 * Floating action button pinned bottom-right (Figma "phim nổi chức năng" 1 & 2).
 * Closed (state 1): a gold pill showing pen / Sun* mark. Open (state 2): the
 * trigger becomes a red ✕ circle with two action pills ("Thể lệ", "Viết KUDOS")
 * sliding in above it. Both "Viết KUDOS" entry points (the pill and the rules
 * drawer) open the compose modal in place rather than navigating to /kudos.
 */
export default function WidgetButton({
  labels,
  rules,
  compose,
  senderName,
}: {
  labels: WidgetLabels;
  rules: RulesCopy;
  compose: Dictionary["kudosBoard"]["writeKudos"];
  senderName: string;
}) {
  const [open, setOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

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
            {/* A — Thể lệ (rules): opens the rules drawer */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setRulesOpen(true);
              }}
              style={{ animationDelay: "60ms" }}
              className="saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 transition hover:brightness-105"
            >
              <Image src="/saa/widget-rules-logo.svg" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-2xl font-bold leading-8 text-saa-bg">{labels.rules}</span>
            </button>

            {/* B — Viết KUDOS: opens the compose modal in place */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setComposeOpen(true);
              }}
              style={{ animationDelay: "0ms" }}
              className="saa-fab-in flex items-center gap-2 rounded bg-saa-gold-light px-4 py-4 shadow-xl shadow-black/30 transition hover:brightness-105"
            >
              <Image src="/saa/widget-pen.svg" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-2xl font-bold leading-8 text-saa-bg">{labels.writeKudos}</span>
            </button>
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

      <RulesModal
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        t={rules}
        onWriteKudos={() => {
          setRulesOpen(false);
          setComposeOpen(true);
        }}
      />

      <WriteKudosModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        t={compose}
        hashtags={HASHTAGS}
        recipients={SUNNERS}
        senderName={senderName}
      />
    </>
  );
}
