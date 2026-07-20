/** Sample data for the Sun* Kudos — Live board (Figma screenId MaZUn5xHXZ).
 * Structural / non-localized content only; UI labels live in the i18n
 * dictionaries (lib/i18n/dictionaries.ts → kudosBoard). The thank-you bodies,
 * hashtags and Sunner names are user-generated content, kept verbatim in both
 * locales (same as award proper-names). */

export type KudosRank = "new" | "rising" | "legend";

/** Hero-rank pill badges. The PNGs already contain the styled label text, so
 * they render as-is (Figma node size 109×19). */
export const RANK_BADGE: Record<KudosRank, { src: string; label: string }> = {
  new: { src: "/saa/kudos-badge-new.png", label: "New Hero" },
  rising: { src: "/saa/kudos-badge-rising.png", label: "Rising Hero" },
  legend: { src: "/saa/kudos-badge-legend.png", label: "Legend Hero" },
};

/** "Thể lệ" rules drawer (Figma screenId b1Filzi9i6). Hero-rank pill badges in
 * receiver-tier order (New / Rising / Super / Legend) and the 6 collectible
 * Secret-Box icons for senders. Each PNG bakes in its own styled label (brand
 * names, identical in both locales), so they render as-is — same convention as
 * RANK_BADGE above. */
export const RULE_HERO_BADGES = [
  "/saa/kudos-rule-hero-new.png",
  "/saa/kudos-rule-hero-rising.png",
  "/saa/kudos-rule-hero-super.png",
  "/saa/kudos-rule-hero-legend.png",
];

export const RULE_ICONS = [
  "/saa/kudos-rule-revival.png",
  "/saa/kudos-rule-touch-of-light.png",
  "/saa/kudos-rule-stay-gold.png",
  "/saa/kudos-rule-flow-to-horizon.png",
  "/saa/kudos-rule-beyond-the-boundary.png",
  "/saa/kudos-rule-root-further.png",
];

export type KudosPerson = {
  name: string;
  role: string;
  rank: KudosRank;
  avatar: string;
};

export type KudosPost = {
  id: string;
  sender: KudosPerson;
  receiver: KudosPerson;
  time: string;
  hashtagTitle: string;
  body: string;
  /** number of attached photo thumbnails */
  photos: number;
  /** red hashtag line shown on the card (derived from `hashtags`) */
  tags: string;
  hearts: string;
  /** Team the kudos belongs to — drives the "Phòng ban" filter. */
  department: string;
  /** Hashtags on the kudos — drives the "Hashtag" filter. */
  hashtags: string[];
};

const AV1 = "/saa/kudos-avatar-1.png";
const AV2 = "/saa/kudos-avatar-2.png";

const BODY =
  "Cảm ơn người em bình thường nhưng phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...";

/** Repeat a post's hashtags into the long red tag line the card renders. */
function tagLine(hashtags: string[]): string {
  return `${[...hashtags, ...hashtags, ...hashtags].join(" ")}...`;
}

function person(
  name: string,
  rank: KudosRank,
  avatar: string,
  department: string,
): KudosPerson {
  return { name, role: department, rank, avatar };
}

type PostSeed = {
  id: string;
  department: string;
  hashtags: string[];
  sender: [name: string, rank: KudosRank, avatar: string];
  receiver: [name: string, rank: KudosRank, avatar: string];
};

// One seed per department so every "Phòng ban" option yields a result; hashtags
// overlap across posts so every "Hashtag" option does too.
const POST_SEEDS: PostSeed[] = [
  { id: "k1", department: "CEVC2", hashtags: ["#High-performing", "#BE PROFESSIONAL"], sender: ["Huỳnh Dương Xuân Nhật", "new", AV1], receiver: ["Huỳnh Dương Xuân", "legend", AV2] },
  { id: "k2", department: "CEVC3", hashtags: ["#BE PROFESSIONAL", "#BE OPTIMISTIC"], sender: ["Nguyễn Hoàng Linh", "rising", AV1], receiver: ["Mai Phương Thúy", "legend", AV2] },
  { id: "k3", department: "CEVC4", hashtags: ["#BE A TEAM", "#THINK OUTSIDE THE BOX"], sender: ["Đỗ Hoàng Hiệp", "legend", AV1], receiver: ["Dương Thúy An", "rising", AV2] },
  { id: "k4", department: "CEVC1", hashtags: ["#GET RISKY", "#GO FAST"], sender: ["Nguyễn Văn Quy", "new", AV1], receiver: ["Lê Kiều Trang", "legend", AV2] },
  { id: "k5", department: "OPD", hashtags: ["#WASSHOI", "#High-performing"], sender: ["Nguyễn Bá Chức", "rising", AV1], receiver: ["Huỳnh Dương Xuân Nhật", "legend", AV2] },
  { id: "k6", department: "Infra", hashtags: ["#THINK OUTSIDE THE BOX", "#WASSHOI"], sender: ["Dương Thúy An", "new", AV1], receiver: ["Đỗ Hoàng Hiệp", "legend", AV2] },
  // Second lap so the Highlight carousel has enough slides to run and every
  // filter option returns more than one card.
  { id: "k7", department: "CEVC2", hashtags: ["#BE OPTIMISTIC", "#GO FAST"], sender: ["Mai Phương Thúy", "rising", AV1], receiver: ["Nguyễn Hoàng Linh", "legend", AV2] },
  { id: "k8", department: "CEVC3", hashtags: ["#High-performing", "#BE A TEAM"], sender: ["Lê Kiều Trang", "new", AV1], receiver: ["Nguyễn Văn Quy", "rising", AV2] },
  { id: "k9", department: "CEVC4", hashtags: ["#GET RISKY", "#WASSHOI"], sender: ["Huỳnh Dương Xuân", "legend", AV1], receiver: ["Nguyễn Bá Chức", "new", AV2] },
  { id: "k10", department: "CEVC1", hashtags: ["#BE PROFESSIONAL", "#THINK OUTSIDE THE BOX"], sender: ["Nguyễn Bá Chức", "rising", AV1], receiver: ["Dương Thúy An", "legend", AV2] },
  { id: "k11", department: "OPD", hashtags: ["#BE A TEAM", "#GO FAST"], sender: ["Đỗ Hoàng Hiệp", "new", AV1], receiver: ["Mai Phương Thúy", "rising", AV2] },
  { id: "k12", department: "Infra", hashtags: ["#BE OPTIMISTIC", "#GET RISKY"], sender: ["Nguyễn Văn Quy", "legend", AV1], receiver: ["Lê Kiều Trang", "new", AV2] },
];

export const KUDOS_POSTS: KudosPost[] = POST_SEEDS.map((s) => ({
  id: s.id,
  sender: person(s.sender[0], s.sender[1], s.sender[2], s.department),
  receiver: person(s.receiver[0], s.receiver[1], s.receiver[2], s.department),
  time: "10:00 - 10/30/2025",
  hashtagTitle: "IDOL GIỚI TRẺ",
  body: BODY,
  photos: 5,
  tags: tagLine(s.hashtags),
  hearts: "1.000",
  department: s.department,
  hashtags: s.hashtags,
}));

/** Filter / picker options. Department codes and hashtags are user-generated
 * content kept verbatim in both locales. Hashtags are the SAA value-tags from
 * the Figma hashtag dropdown (screenId p9zO-c4a4x); departments from the
 * "Dropdown Phòng ban" (WXK5AYB_rG). */
export const DEPARTMENTS = ["CEVC2", "CEVC3", "CEVC4", "CEVC1", "OPD", "Infra"];

export const HASHTAGS = [
  "#High-performing",
  "#BE PROFESSIONAL",
  "#BE OPTIMISTIC",
  "#BE A TEAM",
  "#THINK OUTSIDE THE BOX",
  "#GET RISKY",
  "#GO FAST",
  "#WASSHOI",
];

/** Selectable recipients for the "Viết Kudo" Người nhận dropdown. */
export const SUNNERS = [
  "Huỳnh Dương Xuân Nhật",
  "Nguyễn Hoàng Linh",
  "Mai Phương Thúy",
  "Đỗ Hoàng Hiệp",
  "Lê Kiều Trang",
  "Nguyễn Văn Quy",
  "Nguyễn Bá Chức",
  "Dương Thúy An",
];

/** Overview stats for the right rail (D.1). */
export const KUDOS_STATS = {
  received: 25,
  sent: 25,
  likes: 25,
  /** badge multiplier shown next to the likes count */
  likeMultiplier: "x2",
  boxOpened: 25,
  boxUnopened: 25,
};

/** "10 Sunner nhận quà mới nhất" list (D.3) — ten entries, the panel shows
 * about five and scrolls for the rest (per design). */
export const GIFT_RECIPIENTS = [
  "Huỳnh Dương Xuân",
  "Nguyễn Hoàng Linh",
  "Mai Phương Thúy",
  "Đỗ Hoàng Hiệp",
  "Lê Kiều Trang",
  "Nguyễn Văn Quy",
  "Nguyễn Bá Chức",
  "Dương Thúy An",
  "Huỳnh Dương Xuân Nhật",
  "Mai Phương Thúy",
].map((name, i) => ({ id: `g${i}`, name, avatar: "/saa/kudos-recipient.png" }));

/** Spotlight board (B.7) — total count + live ticker + scattered word-cloud. */
export const SPOTLIGHT_TOTAL = 388;

export const SPOTLIGHT_TICKER = [
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
  { time: "08:30PM", name: "Nguyễn Bá Chức" },
];

/** Deterministic scatter for the word-cloud (no runtime randomness). Positions
 * are % within the board; one entry is highlighted red like the design. */
export type CloudName = {
  name: string;
  top: number;
  left: number;
  size: number;
  opacity: number;
  highlight?: boolean;
};

export const SPOTLIGHT_NAMES: CloudName[] = [
  { name: "Đỗ Hoàng Hiệp", top: 20, left: 18, size: 13, opacity: 0.5 },
  { name: "Dương Thúy An", top: 16, left: 34, size: 15, opacity: 0.7 },
  { name: "Nguyễn Văn Quy", top: 24, left: 52, size: 12, opacity: 0.45 },
  { name: "Mai Phương Thúy", top: 18, left: 68, size: 14, opacity: 0.6 },
  { name: "Lê Kiều Trang", top: 26, left: 82, size: 12, opacity: 0.4 },
  { name: "Nguyễn Bá Chức", top: 33, left: 24, size: 13, opacity: 0.55 },
  { name: "Nguyễn Hoàng Linh", top: 30, left: 44, size: 16, opacity: 0.85 },
  { name: "Dương Thúy An", top: 36, left: 62, size: 12, opacity: 0.5 },
  { name: "Đỗ Hoàng Hiệp", top: 34, left: 78, size: 13, opacity: 0.45 },
  { name: "Mai Phương Thúy", top: 44, left: 14, size: 14, opacity: 0.6 },
  { name: "Nguyễn Văn Quy", top: 46, left: 32, size: 12, opacity: 0.4 },
  { name: "Nguyễn Hoàng Linh", top: 47, left: 50, size: 20, opacity: 1, highlight: true },
  { name: "Lê Kiều Trang", top: 45, left: 70, size: 13, opacity: 0.55 },
  { name: "Nguyễn Bá Chức", top: 48, left: 86, size: 12, opacity: 0.4 },
  { name: "Dương Thúy An", top: 56, left: 20, size: 13, opacity: 0.5 },
  { name: "Mai Phương Thúy", top: 58, left: 38, size: 14, opacity: 0.6 },
  { name: "Đỗ Hoàng Hiệp", top: 57, left: 56, size: 12, opacity: 0.45 },
  { name: "Nguyễn Văn Quy", top: 60, left: 74, size: 13, opacity: 0.5 },
  { name: "Lê Kiều Trang", top: 64, left: 30, size: 12, opacity: 0.4 },
  { name: "Nguyễn Hoàng Linh", top: 66, left: 48, size: 14, opacity: 0.55 },
  { name: "Nguyễn Bá Chức", top: 65, left: 66, size: 12, opacity: 0.45 },
  { name: "Dương Thúy An", top: 68, left: 82, size: 13, opacity: 0.5 },
  // Densifying lap — the design cloud fills the whole board with small
  // repeated names plus a few larger bold ones.
  { name: "Đỗ Hoàng Hiệp", top: 12, left: 26, size: 11, opacity: 0.4 },
  { name: "Dương Thúy An", top: 11, left: 44, size: 12, opacity: 0.5 },
  { name: "Mai Phương Thúy", top: 13, left: 60, size: 11, opacity: 0.4 },
  { name: "Nguyễn Văn Quy", top: 11, left: 76, size: 12, opacity: 0.5 },
  { name: "Lê Kiều Trang", top: 14, left: 92, size: 11, opacity: 0.45 },
  { name: "Nguyễn Bá Chức", top: 20, left: 8, size: 11, opacity: 0.4 },
  { name: "Nguyễn Hoàng Linh", top: 26, left: 6, size: 12, opacity: 0.5 },
  { name: "Mai Phương Thúy", top: 40, left: 6, size: 11, opacity: 0.4 },
  { name: "Lê Kiều Trang", top: 52, left: 8, size: 12, opacity: 0.5 },
  { name: "Dương Thúy An", top: 22, left: 92, size: 12, opacity: 0.5 },
  { name: "Nguyễn Văn Quy", top: 38, left: 94, size: 11, opacity: 0.4 },
  { name: "Đỗ Hoàng Hiệp", top: 50, left: 93, size: 12, opacity: 0.5 },
  { name: "Nguyễn Bá Chức", top: 62, left: 94, size: 11, opacity: 0.4 },
  { name: "Huỳnh Dương Xuân", top: 23, left: 36, size: 11, opacity: 0.4 },
  { name: "Nguyễn Bá Chức", top: 27, left: 60, size: 11, opacity: 0.45 },
  { name: "Lê Kiều Trang", top: 30, left: 14, size: 12, opacity: 0.5 },
  { name: "Huỳnh Dương Xuân", top: 38, left: 24, size: 11, opacity: 0.4 },
  { name: "Nguyễn Văn Quy", top: 27, left: 88, size: 16, opacity: 0.9 },
  { name: "Nguyễn Hoàng Linh", top: 40, left: 84, size: 18, opacity: 0.95 },
  { name: "Nguyễn Văn Quy", top: 52, left: 40, size: 17, opacity: 0.9 },
  { name: "Nguyễn Hoàng Linh", top: 60, left: 78, size: 16, opacity: 0.85 },
  { name: "Mai Phương Thúy", top: 41, left: 44, size: 11, opacity: 0.4 },
  { name: "Đỗ Hoàng Hiệp", top: 44, left: 60, size: 12, opacity: 0.5 },
  { name: "Dương Thúy An", top: 50, left: 24, size: 11, opacity: 0.4 },
  { name: "Lê Kiều Trang", top: 55, left: 58, size: 11, opacity: 0.45 },
  { name: "Huỳnh Dương Xuân", top: 60, left: 12, size: 11, opacity: 0.4 },
  { name: "Nguyễn Bá Chức", top: 71, left: 30, size: 11, opacity: 0.4 },
  { name: "Mai Phương Thúy", top: 72, left: 50, size: 12, opacity: 0.5 },
  { name: "Đỗ Hoàng Hiệp", top: 70, left: 70, size: 11, opacity: 0.4 },
  { name: "Nguyễn Văn Quy", top: 73, left: 88, size: 12, opacity: 0.5 },
  { name: "Dương Thúy An", top: 75, left: 62, size: 11, opacity: 0.4 },
  { name: "Nguyễn Hoàng Linh", top: 18, left: 52, size: 12, opacity: 0.55 },
  { name: "Lê Kiều Trang", top: 33, left: 70, size: 11, opacity: 0.45 },
  { name: "Huỳnh Dương Xuân", top: 47, left: 76, size: 11, opacity: 0.4 },
  { name: "Nguyễn Bá Chức", top: 36, left: 54, size: 11, opacity: 0.4 },
];
