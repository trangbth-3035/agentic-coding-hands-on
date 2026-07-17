import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  SPOTLIGHT_NAMES,
  SPOTLIGHT_TICKER,
  SPOTLIGHT_TOTAL,
} from "@/lib/saa/kudos";

/** B.7 — dark word-cloud board: faint feather art on the left, the running
 * total, a scattered cloud of Sunner names, a live ticker and a pan-zoom hint. */
export function SpotlightBoard({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <div className="relative isolate h-[460px] w-full overflow-hidden rounded-[32px] border border-saa-gold-muted bg-[#00070C] sm:h-[548px] sm:rounded-[47px]">
      {/* Design board is a plain near-black panel (no key-visual bleed) — the
          word-cloud and ticker provide all the texture. */}

      {/* search pill (top-left) */}
      <div className="absolute left-6 top-6 flex w-56 items-center gap-2 rounded-full border border-saa-gold-muted bg-saa-gold-light/10 px-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saa/kudos-ic-search.svg" alt="" className="h-4 w-4 opacity-70" />
        <span className="text-sm text-white/60">{dict.search}</span>
      </div>

      {/* running total (top-center) */}
      <p className="absolute left-1/2 top-6 -translate-x-1/2 text-3xl font-bold text-white sm:text-4xl">
        {SPOTLIGHT_TOTAL} {dict.kudosUnit}
      </p>

      {/* word cloud */}
      <div className="absolute inset-0">
        {SPOTLIGHT_NAMES.map((n, i) => (
          <span
            key={i}
            className={
              n.highlight
                ? "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-saa-red"
                : "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-semibold text-white"
            }
            style={{
              top: `${n.top}%`,
              left: `${n.left}%`,
              fontSize: `${n.size}px`,
              opacity: n.opacity,
            }}
          >
            {n.name}
          </span>
        ))}
      </div>

      {/* live ticker (bottom-left) */}
      <div className="absolute bottom-5 left-6 flex flex-col gap-0.5">
        {SPOTLIGHT_TICKER.map((t, i) => (
          <p key={i} className="text-xs font-bold tracking-[0.1px] text-white/90 sm:text-sm">
            {t.time} {t.name} {dict.tickerSuffix}
          </p>
        ))}
      </div>

      {/* pan-zoom hint (bottom-right) */}
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-5 right-6 h-6 w-6 text-white/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M9 3H5a2 2 0 0 0-2 2v4m18 0V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4m6 0h4a2 2 0 0 0 2-2v-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
