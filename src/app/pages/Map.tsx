import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Sword, Castle, ArrowRight, BookOpen, Trophy, Mountain } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { useGameStore } from '../store';
import clsx from 'clsx';

const stages = [
  { id: 1, name: "Rừng Tri Thức", icon: "🌲", color: "bg-emerald-500", shadow: "shadow-emerald-600" },
  { id: 2, name: "Núi Khôn Ngoan", icon: "⛰️", color: "bg-blue-500", shadow: "shadow-blue-600" },
  { id: 3, name: "Thung Lũng Biện Chứng", icon: "🏞️", color: "bg-purple-500", shadow: "shadow-purple-600" },
  { id: 4, name: "Pháo Đài Cổ Xưa", icon: "🏛️", color: "bg-amber-500", shadow: "shadow-amber-600" },
  { id: 5, name: "Nhà Ngựa Hoàng Gia", icon: "🐎", color: "bg-orange-500", shadow: "shadow-orange-600" },
  { id: 6, name: "Lâu Đài Rồng", icon: "🐉", color: "bg-rose-500", shadow: "shadow-rose-600" },
];

export default function Map() {
  const navigate = useNavigate();
  const { currentStage, inventory } = useGameStore();

  const handleStageClick = (stageId: number) => {
    if (stageId <= currentStage) {
      navigate(stageId === 6 ? `/quiz/${stageId}` : `/maze/${stageId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white pb-20 relative">
      <TopBar />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pt-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur lg:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Bản đồ học tập</div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Lộ trình các chặng</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Chặng 1 đến 5 là mê cung sưu tầm vật phẩm. Chặng 6 là boss cuối như cũ.</p>
            </div>
            <button onClick={() => navigate('/theory')} className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 lg:inline-flex">
              <BookOpen className="h-4 w-4" />
              Xem lý thuyết
            </button>
          </div>

          <div className="space-y-3">
            {stages.map((stage) => {
              const isLocked = stage.id > currentStage;
              const isCurrent = stage.id === currentStage;
              const isCompleted = stage.id < currentStage;

              return (
                <motion.button
                  key={stage.id}
                  whileHover={!isLocked ? { y: -2 } : {}}
                  whileTap={!isLocked ? { scale: 0.99 } : {}}
                  onClick={() => handleStageClick(stage.id)}
                  disabled={isLocked}
                  className={clsx(
                    'flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-colors',
                    isLocked ? 'border-white/10 bg-white/5 opacity-60' : 'border-white/10 bg-slate-900/70 hover:bg-slate-900',
                    isCurrent && 'ring-1 ring-white/20'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx('flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-black', isLocked ? 'border-white/10 bg-white/5 text-slate-500' : 'border-white/10 bg-white/10 text-white')}>
                      {isLocked ? <Lock className="h-5 w-5" /> : stage.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-base font-bold text-white">{stage.name}</div>
                        {isCurrent && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Đang học</span>}
                        {isCompleted && <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">Đã hoàn thành</span>}
                      </div>
                      <div className="mt-1 text-sm text-slate-400">{isLocked ? 'Chưa mở khóa' : stage.id === 6 ? 'Vào đánh boss' : 'Có thể vào mê cung'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="text-xl">{stage.icon}</span>
                    {isLocked ? <Lock className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <motion.div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
              <Sword className="h-4 w-4" />
              Trang bị boss
            </h3>
            <p className="mb-4 text-sm leading-6 text-slate-400">Mỗi chặng hoàn thành sẽ làm sáng một trang bị. Không cần đếm vật phẩm riêng để mở boss cuối.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'sword', icon: '⚔️', name: 'Kiếm' },
                { id: 'shield', icon: '🛡️', name: 'Khiên' },
                { id: 'helmet', icon: '⛑️', name: 'Mũ' },
                { id: 'armor', icon: '🎽', name: 'Giáp' },
                { id: 'horse', icon: '🐎', name: 'Ngựa' },
              ].map((item) => {
                const isUnlocked = inventory[item.id as keyof typeof inventory];
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      'flex flex-col items-center rounded-2xl border px-3 py-4 text-center transition-all',
                      isUnlocked
                        ? 'border-emerald-300/40 bg-emerald-400/15 text-emerald-50 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-300/20'
                        : 'border-white/5 bg-white/[0.03] text-slate-500'
                    )}
                  >
                    <div className={clsx('text-2xl transition-all', isUnlocked && 'drop-shadow-[0_0_10px_rgba(167,243,208,0.7)]')}>{item.icon}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em]">{item.name}</div>
                    <div className={clsx('mt-2 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.22em]', isUnlocked ? 'bg-emerald-300/20 text-emerald-100' : 'bg-white/5 text-slate-500')}>
                      {isUnlocked ? 'Đã sáng' : 'Chưa mở'}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
              <Castle className="h-4 w-4" />
              Mục tiêu
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              Công chúa nằm ở chặng cuối. Hoàn thành 5 mê cung, thu thập vật phẩm và bước vào boss cuối ở chặng 6.
            </p>
              <button onClick={() => navigate('/maze/1')} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.02]">
              Bắt đầu từ chặng 1
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Progress panel removed as requested */}
        </aside>
      </div>
    </div>
  );
}
