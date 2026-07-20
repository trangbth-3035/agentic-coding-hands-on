import Image from "next/image";
import Countdown from "./countdown";
import ArrowUpRight from "./arrow-up-right";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

const LAUNCH_AT = process.env.NEXT_PUBLIC_LAUNCH_AT ?? "2026-12-26T18:30:00+07:00";

export default async function Hero() {
  const { dict } = await getDict();
  const t = dict.hero;

  return (
    // The key-visual background lives on the page-level wrapper (app/page.tsx)
    // so it can flow past this hero and behind the ROOT FURTHER essay.
    <section id="about" className="relative">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col items-start px-4 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-24 xl:px-0">
        <Image
          src="/saa/root-further-logo.png"
          alt="Root Further"
          width={520}
          height={300}
          priority
          className="h-auto w-[240px] sm:w-[360px] lg:w-[451px]"
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
              {t.time}
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
            className="group inline-flex h-15 items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-8 text-base font-bold uppercase text-saa-bg transition hover:bg-saa-gold"
          >
            {t.aboutAwards}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={NAV_HREFS.kudos}
            className="group inline-flex h-15 items-center justify-center gap-2 rounded-lg border border-saa-gold-muted bg-saa-gold-light/10 px-8 text-base font-bold uppercase text-white transition hover:bg-saa-gold-light/20"
          >
            {t.aboutKudos}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
