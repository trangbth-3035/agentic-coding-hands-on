import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { GIFT_RECIPIENTS } from "@/lib/saa/kudos";
import { StatsCard } from "./stats-card";

export function StatsSidebar({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-[422px] lg:shrink-0">
      {/* D.1 — overview stats */}
      <StatsCard dict={dict} />

      {/* D.3 — latest gift recipients */}
      <div className="rounded-[17px] border border-saa-gold-muted bg-[#00070C] p-6">
        <p className="text-center text-[22px] font-bold leading-7 text-saa-gold-light">
          {dict.recipientsTitle}
        </p>
        <div className="mt-4 flex flex-col gap-4">
          {GIFT_RECIPIENTS.map((r) => (
            <div key={r.id} className="flex items-center gap-3">
              <Image
                src={r.avatar}
                alt={r.name}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-base font-bold text-white">{r.name}</p>
                <p className="text-sm text-saa-gold-light/80">{dict.recipientGift}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
