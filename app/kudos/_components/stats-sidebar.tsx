import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { RANK_UPS } from "@/lib/saa/kudos";
import { StatsCard } from "./stats-card";

type Entry = { id: string; name: string; avatar: string };

/** Shared sidebar leaderboard panel (gift recipients / rank-ups): gold title,
 * ~5 rows visible, the rest scrolling behind a thin light scrollbar. */
function LeaderboardPanel({
  title,
  note,
  entries,
}: {
  title: string;
  /** Sub-line rendered under every name (e.g. "Nhận được 1 áo phông SAA"). */
  note: string;
  entries: Entry[];
}) {
  return (
    <div className="rounded-[17px] border border-saa-gold-muted bg-[#00070C] p-6">
      <p className="text-center text-[22px] font-bold leading-7 text-saa-gold-light">{title}</p>
      <div className="mt-4 flex max-h-[368px] flex-col gap-4 overflow-y-auto pr-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.35)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/35">
        {entries.map((r) => (
          <div key={r.id} className="flex items-center gap-4">
            <Image
              src={r.avatar}
              alt={r.name}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/70"
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-xl font-bold leading-7 text-saa-gold-light">{r.name}</p>
              <p className="text-[15px] font-bold leading-5 text-white">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSidebar({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-[422px] lg:shrink-0">
      {/* D.1 — overview stats */}
      <StatsCard dict={dict} />

      {/* Latest rank-ups leaderboard (the gift-recipients panel was removed
          per the reference — this feature has no gift list). */}
      <LeaderboardPanel title={dict.rankUpsTitle} note={dict.rankUpNote} entries={RANK_UPS} />
    </aside>
  );
}
