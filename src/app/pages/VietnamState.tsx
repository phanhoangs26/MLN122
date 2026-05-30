import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TopBar } from '../components/TopBar';

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

      <main className="mx-auto max-w-6xl gap-7 px-4 py-7">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Bản chất & nguyên tắc</h2>
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Định hướng xây dựng & hoàn thiện (Đại hội XIII)</h2>
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

          {/* Mục tiêu */}
          <motion.section
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
      </main>
    </div>
  );
}
