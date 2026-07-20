import Image from "next/image";
import ArrowUpRight from "./arrow-up-right";
import { AWARDS, type AwardSlug } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

/** Per-card background art (demo assets); the slug→file map differs once. */
function cardBg(slug: AwardSlug): string {
  const name = slug === "signature-2025-creator" ? "signature-creator" : slug;
  return `/saa/award-bg-${name}.png`;
}

export default async function AwardSystem() {
  const { dict } = await getDict();
  const t = dict.awardsSection;

  return (
    <section id="awards" className="px-4 py-16 sm:px-8 sm:py-20 xl:px-0">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-10 sm:gap-20">
        {/* Section header — eyebrow, full-width divider, big gold title */}
        <div className="flex w-full flex-col gap-4">
          <p className="text-lg font-bold leading-7 text-white sm:text-2xl sm:leading-8">
            {t.caption}
          </p>
          <div className="h-px w-full bg-saa-divider" />
          <h2 className="text-[32px] font-bold leading-10 tracking-[-0.25px] text-saa-gold-light sm:text-[57px] sm:leading-[64px]">
            {t.heading}
          </h2>
        </div>

        <div className="grid w-full grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-x-[108px] lg:gap-y-20">
          {AWARDS.map((award) => {
            const item = dict.awards[award.slug];
            return (
              <article key={award.slug} className="flex w-full flex-col gap-6">
                <a
                  href={`#awards-${award.slug}`}
                  className="relative block aspect-square w-full shrink-0 overflow-hidden rounded-3xl transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3),0_0_10px_0_#FAE287]"
                  style={{
                    boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
                    mixBlendMode: "screen",
                  }}
                >
                  <Image
                    src={cardBg(award.slug)}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 312px, (min-width:640px) 45vw, 90vw"
                    className="rounded-3xl border-[0.955px] border-saa-gold-light object-cover"
                  />
                  <Image
                    src={award.titleImage}
                    alt={item.title}
                    width={232}
                    height={64}
                    className="absolute left-1/2 top-1/2 h-auto w-auto max-w-[65%] -translate-x-1/2 -translate-y-1/2 object-contain"
                  />
                </a>

                <div className="flex w-full flex-col gap-1">
                  <h3 className="text-2xl font-normal leading-8 text-saa-gold-light">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-base font-normal leading-6 tracking-[0.5px] text-white">
                    {item.description}
                  </p>
                  <a
                    href={`#awards-${award.slug}`}
                    className="inline-flex w-fit items-center gap-1 py-4 text-base leading-6 tracking-[0.15px] text-white"
                  >
                    {t.detail}
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
