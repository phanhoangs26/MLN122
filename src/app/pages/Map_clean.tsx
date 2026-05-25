import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Sword, Castle } from 'lucide-react';
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
      navigate(`/quiz/${stageId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col font-sans text-white pb-20 relative">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <TopBar />
      
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 pt-8 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Main Map Path */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl shadow-blue-500/30 border-2 border-blue-500/40 flex flex-col items-center relative overflow-hidden">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8 self-start uppercase tracking-wider">Bản Đồ Hành Trình</h2>
          
          <div className="relative w-full max-w-sm mx-auto py-12 flex flex-col items-center gap-16">
            
            {/* Connection Line */}
            <div className="absolute top-[80px] bottom-[80px] left-1/2 -translate-x-1/2 w-4 bg-slate-700 rounded-full z-0" />
            <div 
              className="absolute top-[80px] left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full z-0 transition-all duration-1000"
              style={{ height: `${Math.max(0, (currentStage - 1) / (stages.length - 1) * 100)}%` }}
            />

            {stages.map((stage, index) => {
              const isLocked = stage.id > currentStage;
              const isCurrent = stage.id === currentStage;
              const isCompleted = stage.id < currentStage;
              
              const offsetX = index % 2 === 0 ? -40 : 40;

              return (
                <div 
                  key={stage.id} 
                  className="relative z-10 w-full flex justify-center"
                  style={{ transform: `translateX(${offsetX}px)` }}
                >
                  <motion.button
                    whileHover={!isLocked ? { scale: 1.1 } : {}}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                    onClick={() => handleStageClick(stage.id)}
                    disabled={isLocked}
                    className="relative group focus:outline-none"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3 rounded-xl shadow-lg border-2 border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      <div className="font-black text-white text-sm">{stage.name}</div>
                      {isLocked ? (
                        <div className="text-rose-400 text-xs font-bold mt-1">Bị Khóa</div>
                      ) : (
                        <div className="text-emerald-400 text-xs font-bold mt-1">✓ Chơi</div>
                      )}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-b-2 border-r-2 border-slate-700 rotate-45" />
                    </div>

                    {/* Node Button */}
                    <div className={clsx(
                      "w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 relative transition-all",
                      isLocked ? "bg-slate-700 border-slate-600" : `${stage.color} border-white shadow-xl ${stage.shadow} hover:shadow-2xl`
                    )}>
                      {isLocked ? (
                        <Lock className="w-10 h-10 text-slate-500" />
                      ) : (
                        stage.icon
                      )}
                      
                      {/* Current Stage Indicator */}
                      {isCurrent && (
                        <motion.div 
                          className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow-lg text-xl font-black"
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          ★
                        </motion.div>
                      )}

                      {/* Completed Stars */}
                      {isCompleted && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 px-3 py-1 rounded-full border-2 border-white flex shadow-lg">
                          <span className="text-lg">★★★</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Inventory & Stats */}
        <div className="w-full md:w-80 flex flex-col gap-6">
          
          {/* Equipment Card */}
          <motion.div 
            whileHover={{ borderColor: "rgba(16, 185, 129, 0.8)" }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-lg shadow-emerald-500/20 border-2 border-emerald-500/40 transition-colors"
          >
            <h3 className="font-black text-white text-lg mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Sword className="w-6 h-6 text-emerald-400" />
              Trang Bị
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'sword', icon: '⚔️', name: 'Kiếm' },
                { id: 'shield', icon: '🛡️', name: 'Khiên' },
                { id: 'helmet', icon: '⛑️', name: 'Mũ Bảo Vệ' },
                { id: 'armor', icon: '🎽', name: 'Giáp' },
                { id: 'horse', icon: '🐎', name: 'Ngựa' },
              ].map((item) => {
                const isUnlocked = inventory[item.id as keyof typeof inventory];
                
                return (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
                    className={clsx(
                      "flex flex-col items-center p-4 rounded-2xl border-2 transition-all",
                      isUnlocked ? "bg-gradient-to-br from-amber-600/20 to-amber-700/10 border-amber-500/60 shadow-lg shadow-amber-500/20 cursor-pointer" : "bg-slate-700/50 border-slate-600 opacity-50"
                    )}
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-xs font-bold text-slate-200">{item.name}</div>
                    {!isUnlocked && <Lock className="w-4 h-4 text-slate-500 mt-2" />}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Mission Box */}
          <motion.div 
            whileHover={{ borderColor: "rgba(59, 130, 246, 0.8)" }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 shadow-xl shadow-blue-500/40 border-2 border-blue-500/50 text-white relative overflow-hidden transition-colors"
          >
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <Castle className="w-32 h-32" />
            </div>
            <h3 className="font-black text-lg mb-2 relative z-10 uppercase tracking-wider">Nhiệm Vụ Cứu Rỗi</h3>
            <p className="text-blue-100 text-sm font-semibold leading-relaxed relative z-10">
              Công Chúa bị giam giữ trong Lâu Đài Rồng (Cấp 6). Hãy thu thập tất cả trang bị bằng cách trả lời chính xác các câu hỏi triết học để đánh bại Rồng!
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
