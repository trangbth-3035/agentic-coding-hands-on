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

        <div className="mt-8 flex flex-col gap-2 text-sm font-semibold leading-6 text-white sm:text-base">
          <p className="flex flex-col gap-1.5 sm:flex-row sm:gap-15">
            <span>
              <span className="text-saa-gold-light">{t.timeLabel} </span>
              {eventDate}
            </span>
            <span>
              <span className="text-saa-gold-light">{t.locationLabel} </span>
              {t.location}
            </span>
          </p>
          <p className="tracking-[0.5px] text-white/80">{t.livestream}</p>
        </div>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <a
            href={NAV_HREFS.awards}
            className="group inline-flex h-15 items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-6 text-sm font-bold text-saa-bg transition hover:bg-saa-gold"
          >
            {t.aboutAwards}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={NAV_HREFS.kudos}
            className="group inline-flex h-15 items-center justify-center gap-2 rounded-lg border border-saa-gold-muted bg-saa-gold-light/10 px-6 text-sm font-bold text-saa-gold-light transition hover:bg-saa-gold-light/20"
          >
            {t.aboutKudos}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
