import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { GIFT_RECIPIENTS, KUDOS_STATS } from "@/lib/saa/kudos";

function StatRow({
  label,
  value,
  fire,
}: {
  label: string;
  value: number;
  fire?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-lg font-bold leading-7 text-white sm:text-[22px]">{label}</span>
      <div className="flex shrink-0 items-center gap-1">
        {fire && (
          <span className="relative grid h-8 w-8 place-items-center text-2xl leading-none">
            🔥
            <span className="absolute text-[11px] font-bold text-white [-webkit-text-stroke:0.8px_#000]">
              {KUDOS_STATS.likeMultiplier}
            </span>
          </span>
        )}
        <span className="text-2xl font-bold text-saa-gold-light sm:text-[32px]">{value}</span>
      </div>
    </div>
  );
}

export function StatsSidebar({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-[422px] lg:shrink-0">
      {/* D.1 — overview stats */}
      <div className="rounded-[17px] border border-saa-gold-muted bg-[#00070C] p-6">
        <div className="flex flex-col gap-4">
          <StatRow label={dict.stats.received} value={KUDOS_STATS.received} />
          <StatRow label={dict.stats.sent} value={KUDOS_STATS.sent} />
          <StatRow label={dict.stats.likes} value={KUDOS_STATS.likes} fire />
          <div className="h-px w-full bg-saa-divider" />
          <StatRow label={dict.stats.boxOpened} value={KUDOS_STATS.boxOpened} />
          <StatRow label={dict.stats.boxUnopened} value={KUDOS_STATS.boxUnopened} />
          <button
            type="button"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4 text-[22px] font-bold text-saa-bg transition hover:brightness-105"
          >
            {dict.stats.openBox}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/kudos-ic-gift.svg" alt="" className="h-6 w-6" />
          </button>
        </div>
      </div>

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
