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
  { id: "k1", department: "CEVC2", hashtags: ["#Dedicated", "#Inspring"], sender: ["Huỳnh Dương Xuân Nhật", "new", AV1], receiver: ["Huỳnh Dương Xuân", "legend", AV2] },
  { id: "k2", department: "CEVC3", hashtags: ["#Inspring", "#Creative"], sender: ["Nguyễn Hoàng Linh", "rising", AV1], receiver: ["Mai Phương Thúy", "legend", AV2] },
  { id: "k3", department: "CEVC4", hashtags: ["#Dedicated", "#Teamwork"], sender: ["Đỗ Hoàng Hiệp", "legend", AV1], receiver: ["Dương Thúy An", "rising", AV2] },
  { id: "k4", department: "CEVC1", hashtags: ["#Supportive", "#Grateful"], sender: ["Nguyễn Văn Quy", "new", AV1], receiver: ["Lê Kiều Trang", "legend", AV2] },
  { id: "k5", department: "OPD", hashtags: ["#Creative", "#Dedicated"], sender: ["Nguyễn Bá Chức", "rising", AV1], receiver: ["Huỳnh Dương Xuân Nhật", "legend", AV2] },
  { id: "k6", department: "Infra", hashtags: ["#Teamwork", "#Supportive"], sender: ["Dương Thúy An", "new", AV1], receiver: ["Đỗ Hoàng Hiệp", "legend", AV2] },
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

/** Highlight-section filter options. Department codes and hashtags are
 * user-generated content kept verbatim in both locales (Figma screenIds
 * WXK5AYB_rG "Dropdown Phòng ban" and JWpsISMAaM "Dropdown Hashtag filter"). */
export const DEPARTMENTS = ["CEVC2", "CEVC3", "CEVC4", "CEVC1", "OPD", "Infra"];

export const HASHTAGS = [
  "#Dedicated",
  "#Inspring",
  "#Creative",
  "#Teamwork",
  "#Supportive",
  "#Grateful",
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

/** "10 Sunner nhận quà mới nhất" list (D.3). */
export const GIFT_RECIPIENTS = [
  "Huỳnh Dương Xuân",
  "Nguyễn Hoàng Linh",
  "Mai Phương Thúy",
  "Đỗ Hoàng Hiệp",
  "Lê Kiều Trang",
].map((name, i) => ({ id: `g${i}`, name, avatar: "/saa/kudos-recipient.png" }));

/** Spotlight board (B.7) — total count + live ticker + scattered word-cloud. */
export const SPOTLIGHT_TOTAL = 388;

export const SPOTLIGHT_TICKER = [
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
];
