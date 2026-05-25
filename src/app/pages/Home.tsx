import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, MapPinned, Sparkles } from 'lucide-react';
import { TopBar } from '../components/TopBar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <TopBar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/20 backdrop-blur lg:p-10"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">
                <Sparkles className="h-4 w-4" />
                Hệ thống học tập
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                Nền tảng ôn luyện cho hành trình học triết học
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Đọc lý thuyết trước, đi qua 5 mê cung, rồi vào boss cuối. Tất cả được trình bày trong cùng một giao diện tối, gọn và dễ đọc.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/map')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition-transform hover:scale-[1.02]"
                >
                  Vào bản đồ
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/theory')}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  Mở lý thuyết
                </button>
              </div>
            </div>
          </motion.section>

          <aside className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Trạng thái học tập</div>
              <div className="mt-2 text-2xl font-black text-white">Sẵn sàng cho hành trình</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Mở bản đồ để bắt đầu, hoặc vào lý thuyết để ôn nhanh trước khi chơi.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <MapPinned className="h-5 w-5 text-slate-300" />
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Bản đồ</div>
                  <div className="mt-1 text-lg font-black text-white">5 mê cung + boss</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">
                    Đi qua 5 chặng mê cung để sưu tầm nội dung, sau đó mở cửa vào boss cuối.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <BookOpen className="h-5 w-5 text-slate-300" />
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Lý thuyết</div>
                  <div className="mt-1 text-lg font-black text-white">Ôn nhanh trước trận</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">
                    Tóm tắt các khái niệm chính để đọc nhanh, nhớ nhanh và vào game chắc hơn.
                  </div>
                </div>
              </div>
            </motion.div>

          </aside>
        </div>
      </div>
    </div>
  );
}
