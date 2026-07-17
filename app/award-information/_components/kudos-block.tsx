import Image from "next/image";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

/** "Sun* Kudos" promo block (design item D1) — bg art, copy on the left, logo + CTA. */
export async function KudosBlock() {
  const { dict } = await getDict();
  const t = dict.kudos;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0F0F0F] lg:min-h-[500px]">
      <Image
        src="/saa/kudos-bg-awards.png"
        alt=""
        fill
        sizes="(min-width:1024px) 1152px, 100vw"
        aria-hidden
        className="object-cover object-right"
      />

      <div className="relative z-[1] flex flex-col gap-8 p-6 sm:p-10 lg:h-full lg:min-h-[500px] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex max-w-[470px] flex-col items-start gap-4">
          <p className="text-2xl font-bold leading-8 text-white">{t.label}</p>
          <h2 className="text-[40px] font-bold leading-[48px] tracking-[-0.25px] text-saa-gold-light sm:text-[57px] sm:leading-[64px]">
            {t.title}
          </h2>
          <p className="whitespace-pre-line text-justify text-base font-bold leading-6 tracking-[0.5px] text-white">
            {t.caption}
            {"\n"}
            {t.description}
          </p>
          <a
            href={NAV_HREFS.kudos}
            className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-saa-gold-light px-6 py-4 text-sm font-bold text-saa-bg transition-shadow hover:shadow-lg"
          >
            {t.detail}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/ic-arrow.svg" alt="" width={20} height={20} className="size-5" />
          </a>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/saa/kudos-logo.svg"
          alt="Sun* Kudos"
          width={383}
          height={74}
          className="h-auto w-[240px] shrink-0 self-center sm:w-[320px] lg:w-[383px] lg:pr-4"
        />
      </div>
    </section>
  );
}
