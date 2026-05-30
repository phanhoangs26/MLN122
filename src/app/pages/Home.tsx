import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Star, Gamepad2, Bot, Quote } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { StateBackground } from '../components/StateBackground';
import { LENIN_QUOTE, LENIN_SOURCE } from '../data/stateContent';

const sections = [
  {
    to: '/theory',
    icon: BookOpen,
    no: '01',
    title: 'Lý thuyết',
    desc: 'Nguồn gốc, bản chất, đặc trưng, chức năng và các kiểu nhà nước — kèm trích dẫn Ăngghen, Lênin.',
    accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-400/20',
  },
  {
    to: '/vietnam',
    icon: Star,
    no: '02',
    title: 'Nhà nước Việt Nam',
    desc: 'Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân — vận dụng thực tiễn luận điểm của Lênin.',
    accent: 'from-red-500/25 to-amber-500/10 border-amber-400/25',
  },
  {
    to: '/game',
    icon: Gamepad2,
    no: '03',
    title: 'Trò chơi ôn tập',
    desc: 'Hai trò chơi kết hợp: sắp xếp Dòng thời gian và Nối khái niệm để khắc sâu kiến thức.',
    accent: 'from-fuchsia-500/20 to-purple-500/10 border-fuchsia-400/20',
  },
  {
    to: '/chat',
    icon: Bot,
    no: '04',
    title: 'Chatbox hỏi đáp',
    desc: 'Trợ lý trả lời câu hỏi quanh chủ đề nhà nước — chạy offline, có thể bật chế độ AI.',
    accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-400/20',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950/50 to-slate-900 text-white">
      <StateBackground />
      <TopBar />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-amber-300/20 bg-slate-950/70 p-8 shadow-2xl shadow-red-900/20 backdrop-blur lg:p-10"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-red-600/15 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-100">
              <Star className="h-4 w-4" fill="currentColor" />
              Triết học Mác – Lênin · Lý thuyết về nhà nước
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              Nhà nước & sự không thể điều hòa của mâu thuẫn giai cấp
            </h1>

            <figure className="mt-5 max-w-2xl rounded-2xl border border-amber-300/20 bg-gradient-to-br from-red-500/10 to-amber-400/5 p-5">
              <Quote className="h-6 w-6 text-amber-200" />
              <blockquote className="mt-2 text-base font-bold italic leading-7 text-amber-50 md:text-lg">
                “{LENIN_QUOTE}”
              </blockquote>
              <figcaption className="mt-2 text-sm font-semibold not-italic text-slate-400">— {LENIN_SOURCE}</figcaption>
            </figure>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/theory')}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 px-5 py-3 font-black text-slate-950 transition-transform hover:scale-[1.02]"
              >
                Bắt đầu với lý thuyết
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Bot className="h-4 w-4" />
                Hỏi trợ lý
              </button>
            </div>
          </div>
        </motion.section>

        {/* 4 sections */}
        <div className="mt-8">
          <h2 className="text-sm font-black uppercase tracking-[0.35em] text-slate-400">Bốn mục chính</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  onClick={() => navigate(s.to)}
                  className={`group relative flex items-start gap-4 overflow-hidden rounded-[1.5rem] border bg-gradient-to-br ${s.accent} p-6 text-left shadow-xl shadow-black/10 backdrop-blur`}
                >
                  <div className="absolute right-4 top-3 text-5xl font-black text-white/5">{s.no}</div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="relative flex-1">
                    <div className="flex items-center gap-2 text-xl font-black text-white">
                      {s.title}
                      <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-200/90">{s.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
