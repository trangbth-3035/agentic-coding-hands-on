"use client";

import { useState } from "react";
import { SecretBoxModal, type SecretBoxCopy } from "./secret-box-modal";

/**
 * The stats sidebar's "Mở Secret Box" button + the Secret Box modal it opens
 * (Figma screenId J3-4YFIpMM). Split out as a client island so the otherwise
 * server-rendered StatsSidebar stays server-only.
 */
export function OpenSecretBox({
  label,
  t,
  unopenedCount,
}: {
  label: string;
  t: SecretBoxCopy;
  unopenedCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4 text-[22px] font-bold text-saa-bg transition hover:brightness-105"
      >
        {label}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saa/kudos-ic-gift-dark.svg" alt="" className="h-6 w-6" />
      </button>

      <SecretBoxModal
        open={open}
        onClose={() => setOpen(false)}
        t={t}
        count={unopenedCount}
      />
    </>
  );
}
