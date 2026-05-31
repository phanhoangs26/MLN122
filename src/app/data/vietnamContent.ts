/** Nội dung trang Vận dụng — tách khỏi /theory (Chương III, Giáo trình Mác–Lênin 2021) */

import { centralThesis, theorySource } from './theoryContent';

export { centralThesis, theorySource };

export const pageIntro = {
  title: 'Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam',
  subtitle: 'Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam',
  purpose:
    'Trên cơ sở lý luận Chương III (Giáo trình Triết học Mác – Lênin, 2021), trang này phân tích bản chất, nguyên tắc tổ chức và thực tiễn xây dựng Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.',
};

/** Cơ sở lý luận */
export const theoryBridge = {
  paragraphs: [
    'Theo Chương III – "Nhà nước và cách mạng xã hội" của Giáo trình Triết học Mác – Lênin (2021), nhà nước là một hiện tượng lịch sử, chỉ xuất hiện khi xã hội phân hóa thành các giai cấp đối kháng và những mâu thuẫn giai cấp trở nên không thể điều hòa được. V.I. Lênin khẳng định: "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được".',
    'Trên cơ sở đó, giáo trình làm rõ nguồn gốc, bản chất, đặc trưng, chức năng, các kiểu và hình thức nhà nước trong lịch sử. Đây là cơ sở lý luận quan trọng để nhận diện bản chất của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam hiện nay.',
    'Vận dụng sáng tạo chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh, Đảng Cộng sản Việt Nam chủ trương xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân và vì Nhân dân; đặt dưới sự lãnh đạo của Đảng, bảo đảm quyền lực nhà nước thuộc về Nhân dân, đồng thời phát huy dân chủ, tăng cường pháp chế và nâng cao hiệu lực, hiệu quả quản lý xã hội.',
  ],
  mappings: [
    {
      theory: 'Luận điểm của Lênin: Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.',
      apply: 'Giải thích nhà nước là hiện tượng lịch sử, xuất hiện khi xã hội phân hóa giai cấp; Nhà nước pháp quyền XHCN Việt Nam là hình thức nhà nước của ',
      applyLink: { text: 'thời kỳ quá độ', href: 'https://thuvienphapluat.vn/lao-dong-tien-luong/thoi-ky-qua-do-la-gi-4-dac-diem-cua-thoi-ky-qua-do-len-chu-nghia-xa-hoi-o-viet-nam-va-anh-huong-cua-32242.html' },
      applySuffix: ' lên chủ nghĩa xã hội dưới sự lãnh đạo của Đảng.',
    },
    {
      theory: 'Bản chất nhà nước: tính giai cấp và tính xã hội.',
      apply: 'Phân tích nguyên tắc "',
      applyLink: { text: 'Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ', href: 'https://www.qdnd.vn/chinh-tri/cac-van-de/the-che-hoa-moi-quan-he-dang-lanh-dao-nha-nuoc-quan-ly-nhan-dan-lam-chu-472393' },
      applySuffix: '"; đồng thời thể hiện vai trò bảo vệ lợi ích của Nhân dân lao động và lợi ích chung của xã hội.',
    },
    {
      theory: 'Chức năng nhà nước: thống trị chính trị và quản lý xã hội; đối nội và đối ngoại.',
      bullets: [
        {
          parts: [
            { text: 'Nhà nước XHCN ưu tiên ' },
            { text: 'chức năng xã hội', href: 'https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/chuc-nang-cua-nha-nuoc-xa-hoi-chu-nghia-la-gi-ban-chat-cua-nha-nuoc-xa-hoi-chu-nghia-nhu-the-nao-178536-128731.html' },
            { text: ' (tổ chức, xây dựng, quản lý kinh tế–xã hội) hơn chức năng trấn áp.' },
          ],
        },
        {
          parts: [
            { text: 'Đối nội: quản lý xã hội qua giáo dục, y tế, an sinh xã hội, chuyển đổi số, bảo vệ môi trường.' },
          ],
        },
        {
          parts: [
            { text: 'Đối ngoại: bảo đảm quốc phòng, an ninh, chủ quyền quốc gia và mở rộng hợp tác quốc tế.' },
          ],
        },
      ],
    },
    {
      theory: 'Đặc trưng nhà nước: quản lý lãnh thổ, quyền lực công cộng đặc biệt, hệ thống thuế khóa.',
      bullets: [
        {
          parts: [
            { text: 'Từ 1/7/2025, Việt Nam vận hành ' },
            { text: 'chính quyền địa phương hai cấp', href: 'https://en.nhandan.vn/infographic-viet-nam-to-implement-two-tier-local-government-model-from-july-1-2025-post149971.html' },
            { text: ' (tỉnh – xã), gồm 34 tỉnh, thành phố và 3.321 xã, phường, đặc khu — bảo đảm quản lý thống nhất trên toàn lãnh thổ, nâng cao hiệu lực quản trị quốc gia.' },
          ],
        },
        {
          parts: [
            { text: 'Nhà nước củng cố hệ thống cơ quan quyền lực công cộng đặc biệt (Quốc hội, Chính phủ, Tòa án, Viện Kiểm sát, Quân đội, Công an); năm 2025 ' },
            { text: 'lực lượng công an chuyển sang mô hình ba cấp', href: 'https://english.vov.vn/en/politics/domestic/district-level-police-no-longer-in-operation-in-vietnam-as-of-march-1-post1157929.vov' },
            { text: ' (Bộ – tỉnh – xã), chấm dứt công an cấp huyện, tăng tính trực tiếp và hiệu quả ở cơ sở.' },
          ],
        },
        {
          parts: [
            { text: 'Hệ thống thuế khóa là nguồn tài chính chủ yếu duy trì bộ máy nhà nước, đầu tư quốc phòng, an ninh, giáo dục, y tế, hạ tầng và an sinh xã hội; ' },
            { text: 'tinh giản đầu mối cơ quan', href: 'https://en.diendandoanhnghiep.vn/close-to-the-people-government-to-truly-serve-the-people-n44860.html' },
            { text: ' nhằm nâng cao hiệu quả sử dụng ngân sách và nguồn lực quốc gia.' },
          ],
        },
      ],
    },
    {
      theory: 'Nhà nước vô sản và quy luật tiêu vong của nhà nước.',
      apply: 'Làm rõ Nhà nước pháp quyền XHCN Việt Nam là nhà nước của Nhân dân, do Nhân dân, vì Nhân dân; tiếp tục hoàn thiện dân chủ XHCN, nâng cao quyền làm chủ của Nhân dân trong thời kỳ quá độ lên chủ nghĩa xã hội.',
    },
  ],
};

export const organizingPrinciples = [
  {
    title: 'Của Nhân dân, do Nhân dân, vì Nhân dân',
    text: 'Tất cả quyền lực nhà nước thuộc về Nhân dân; nền tảng là liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.',
  },
  {
    title: 'Đảng lãnh đạo — Nhà nước quản lý — Nhân dân làm chủ',
    text: 'Nguyên tắc tổ chức và vận hành Nhà nước pháp quyền XHCN Việt Nam.',
  },
];

export const history = [
  {
    year: 'Thế kỷ X – XIX',
    title: 'Nhà nước phong kiến Việt Nam',
    text: 'Tồn tại dưới hình thức phong kiến trung ương tập quyền và phong kiến phân quyền.',
  },
  {
    year: '1884 – 1945',
    title: 'Nhà nước thuộc địa nửa phong kiến',
    text: 'Khi thực dân Pháp đặt ách đô hộ, nước ta tồn tại dưới chế độ thuộc địa nửa phong kiến.',
  },
  {
    year: '1945',
    title: 'Việt Nam Dân chủ Cộng hòa',
    text: 'Cách mạng Tháng Tám thành công, chấm dứt nhà nước thuộc địa nửa phong kiến, mở ra trang sử mới — nhà nước kiểu vô sản.',
  },
  {
    year: 'Hiện nay',
    title: 'Cộng hòa XHCN Việt Nam',
    text: 'Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.',
  },
];

export const congressXIVStateFocus = [
  'Hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa; nền quản trị quốc gia hiện đại.',
  'Kiểm soát quyền lực; phòng, chống tham nhũng, lãng phí, quan liêu, tiêu cực.',
  'Phát huy dân chủ xã hội chủ nghĩa và quyền làm chủ của Nhân dân.',
  '“Nhân dân là chủ thể, trung tâm của công cuộc đổi mới”.',
  '“Lấy hạnh phúc và sự hài lòng của Nhân dân làm thước đo” hiệu quả hoạt động.',
];

export const kpiBrief =
  'Nghị quyết Đại hội XIV cũng đặt mục tiêu phát triển phục vụ Nhân dân (nâng cao đời sống, phấn đấu tăng trưởng bền vững). Đây là biểu hiện chức năng xã hội của Nhà nước, không phải trọng tâm phân tích lý luận nhà nước.';

export type PracticeExample = {
  title: string;
  text: string;
  tag: string;
  href: string;
};

export const practiceExamples: PracticeExample[] = [
  {
    title: 'Tinh gọn bộ máy hành chính',
    text: 'Cuộc cách mạng sắp xếp bộ máy "Tinh – Gọn – Mạnh – Hiệu năng – Hiệu lực – Hiệu quả" — nâng cao năng lực quản trị và kiểm soát quyền lực nhà nước.',
    tag: 'Đại hội XIV',
    href: 'https://baochinhphu.vn/xay-dung-bo-may-tinh-gon-manh-hieu-nang-hieu-luc-hieu-qua.htm',
  },
  {
    title: 'Sắp xếp đơn vị hành chính (2025)',
    text: 'Nghị quyết 202/2025/QH15: 63 → 34 đơn vị cấp tỉnh; chính quyền hai cấp (tỉnh – xã). Minh chứng tinh gọn bộ máy Nhà nước phục vụ Nhân dân.',
    tag: 'Chính quyền địa phương',
    href: 'https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm',
  },
  {
    title: 'Chính phủ số, chuyển đổi số',
    text: 'Đề án 06, Cổng Dịch vụ công quốc gia — minh bạch hóa thủ tục, thể hiện chức năng xã hội và quản trị hiện đại.',
    tag: 'Chuyển đổi số',
    href: 'https://vpcp.chinhphu.vn/hoan-thanh-25-25-dich-vu-cong-truc-tuyen-thiet-yeu-cua-de-an-06-115221225123659938.htm',
  },
  {
    title: 'Kiểm soát quyền lực, chống tham nhũng',
    text: 'Đại hội XIV coi xây dựng, chỉnh đốn Đảng và hệ thống chính trị là then chốt gắn với Nhà nước pháp quyền.',
    tag: 'Pháp quyền',
    href: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-dai-hoi-dai-bieu-toan-quoc-lan-thu-xiv-cua-dang-119260206221643667.htm',
  },
];

export const adminReformMeta = {
  resolution: 'Nghị quyết số 202/2025/QH15',
  effectiveDate: '12/6/2025',
};

export const academicCommentary =
  'Qua thực tiễn Việt Nam hiện nay có thể thấy Nhà nước pháp quyền xã hội chủ nghĩa vừa thực hiện chức năng quản lý xã hội, vừa bảo đảm ổn định chính trị, phát triển kinh tế và nâng cao đời sống nhân dân. Các hoạt động như cải cách hành chính, tinh gọn bộ máy, chuyển đổi số quốc gia và mở rộng dịch vụ công trực tuyến cho thấy vai trò ngày càng rõ nét của tính xã hội của nhà nước trong điều kiện phát triển mới.';

export const academicConclusion =
  'Từ nhận định của Lênin, có thể thấy nhà nước là một hiện tượng lịch sử gắn với sự xuất hiện của giai cấp và những mâu thuẫn xã hội không thể điều hòa được. Vận dụng sáng tạo học thuyết Mác – Lênin, Việt Nam đang xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân và vì Nhân dân. Nghị quyết Đại hội XIV (2026) tiếp tục khẳng định yêu cầu hoàn thiện thể chế, kiểm soát quyền lực, phát triển quản trị quốc gia hiện đại và lấy hạnh phúc, sự hài lòng của Nhân dân làm thước đo hiệu quả hoạt động của Nhà nước. Điều đó cho thấy lý luận về nhà nước của chủ nghĩa Mác – Lênin không chỉ mang giá trị lịch sử mà vẫn được vận dụng và phát triển trong thực tiễn xây dựng và bảo vệ Tổ quốc Việt Nam hiện nay.';

export type SourceRef = { label: string; href: string };

export const references = {
  theory: [
    { label: 'Lý luận nhà nước — Chương III (trang nội bộ)', href: '/theory' },
    { label: 'Giáo trình Triết học Mác – Lênin 2021 (PDF)', href: 'https://www.thuviendientutriethocc500.edu.vn/wp-content/uploads/2025/09/1.Gtrinh-Triet-hoc-Mac-Lenin-ko-chuyen-2021.pdf' },
    { label: 'Chức năng của nhà nước xã hội chủ nghĩa là gì? Bản chất của nhà nước xã hội chủ nghĩa — Thư viện Pháp luật', href: 'https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/chuc-nang-cua-nha-nuoc-xa-hoi-chu-nghia-la-gi-ban-chat-cua-nha-nuoc-xa-hoi-chu-nghia-nhu-the-nao-178536-128731.html' },
    { label: 'Hiến pháp nước CHXHCN Việt Nam năm 2013', href: 'https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Hien-phap-nam-2013-215627.aspx' },
    { label: 'Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII của Đảng', href: 'https://baochinhphu.vn/toan-van-nghi-quyet-dai-hoi-dai-bieu-toan-quoc-lan-thu-xiii-cua-dang-102288263.htm' },
  ] as SourceRef[],
  congress: [
    { label: 'Toàn văn Nghị quyết Đại hội XIV của Đảng — Chính phủ', href: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-dai-hoi-dai-bieu-toan-quoc-lan-thu-xiv-cua-dang-119260206221643667.htm' },
  ] as SourceRef[],
  admin: [
    { label: 'Chi tiết 34 đơn vị hành chính cấp tỉnh từ 12/6/2025 — Chính phủ', href: 'https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm' },
    { label: 'Xây dựng bộ máy tinh, gọn, mạnh, hiệu năng, hiệu lực, hiệu quả — Báo Điện tử Chính phủ', href: 'https://baochinhphu.vn/xay-dung-bo-may-tinh-gon-manh-hieu-nang-hieu-luc-hieu-qua.htm' },
    { label: 'Vietnam to implement two-tier local government model from July 1, 2025 — Nhân Dân', href: 'https://en.nhandan.vn/infographic-viet-nam-to-implement-two-tier-local-government-model-from-july-1-2025-post149971.html' },
    { label: 'District-level police no longer in operation in Vietnam as of March 1 — VOV', href: 'https://english.vov.vn/en/politics/domestic/district-level-police-no-longer-in-operation-in-vietnam-as-of-march-1-post1157929.vov' },
    { label: 'Close to the people: government to truly serve the people — Diễn đàn Doanh nghiệp', href: 'https://en.diendandoanhnghiep.vn/close-to-the-people-government-to-truly-serve-the-people-n44860.html' },
  ] as SourceRef[],
  digital: [
    { label: 'Cơ bản hoàn thành 25/25 dịch vụ công trực tuyến thiết yếu của Đề án 06 — Văn phòng Chính phủ', href: 'https://vpcp.chinhphu.vn/hoan-thanh-25-25-dich-vu-cong-truc-tuyen-thiet-yeu-cua-de-an-06-115221225123659938.htm' },
    { label: 'Cổng Dịch vụ công Quốc gia', href: 'https://dichvucong.gov.vn' },
  ] as SourceRef[],
};
