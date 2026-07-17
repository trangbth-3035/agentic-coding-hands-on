"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { computeRemaining, type Remaining } from "@/lib/saa/countdown";

export type PrelaunchLabels = {
  title: string;
  days: string;
  hours: string;
  minutes: string;
};

/** Two digits, capped at 99 — the design has only two digit boxes per unit. */
function cap2(value: number): string {
  const safe = Number.isFinite(value) && value >= 0 ? Math.min(value, 99) : 0;
  return String(safe).padStart(2, "0");
}

function DigitBox({ char }: { char: string }) {
  return (
    <div className="relative h-[123px] w-[77px]">
      {/* Frosted-glass panel — gold border, blurs the key visual behind it */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl border-[0.75px] border-saa-gold-light opacity-50 backdrop-blur-[25px]"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.10) 100%)",
        }}
      />
      {/* LED digit (DSEG7) on top */}
      <span className="absolute inset-0 flex items-center justify-center font-dseg text-[74px] font-bold leading-none text-white">
        {char}
      </span>
    </div>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  const [d0, d1] = value.split("");
  return (
    <div className="flex flex-col items-start gap-[21px]">
      <div className="flex items-center gap-[21px]" role="img" aria-label={value}>
        <DigitBox char={d0} />
        <DigitBox char={d1} />
      </div>
      <span className="text-2xl font-bold uppercase text-white sm:text-4xl">
        {label}
      </span>
    </div>
  );
}

export default function PrelaunchCountdown({
  target,
  redirectTo,
  labels,
}: {
  /** Absolute launch date (ISO). */
  target: string;
  /** If set, navigate here once the countdown reaches zero. */
  redirectTo?: string;
  labels: PrelaunchLabels;
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
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
  }, [target, redirectTo, router]);

  const r = remaining;

  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-bold leading-tight text-white sm:text-4xl">
        {labels.title}
      </h1>
      <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-[60px]">
        <Unit value={r ? cap2(r.days) : "00"} label={labels.days} />
        <Unit value={r ? cap2(r.hours) : "00"} label={labels.hours} />
        <Unit value={r ? cap2(r.minutes) : "00"} label={labels.minutes} />
      </div>
    </section>
  );
}
