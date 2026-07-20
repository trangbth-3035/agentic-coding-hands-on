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
        {/* ~5 rows visible, the rest scroll behind a thin light scrollbar */}
        <div className="mt-4 flex max-h-[368px] flex-col gap-4 overflow-y-auto pr-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.35)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/35">
          {GIFT_RECIPIENTS.map((r) => (
            <div key={r.id} className="flex items-center gap-4">
              <Image
                src={r.avatar}
                alt={r.name}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/70"
              />
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-xl font-bold leading-7 text-saa-gold-light">
                  {r.name}
                </p>
                <p className="text-[15px] font-bold leading-5 text-white">
                  {dict.recipientGift}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
