import Image from "next/image";
import ArrowUpRight from "./arrow-up-right";
import { getDict } from "@/lib/i18n/server";

export default async function KudosBanner() {
  const { dict } = await getDict();
  const t = dict.kudos;

  return (
    <section id="kudos" className="bg-saa-bg px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c0f12]">
        <Image
          src="/saa/kudos-bg.png"
          alt=""
          fill
          sizes="(min-width:1024px) 1280px, 100vw"
          className="object-cover object-right"
        />

        <div className="pointer-events-none absolute right-6 top-1/2 hidden w-72 -translate-y-1/2 md:block lg:right-20 lg:w-96">
          <Image
            src="/saa/kudos-logo.svg"
            alt="Sun* Kudos"
            width={364}
            height={74}
            className="h-auto w-full"
          />
        </div>

        <div className="relative max-w-xl px-7 py-12 sm:px-12 sm:py-16">
          <p className="text-sm text-white/70">{t.label}</p>
          <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Sun<span className="text-saa-red">*</span> Kudos
          </h2>
          <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-saa-gold">
            {t.caption}
          </p>
          <p className="mt-3 text-sm leading-7 text-white/60">{t.description}</p>
          <a
            href="#kudos-detail"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-saa-gold px-6 py-2.5 text-sm font-bold text-[#1a1300] transition hover:bg-saa-gold-light"
          >
            {t.detail}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
