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

  const userRank = MOCK_LEADERBOARD.findIndex(u => u.name === "Student_99") + 1;
  
  // Replace the mock XP with real XP if the user passed it
  const displayLeaderboard = MOCK_LEADERBOARD.map(u => 
    u.name === "Student_99" ? { ...u, xp: Math.max(u.xp, xp) } : u
  ).sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-12 pb-24 px-6 rounded-b-[3rem] shadow-lg relative">
         <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
           <ArrowLeft className="w-6 h-6" />
         </button>
         <div className="flex flex-col items-center">
           <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-inner mb-4 border-4 border-amber-200">
             <Trophy className="w-10 h-10 text-amber-700" />
           </div>
           <h1 className="text-3xl font-extrabold text-center drop-shadow-md">Sảnh Anh Hùng</h1>
           <p className="text-blue-200 mt-2 font-medium">Những Học Giả Triết Học Hàng Đầu</p>
         </div>
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-16 relative z-10">
         
         {/* User Rank Card */}
         <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-200 mb-8 flex items-center justify-between transform hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center font-black text-amber-600 border-2 border-amber-300">
                #{displayLeaderboard.findIndex(u => u.name === "Student_99") + 1}
              </div>
              <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wide">Xếp Hạng Của Bạn</div>
                <div className="font-bold text-slate-800 text-lg">Student_99</div>
              </div>
            </div>
            <div className="font-black text-xl text-blue-600">{xp} XP</div>
         </div>

         {/* Leaderboard List */}
         <div className="bg-white rounded-3xl shadow-sm border-2 border-slate-100 overflow-hidden">
            {displayLeaderboard.map((user, idx) => {
              const isTop3 = idx < 3;
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={user.name} 
                  className={clsx(
                    "flex items-center gap-4 p-5 border-b-2 border-slate-50 last:border-0",
                    user.name === "Student_99" && "bg-blue-50"
                  )}
                >
                  <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                    idx === 0 ? "bg-amber-100 text-amber-600" :
                    idx === 1 ? "bg-slate-200 text-slate-600" :
                    idx === 2 ? "bg-orange-100 text-orange-700" : "text-slate-400"
                  )}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </div>
                  
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl border-2 border-slate-200">
                    {user.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-lg">{user.name}</div>
                  </div>

                  <div className="font-bold text-slate-600">
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
