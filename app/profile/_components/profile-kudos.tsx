"use client";

import { useState } from "react";
import type { KudosPost } from "@/lib/saa/kudos";
import { KudosCard, type CardLabels } from "@/app/kudos/_components/kudos-card";
import { SectionHeading } from "@/app/kudos/_components/section-heading";
import { SaaDropdownPanel, SaaDropdownItem } from "@/app/_components/saa-dropdown";

type Tab = "sent" | "received";

/**
 * Profile KUDOS section (Figma "mms_C/mms_D"): the "Sun* Annual Awards 2025 /
 * KUDOS" heading with a "Đã gửi (n) / Đã nhận (n)" dropdown on the right, and
 * the matching kudos list below. Sent kudos can carry a red "Spam" ribbon.
 */
export function ProfileKudos({
  caption,
  title,
  sent,
  received,
  cardLabels,
  t,
}: {
  caption: string;
  title: string;
  sent: KudosPost[];
  received: KudosPost[];
  cardLabels: CardLabels;
  t: { sent: string; received: string; spam: string };
}) {
  const [tab, setTab] = useState<Tab>("sent");
  const [open, setOpen] = useState(false);

  const list = tab === "sent" ? sent : received;
  const tabLabel = tab === "sent" ? t.sent : t.received;

  const filter = (
    <div className="relative">
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default"
        />
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded border border-saa-gold-muted bg-saa-gold-light/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-saa-gold-light/20"
      >
        {tabLabel} ({list.length})
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/saa/chevron-down.svg"
          alt=""
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <SaaDropdownPanel className="absolute right-0 z-20 mt-2 min-w-44">
          {(["sent", "received"] as const).map((key) => (
            <SaaDropdownItem
              key={key}
              active={tab === key}
              onClick={() => {
                setTab(key);
                setOpen(false);
              }}
            >
              {key === "sent" ? t.sent : t.received}
            </SaaDropdownItem>
          ))}
        </SaaDropdownPanel>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading caption={caption} title={title} right={filter} />
      <div className="mx-auto flex w-full max-w-[752px] flex-col gap-6">
        {list.map((post, i) => (
          <KudosCard
            key={post.id}
            post={post}
            labels={cardLabels}
            status={tab === "sent" && i < 2 ? t.spam : undefined}
          />
        ))}
      </div>
    </div>
  );
}
