"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type SecretBoxCopy = Dictionary["kudosBoard"]["secretBox"];

/**
 * Secret Box — unopened state (Figma screenId J3-4YFIpMM "Open secret box-
 * chưa mở"): a centered modal over a dimmed page with the title, a
 * "click the box to open" hint, the gilded gift-box image (clickable), and a
 * footer count of remaining unopened boxes. Opened from the Kudos stats
 * sidebar's "Mở Secret Box" button. Clicking the box fires `onOpenBox` (the
 * opened state is a separate screen, wired later).
 */
export function SecretBoxModal({
  open,
  onClose,
  t,
  count,
  onOpenBox,
}: {
  open: boolean;
  onClose: () => void;
  t: SecretBoxCopy;
  count: number;
  onOpenBox?: () => void;
}) {
  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      {/* dimmed backdrop / click-to-close */}
      <button
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="saa-fade-in absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <div className="saa-zoom-in saa-no-scrollbar relative flex max-h-[92vh] w-full max-w-[652px] flex-col items-center gap-[22px] overflow-y-auto rounded-xl bg-saa-bg px-3 py-6 sm:px-4">
        {/* A — header */}
        <div className="relative w-full px-2">
          <h2 className="text-center text-xl font-bold leading-8 text-saa-gold-light sm:text-[25px]">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.title}
            className="absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center transition hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/widget-close.svg" alt="" className="h-5 w-5" />
          </button>
        </div>

        <div className="h-px w-full bg-saa-divider" />

        {/* B — hint */}
        <p className="text-center text-[13px] font-bold tracking-[0.4px] text-white">
          {t.hint}
        </p>

        {/* C — clickable gift box (box + podium + sparkle baked into the image) */}
        <button
          type="button"
          onClick={onOpenBox}
          className="block w-full max-w-[557px] overflow-hidden rounded-lg transition hover:brightness-110 active:scale-[0.99]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/saa/secretbox-closed.jpg"
            alt=""
            className="aspect-square w-full object-cover"
          />
        </button>

        <div className="h-px w-full bg-saa-divider" />

        {/* D — unopened count */}
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold tracking-[0.4px] text-white">
            {t.unopenedLabel}
          </span>
          <span className="text-3xl font-bold leading-9 text-saa-gold-light">
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
