import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ListOrdered, Link2 } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { TimelineGame } from '../components/games/TimelineGame';
import { MatchingGame } from '../components/games/MatchingGame';

type Tab = 'timeline' | 'match';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'timeline', label: 'Dòng thời gian', icon: ListOrdered },
  { id: 'match', label: 'Nối khái niệm', icon: Link2 },
];

export default function Games() {
  const [tab, setTab] = useState<Tab>('timeline');

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white px-4 py-3 text-lg font-serif text-slate-700">
            <span className="font-sans text-xl text-red-600">•</span>
            <span>Ôn tập qua trò chơi</span>
          </div>
          <div className="flex items-center gap-6 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            <span className="text-red-600">•</span>
            <span>Học mà chơi · Chơi mà học</span>
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
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Ôn tập</div>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Ôn tập qua trò chơi
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Hai trò chơi giúp khắc sâu lý thuyết về nhà nước: sắp xếp đúng tiến trình lịch sử và nối đúng khái niệm.
            </p>
          </motion.section>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-b border-slate-200 py-7"
          >
            <div className="mb-6 inline-flex rounded border border-slate-200 bg-slate-50 p-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={clsx(
                    'relative inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold transition-colors',
                    tab === id ? 'text-white bg-red-600' : 'text-slate-950 hover:text-red-600',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {tab === 'timeline' ? <TimelineGame /> : <MatchingGame />}
            </motion.div>
          </motion.div>
        </article>
      </main>
    </div>
  );
}
