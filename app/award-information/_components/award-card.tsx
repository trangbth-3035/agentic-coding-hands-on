import type { Award } from "@/lib/saa/awards";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { AwardMedal } from "./award-medal";

type AwardInfo = Dictionary["awardInfo"];

/** One award entry: medal on one side, content (title, copy, prize stats) on the other. */
export function AwardCard({
  award,
  copy,
  labels,
  priority,
}: {
  award: Award;
  /** Localized copy for this award (paragraphs, unit, prize notes), keyed by slug. */
  copy: AwardInfo["awards"][Award["slug"]];
  /** Shared section labels (quantity/value headings, "or", medal alt prefix). */
  labels: AwardInfo;
  priority?: boolean;
}) {
  const medalFirst = award.medalSide === "left";

  return (
    <article id={award.slug} className="scroll-mt-24">
      <div
        className={`flex flex-col items-center gap-10 lg:items-start ${
          medalFirst ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="flex w-full shrink-0 justify-center lg:w-[336px]">
          <AwardMedal award={award} altPrefix={labels.medalAltPrefix} priority={priority} />
        </div>

        <div className="w-full flex-1 lg:max-w-[480px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Icon src="/saa/ic-target.svg" />
                <h3 className="text-2xl font-bold leading-8 text-saa-gold-light">{award.title}</h3>
              </div>
              {copy.paragraphs.map((p, i) => (
                <p key={i} className="saa-justify text-base font-bold leading-6 tracking-[0.5px] text-white">
                  {p}
                </p>
              ))}
            </div>

            <div className="h-px w-full bg-saa-divider" />

            {/* Số lượng giải thưởng — value sits inline right after the label */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-4">
                <Icon src="/saa/ic-diamond.svg" />
                <span className="text-2xl font-bold leading-8 text-saa-gold-light">
                  {labels.quantityLabel}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-4xl font-bold leading-[44px] text-white">
                    {award.quantity.value}
                  </span>
                  <span className="w-[60px] shrink-0 text-sm font-bold leading-5 tracking-[0.1px] text-white">
                    {copy.unit}
                  </span>
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-saa-divider" />

            {/* Giá trị giải thưởng */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Icon src="/saa/ic-license.svg" />
                <span className="text-2xl font-bold leading-8 text-saa-gold-light">
                  {labels.valueLabel}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {award.prizes.map((prize, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {i > 0 && (
                      <span className="flex items-center gap-2 text-sm font-bold leading-5 tracking-[0.1px] text-saa-divider">
                        {labels.or}
                        <span className="h-px flex-1 bg-saa-divider" />
                      </span>
                    )}
                    <span className="text-4xl font-bold leading-[44px] text-white">{prize.value}</span>
                    {copy.notes[i] && (
                      <span className="text-sm font-bold leading-5 tracking-[0.1px] text-white">
                        {copy.notes[i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Icon({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={24} height={24} className="size-6 shrink-0" />;
}
