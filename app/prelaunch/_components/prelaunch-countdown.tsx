"use client";

import { useEffect, useState } from "react";
import { computeRemaining, pad2, type Remaining } from "@/lib/saa/countdown";

export type PrelaunchLabels = {
  title: string;
  days: string;
  hours: string;
  minutes: string;
};

function DigitBox({ char }: { char: string }) {
  return (
    <span className="relative flex h-[88px] w-[60px] items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02] sm:h-[104px] sm:w-[72px]">
      {/* unlit "off" segments (DSEG '8' lights every segment) */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-dseg text-5xl text-white/[0.07] sm:text-6xl"
      >
        8
      </span>
      {/* lit digit */}
      <span
        className="relative font-dseg text-5xl text-[#e6edf1] sm:text-6xl"
        style={{ textShadow: "0 0 16px rgba(220,235,245,0.45)" }}
      >
        {char}
      </span>
    </span>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {value.split("").map((c, i) => (
          <DigitBox key={i} char={c} />
        ))}
      </div>
      <span className="text-sm font-bold uppercase tracking-[0.25em] text-white sm:text-base">
        {label}
      </span>
    </div>
  );
}

export default function PrelaunchCountdown({
  target,
  labels,
}: {
  target: string;
  labels: PrelaunchLabels;
}) {
  const targetMs = new Date(target).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(computeRemaining(targetMs));
    const id = setInterval(() => setRemaining(computeRemaining(targetMs)), 1_000);
    return () => clearInterval(id);
  }, [targetMs]);

  const r = remaining;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 text-center text-xl font-medium text-white sm:text-2xl">
        {labels.title}
      </p>
      <div className="flex items-start gap-4 sm:gap-7">
        <Unit value={r ? pad2(r.days) : "00"} label={labels.days} />
        <Unit value={r ? pad2(r.hours) : "00"} label={labels.hours} />
        <Unit value={r ? pad2(r.minutes) : "00"} label={labels.minutes} />
      </div>
    </div>
  );
}
