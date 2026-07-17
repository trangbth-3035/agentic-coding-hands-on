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
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Cover gradient — darkens toward the bottom for text contrast (design) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)",
        }}
      />

      <PrelaunchCountdown
        target={LAUNCH_AT}
        redirectTo="/"
        labels={{
          title: t.title,
          days: t.days,
          hours: t.hours,
          minutes: t.minutes,
        }}
      />

      {/* Temporary demo flow: tap anywhere to continue to the Homepage. */}
      <Link href="/" aria-label={t.enterHint} className="absolute inset-0 z-20" />
      <p className="pointer-events-none absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-sm text-white/50">
        {t.enterHint}
      </p>
    </main>
  );
}
