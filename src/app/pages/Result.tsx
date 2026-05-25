import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trophy, Share2, RotateCcw, Medal, Star } from 'lucide-react';
import { useGameStore } from '../store';
import confetti from 'canvas-confetti';

export default function Result() {
  const navigate = useNavigate();
  const { xp, level, resetGame, inventory } = useGameStore();

  useEffect(() => {
    // Trigger big fireworks
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  const unlockedCount = Object.values(inventory).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center font-sans p-6 overflow-hidden relative">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         {[...Array(20)].map((_, i) => (
           <motion.div 
             key={i}
             className="absolute bg-white/10 rounded-full blur-xl"
             style={{
               width: Math.random() * 200 + 50,
               height: Math.random() * 200 + 50,
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
             }}
             animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
             transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
           />
         ))}
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        
        {/* Celebration Scene */}
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-[3rem] w-full flex flex-col items-center mb-8 border-4 border-white/30 shadow-2xl">
           <div className="flex items-end justify-center gap-4 mb-6 relative">
              <motion.div className="text-7xl" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1 }}>🤴</motion.div>
              <div className="text-8xl relative z-10">🏰</div>
              <motion.div className="text-7xl" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>👸</motion.div>
           </div>
           <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg mb-2">Chiến Thắng!</h1>
           <p className="text-blue-100 font-medium text-lg text-center">Bạn đã cứu được Công Chúa và nắm vững Triết Học!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl text-center transform rotate-1 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 fill-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">{xp}</div>
            <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Tổng XP</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl text-center transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 fill-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">Cấp {level}</div>
            <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Xếp Hạng Cuối Cùng</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-xl w-full mb-8">
          <h3 className="font-bold text-slate-800 text-center mb-4 flex items-center justify-center gap-2">
            <Medal className="w-5 h-5 text-blue-500" />
            Trang Bị Đã Thu Thập
          </h3>
          <div className="flex justify-center gap-2">
            {['sword', 'shield', 'helmet', 'armor', 'horse'].map((item) => (
              <div key={item} className={clsx(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2",
                inventory[item as keyof typeof inventory] ? "bg-amber-100 border-amber-300" : "bg-slate-100 border-slate-200 grayscale opacity-30"
              )}>
                {item === 'sword' && '⚔️'}
                {item === 'shield' && '🛡️'}
                {item === 'helmet' && '⛑️'}
                {item === 'armor' && '🎽'}
                {item === 'horse' && '🐎'}
              </div>
            ))}
          </div>
          <div className="text-center mt-3 text-sm font-bold text-slate-500">
            {unlockedCount} / 5 Trang Bị Tìm Thấy
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 w-full">
          <button onClick={handlePlayAgain} className="flex-1 bg-white hover:bg-slate-50 text-blue-600 rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95">
            <RotateCcw className="w-5 h-5" />
            Chơi Lại
          </button>
          <button className="flex-1 bg-blue-800 hover:bg-blue-900 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 border-b-4 border-blue-950">
            <Share2 className="w-5 h-5" />
            Chia Sẻ
          </button>
        </div>

      </div>
    </div>
  );
}
