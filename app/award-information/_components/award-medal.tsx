import Image from "next/image";
import type { Award } from "@/lib/saa/awards";

/**
 * Glowing award orb. The plinth + orb (`award-bg.png`) is shared across all six
 * awards; the per-award gold name sits inside the orb. Name overlays come from
 * the curated `/saa/award-<slug>.png` set (same assets the homepage uses).
 * Sizing mirrors the homepage treatment: centred, 64% wide, 3:1, contained.
 */
export function AwardMedal({ award, priority }: { award: Award; priority?: boolean }) {
  return (
    <div
      className="relative aspect-square w-full max-w-[336px] overflow-hidden rounded-3xl border border-saa-gold/60"
      style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 0 16px rgba(250,226,135,0.35)" }}
    >
      <Image
        src="/saa/award-bg.png"
        alt={`Giải thưởng ${award.title}`}
        fill
        sizes="336px"
        priority={priority}
        className="object-cover"
      />

      <div className="absolute left-1/2 top-[40%] aspect-[3/1] w-[64%] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={award.titleImage}
          alt={award.medalName}
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
