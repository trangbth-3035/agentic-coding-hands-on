import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  SPOTLIGHT_NAMES,
  SPOTLIGHT_TICKER,
  SPOTLIGHT_TOTAL,
} from "@/lib/saa/kudos";

/** Deterministic constellation texture: the reference board is covered in a
 * dense network of dots, thin connecting lines and faint triangles. A seeded
 * PRNG keeps the layout identical on server and client. Values are % of the
 * board. */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const { DOTS, LINKS, TRIANGLES } = (() => {
  const rand = mulberry32(3881226);
  const dots: Array<[number, number]> = [];
  for (let i = 0; i < 70; i++) {
    dots.push([Math.round(rand() * 980) / 10, Math.round(rand() * 980) / 10]);
  }
  // connect each dot to its nearest few neighbours for the web look
  const links: Array<[number, number, number, number]> = [];
  for (let i = 0; i < dots.length; i++) {
    const [x, y] = dots[i];
    const near = dots
      .map((d, j) => ({ j, d2: (d[0] - x) ** 2 + (d[1] - y) ** 2 }))
      .filter((n) => n.j !== i && n.d2 < 220)
      .slice(0, 2);
    for (const n of near) {
      if (n.j > i) links.push([x, y, dots[n.j][0], dots[n.j][1]]);
    }
  }
  const triangles: Array<[number, number]> = [];
  for (let i = 0; i < 12; i++) {
    triangles.push([Math.round(rand() * 940) / 10, Math.round(rand() * 900) / 10]);
  }
  return { DOTS: dots, LINKS: links, TRIANGLES: triangles };
})();

/** B.7 — dark word-cloud board: key-visual art bleeding in on the left, a
 * constellation texture, the running total, the scattered name cloud, a live
 * ticker and the expand hint (double diagonal arrows, per design). */
export function SpotlightBoard({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <div className="relative isolate h-[460px] w-full overflow-hidden rounded-[32px] border border-saa-gold-muted bg-[#00070C] sm:h-[548px] sm:rounded-[47px]">
      {/* key-visual art on the left, blended into the dark board */}
      <Image
        src="/saa/kudos-kv-bg.png"
        alt=""
        fill
        sizes="1200px"
        className="-z-20 object-cover opacity-50 mix-blend-screen"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00070C]/25 via-[#00070C]/85 to-[#00070C]" />

      {/* constellation texture */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 h-full w-full"
      >
        {LINKS.map(([x1, y1, x2, y2], i) => (
          <line
            key={`l${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeOpacity="0.18"
            strokeWidth="0.08"
          />
        ))}
        {DOTS.map(([x, y], i) => (
          <circle key={`d${i}`} cx={x} cy={y} r="0.22" fill="white" fillOpacity="0.45" />
        ))}
        {TRIANGLES.map(([x, y], i) => (
          <path
            key={`t${i}`}
            d={`M${x} ${y} l3.5 1.6 l-2.4 2.6 Z`}
            fill="white"
            fillOpacity="0.1"
          />
        ))}
      </svg>

      {/* search pill (top-left) — thin grey border on the dark board */}
      <div className="absolute left-6 top-6 flex w-56 items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-2">
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

      {/* live ticker (bottom-left) — grey timestamp, bold white message,
          older lines fading out toward the top */}
      <div className="absolute bottom-5 left-6 flex flex-col gap-0.5">
        {SPOTLIGHT_TICKER.map((t, i) => (
          <p
            key={i}
            className="text-xs tracking-[0.1px] sm:text-[15px] sm:leading-6"
            style={{ opacity: 0.35 + (i * 0.65) / Math.max(1, SPOTLIGHT_TICKER.length - 1) }}
          >
            <span className="font-medium text-[#999]">{t.time} </span>
            <span className="font-bold text-white">
              {t.name} {dict.tickerSuffix}
            </span>
          </p>
        ))}
      </div>

      {/* expand hint (bottom-right) — double diagonal arrows per design */}
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-5 right-6 h-6 w-6 text-white"
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
    </div>
  );
}
