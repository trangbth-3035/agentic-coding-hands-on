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

/** Deterministic scatter for the word-cloud (no runtime randomness). The
 * design fills the board with ~90 tiny repeated names plus a few larger bold
 * ones; a seeded PRNG keeps the layout identical on server and client. */
export type CloudName = {
  name: string;
  top: number;
  left: number;
  size: number;
  opacity: number;
  highlight?: boolean;
};

/** mulberry32 — tiny seeded PRNG so the cloud is stable across renders. */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCloud(): CloudName[] {
  const rand = mulberry32(20251226);
  const out: CloudName[] = [];
  // Placed bounding boxes in board-% (board ≈ 1150×548): reject any candidate
  // that would overlap an already-placed name, so nothing renders on top of
  // anything else. Estimated glyph box: width ≈ chars×size×0.62px.
  const boxes: Array<[number, number, number, number]> = [];
  const BOARD_W = 1150;
  const BOARD_H = 548;
  // keep-out zones: search pill (top-left), the "388 KUDOS" total (top-centre)
  // and the ticker block (bottom-left).
  const ZONES: Array<[number, number, number, number]> = [
    [0, 30, 0, 16],
    [30, 72, 0, 14],
    [0, 46, 64, 100],
  ];
  const hits = (l: number, r: number, t: number, b: number) =>
    ZONES.some(([zl, zr, zt, zb]) => l < zr && r > zl && t < zb && b > zt) ||
    boxes.some(([bl, br, bt, bb]) => l < br + 0.8 && r > bl - 0.8 && t < bb + 1 && b > bt - 1);

  // Reserve the red highlight's spot (pushed last, rendered on top).
  {
    const hw = ((17 * 15 * 0.62) / BOARD_W) * 100;
    const hh = ((15 + 6) / BOARD_H) * 100;
    boxes.push([47 - hw / 2, 47 + hw / 2, 45 - hh / 2, 45 + hh / 2]);
  }

  let attempts = 0;
  while (out.length < 88 && attempts < 1600) {
    attempts += 1;
    const name = SUNNERS[Math.floor(rand() * SUNNERS.length) % SUNNERS.length];
    const big = rand() > 0.95;
    const size = big ? 14 + Math.round(rand() * 3) : 9 + Math.round(rand() * 3);
    const top = 8 + rand() * 70;
    const left = 4 + rand() * 92;
    const w = ((name.length * size * 0.62) / BOARD_W) * 100;
    const h = ((size + 6) / BOARD_H) * 100;
    const l = left - w / 2;
    const r = left + w / 2;
    const t = top - h / 2;
    const b = top + h / 2;
    if (l < 1 || r > 99 || hits(l, r, t, b)) continue;
    boxes.push([l, r, t, b]);
    out.push({
      name,
      top: Math.round(top * 10) / 10,
      left: Math.round(left * 10) / 10,
      size,
      opacity: big ? 0.85 : 0.35 + Math.round(rand() * 30) / 100,
    });
  }
  out.push({
    name: "Nguyễn Hoàng Linh",
    top: 45,
    left: 47,
    size: 15,
    opacity: 1,
    highlight: true,
  });
  return out;
}

export const SPOTLIGHT_NAMES: CloudName[] = buildCloud();
