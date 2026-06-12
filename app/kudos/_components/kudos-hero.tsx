import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Keyvisual hero: feather artwork band (sits behind the fixed header) with the
 * subtitle + KUDOS lockup, then the two function search bars. */
export function KudosHero({ dict }: { dict: Dictionary["kudosBoard"] }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* feather artwork, biased to the top-right; extends under the header */}
      <Image
        src="/saa/kudos-kv-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-top"
      />
      {/* darken left + bottom so copy stays legible and the art fades into the page */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-saa-bg via-saa-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-saa-bg" />

      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-28 sm:pt-32">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-saa-gold-light sm:text-[36px] sm:leading-[44px]">
            {dict.heroTitle}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/saa/kudos-kv-wordmark.svg"
            alt="KUDOS"
            className="h-16 w-auto sm:h-24"
          />
        </div>

        {/* Function bars (A.1 write kudos · search Sunner) */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center gap-4 rounded-[68px] border border-saa-gold-muted bg-saa-gold-light/10 px-5 py-5 text-left transition hover:bg-saa-gold-light/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/kudos-ic-pen.svg" alt="" className="h-6 w-6 shrink-0" />
            <span className="text-sm font-bold tracking-[0.15px] text-white sm:text-base">
              {dict.writePrompt}
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-4 rounded-[68px] border border-saa-gold-muted bg-saa-gold-light/10 px-5 py-5 text-left transition hover:bg-saa-gold-light/20 lg:w-[381px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/kudos-ic-search.svg" alt="" className="h-6 w-6 shrink-0" />
            <span className="text-sm font-bold tracking-[0.15px] text-white sm:text-base">
              {dict.searchProfile}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
