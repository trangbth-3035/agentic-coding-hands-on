"use client";

import { useEffect, useState } from "react";
import { computeRemaining, pad2, type Remaining } from "@/lib/saa/countdown";

export type CountdownLabels = {
  comingSoon: string;
  days: string;
  hours: string;
  minutes: string;
};

/** One LED digit on the shared frosted tile (Figma component 186:2619 at the
 * homepage "md" scale — the prelaunch page renders the same tile larger). */
function DigitTile({ digit }: { digit: string }) {
  return (
    <div className="relative flex h-14 w-9 items-center justify-center overflow-hidden rounded-lg sm:h-[82px] sm:w-[51px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] border-[0.5px] border-saa-gold-light opacity-50 backdrop-blur-[17px]"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.10) 100%)",
        }}
      />
      <span className="relative font-dseg text-[32px] font-bold leading-none text-white sm:text-[49px]">
        {digit}
      </span>
    </div>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  const [tens, ones] = value.split("");
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3.5">
      <div className="flex items-center gap-2 sm:gap-3.5" role="img" aria-label={value}>
        <DigitTile digit={tens} />
        <DigitTile digit={ones} />
      </div>
      <span className="text-base font-bold leading-6 text-white sm:text-2xl sm:leading-8">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({
  target,
  labels,
}: {
  target: string;
  labels: CountdownLabels;
}) {
  const targetMs = new Date(target).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(computeRemaining(targetMs));
    // First paint via rAF (not synchronously in the effect) to avoid
    // cascading renders; the UI shows "00" until then, same as the SSR state.
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [targetMs]);

  const r = remaining;
  const done = r?.done ?? false;
  const two = (n: number) => pad2(Math.max(0, Math.min(99, n)));

  return (
    <div>
      {!done && (
        <p className="mb-3 text-lg font-medium text-white/90">{labels.comingSoon}</p>
      )}
      <div className="flex items-start gap-4 sm:gap-10">
        <Unit value={r ? two(r.days) : "00"} label={labels.days} />
        <Unit value={r ? two(r.hours) : "00"} label={labels.hours} />
        <Unit value={r ? two(r.minutes) : "00"} label={labels.minutes} />
      </div>
    </div>
  );
}
