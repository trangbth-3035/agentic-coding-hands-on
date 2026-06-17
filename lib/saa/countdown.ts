export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

/** Time remaining (days/hours/minutes/seconds) until `targetMs`. Clamps to 0
 * when past. Consumers that only show d/h/m can simply ignore `seconds`. */
export function computeRemaining(targetMs: number): Remaining {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const secondsTotal = Math.floor(diff / 1_000);
  return {
    days: Math.floor(secondsTotal / 86_400),
    hours: Math.floor((secondsTotal % 86_400) / 3_600),
    minutes: Math.floor((secondsTotal % 3_600) / 60),
    seconds: secondsTotal % 60,
    done: false,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
