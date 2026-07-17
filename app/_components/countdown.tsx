"use client";

import { useEffect, useState } from "react";
import { computeRemaining, pad2, type Remaining } from "@/lib/saa/countdown";

export type CountdownLabels = {
  comingSoon: string;
  days: string;
  hours: string;
  minutes: string;
};

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-gradient-to-b from-[#e8eaec] to-[#b9bfc4] text-3xl font-bold tabular-nums text-[#1a2227] shadow-lg shadow-black/30 sm:h-20 sm:w-20 sm:text-4xl">
        {value}
      </div>
      <span className="text-xs font-semibold tracking-[0.2em] text-white/80">
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
    // cascading renders; the UI shows "--" until then, same as before.
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [targetMs]);

  const r = remaining;
  const done = r?.done ?? false;

  return (
    <div>
      {!done && (
        <p className="mb-3 text-lg font-medium text-white/90">{labels.comingSoon}</p>
      )}
      <div className="flex items-start gap-4">
        <Tile value={r ? pad2(r.days) : "--"} label={labels.days} />
        <Tile value={r ? pad2(r.hours) : "--"} label={labels.hours} />
        <Tile value={r ? pad2(r.minutes) : "--"} label={labels.minutes} />
      </div>
    </div>
  );
}
