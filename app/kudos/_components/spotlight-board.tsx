import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  SPOTLIGHT_NAMES,
  SPOTLIGHT_TICKER,
  SPOTLIGHT_TOTAL,
} from "@/lib/saa/kudos";

/** B.7 — Spotlight Board, visuals per the reference app: a darkened nebula
 * bleeding from the bottom-left with the plexus/constellation texture layered
 * via `screen` blend (its black background drops out), the white total headline, the
 * scattered name cloud, a bottom-left activity ticker fading upward and the
 * inert expand control. Data/i18n stay ours. */
export function SpotlightBoard({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-[47px] border border-saa-gold-muted bg-[#00070C] lg:h-[548px]">
      {/* Backdrop: nebula art + 70% black scrim + constellation texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/saa/spotlight-nebula.png"
          alt=""
          fill
          sizes="1157px"
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-[#000000B2]" />
        <Image
          src="/saa/spotlight-constellation.png"
          alt=""
          fill
          sizes="1157px"
          className="object-cover opacity-80 mix-blend-screen"
        />
      </div>

      {/* Search pill (B.7.3) — 219×39, gold-muted border, transparent */}
      <div className="absolute left-6 top-6 z-10 flex h-[39px] w-[219px] max-w-[calc(100%-3rem)] items-center gap-1.5 rounded-full border border-saa-gold-muted bg-transparent px-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saa/kudos-ic-search.svg" alt="" className="h-4 w-4 shrink-0 opacity-70" />
        <span className="truncate text-sm text-white/60">{dict.search}</span>
      </div>

      {/* Total headline (B.7.1) — white, centred */}
      <span className="absolute left-1/2 top-3 z-10 -translate-x-1/2 whitespace-nowrap text-2xl font-bold text-white sm:text-[36px]">
        {new Intl.NumberFormat().format(SPOTLIGHT_TOTAL)} {dict.kudosUnit}
      </span>

      {/* Scattered recipient names (word-cloud) */}
      {SPOTLIGHT_NAMES.map((n, i) => (
        <span
          key={i}
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
            fontSize: `${n.size}px`,
            opacity: n.highlight ? 1 : n.opacity,
          }}
          className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold ${
            n.highlight ? "text-[#F17676]" : "text-white"
          }`}
        >
          {n.name}
        </span>
      ))}

      {/* Live-activity ticker — fades up from the bottom-left */}
      <div
        aria-hidden
        className="absolute bottom-5 left-10 z-[3] flex flex-col [mask-image:linear-gradient(to_top,#000_55%,transparent)]"
      >
        {SPOTLIGHT_TICKER.map((t, i) => (
          <span
            key={i}
            style={{ opacity: 0.3 + i * (0.7 / SPOTLIGHT_TICKER.length) }}
            className="whitespace-nowrap text-[14px] font-bold text-white"
          >
            <span className="text-white/80">{t.time}</span>{" "}
            <span className="text-[16px]">
              {t.name} {dict.tickerSuffix}
            </span>
          </span>
        ))}
      </div>

      {/* Pan/Zoom hint (B.7.2) — inert double diagonal arrows */}
      <span className="absolute bottom-10 right-8 z-10 p-2 text-white">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
