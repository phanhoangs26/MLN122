import React from 'react';
import { useNavigate } from 'react-router';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';
import { useGameStore } from '../store';
import clsx from 'clsx';
import { motion } from 'motion/react';

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Karl_M", xp: 5000, avatar: "🧔🏻‍♂️" },
  { rank: 2, name: "Vladimir_I", xp: 4800, avatar: "👨🏻‍🦲" },
  { rank: 3, name: "Rosa_L", xp: 4500, avatar: "👩🏻‍🦱" },
  { rank: 4, name: "Fred_E", xp: 4200, avatar: "🧔🏼‍♂️" },
  { rank: 5, name: "Student_99", xp: 2100, avatar: "🎓" },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const { xp } = useGameStore();

  // Replace the mock XP with real XP if the user passed it
  const displayLeaderboard = MOCK_LEADERBOARD.map(u => 
    u.name === "Student_99" ? { ...u, xp: Math.max(u.xp, xp) } : u
  ).sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-transparent font-sans pb-12 text-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-slate-950/70 px-6 pb-24 pt-12 shadow-2xl shadow-black/20 backdrop-blur">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.18),transparent_42%)]" />
         <button onClick={() => navigate(-1)} className="absolute left-6 top-6 rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10">
           <ArrowLeft className="w-6 h-6" />
         </button>
         <div className="flex flex-col items-center">
           <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 shadow-inner">
             <Trophy className="w-10 h-10 text-emerald-200" />
           </div>
           <h1 className="text-3xl font-black text-center tracking-tight text-white drop-shadow-md">Bảng Thành Tích</h1>
           <p className="mt-2 max-w-xl text-center text-sm leading-6 text-slate-300">Xếp hạng người chơi theo điểm kinh nghiệm tích lũy trong quá trình học và hoàn thành các màn.</p>
         </div>
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-16 relative z-10">
         
         {/* User Rank Card */}
         <div className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/10 backdrop-blur transition-transform hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 font-black text-emerald-200">
                #{displayLeaderboard.findIndex(u => u.name === "Student_99") + 1}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-emerald-200">Xếp hạng của bạn</div>
                <div className="text-lg font-bold text-white">Student_99</div>
              </div>
            </div>
            <div className="text-xl font-black text-cyan-200">{xp} XP</div>
         </div>

         {/* Leaderboard List */}
         <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-black/10 backdrop-blur">
            {displayLeaderboard.map((user, idx) => {
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={user.name} 
                  className={clsx(
                    "flex items-center gap-4 border-b border-white/5 p-5 last:border-0",
                    user.name === "Student_99" && "bg-white/5"
                  )}
                >
                  <div className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border font-bold text-lg",
                    idx === 0 ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" :
                    idx === 1 ? "border-slate-400/20 bg-slate-400/10 text-slate-200" :
                    idx === 2 ? "border-amber-400/20 bg-amber-400/10 text-amber-200" : "border-white/10 bg-white/5 text-slate-300"
                  )}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </div>
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                    {user.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="text-lg font-bold text-white">{user.name}</div>
                  </div>

                  <div className="font-bold text-slate-300">
                    {user.xp} XP
                  </div>
                </motion.div>
              );
            })}
         </div>

      </div>
    </div>
  );
}
