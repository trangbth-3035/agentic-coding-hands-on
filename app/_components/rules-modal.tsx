"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { RULE_HERO_BADGES, RULE_ICONS } from "@/lib/saa/kudos";

export type RulesCopy = Dictionary["rules"];

/**
 * "Thể lệ" rules drawer (Figma screenId b1Filzi9i6): a full-height 553px panel
 * that slides in from the right over a dimmed page. Explains the Hero-rank
 * badges (receivers), the 6 collectible Secret-Box icons (senders) and "Kudos
 * Quốc Dân", with a Đóng / Viết KUDOS action row pinned to the bottom. Opened
 * from the floating "Thể lệ" pill; "Viết KUDOS" opens the compose modal via
 * the onWriteKudos callback (the caller swaps this drawer for it).
 */
export function RulesModal({
  open,
  onClose,
  t,
  onWriteKudos,
}: {
  open: boolean;
  onClose: () => void;
  t: RulesCopy;
  onWriteKudos: () => void;
}) {
  // Close on Escape and lock background scroll while the drawer is open.
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

  const iconRows = [RULE_ICONS.slice(0, 3), RULE_ICONS.slice(3, 6)];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      {/* dimmed backdrop / click-to-close */}
      <button
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="saa-fade-in absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      <aside className="saa-drawer-in saa-no-scrollbar relative flex h-full w-full max-w-[553px] flex-col justify-between gap-10 overflow-y-auto bg-[#00070C] px-6 pb-10 pt-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-[40px] font-bold leading-tight text-saa-gold-light sm:text-[45px] sm:leading-[52px]">
            {t.title}
          </h2>

          <div className="flex flex-col gap-4">
            {/* Người nhận — Hero-rank badges */}
            <Heading>{t.receiverHeading}</Heading>
            <Body>{t.receiverIntro}</Body>
            {t.tiers.map((tier, i) => (
              <div key={i} className="flex flex-col gap-1.5 pl-5">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={RULE_HERO_BADGES[i]}
                    alt=""
                    className="h-[22px] w-auto shrink-0"
                  />
                  <span className="text-base font-bold leading-6 tracking-[0.5px] text-white">
                    {tier.count}
                  </span>
                </div>
                <p className="text-justify text-sm font-bold leading-5 tracking-[0.1px] text-white/90">
                  {tier.desc}
                </p>
              </div>
            ))}

            {/* Người gửi — 6 collectible Secret-Box icons */}
            <Heading>{t.senderHeading}</Heading>
            <Body>{t.senderIntro}</Body>
            <div className="flex flex-col gap-4 px-6">
              {iconRows.map((row, r) => (
                <div key={r} className="flex justify-between">
                  {row.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" className="w-20 self-start" />
                  ))}
                </div>
              ))}
            </div>
            <Body>{t.senderFootnote}</Body>

            {/* Kudos Quốc Dân */}
            <Heading>{t.nationalHeading}</Heading>
            <Body>{t.nationalBody}</Body>
          </div>
        </div>

        {/* Actions — pinned bottom (panel uses justify-between) */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-4 text-base font-bold text-white transition hover:bg-saa-gold-light/20"
          >
            <Image
              src="/saa/widget-close.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            {t.close}
          </button>
          <button
            type="button"
            onClick={onWriteKudos}
            className="flex flex-1 items-center justify-center gap-2 rounded bg-saa-gold-light px-4 py-4 text-base font-bold text-saa-bg transition hover:brightness-105"
          >
            <Image
              src="/saa/widget-pen.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            {t.writeKudos}
          </button>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

/** Gold-light section heading (22px Montserrat-700). */
function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[22px] font-bold leading-7 text-saa-gold-light">
      {children}
    </h3>
  );
}

/** White justified body copy (16px Montserrat-700). */
function Body({ children }: { children: ReactNode }) {
  return (
    <p className="text-justify text-base font-bold leading-6 tracking-[0.5px] text-white">
      {children}
    </p>
  );
}
