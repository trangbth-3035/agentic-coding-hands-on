import Image from "next/image";
import ArrowUpRight from "./arrow-up-right";
import { AWARDS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

export default async function AwardSystem() {
  const { dict } = await getDict();
  const t = dict.awardsSection;

  return (
    <section id="awards" className="bg-saa-bg px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-6">
          <span className="whitespace-nowrap text-sm font-medium text-white/70">
            {t.caption}
          </span>
          <span className="h-px flex-1 bg-white/15" />
        </div>
        <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-saa-gold sm:text-5xl">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award) => {
            const item = dict.awards[award.slug];
            return (
              <a key={award.slug} href={`#awards-${award.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-saa-gold/15 bg-black/30 transition duration-300 group-hover:-translate-y-1 group-hover:border-saa-gold/50 group-hover:shadow-[0_0_40px_-10px_rgba(250,226,135,0.4)]">
                  <Image
                    src="/saa/award-bg.png"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute left-1/2 top-[40%] aspect-[3/1] w-[64%] -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src={award.titleImage}
                      alt={item.title}
                      fill
                      sizes="240px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-white/55">
                  {item.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/70 transition group-hover:text-saa-gold">
                  {t.detail}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
