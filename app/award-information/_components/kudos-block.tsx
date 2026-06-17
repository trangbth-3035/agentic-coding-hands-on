import Image from "next/image";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

/** "Sun* Kudos" promo block (design item D1) — bg art, copy on the left, logo + CTA. */
export async function KudosBlock() {
  const { dict } = await getDict();
  const t = dict.kudos;

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-saa-divider">
      <Image src="/saa/kudos-bg.png" alt="" fill sizes="1200px" className="-z-10 object-cover" />

      <div className="flex flex-col items-start gap-10 p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex max-w-[470px] flex-col gap-4">
          <span className="text-2xl font-bold text-white">{t.label}</span>
          <h2 className="text-5xl font-bold leading-none text-saa-gold">{t.title}</h2>
          <p className="saa-justify text-base font-semibold leading-6 tracking-[0.5px] text-white">
            <span className="font-bold">{t.caption}</span>
            <br />
            {t.description}
          </p>
          <a
            href={NAV_HREFS.kudos}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded bg-saa-gold px-4 py-3 text-base font-bold text-saa-bg transition-transform hover:-translate-y-0.5"
          >
            {t.detail}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/ic-arrow.svg" alt="" width={24} height={24} className="size-6" />
          </a>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/saa/kudos-logo.svg"
          alt="Sun* Kudos"
          width={383}
          height={74}
          className="w-[240px] self-center md:w-[320px] lg:mr-8"
        />
      </div>
    </section>
  );
}
