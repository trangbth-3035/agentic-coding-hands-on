import Image from "next/image";
import Countdown from "./countdown";
import ArrowUpRight from "./arrow-up-right";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

const LAUNCH_AT = process.env.NEXT_PUBLIC_LAUNCH_AT ?? "2026-12-26T18:30:00+07:00";

function formatEventDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(d);
}

export default async function Hero() {
  const { locale, dict } = await getDict();
  const eventDate = formatEventDate(LAUNCH_AT, locale);
  const t = dict.hero;

  return (
    <section id="about" className="relative isolate overflow-hidden">
      <Image
        src="/saa/keyvisual-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-saa-bg via-saa-bg/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-saa-bg" />

      <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-10">
        <Image
          src="/saa/root-further-logo.png"
          alt="Root Further"
          width={520}
          height={300}
          priority
          className="h-auto w-[260px] sm:w-[360px] lg:w-[440px]"
        />

        <div className="mt-10">
          <Countdown
            target={LAUNCH_AT}
            labels={{
              comingSoon: t.comingSoon,
              days: t.days,
              hours: t.hours,
              minutes: t.minutes,
            }}
          />
        </div>

        <div className="mt-8 space-y-1.5 text-sm text-white sm:text-base">
          <p className="flex flex-wrap gap-x-8 gap-y-1.5">
            <span>
              <span className="text-white/60">{t.timeLabel} </span>
              <span className="font-semibold">{eventDate}</span>
            </span>
            <span>
              <span className="text-white/60">{t.locationLabel} </span>
              <span className="font-semibold">{t.location}</span>
            </span>
          </p>
          <p className="text-white/70">{t.livestream}</p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={NAV_HREFS.awards}
            className="inline-flex items-center gap-2 rounded-full bg-saa-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#1a1300] transition hover:bg-saa-gold-light"
          >
            {t.aboutAwards}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={NAV_HREFS.kudos}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/5"
          >
            {t.aboutKudos}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
