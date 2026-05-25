import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Play, Trophy, Medal, Map as MapIcon } from 'lucide-react';
import { useGameStore } from '../store';

export default function Home() {
  const navigate = useNavigate();
  const { xp, currentStage } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col font-sans text-white selection:bg-blue-400/30 overflow-x-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-center gap-12 py-12 relative z-10">
        
        {/* Left Side: Hero Graphic */}
        <div className="flex-1 w-full relative h-[400px] flex items-center justify-center">
          <motion.div 
            className="absolute z-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl shadow-blue-500/50 border-2 border-blue-500/50 p-8 flex flex-col items-center justify-center overflow-hidden backdrop-blur">
             {/* Scene */}
             <div className="flex items-end justify-between w-full h-48 border-b-4 border-cyan-400 pb-2 relative">
                {/* Tower & Princess */}
                <div className="flex flex-col items-center">
                  <span className="text-6xl mb-[-10px] z-10">👸</span>
                  <div className="w-16 h-32 bg-slate-300 rounded-t-xl border-4 border-slate-400 flex justify-center pt-2">
                     <div className="w-8 h-8 bg-slate-800 rounded-t-full" />
                  </div>
                </div>

                {/* Dragon */}
                <motion.div 
                  className="text-6xl absolute left-1/2 -translate-x-1/2 bottom-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🐉
                </motion.div>

                {/* Prince */}
                <motion.div 
                  className="text-6xl"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  🤴
                </motion.div>
             </div>
             
             <h1 className="text-4xl font-black mt-6 text-center leading-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
               Cuộc Phiêu Lưu Của Hoàng Tử:<br/> Cứu Công Chúa
             </h1>
             <p className="text-slate-300 text-center font-semibold mt-3 mb-6">
               Nắm vững Triết Học Mác-Lê-Nin để đánh bại Rồng và cứu vương quốc!
             </p>
          </div>
        </div>

        {/* Right Side: Menu */}
        <div className="flex-1 w-full flex flex-col gap-4 max-w-md">
           
           <motion.button
             whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)" }}
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/map')}
             className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl py-6 px-6 font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/50 border-2 border-green-400/60 transition-all uppercase tracking-wider"
           >
             <Play className="w-6 h-6 fill-white" />
             Bắt Đầu Phiêu Lưu
           </motion.button>

           {/* Cards Grid */}
           <div className="grid grid-cols-2 gap-4 mt-6">
             {/* Progress Card */}
             <motion.div 
               whileHover={{ scale: 1.05, y: -5 }}
               className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 shadow-lg shadow-emerald-500/20 border-2 border-emerald-500/40 flex flex-col items-center justify-center gap-3 hover:border-emerald-500/60 transition-colors cursor-pointer"
             >
               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/50">
                 <MapIcon className="w-7 h-7" />
               </div>
               <div className="text-center">
                 <div className="font-black text-white text-lg">Cấp {currentStage}</div>
                 <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Tiến Độ</div>
               </div>
             </motion.div>

             {/* Leaderboard Preview Card */}
             <motion.div 
               whileHover={{ scale: 1.05, y: -5 }}
               onClick={() => navigate('/leaderboard')} 
               className="bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer rounded-2xl p-5 shadow-lg shadow-amber-500/20 border-2 border-amber-500/40 flex flex-col items-center justify-center gap-3 hover:border-amber-500/60 transition-colors"
             >
               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/50">
                 <Trophy className="w-7 h-7" />
               </div>
               <div className="text-center">
                 <div className="font-black text-white text-lg">{xp} XP</div>
                 <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Xếp Hạng</div>
               </div>
             </motion.div>
           </div>

           {/* Achievements Preview */}
           <motion.div 
             whileHover={{ borderColor: "rgba(168, 85, 247, 0.8)" }}
             className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-lg shadow-purple-500/20 border-2 border-purple-500/30 transition-colors mt-6"
           >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white flex items-center gap-2 uppercase tracking-wider">
                  <Medal className="w-6 h-6 text-purple-400" />
                  Thành Tựu
                </h3>
                <span className="text-xs font-bold text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">Xem Tất Cả →</span>
              </div>
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.15 }}
                    className="w-14 h-14 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 flex items-center justify-center text-2xl hover:border-purple-500/60 transition-colors cursor-pointer"
                  >
                    {['🛡️','⚔️','🐎','👑'][i-1]}
                  </motion.div>
                ))}
              </div>
           </motion.div>

        </div>
      </div>
    </div>
  );
}
