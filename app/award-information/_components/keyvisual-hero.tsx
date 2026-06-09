import Image from "next/image";

/*
 * Keyvisual hero. The original artwork ("image 20") is a flat raster fill, not
 * an MM_MEDIA node, so it isn't downloadable and the Figma render API was down
 * at build time. This recreates the flowing multi-colour ribbon look in CSS as
 * a documented placeholder — swap in the real export when available.
 */
export function KeyvisualHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* dark base */}
      <div className="absolute inset-0 -z-20 bg-saa-bg" />

      {/* colour ribbons, biased to the top-right like the design */}
      <div
        className="absolute inset-0 -z-10 opacity-90 blur-2xl"
        style={{
          background: [
            "radial-gradient(40% 120% at 78% -10%, rgba(255,209,102,0.85), transparent 60%)",
            "radial-gradient(35% 110% at 90% 10%, rgba(255,122,24,0.80), transparent 60%)",
            "radial-gradient(45% 130% at 68% 0%, rgba(226,36,94,0.65), transparent 62%)",
            "radial-gradient(40% 120% at 58% -20%, rgba(138,43,226,0.55), transparent 60%)",
            "radial-gradient(50% 140% at 100% 40%, rgba(19,183,166,0.55), transparent 60%)",
            "radial-gradient(40% 120% at 84% 60%, rgba(61,220,132,0.45), transparent 60%)",
          ].join(","),
        }}
      />

      {/* fade the artwork into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-saa-bg" />

      <div className="mx-auto flex min-h-[300px] max-w-[1200px] items-center px-6 py-16">
        <Image
          src="/saa/root-further.png"
          alt="ROOT FURTHER"
          width={338}
          height={150}
          priority
          className="h-auto w-[260px] md:w-[360px]"
        />
      </div>
    </section>
  );
}
