import React from 'react';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { OutlineLayout } from '../components/PageOutline';

const outline = [
  { id: 'lich-su', label: 'Dòng lịch sử' },
  { id: 'ban-chat', label: 'Bản chất & nguyên tắc' },
  { id: 'dinh-huong', label: 'Định hướng (ĐH XIII)' },
  { id: 'thuc-tien', label: 'Liên hệ thực tiễn' },
  { id: 'muc-tieu', label: 'Mục tiêu' },
];

const history = [
  { year: 'Thế kỷ X – XIX', title: 'Nhà nước phong kiến Việt Nam', text: 'Tồn tại dưới hình thức phong kiến trung ương tập quyền và phong kiến phân quyền.' },
  { year: '1884 – 1945', title: 'Nhà nước thuộc địa nửa phong kiến', text: 'Khi thực dân Pháp đặt ách đô hộ, nước ta tồn tại dưới chế độ thuộc địa nửa phong kiến.' },
  { year: '1945', title: 'Việt Nam Dân chủ Cộng hòa', text: 'Cách mạng Tháng Tám thành công, chấm dứt nhà nước thuộc địa nửa phong kiến, mở ra trang sử mới — nhà nước kiểu vô sản.' },
  { year: 'Hiện nay', title: 'Cộng hòa XHCN Việt Nam', text: 'Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.' },
];

const nature = [
  {
    icon: 'people' as const,
    title: 'Của Nhân dân, do Nhân dân, vì Nhân dân',
    text: '“Tất cả quyền lực nhà nước thuộc về Nhân dân, mà nền tảng là liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.”',
  },
  {
    icon: 'vietnam' as const,
    title: 'Mang bản chất giai cấp công nhân',
    text: 'Là kiểu nhà nước vô sản — nhà nước của số đông thống trị số ít, đặt dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.',
  },
  {
    icon: 'law' as const,
    title: '“Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ”',
    text: 'Nguyên tắc tổ chức và vận hành của Nhà nước pháp quyền XHCN Việt Nam.',
  },
];

const directions = [
  'Hoàn thiện thể chế, phát huy dân chủ, bảo đảm quyền làm chủ của Nhân dân.',
  'Phân công, phối hợp và kiểm soát giữa các quyền lập pháp, hành pháp, tư pháp.',
  'Đẩy mạnh cải cách hành chính, tinh gọn bộ máy, nâng cao hiệu lực, hiệu quả.',
  'Xây dựng nhà nước kiến tạo, chính phủ liêm chính, hành động, phục vụ; nền hành chính hiện đại, công khai, minh bạch.',
];

const practiceIntro =
  'Theo quan điểm Mác – Lênin, nhà nước không chỉ là công cụ duy trì trật tự xã hội mà còn là thiết chế quản lý xã hội nhằm bảo đảm lợi ích của giai cấp cầm quyền và sự ổn định của cộng đồng. Trong điều kiện Việt Nam hiện nay, Nhà nước pháp quyền XHCN được xây dựng trên nền tảng quyền làm chủ của Nhân dân, dưới sự lãnh đạo của Đảng Cộng sản Việt Nam — minh chứng lý luận về nhà nước không nằm trong sách vở mà đang được vận dụng trong quá trình đổi mới bộ máy nhà nước.';

const practice = [
  {
    title: 'Bước vào "Kỷ nguyên mới": Tinh gọn bộ máy, chống lãng phí',
    text: 'Từ cuối 2024 và trong năm 2025, dưới sự chỉ đạo quyết liệt của Tổng Bí thư Tô Lâm, Đảng và Nhà nước tiến hành "cuộc cách mạng" tinh gọn bộ máy hệ thống chính trị với phương châm "Tinh - Gọn - Mạnh - Hiệu năng - Hiệu lực - Hiệu quả". Việc tổng kết Nghị quyết 18-NQ/TW được đẩy mạnh nhằm xóa bỏ bộ máy cồng kềnh, tiết kiệm ngân sách để chuẩn bị cho "Kỷ nguyên vươn mình của dân tộc".',
    tag: 'Kỷ nguyên mới · Tinh gọn bộ máy',
    tie: 'Khẳng định nỗ lực không ngừng thanh lọc bộ máy để phục vụ Nhân dân tốt hơn. Việc tinh gọn bộ máy chứng minh Nhà nước ta luôn bám sát bản chất của dân, do dân, vì dân, kiên quyết chống lãng phí nguồn lực để tập trung phát triển đất nước.',
  },
  {
    title: 'Hoàn thiện Nhà nước pháp quyền trong kỷ nguyên vươn mình',
    text: 'Đẩy mạnh cải cách thể chế, phân công, phối hợp và kiểm soát chặt chẽ quyền lực giữa lập pháp, hành pháp và tư pháp. Vừa phân cấp, phân quyền mạnh mẽ cho địa phương, vừa giám sát chặt chẽ, lấy mục tiêu phục vụ người dân, doanh nghiệp làm trọng tâm.',
    tag: 'Kiểm soát quyền lực · Kiến tạo phát triển',
    tie: 'Bảo đảm quyền lực thuộc về Nhân dân. Khác biệt cốt lõi với "dân chủ tư sản": quyền lực không nằm trong tay thiểu số tư bản tài chính, mà nằm dưới sự kiểm soát của pháp luật XHCN vì lợi ích chung.',
  },
  {
    title: 'Phát huy dân chủ trực tiếp ở cơ sở',
    text: 'Luật Thực hiện dân chủ ở cơ sở được triển khai mạnh mẽ, thể chế hóa phương châm "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng". Cử tri có quyền tham gia trực tiếp vào việc giám sát và đánh giá chính quyền địa phương.',
    tag: 'Dân chủ XHCN',
    tie: 'Khắc phục triệt để tình trạng "dân chủ hình thức" của các nước TBCN, biến nền dân chủ thành thực chất, đưa người dân làm chủ ngay tại nơi mình sinh sống.',
  },
  {
    title: 'Chính phủ số và Cách mạng công nghệ',
    text: 'Thúc đẩy Đề án 06 về dữ liệu dân cư, đẩy mạnh chính phủ điện tử. Ứng dụng công nghệ số làm minh bạch hóa các thủ tục hành chính, cắt giảm chi phí, thời gian của nhân dân, chống sách nhiễu.',
    tag: 'Quản trị quốc gia hiện đại',
    tie: 'Sự hiện thực hóa chức năng xã hội của nhà nước: dùng khoa học công nghệ để nâng cao chất lượng sống, không để ai bị bỏ lại phía sau.',
  },
];

const practiceConclusion =
  'Từ nhận định của Lênin: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được”, Việt Nam đã vận dụng sáng tạo học thuyết Mác – Lênin để xây dựng Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân. So với nhà nước tư sản hiện đại đang gặp nhiều khủng hoảng do sự thao túng của tư bản tài chính, những cải cách quyết liệt hiện nay của Việt Nam về tổ chức bộ máy, phòng chống tham nhũng, và phát huy dân chủ cho thấy sự ưu việt của một nhà nước kiểu mới, hướng tới kỷ nguyên vươn mình của dân tộc.';

export default function VietnamState() {

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white px-4 py-3 text-lg font-serif text-slate-700">
            <span className="font-sans text-xl text-red-600">•</span>
            <span>Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam</span>
          </div>
          <div className="flex items-center gap-6 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            <span className="text-red-600">•</span>
            <span>Vận dụng từ triết học Mác - Lênin</span>
          </div>
        </div>
      </div>

      <OutlineLayout items={outline}>
        <article>
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b-4 border-red-600 bg-white pb-7"
          >
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Vận dụng thực tiễn</div>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Nhà nước pháp quyền XHCN Việt Nam
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Từ luận điểm của Lênin về nguồn gốc và bản chất của nhà nước, Đảng và Nhân dân ta vận dụng sáng tạo để xây dựng một kiểu nhà nước mới — nhà nước của số đông nhân dân lao động.
            </p>
          </motion.section>

          {/* Dòng lịch sử */}
          <motion.section
            id="lich-su"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Dòng lịch sử nhà nước Việt Nam</h2>
            <div className="grid gap-4">
              {history.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="border-l-4 border-red-600 pl-6 py-3"
                >
                  <div className="text-sm font-bold text-red-600 uppercase tracking-wide">{h.year}</div>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">{h.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-700">{h.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Bản chất & nguyên tắc */}
          <motion.section
            id="ban-chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Bản chất và nguyên tắc</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {nature.map((n, i) => (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="border border-slate-200 p-6 bg-slate-50"
                >
                  <h3 className="text-lg font-black text-slate-950">{n.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{n.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Định hướng */}
          <motion.section
            id="dinh-huong"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Định hướng xây dựng và hoàn thiện (Đại hội XIII)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {directions.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex gap-3 rounded border border-slate-200 bg-white p-4"
                >
                  <span className="text-base leading-7 text-slate-700">{d}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Liên hệ thực tiễn 2025–2026 */}
          <motion.section
            id="thuc-tien"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4">Liên hệ thực tiễn nổi bật (2025 – 2026)</h2>
            <p className="mb-6 max-w-3xl text-base leading-7 text-slate-700">{practiceIntro}</p>

            <div className="grid gap-4 md:grid-cols-2">
              {practice.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex flex-col border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-black text-red-600">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-black leading-tight text-slate-950">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-slate-700">{p.text}</p>
                  <div className="mt-3 inline-flex w-fit rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                    {p.tag}
                  </div>
                  <p className="mt-4 border-l-4 border-red-600 pl-4 text-sm italic leading-6 text-slate-700">{p.tie}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-l-4 border-red-600 bg-slate-50 p-6">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Kết luận thực tiễn</div>
              <p className="mt-3 text-base leading-7 text-slate-700">{practiceConclusion}</p>
              <p className="mt-3 text-xs text-slate-500">
                Nguồn lý luận: Chương III “Nhà nước và cách mạng xã hội” (Giáo trình Triết học Mác – Lênin) · Dẫn chứng thời sự cập nhật liên tục.
              </p>
            </div>
          </motion.section>

          {/* Mục tiêu */}
          <motion.section
            id="muc-tieu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-b-4 border-red-600 py-7"
          >
            <div className="text-center">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Mục tiêu</div>
              <div className="mt-4 text-3xl font-black text-slate-950 md:text-4xl">
                Dân giàu · Nước mạnh · Dân chủ · Công bằng · Văn minh
              </div>
            </div>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
