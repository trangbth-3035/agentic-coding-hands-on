"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { computeRemaining, pad2, type Remaining } from "@/lib/saa/countdown";

export type PrelaunchLabels = {
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
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
  seconds,
  redirectTo,
  labels,
}: {
  /** Absolute launch date (ISO). Used when `seconds` is not given. */
  target?: string;
  /** Demo mode: count down this many seconds from when the page loads. */
  seconds?: number;
  /** If set, navigate here once the countdown reaches zero. */
  redirectTo?: string;
  labels: PrelaunchLabels;
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const targetMs =
      seconds != null ? Date.now() + seconds * 1_000 : new Date(target ?? "").getTime();
    let navigated = false;
    const tick = () => {
      const r = computeRemaining(targetMs);
      setRemaining(r);
      if (r.done && redirectTo && !navigated) {
        navigated = true;
        router.push(redirectTo);
      }
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [target, seconds, redirectTo, router]);

  const r = remaining;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 text-center text-xl font-medium text-white sm:text-2xl">
        {labels.title}
      </p>
      <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-7">
        <Unit value={r ? pad2(r.days) : "00"} label={labels.days} />
        <Unit value={r ? pad2(r.hours) : "00"} label={labels.hours} />
        <Unit value={r ? pad2(r.minutes) : "00"} label={labels.minutes} />
        <Unit value={r ? pad2(r.seconds) : "00"} label={labels.seconds} />
      </div>
    </div>
  );
}
