import type { Dictionary } from "@/lib/i18n/dictionaries";
import { KUDOS_STATS } from "@/lib/saa/kudos";
import { OpenSecretBox } from "./open-secret-box";

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
      <span className="flex items-center text-lg font-bold leading-7 text-white sm:text-[22px]">
        {label}
        {/* x2 fire badge sits right after the label (design D.1.4): orange
            flame with a black bold "x2" inside its base */}
        {fire && (
          <span
            aria-label={`${KUDOS_STATS.likeMultiplier} bonus`}
            className="relative -mt-1 grid h-8 w-8 place-items-center text-[26px] leading-none"
          >
            🔥
            <span className="absolute bottom-[3px] text-[10px] font-bold leading-none text-black">
              {KUDOS_STATS.likeMultiplier}
            </span>
          </span>
        )}
      </span>
      <span className="shrink-0 text-2xl font-bold text-saa-gold-light sm:text-[32px]">
        {value}
      </span>
    </div>
  );
}

/**
 * The Kudos overview-stats card (Figma "D.1" / Profile "mms_B_Thống kê"): a
 * gold-bordered `#00070C` card with received / sent / likes (🔥×2) stats, a
 * divider, opened / unopened Secret Box counts, and the "Mở Secret Box" button.
 * Shared by the Kudos stats sidebar and the Profile page.
 */
export function StatsCard({
  dict,
  className = "",
}: {
  dict: Dictionary["kudosBoard"];
  className?: string;
}) {
  return (
    <div
      className={`rounded-[17px] border border-saa-gold-muted bg-[#00070C] p-6 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <StatRow label={dict.stats.received} value={KUDOS_STATS.received} />
        <StatRow label={dict.stats.sent} value={KUDOS_STATS.sent} />
        <StatRow label={dict.stats.likes} value={KUDOS_STATS.likes} fire />
        <div className="h-px w-full bg-saa-divider" />
        <StatRow label={dict.stats.boxOpened} value={KUDOS_STATS.boxOpened} />
        <StatRow label={dict.stats.boxUnopened} value={KUDOS_STATS.boxUnopened} />
        <OpenSecretBox
          label={dict.stats.openBox}
          t={dict.secretBox}
          unopenedCount={KUDOS_STATS.boxUnopened}
        />
      </div>
    </div>
  );
}
