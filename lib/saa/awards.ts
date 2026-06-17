/**
 * Award catalogue for the "Hệ thống giải thưởng SAA 2025" page.
 *
 * STRUCTURAL data only — slug, proper-name titles, medal art, prize amounts and
 * layout side. All localizable copy (paragraphs, quantity units, prize notes)
 * lives in lib/i18n/dictionaries.ts under `awardInfo.awards`, keyed by the same
 * slug and index-aligned to `prizes`. Numbers + prize values are transcribed
 * verbatim from the Figma frame (screenId zFYDgyj_pD, fileKey 9ypp4enmFmdK3YAFJLIu6C).
 */

import type { AwardSlug } from "./content";

export type AwardPrize = {
  /** Big amount, e.g. "7.000.000 VNĐ". */
  value: string;
};

export type Award = {
  /** Anchor id + nav key (single source of truth in lib/saa/content.ts). */
  slug: AwardSlug;
  /** Left-rail navigation label (proper name, same in both locales). */
  navLabel: string;
  /** Card heading (proper name, same in both locales). */
  title: string;
  /** Uppercase name shown inside the medal orb (also the overlay alt text). */
  medalName: string;
  /** Gold name-art PNG overlaid on the orb (filenames don't always match slug). */
  titleImage: string;
  /** "Số lượng giải thưởng" amount; the unit is localized in the dictionary. */
  quantity: { value: string };
  /** One or more "Giá trị giải thưởng" amounts; notes are localized. */
  prizes: AwardPrize[];
  /** Side the medal sits on; content takes the other side. */
  medalSide: "left" | "right";
};

export const AWARDS: Award[] = [
  {
    slug: "top-talent",
    navLabel: "Top Talent",
    title: "Top Talent",
    medalName: "TOP TALENT",
    titleImage: "/saa/award-top-talent.png",
    quantity: { value: "10" },
    prizes: [{ value: "7.000.000 VNĐ" }],
    medalSide: "left",
  },
  {
    slug: "top-project",
    navLabel: "Top Project",
    title: "Top Project",
    medalName: "TOP PROJECT",
    titleImage: "/saa/award-top-project.png",
    quantity: { value: "02" },
    prizes: [{ value: "15.000.000 VNĐ" }],
    medalSide: "right",
  },
  {
    slug: "top-project-leader",
    navLabel: "Top Project Leader",
    title: "Top Project Leader",
    medalName: "TOP PROJECT LEADER",
    titleImage: "/saa/award-top-project-leader.png",
    quantity: { value: "03" },
    prizes: [{ value: "7.000.000 VNĐ" }],
    medalSide: "left",
  },
  {
    slug: "best-manager",
    navLabel: "Best Manager",
    title: "Best Manager",
    medalName: "BEST MANAGER",
    titleImage: "/saa/award-best-manager.png",
    quantity: { value: "01" },
    prizes: [{ value: "10.000.000 VNĐ" }],
    medalSide: "right",
  },
  {
    slug: "signature-2025-creator",
    navLabel: "Signature 2025 - Creator",
    title: "Signature 2025 - Creator",
    medalName: "SIGNATURE 2025 CREATOR",
    titleImage: "/saa/award-signature-creator.png",
    quantity: { value: "01" },
    prizes: [{ value: "5.000.000 VNĐ" }, { value: "8.000.000 VNĐ" }],
    medalSide: "left",
  },
  {
    slug: "mvp",
    navLabel: "MVP",
    title: "MVP (Most Valuable Person)",
    medalName: "MVP",
    titleImage: "/saa/award-mvp.png",
    quantity: { value: "01" },
    prizes: [{ value: "15.000.000 VNĐ" }],
    medalSide: "right",
  },
];
