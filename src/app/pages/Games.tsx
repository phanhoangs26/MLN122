import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ListOrdered, Link2, Gamepad2 } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { StateBackground } from '../components/StateBackground';
import { TimelineGame } from '../components/games/TimelineGame';
import { MatchingGame } from '../components/games/MatchingGame';
import { useGameStore } from '../store';

type Tab = 'timeline' | 'match';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'timeline', label: 'Dòng thời gian', icon: ListOrdered },
  { id: 'match', label: 'Nối khái niệm', icon: Link2 },
];

export default function Games() {
  const [tab, setTab] = useState<Tab>('timeline');
  const { xp, level } = useGameStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950/50 to-slate-900 text-white">
      <StateBackground />
      <TopBar />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-100">
              <Gamepad2 className="h-4 w-4" />
              Khu trò chơi
            </div>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">Ôn tập qua trò chơi</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Hai trò chơi giúp khắc sâu lý thuyết về nhà nước: sắp xếp đúng tiến trình lịch sử và nối đúng khái niệm.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
            <div className="text-center">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Cấp</div>
              <div className="text-xl font-black text-white">{level}</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">XP</div>
              <div className="text-xl font-black text-white">{xp}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-slate-950/60 p-1.5 backdrop-blur">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={clsx(
                'relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors',
                tab === id ? 'text-slate-950' : 'text-slate-300 hover:text-white',
              )}
            >
              {tab === id && (
                <motion.span
                  layoutId="games-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 to-amber-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {tab === 'timeline' ? <TimelineGame /> : <MatchingGame />}
        </motion.div>
      </div>
    </div>
  );
}
