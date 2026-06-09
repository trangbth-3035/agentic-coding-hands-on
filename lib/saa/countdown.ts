export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  done: boolean;
};

/** Time remaining (days/hours/minutes) until `targetMs`. Clamps to 0 when past. */
export function computeRemaining(targetMs: number): Remaining {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, done: true };
  const minutesTotal = Math.floor(diff / 60_000);
  return {
    days: Math.floor(minutesTotal / (60 * 24)),
    hours: Math.floor((minutesTotal % (60 * 24)) / 60),
    minutes: minutesTotal % 60,
    done: false,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
