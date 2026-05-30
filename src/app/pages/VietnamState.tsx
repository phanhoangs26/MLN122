import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Star, ArrowRight, Users, Scale, Landmark, Flag, Target, ShieldCheck } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { StateBackground } from '../components/StateBackground';

const history = [
  { year: 'Thế kỷ X – XIX', title: 'Nhà nước phong kiến Việt Nam', text: 'Tồn tại dưới hình thức phong kiến trung ương tập quyền và phong kiến phân quyền.' },
  { year: '1884 – 1945', title: 'Nhà nước thuộc địa nửa phong kiến', text: 'Khi thực dân Pháp đặt ách đô hộ, nước ta tồn tại dưới chế độ thuộc địa nửa phong kiến.' },
  { year: '1945', title: 'Việt Nam Dân chủ Cộng hòa', text: 'Cách mạng Tháng Tám thành công, chấm dứt nhà nước thuộc địa nửa phong kiến, mở ra trang sử mới — nhà nước kiểu vô sản.' },
  { year: 'Hiện nay', title: 'Cộng hòa XHCN Việt Nam', text: 'Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.' },
];

const nature = [
  {
    icon: Users,
    title: 'Của Nhân dân, do Nhân dân, vì Nhân dân',
    text: '“Tất cả quyền lực nhà nước thuộc về Nhân dân, mà nền tảng là liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.”',
  },
  {
    icon: Flag,
    title: 'Mang bản chất giai cấp công nhân',
    text: 'Là kiểu nhà nước vô sản — nhà nước của số đông thống trị số ít, đặt dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.',
  },
  {
    icon: Scale,
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950/60 to-slate-900 text-white">
      <StateBackground />
      <TopBar />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-red-700/30 via-slate-950/70 to-slate-950/70 p-8 shadow-2xl shadow-red-900/20 backdrop-blur md:p-10"
        >
          <motion.div
            className="absolute -right-6 -top-6 text-amber-300/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="h-48 w-48" fill="currentColor" strokeWidth={0.5} />
          </motion.div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-100">
              <Star className="h-4 w-4" fill="currentColor" />
              Vận dụng thực tiễn
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
              Nhà nước pháp quyền XHCN Việt Nam
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              Từ luận điểm của Lênin về nguồn gốc và bản chất của nhà nước, Đảng và Nhân dân ta vận dụng sáng tạo để xây dựng một kiểu nhà nước mới — nhà nước của số đông nhân dân lao động.
            </p>
          </div>
        </motion.div>

        {/* Lịch sử */}
        <section className="mt-8">
          <h2 className="text-sm font-black uppercase tracking-[0.35em] text-amber-200">Dòng lịch sử nhà nước Việt Nam</h2>
          <div className="mt-4 space-y-3">
            {history.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-400/10 text-amber-200">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-200/80">{h.year}</div>
                  <div className="mt-1 text-lg font-black text-white">{h.title}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bản chất */}
        <section className="mt-10">
          <h2 className="text-sm font-black uppercase tracking-[0.35em] text-amber-200">Bản chất & nguyên tắc</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {nature.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-6 shadow-xl backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-amber-400 text-slate-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-white">{n.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{n.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Định hướng */}
        <section className="mt-10">
          <h2 className="text-sm font-black uppercase tracking-[0.35em] text-amber-200">Định hướng xây dựng & hoàn thiện (Đại hội XIII)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {directions.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <span className="text-sm leading-6 text-slate-200">{d}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mục tiêu */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-amber-300/20 bg-gradient-to-r from-red-600/20 via-amber-500/10 to-red-600/20 p-8 text-center shadow-xl"
        >
          <Target className="mx-auto h-8 w-8 text-amber-200" />
          <div className="mt-3 text-xs font-black uppercase tracking-[0.35em] text-amber-200">Mục tiêu</div>
          <div className="mt-2 text-2xl font-black text-white md:text-3xl">
            Dân giàu · Nước mạnh · Dân chủ · Công bằng · Văn minh
          </div>
          <button
            onClick={() => navigate('/game')}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-950 transition-transform hover:scale-[1.02]"
          >
            Ôn tập qua trò chơi
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
