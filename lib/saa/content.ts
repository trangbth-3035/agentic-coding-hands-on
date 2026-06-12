/** Structural (non-localized) data for the Homepage SAA. Localized text lives
 * in lib/i18n/dictionaries.ts, keyed by the award `slug` below. */

export type AwardSlug =
  | "top-talent"
  | "top-project"
  | "top-project-leader"
  | "best-manager"
  | "signature-2025-creator"
  | "mvp";

export type Award = {
  slug: AwardSlug;
  /** Gold title artwork overlaid on the glowing orb. */
  titleImage: string;
};

export const AWARDS: Award[] = [
  { slug: "top-talent", titleImage: "/saa/award-top-talent.png" },
  { slug: "top-project", titleImage: "/saa/award-top-project.png" },
  { slug: "top-project-leader", titleImage: "/saa/award-top-project-leader.png" },
  { slug: "best-manager", titleImage: "/saa/award-best-manager.png" },
  { slug: "signature-2025-creator", titleImage: "/saa/award-signature-creator.png" },
  { slug: "mvp", titleImage: "/saa/award-mvp.png" },
];

/** Header/footer navigation hrefs (labels come from the dictionary). Each tab
 * targets its dedicated route so the nav works from any page. */
export const NAV_HREFS = {
  about: "/",
  awards: "/award-information",
  kudos: "/kudos",
  standards: "/award-information",
} as const;

/** Whether a nav href is the active route for the current pathname. The
 * homepage ("/") matches exactly; section pages also match their sub-routes. */
export function isNavActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
