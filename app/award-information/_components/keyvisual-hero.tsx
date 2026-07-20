import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Keyvisual hero band (Figma 313:8437 + 313:8439 Cover + 313:8453 title): the
 * full-bleed key-visual art with a top-to-bottom fade into the page
 * background. The ROOT FURTHER logo sits at the top of the band and the
 * section title (passed as children) is overlaid on its lower part — per
 * design the title reads over the art, not on a dark strip below it.
 */
export function KeyvisualHero({ children }: { children?: ReactNode }) {
  return (
    // The keyvisual region is a fixed 1440×547 band in the design (≈2.63:1).
    // Pin that aspect ratio so the art covers the full band; the min-height
    // keeps the logo clear on narrow viewports where the ratio is too short.
    <section className="relative flex w-full flex-col overflow-hidden bg-saa-bg lg:aspect-[1440/547] lg:min-h-[420px]">
      {/* Plain CSS background (not next/image): the grain-heavy art must skip
          the optimizer re-encode, which smooths the noise into blur. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/saa/keyvisual-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 62%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Cover — fade the art into the page background toward the bottom. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)",
        }}
      />

      <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1200px] flex-col justify-between gap-10 px-6 py-12 sm:py-16 lg:pb-16 lg:pt-24">
        <Image
          src="/saa/root-further.png"
          alt="ROOT FURTHER"
          width={338}
          height={150}
          priority
          className="h-auto w-[180px] shrink-0 sm:w-[260px] lg:w-[338px]"
        />
        {children ? <div className="w-full">{children}</div> : null}
      </div>
    </section>
  );
}
