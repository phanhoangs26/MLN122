import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Bot, BookOpen, Star, Landmark, Gamepad2 } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { centralThesis } from '../data/theoryContent';

const sections = [
  {
    to: '/theory',
    no: '01',
    icon: BookOpen,
    title: 'Nhà nước',
    desc: 'Nguồn gốc, bản chất, ba đặc trưng, chức năng, các kiểu và hình thức nhà nước — kèm trích dẫn Ăngghen, Lênin.',
    featured: true,
  },
  {
    to: '/vietnam',
    no: '02',
    icon: Star,
    title: 'Việt Nam',
    desc: 'Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân — kèm liên hệ thực tiễn 2025–2026.',
  },
  {
    to: '/tu-ban',
    no: '03',
    icon: Landmark,
    title: 'Nhà nước tư sản',
    desc: 'Các hình thức nhà nước tư sản, bản chất chuyên chính tư sản và so sánh với nhà nước vô sản.',
  },
  {
    to: '/game',
    no: '04',
    icon: Gamepad2,
    title: 'Ôn tập',
    desc: 'Hai trò chơi: sắp xếp Dòng thời gian và Nối khái niệm, kèm câu hỏi ôn tập theo từng vòng.',
  },
  {
    to: '/chat',
    no: '05',
    icon: Bot,
    title: 'Hỏi đáp',
    desc: 'Trợ lý trả lời các câu hỏi quanh chủ đề nhà nước — chạy offline, có thể bật chế độ AI.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      {/* Lead / trang nhất */}
      <section className="border-b-4 border-red-600">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.6fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-3 text-sm font-black uppercase tracking-widest text-red-600">
              Chuyên đề · Triết học Mác – Lênin
            </div>
            <h1 className="font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Nhà nước và sự không thể điều hòa của mâu thuẫn giai cấp
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              Hệ thống kiến thức về lý thuyết nhà nước theo triết học Mác – Lênin: từ nguồn gốc, bản chất đến vận dụng
              thực tiễn xây dựng Nhà nước pháp quyền XHCN Việt Nam.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/theory')}
                className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-black text-white transition-colors hover:bg-red-700"
              >
                Bắt đầu học
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="inline-flex items-center gap-2 rounded border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-700 transition-colors hover:bg-red-100"
              >
                <Bot className="h-4 w-4" />
                Hỏi trợ lý
              </button>
            </div>
          </motion.div>

          {/* Lead quote */}
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center border-l-4 border-red-600 bg-slate-50 px-6 py-6"
          >
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Luận điểm trung tâm</div>
            <blockquote className="mt-3 font-serif text-2xl font-black leading-9 text-red-700 md:text-3xl">
              “{centralThesis.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm font-bold text-slate-600">— {centralThesis.source}</figcaption>
          </motion.figure>
        </div>
      </section>

      {/* Mục lục chuyên đề */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-3">
          <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Nội dung chuyên đề</h2>
          <span className="text-sm font-bold text-slate-400">05 mục</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.to}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(s.to)}
                className={`group relative flex flex-col items-start gap-3 rounded border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 ${
                  s.featured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="text-5xl font-black text-slate-200 group-hover:text-red-200">{s.no}</div>
                  <Icon className="h-7 w-7 text-red-600" strokeWidth={2.2} />
                </div>
                <div className="relative flex-1">
                  <div className="flex items-center gap-2 font-serif text-2xl font-black text-slate-950">
                    {s.title}
                    <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 text-base leading-7 text-slate-600">{s.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Lộ trình gợi ý */}
        <div className="mt-10 border-t-4 border-red-600 pt-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Gợi ý lộ trình</h2>
          <div className="mt-4 grid gap-3 text-base leading-7 text-slate-700 sm:grid-cols-3">
            <div className="border border-slate-200 bg-slate-50 p-4">
              <span className="font-black text-red-600">1.</span> Học lý thuyết ở mục <span className="font-bold text-slate-950">Nhà nước</span> để nắm nguồn gốc, bản chất.
            </div>
            <div className="border border-slate-200 bg-slate-50 p-4">
              <span className="font-black text-red-600">2.</span> Đối chiếu <span className="font-bold text-slate-950">Nhà nước tư sản</span> và liên hệ <span className="font-bold text-slate-950">Việt Nam</span>.
            </div>
            <div className="border border-slate-200 bg-slate-50 p-4">
              <span className="font-black text-red-600">3.</span> Củng cố bằng <span className="font-bold text-slate-950">Ôn tập</span> và đặt câu hỏi ở <span className="font-bold text-slate-950">Hỏi đáp</span>.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
