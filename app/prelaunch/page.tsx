import Image from "next/image";
import Link from "next/link";
import PrelaunchCountdown from "./_components/prelaunch-countdown";
import { getDict } from "@/lib/i18n/server";

const LAUNCH_AT = process.env.NEXT_PUBLIC_LAUNCH_AT ?? "2026-12-26T18:30:00+07:00";

export default async function PrelaunchPage() {
  const { dict } = await getDict();
  const t = dict.prelaunch;

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-saa-bg px-6">
      <Image
        src="/saa/prelaunch-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-saa-bg/40" />

      <div className="relative -mt-10">
        <PrelaunchCountdown
          target={LAUNCH_AT}
          labels={{
            title: t.title,
            days: t.days,
            hours: t.hours,
            minutes: t.minutes,
          }}
        />
      </div>

      {/* Temporary demo flow: tap anywhere to continue to the Homepage. */}
      <Link href="/" aria-label={t.enterHint} className="absolute inset-0 z-20" />
      <p className="pointer-events-none absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-sm text-white/50">
        {t.enterHint}
      </p>
    </main>
  );
}
