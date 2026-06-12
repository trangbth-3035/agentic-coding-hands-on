import type { Locale } from "./config";

/**
 * UI dictionaries for the SAA 2025 app. English strings use MoMorph's
 * authoritative file localizations where available; the long Root Further essay
 * is translated faithfully from the Vietnamese source.
 *
 * Award titles ("Top Talent", "MVP", …) are proper names kept in both locales;
 * award slugs/images live in lib/saa/content.ts.
 */

const vi = {
  nav: {
    about: "About SAA 2025",
    awards: "Award Information",
    kudos: "Sun* Kudos",
    standards: "Tiêu chuẩn chung",
  },
  header: {
    notifications: "Thông báo",
    account: "Tài khoản",
    profile: "Trang cá nhân",
    dashboard: "Dashboard",
    signOut: "Đăng xuất",
  },
  hero: {
    comingSoon: "Comming soon",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    timeLabel: "Thời gian:",
    locationLabel: "Địa điểm:",
    location: "Âu Cơ Art Center",
    livestream: "Trực tiếp qua sóng Livestream",
    aboutAwards: "About Awards",
    aboutKudos: "About Kudos",
  },
  awardsSection: {
    caption: "Sun* annual awards 2025",
    heading: "Hệ thống giải thưởng",
    detail: "Chi tiết",
  },
  awards: {
    "top-talent": {
      title: "Top Talent",
      description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    },
    "top-project": {
      title: "Top Project",
      description:
        "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
    },
    "top-project-leader": {
      title: "Top Project Leader",
      description:
        "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá,",
    },
    "best-manager": {
      title: "Best Manager",
      description:
        "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    },
    "signature-2025-creator": {
      title: "Signature 2025 - Creator",
      description:
        "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    },
    mvp: {
      title: "MVP (Most Valuable Person)",
      description:
        "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    },
  },
  rootFurther: {
    intro: [
      "Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mọi Sunner đều là “problem-solver” - chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi bài toán của dự án, khách hàng và xã hội.",
      "Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào sâu để bứt phá trong kỷ nguyên AI, “Root Further” đã được chọn để trở thành chủ đề chính thức của Lễ trao giải Sun* Annual Awards 2025.",
      "Vượt ra khỏi nét nghĩa bề mặt, “Root Further” chính là hành trình chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng “địa chất” ẩn sâu để tiếp tục tồn tại, vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Mượn hình ảnh bộ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ len lỏi qua từng lớp “trầm tích” để thẩm thấu những gì tinh tuý nhất, người Sun* cũng đang “hấp thụ” dưỡng chất từ thời đại và những thử thách của thị trường để làm mới mình mỗi ngày, mở rộng năng lực và mạnh mẽ “bén rễ” vào kỷ nguyên AI - một tầng “địa chất” hoàn toàn mới, phức tạp và khó đoán, nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.",
    ],
    quoteMain: "“A tree with deep roots fears no storm”",
    quoteSub: "(Cây sâu bén rễ, bão giông chẳng nề - Ngạn ngữ Anh)",
    outro: [
      "Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với những cá nhân tự tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác được mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của chương mới trên hành trình phát triển tổ chức, “Root Further” còn như một lời cổ vũ, động viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám phá bỏ giới hạn, dám trở thành phiên bản đa nhiệm và xuất sắc nhất của mình. Bởi trong thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết để trường tồn.",
      "Không ai biết trước ẩn sâu trong “lòng đất” của ngành công nghệ và thị trường hiện đại còn biết bao tầng “địa chất” bí ẩn. Chỉ biết rằng khi “Root Further” đã trở thành tinh thần cội rễ, chúng ta sẽ không sợ hãi, mà càng thấy háo hức trước bất cứ vùng vô định nào trên hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao điều kỳ diệu và cơ hội vươn mình đang chờ ta.",
    ],
  },
  kudos: {
    label: "Phong trào ghi nhận",
    title: "Sun* Kudos",
    caption: "ĐIỂM MỚI CỦA SAA 2025",
    description:
      "Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người đạt giải.",
    detail: "Chi tiết",
  },
  kudosBoard: {
    heroTitle: "Hệ thống ghi nhận và cảm ơn",
    writePrompt: "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?",
    searchProfile: "Tìm kiếm profile Sunner",
    awardsCaption: "Sun* Annual Awards 2025",
    highlight: "HIGHLIGHT KUDOS",
    hashtag: "Hashtag",
    department: "Phòng ban",
    spotlight: "SPOTLIGHT BOARD",
    all: "ALL KUDOS",
    search: "Tìm kiếm",
    kudosUnit: "KUDOS",
    tickerSuffix: "đã nhận được một Kudos mới",
    copyLink: "Copy Link",
    viewDetails: "Xem chi tiết",
    noResults: "Không tìm thấy Kudos phù hợp với bộ lọc",
    stats: {
      received: "Số Kudos bạn nhận được:",
      sent: "Số Kudos bạn đã gửi:",
      likes: "Số tim bạn nhận được:",
      boxOpened: "Số Secret Box bạn đã mở:",
      boxUnopened: "Số Secret Box chưa mở:",
      openBox: "Mở Secret Box",
    },
    recipientsTitle: "10 SUNNER NHẬN QUÀ MỚI NHẤT",
    recipientGift: "Nhận được 1 áo phòng SAA",
  },
  footer: {
    copyright: "Bản quyền thuộc về Sun* © 2025",
  },
  login: {
    tagline1: "Bắt đầu hành trình của bạn cùng SAA 2025.",
    tagline2: "Đăng nhập để khám phá!",
    google: "LOGIN With Google",
    error: "Đăng nhập thất bại. Vui lòng thử lại.",
    googleNote:
      "* Google OAuth đang được cấu hình — tạm thời chuyển tới trang đếm ngược.",
  },
  prelaunch: {
    title: "Sự kiện sẽ bắt đầu sau",
    enterHint: "Nhấn vào màn hình để vào trang chủ →",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
  },
  widget: {
    writeKudos: "Viết Kudos",
    rules: "Thể lệ SAA",
  },
};

const en: typeof vi = {
  nav: {
    about: "About SAA 2025",
    awards: "Award Information",
    kudos: "Sun* Kudos",
    standards: "General standards",
  },
  header: {
    notifications: "Notifications",
    account: "Account",
    profile: "Profile",
    dashboard: "Dashboard",
    signOut: "Sign out",
  },
  hero: {
    comingSoon: "Comming soon",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    timeLabel: "Time:",
    locationLabel: "Location:",
    location: "Âu Cơ Art Center",
    livestream: "Live coverage via Livestream",
    aboutAwards: "About Awards",
    aboutKudos: "About Kudos",
  },
  awardsSection: {
    caption: "Sun* annual awards 2025",
    heading: "Awards System",
    detail: "Details",
  },
  awards: {
    "top-talent": {
      title: "Top Talent",
      description: "Honoring top individuals across all aspects",
    },
    "top-project": {
      title: "Top Project",
      description:
        "Honoring outstanding projects across all aspects, projects with standout revenue",
    },
    "top-project-leader": {
      title: "Top Project Leader",
      description: "Honoring inspiring managers who lead breakthrough projects,",
    },
    "best-manager": {
      title: "Best Manager",
      description: "Honoring managers with strong skills who lead their teams",
    },
    "signature-2025-creator": {
      title: "Signature 2025 - Creator",
      description: "Honoring managers with strong skills who lead their teams",
    },
    mvp: {
      title: "MVP (Most Valuable Person)",
      description: "Honoring managers with strong skills who lead their teams",
    },
  },
  rootFurther: {
    intro: [
      "Facing the whirlwind changes of the AI era and ever-higher demands from clients, Sun* has chosen a strategy of diversifying capabilities — not only striving to be the elite in its field, but aiming for a higher goal where every Sunner is a “problem-solver”: an expert at solving every problem and finding the answer to every challenge of projects, clients and society.",
      "Inspired by diverse capabilities, flexible growth and the spirit of digging deep to break through in the AI era, “Root Further” was chosen as the official theme of the Sun* Annual Awards 2025.",
      "Beyond its surface meaning, “Root Further” is the journey on which we never stop reaching farther, rooting deeper, touching the hidden “geological” layers to keep surviving, rising and nurturing the Sunner’s ever-burning passion for creating value. Borrowing the image of roots relentlessly driving into the earth, weaving through each layer of “sediment” to absorb the finest essence, Sunners too are “absorbing” nutrients from the times and the market’s challenges to renew themselves every day, expand their capabilities and firmly “take root” in the AI era — an entirely new “geological” layer, complex and unpredictable, yet brimming with potential and opportunity.",
    ],
    quoteMain: "“A tree with deep roots fears no storm”",
    quoteSub: "(English proverb)",
    outro: [
      "In the face of storms, only trees with strong enough roots can stand firm. An organization of individuals confident in their diverse capabilities — ready to create, embrace challenges and master change — not only stands firm amid upheaval, but also seizes every advantage and conquers the challenges of the times. More than just the name of a new chapter in the organization’s growth, “Root Further” is also an encouragement for each of us to dare to believe in ourselves, dare to dig deep, unlock all potential, dare to break limits, and dare to become the most versatile and excellent version of ourselves. Because in the AI era, diverse capabilities and harnessing the power of the times are the prerequisites for endurance.",
      "No one knows in advance how many mysterious “geological” layers lie hidden deep within the “earth” of the technology industry and the modern market. We only know that once “Root Further” has become our root spirit, we will not be afraid but rather grow ever more eager before any uncharted territory on the journey ahead. For we always believe that within those very boundless realms lie countless wonders and chances to rise.",
    ],
  },
  kudos: {
    label: "Recognition Movement",
    title: "Sun* Kudos",
    caption: "WHAT’S NEW IN SAA 2025",
    description:
      "A movement to recognize and thank colleagues — held for the first time for all Sunners. It will roll out in November 2025, encouraging Sunners to share words of recognition and thanks to colleagues on the system announced by the Organizing Committee. This will be material for the Heads Council to reference when selecting award recipients.",
    detail: "Details",
  },
  kudosBoard: {
    heroTitle: "Recognition & appreciation",
    writePrompt: "Today, who would you like to thank and acknowledge?",
    searchProfile: "Search for Sunner profile",
    awardsCaption: "Sun* Annual Awards 2025",
    highlight: "HIGHLIGHT KUDOS",
    hashtag: "Hashtag",
    department: "Department",
    spotlight: "SPOTLIGHT BOARD",
    all: "ALL KUDOS",
    search: "Search",
    kudosUnit: "KUDOS",
    tickerSuffix: "received a new Kudos",
    copyLink: "Copy Link",
    viewDetails: "View details",
    noResults: "No Kudos match the current filters",
    stats: {
      received: "Number of Kudos you received:",
      sent: "Number of Kudos you've sent:",
      likes: "Number of likes you received:",
      boxOpened: "Number of Secret Boxes opened:",
      boxUnopened: "Number of Secret Boxes unopened:",
      openBox: "Open Secret Box",
    },
    recipientsTitle: "10 LATEST SUNNERS TO RECEIVE GIFTS",
    recipientGift: "Received 1 SAA team shirt",
  },
  footer: {
    copyright: "Copyright © Sun* 2025",
  },
  login: {
    tagline1: "Begin your journey with SAA 2025.",
    tagline2: "Sign in to explore!",
    google: "LOGIN With Google",
    error: "Login failed. Please try again.",
    googleNote:
      "* Google OAuth is being configured — temporarily routing to the countdown page.",
  },
  prelaunch: {
    title: "The event will start after",
    enterHint: "Tap the screen to enter the homepage →",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
  },
  widget: {
    writeKudos: "Write Kudos",
    rules: "SAA Rules",
  },
};

export type Dictionary = typeof vi;

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
