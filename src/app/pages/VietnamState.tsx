import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
    title: 'Tinh gọn bộ máy nhà nước, nâng cao hiệu lực quản lý',
    text: 'Chính phủ ban hành Nghị quyết 105/NQ-CP triển khai Kết luận 210-KL/TW về tiếp tục hoàn thiện tổ chức bộ máy của hệ thống chính trị. Quốc hội thông qua nghị quyết sắp xếp đơn vị hành chính năm 2025: sau điều chỉnh, cả nước còn 34 đơn vị hành chính cấp tỉnh và 3.321 đơn vị hành chính cấp xã.',
    tag: 'Nghị quyết 105/NQ-CP · Kết luận 210-KL/TW',
    tie: 'Bộ máy được tổ chức lại theo hướng “tinh, gọn, mạnh, hiệu năng, hiệu lực, hiệu quả” — đúng luận điểm của Lênin: nhà nước là công cụ duy trì trật tự và quản lý xã hội trong những điều kiện lịch sử cụ thể.',
  },
  {
    title: 'Kiểm soát quyền lực, hoàn thiện Nhà nước pháp quyền',
    text: 'Đại hội XIII nhấn mạnh phân công, phối hợp và kiểm soát quyền lực giữa lập pháp, hành pháp và tư pháp. Việt Nam đẩy mạnh cải cách thể chế, tăng cường minh bạch hóa hoạt động công quyền và kiểm soát quyền lực nhà nước.',
    tag: 'Văn kiện Đại hội XIII',
    tie: 'Là minh chứng cho nguyên tắc “Đảng lãnh đạo – Nhà nước quản lý – Nhân dân làm chủ”.',
  },
  {
    title: 'Xây dựng nền hành chính phục vụ Nhân dân',
    text: 'Chương trình cải cách hành chính giai đoạn 2021–2030 tiếp tục được triển khai nhằm đơn giản hóa thủ tục, nâng cao chất lượng phục vụ người dân và doanh nghiệp; nhiều bộ, ngành đạt chỉ số cải cách hành chính cao trong năm 2025–2026.',
    tag: 'Cải cách hành chính 2021–2030',
    tie: 'Phản ánh rõ tính xã hội của nhà nước: không chỉ quản lý, cưỡng chế mà còn giải quyết các vấn đề dân sinh — giáo dục, y tế, hạ tầng, phúc lợi xã hội.',
  },
  {
    title: 'Chuyển đổi số, xây dựng chính phủ số',
    text: 'Việt Nam thúc đẩy nền hành chính số, chính phủ số và quản trị quốc gia hiện đại; ứng dụng công nghệ vào quản lý nhà nước để tăng công khai, minh bạch và nâng cao khả năng phục vụ người dân.',
    tag: 'Cách mạng công nghiệp 4.0',
    tie: 'Bước phát triển mới của Nhà nước pháp quyền XHCN trong bối cảnh chuyển đổi số.',
  },
];

const practiceConclusion =
  'Từ nhận định của Lênin: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được”, Việt Nam đã vận dụng sáng tạo học thuyết Mác – Lênin để xây dựng Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân. Những cải cách về tổ chức bộ máy, kiểm soát quyền lực, chuyển đổi số và nâng cao chất lượng phục vụ cho thấy nhà nước không ngừng hoàn thiện để đáp ứng yêu cầu phát triển đất nước.';

export default function VietnamState() {
  const navigate = useNavigate();

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
                Nguồn lý luận: Chương III “Nhà nước và cách mạng xã hội” (Giáo trình Triết học Mác – Lênin) · dẫn chứng thời sự 2025–2026.
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
              <button
                onClick={() => navigate('/game')}
                className="mt-6 inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-black text-white transition-colors hover:bg-red-700"
              >
                Ôn tập qua trò chơi
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
