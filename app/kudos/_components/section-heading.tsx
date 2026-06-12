import type { ReactNode } from "react";

/** "Sun* Annual Awards 2025" caption + divider + big gold heading, with an
 * optional control cluster on the right of the heading row (used by Highlight). */
export function SectionHeading({
  caption,
  title,
  right,
}: {
  caption: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold text-white">{caption}</p>
      <div className="h-px w-full bg-saa-divider" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-4xl font-bold leading-tight tracking-[-0.25px] text-saa-gold md:text-[57px] md:leading-[64px]">
          {title}
        </h2>
        {right}
      </div>
    </div>
  );
}
