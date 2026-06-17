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
  // Full award-detail copy for the /award-information page. Structural data
  // (slugs, prize amounts, layout) lives in lib/saa/awards.ts; `awards` below is
  // keyed by the same slug and `notes` is index-aligned to that award's prizes.
  awardInfo: {
    subtitle: "Sun* Annual Awards 2025",
    heading: "Hệ thống giải thưởng SAA 2025",
    navAriaLabel: "Danh mục giải thưởng",
    medalAltPrefix: "Giải thưởng",
    quantityLabel: "Số lượng giải thưởng:",
    valueLabel: "Giá trị giải thưởng:",
    or: "Hoặc",
    awards: {
      "top-talent": {
        paragraphs: [
          "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc toàn diện – những người không ngừng khẳng định năng lực chuyên môn vững vàng, hiệu suất công việc vượt trội, luôn mang lại giá trị vượt kỳ vọng, được đánh giá cao bởi khách hàng và đồng đội. Với tinh thần sẵn sàng nhận mọi nhiệm vụ tổ chức giao phó, họ luôn là nguồn cảm hứng, thúc đẩy động lực và tạo ảnh hưởng tích cực đến cả tập thể.",
        ],
        unit: "Cá nhân",
        notes: ["cho mỗi giải thưởng"],
      },
      "top-project": {
        paragraphs: [
          "Giải thưởng Top Project vinh danh các tập thể dự án xuất sắc với kết quả kinh doanh vượt kỳ vọng, hiệu quả vận hành tối ưu và tinh thần làm việc tận tâm. Đây là các dự án có độ phức tạp kỹ thuật cao, hiệu quả tối ưu hóa nguồn lực và chi phí tốt, đề xuất các ý tưởng có giá trị cho khách hàng, đem lại lợi nhuận vượt trội và nhận được phản hồi tích cực từ khách hàng. Các thành viên tuân thủ nghiêm ngặt các tiêu chuẩn phát triển nội bộ trong phát triển dự án, tạo nên một hình mẫu về sự xuất sắc và chuyên nghiệp.",
        ],
        unit: "Tập thể",
        notes: ["cho mỗi giải thưởng"],
      },
      "top-project-leader": {
        paragraphs: [
          "Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc – những người hội tụ năng lực quản lý vững vàng, khả năng truyền cảm hứng mạnh mẽ, và tư duy “Aim High – Be Agile” trong mọi bài toán và bối cảnh. Dưới sự dẫn dắt của họ, các thành viên không chỉ cùng nhau vượt qua thử thách và đạt được mục tiêu đề ra, mà còn giữ vững ngọn lửa nhiệt huyết, tinh thần Wasshoi, và trưởng thành để trở thành phiên bản tinh hoa – hạnh phúc hơn của chính mình.",
        ],
        unit: "Cá nhân",
        notes: ["cho mỗi giải thưởng"],
      },
      "best-manager": {
        paragraphs: [
          "Giải thưởng Best Manager vinh danh những nhà lãnh đạo tiêu biểu – người đã dẫn dắt đội ngũ của mình tạo ra kết quả vượt kỳ vọng, tác động nổi bật đến hiệu quả kinh doanh và sự phát triển bền vững của tổ chức. Dưới sự lãnh đạo của họ, đội ngũ luôn chinh phục và làm chủ mọi mục tiêu bằng năng lực đa nhiệm, khả năng phối hợp hiệu quả, và tư duy ứng dụng công nghệ linh hoạt trong kỷ nguyên số. Họ truyền cảm hứng để tập thể trở nên tự tin tràn đầy năng lượng, sẵn sàng đón nhận, thậm chí dẫn dắt tạo ra những thay đổi có tính cách mạng.",
        ],
        unit: "Cá nhân",
        notes: [""],
      },
      "signature-2025-creator": {
        paragraphs: [
          "Giải thưởng Signature vinh danh cá nhân hoặc tập thể thể hiện tinh thần đặc trưng mà Sun* hướng tới trong từng thời kỳ.",
          "Trong năm 2025, giải thưởng Signature vinh danh Creator - cá nhân/tập thể mang tư duy chủ động và nhạy bén, luôn nhìn thấy cơ hội trong thách thức và tiên phong trong hành động. Họ là những người nhạy bén với vấn đề, nhanh chóng nhận diện và đưa ra những giải pháp thực tiễn, mang lại giá trị rõ rệt cho dự án, khách hàng hoặc tổ chức. Với tư duy kiến tạo và tinh thần “Creator” đặc trưng của Sun*, họ không chỉ phản ứng tích cực trước sự thay đổi mà còn chủ động tạo ra cải tiến, góp phần định hình chuẩn mực mới cho cách mà người Sun* tạo giá trị.",
        ],
        unit: "Cá nhân hoặc tập thể",
        notes: ["cho giải cá nhân", "cho giải tập thể"],
      },
      mvp: {
        paragraphs: [
          "Giải thưởng MVP vinh danh cá nhân xuất sắc nhất năm – gương mặt tiêu biểu đại diện cho toàn bộ tập thể Sun*. Họ là người đã thể hiện năng lực vượt trội, tinh thần cống hiến bền bỉ, và tầm ảnh hưởng sâu rộng, để lại dấu ấn mạnh mẽ trong hành trình của Sun* suốt năm qua.",
          "Không chỉ nổi bật bởi hiệu suất và kết quả công việc, họ còn là nguồn cảm hứng lan tỏa – thông qua suy nghĩ, hành động và ảnh hưởng tích cực của mình đối với tập thể. MVP là người hội tụ đầy đủ phẩm chất của người Sun* ưu tú, đồng thời mang trên mình trọng trách lớn lao: trở thành hình mẫu đại diện cho con người và tinh thần Sun*, góp phần dẫn dắt tập thể vươn tới những đỉnh cao mới.",
        ],
        unit: "Cá nhân hoặc tập thể",
        notes: [""],
      },
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
    secretBox: {
      title: "KHÁM PHÁ SECRET BOX CỦA BẠN",
      hint: "Click vào box để mở",
      unopenedLabel: "Secretbox chưa mở",
    },
    recipientsTitle: "10 SUNNER NHẬN QUÀ MỚI NHẤT",
    recipientGift: "Nhận được 1 áo phòng SAA",
    // "Viết Kudo" compose modal (Figma screenId ihQ26W78P2)
    writeKudos: {
      title: "Gửi lời cám ơn và ghi nhận đến đồng đội",
      recipientLabel: "Người nhận",
      recipientPlaceholder: "Tìm kiếm",
      titleLabel: "Danh hiệu",
      titlePlaceholder: "Dành tặng một danh hiệu cho đồng đội",
      titleHint:
        "Ví dụ: Người truyền động lực cho tôi.\nDanh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn.",
      communityStandards: "Tiêu chuẩn cộng đồng",
      bodyPlaceholder:
        "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!",
      mentionHint: "Bạn có thể “@ + tên” để nhắc tới đồng nghiệp khác",
      hashtagLabel: "Hashtag",
      maxFive: "Tối đa 5",
      imageLabel: "Image",
      anonymous: "Gửi lời cám ơn và ghi nhận ẩn danh",
      cancel: "Hủy",
      submit: "Gửi",
      anonymousName: "Ẩn danh",
      justNow: "Vừa xong",
      recipientRequired: "Vui lòng chọn người nhận",
      noResults: "Không tìm thấy",
    },
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
    seconds: "Seconds",
  },
  widget: {
    writeKudos: "Viết KUDOS",
    rules: "Thể lệ",
  },
  rules: {
    title: "Thể lệ",
    close: "Đóng",
    writeKudos: "Viết KUDOS",
    receiverHeading:
      "NGƯỜI NHẬN KUDOS: HUY HIỆU HERO CHO NHỮNG ẢNH HƯỞNG TÍCH CỰC",
    receiverIntro:
      "Dựa trên số lượng đồng đội gửi trao Kudos, bạn sẽ sở hữu Huy hiệu Hero tương ứng, được hiển thị trực tiếp cạnh tên profile",
    tiers: [
      {
        count: "Có 1-4 người gửi Kudos cho bạn",
        desc: "Hành trình lan tỏa điều tốt đẹp bắt đầu – những lời cảm ơn và ghi nhận đầu tiên đã tìm đến bạn.",
      },
      {
        count: "Có 5-9 người gửi Kudos cho bạn",
        desc: "Hình ảnh bạn đang lớn dần trong trái tim đồng đội bằng sự tử tế và cống hiến của mình.",
      },
      {
        count: "Có 10–20 người gửi Kudos cho bạn",
        desc: "Bạn đã trở thành biểu tượng được tin tưởng và yêu quý, người luôn sẵn sàng hỗ trợ và được nhiều đồng đội nhớ đến.",
      },
      {
        count: "Có hơn 20 người gửi Kudos cho bạn",
        desc: "Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình.",
      },
    ],
    senderHeading:
      "NGƯỜI GỬI KUDOS: SƯU TẬP TRỌN BỘ 6 ICON, NHẬN NGAY PHẦN QUÀ BÍ ẨN",
    senderIntro:
      "Mỗi lời Kudos bạn gửi sẽ được đăng tải trên hệ thống và nhận về những lượt ❤️ từ cộng đồng Sunner. Cứ mỗi 5 lượt ❤️, bạn sẽ được mở 1 Secret Box, với cơ hội nhận về một trong 6 icon độc quyền của SAA.",
    senderFootnote:
      "Những Sunner thu thập trọn bộ 6 icon sẽ nhận về một phần quà bí ẩn từ SAA 2025.",
    nationalHeading: "KUDOS QUỐC DÂN",
    nationalBody:
      "5 Kudos nhận về nhiều ❤️ nhất toàn Sun* sẽ chính thức trở thành Kudos Quốc Dân và được trao phần quà đặc biệt từ SAA 2025: Root Further.",
  },
  profile: {
    collectionTitle: "Bộ sưu tập icon của tôi",
    sent: "Đã gửi",
    received: "Đã nhận",
    spam: "Spam",
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
  // English counterpart of the award-detail copy (translated faithfully from the
  // Vietnamese source). Same shape/keys as the vi `awardInfo`.
  awardInfo: {
    subtitle: "Sun* Annual Awards 2025",
    heading: "SAA 2025 Awards System",
    navAriaLabel: "Award categories",
    medalAltPrefix: "Award",
    quantityLabel: "Number of awards:",
    valueLabel: "Award value:",
    or: "Or",
    awards: {
      "top-talent": {
        paragraphs: [
          "The Top Talent award honors all-around outstanding individuals – those who continuously affirm their solid expertise and exceptional performance, consistently deliver value beyond expectations, and are highly regarded by clients and teammates. With a spirit ready to take on every task the organization entrusts to them, they are always a source of inspiration, driving motivation and creating a positive impact on the whole team.",
        ],
        unit: "Individuals",
        notes: ["per award"],
      },
      "top-project": {
        paragraphs: [
          "The Top Project award honors outstanding project teams with business results that exceed expectations, optimal operational efficiency and a dedicated working spirit. These are projects of high technical complexity that optimize resources and costs effectively, propose valuable ideas for clients, deliver outstanding profits and earn positive client feedback. Their members strictly follow internal development standards throughout the project, setting a model of excellence and professionalism.",
        ],
        unit: "Teams",
        notes: ["per award"],
      },
      "top-project-leader": {
        paragraphs: [
          "The Top Project Leader award honors outstanding project managers – those who combine solid management capability, a powerful ability to inspire, and an “Aim High – Be Agile” mindset in every problem and context. Under their leadership, members not only overcome challenges together and achieve the set goals, but also keep their fire of enthusiasm and Wasshoi spirit burning, growing into the finest – and happier – version of themselves.",
        ],
        unit: "Individuals",
        notes: ["per award"],
      },
      "best-manager": {
        paragraphs: [
          "The Best Manager award honors exemplary leaders – those who have led their teams to results beyond expectations, with a standout impact on business performance and the organization’s sustainable growth. Under their leadership, the team conquers and masters every goal through multitasking capability, effective coordination, and a flexible mindset for applying technology in the digital era. They inspire the team to become confident and full of energy, ready to embrace – and even lead – revolutionary change.",
        ],
        unit: "Individual",
        notes: [""],
      },
      "signature-2025-creator": {
        paragraphs: [
          "The Signature award honors the individual or team that embodies the distinctive spirit Sun* aims for in each era.",
          "In 2025, the Signature award honors the Creator – the individual/team with a proactive and sharp mindset, always seeing opportunity in challenges and pioneering in action. They are keenly attuned to problems, quickly identifying them and offering practical solutions that bring clear value to the project, client or organization. With the creative thinking and “Creator” spirit characteristic of Sun*, they not only respond positively to change but also proactively drive improvements, helping shape new standards for how Sunners create value.",
        ],
        unit: "Individual or team",
        notes: ["for the individual award", "for the team award"],
      },
      mvp: {
        paragraphs: [
          "The MVP award honors the most outstanding individual of the year – the representative face of the entire Sun* community. They are the one who has demonstrated exceptional ability, enduring dedication and far-reaching influence, leaving a strong mark on Sun*’s journey throughout the past year.",
          "Beyond standing out for performance and results, they are also a far-reaching source of inspiration – through their thinking, actions and positive influence on the team. The MVP embodies all the qualities of an elite Sunner while carrying a great responsibility: to become the role model representing Sun*’s people and spirit, helping lead the team to reach new heights.",
        ],
        unit: "Individual or team",
        notes: [""],
      },
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
    secretBox: {
      title: "DISCOVER YOUR SECRET BOX",
      hint: "Click on the box to open",
      unopenedLabel: "Unopened Secret Box",
    },
    recipientsTitle: "10 LATEST SUNNERS TO RECEIVE GIFTS",
    recipientGift: "Received 1 SAA team shirt",
    // "Viết Kudo" compose modal (Figma screenId ihQ26W78P2)
    writeKudos: {
      title: "Send thanks and recognition to teammates",
      recipientLabel: "Recipient",
      recipientPlaceholder: "Search",
      titleLabel: "Title",
      titlePlaceholder: "Gift a title to a teammate",
      titleHint:
        "Example: The person who motivates me.\nThe title will appear as your Kudos heading.",
      communityStandards: "Community Standards",
      bodyPlaceholder:
        "Please send your thanks and recognition to your teammates here!",
      mentionHint: "You can “@ + name” to mention another colleague",
      hashtagLabel: "Hashtag",
      maxFive: "Max 5",
      imageLabel: "Image",
      anonymous: "Send thanks and recognition anonymously",
      cancel: "Cancel",
      submit: "Send",
      anonymousName: "Anonymous",
      justNow: "Just now",
      recipientRequired: "Please select a recipient",
      noResults: "No results",
    },
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
    seconds: "Seconds",
  },
  widget: {
    writeKudos: "Write KUDOS",
    rules: "Rules",
  },
  rules: {
    title: "Rules",
    close: "Close",
    writeKudos: "Write KUDOS",
    receiverHeading: "KUDOS RECEIVER: HERO BADGES FOR POSITIVE INFLUENCE",
    receiverIntro:
      "Based on the number of Kudos sent by teammates, you will earn the corresponding Hero badge, displayed right next to your profile name.",
    tiers: [
      {
        count: "1-4 people send you Kudos",
        desc: "The journey of spreading goodness begins – the first words of thanks and recognition have reached you.",
      },
      {
        count: "5-9 people send you Kudos",
        desc: "Your image is growing in your teammates' hearts through your kindness and dedication.",
      },
      {
        count: "10–20 people send you Kudos",
        desc: "You have become a trusted and beloved icon, someone always ready to help and remembered by many teammates.",
      },
      {
        count: "More than 20 people send you Kudos",
        desc: "You have become a legend – leaving an unforgettable mark on the team through your heart and your actions.",
      },
    ],
    senderHeading:
      "KUDOS SENDER: COLLECT ALL 6 ICONS AND GET AN INSTANT MYSTERY GIFT",
    senderIntro:
      "Every Kudos you send is posted on the system and earns ❤️ from the Sunner community. For every 5 ❤️, you open 1 Secret Box, with a chance to receive one of SAA's 6 exclusive icons.",
    senderFootnote:
      "Sunners who collect all 6 icons will receive a mystery gift from SAA 2025.",
    nationalHeading: "NATIONAL KUDOS",
    nationalBody:
      "The 5 Kudos with the most ❤️ across all of Sun* will officially become National Kudos and receive a special gift from SAA 2025: Root Further.",
  },
  profile: {
    collectionTitle: "My icon collection",
    sent: "Sent",
    received: "Received",
    spam: "Spam",
  },
};

export type Dictionary = typeof vi;

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
