import Image from "next/image";
import { getDict } from "@/lib/i18n/server";

export default async function RootFurtherSection() {
  const { dict } = await getDict();
  const t = dict.rootFurther;

  return (
    <section className="relative bg-saa-bg px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Image
          src="/saa/root-further-logo.png"
          alt="Root Further"
          width={420}
          height={240}
          className="mx-auto mb-12 h-auto w-[220px] opacity-95 sm:w-[300px]"
        />

        <div className="space-y-5 text-justify text-sm leading-7 text-saa-cream/90 sm:text-base sm:leading-8">
          {t.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}

          <blockquote className="py-4 text-center">
            <p className="text-base font-semibold italic text-white sm:text-lg">
              {t.quoteMain}
            </p>
            <p className="mt-1 text-sm text-white/60">{t.quoteSub}</p>
          </blockquote>

          {t.outro.map((p, i) => (
            <p key={`outro-${i}`}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
