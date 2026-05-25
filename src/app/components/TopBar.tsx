import React from 'react';
import { Heart, Coins, Shield, Swords, Star } from 'lucide-react';
import { useGameStore } from '../store';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export const TopBar: React.FC = () => {
  const { hearts, maxHearts, xp, level, coins } = useGameStore();

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-inner text-white font-bold text-xl">
          P
        </div>
      </Link>
      
      <div className="flex items-center gap-6">
        {/* Cấp & XP */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-emerald-700 shadow-sm">
            {level}
          </div>
          <div className="w-24 h-4 bg-slate-200 rounded-full overflow-hidden relative border-2 border-slate-300">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${(xp % 100)}%` }}
              transition={{ type: 'spring' }}
            />
          </div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1 font-bold text-rose-500">
          <Heart className="w-6 h-6 fill-rose-500" />
          <span>{hearts}</span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1 font-bold text-amber-500">
          <Coins className="w-6 h-6 fill-amber-400" />
          <span>{coins}</span>
        </div>
      </div>
    </div>
  );
};
