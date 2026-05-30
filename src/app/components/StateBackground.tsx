import React from 'react';
import { motion } from 'motion/react';
import { Star, Landmark, Scale, ScrollText, Users, Wheat, Hammer, Flag, Vote, Sparkles } from 'lucide-react';

// Phông nền "kì diệu" lấy cảm hứng từ Nhà nước pháp quyền XHCN Việt Nam:
// tông đỏ – vàng (cờ đỏ sao vàng), ngôi sao vàng, các biểu tượng nhà nước
// (búa – liềm, cán cân pháp luật, lá phiếu của Nhân dân...) trôi nhẹ nhàng.

const floatingIcons = [
  { Icon: Star, left: '8%', top: '18%', size: 26, delay: 0, dur: 7, color: 'text-amber-300/20' },
  { Icon: Landmark, left: '20%', top: '70%', size: 30, delay: 1.2, dur: 9, color: 'text-amber-200/15' },
  { Icon: Scale, left: '38%', top: '30%', size: 24, delay: 2.1, dur: 8, color: 'text-rose-200/15' },
  { Icon: Wheat, left: '52%', top: '74%', size: 26, delay: 0.6, dur: 10, color: 'text-amber-300/15' },
  { Icon: Hammer, left: '64%', top: '22%', size: 24, delay: 1.8, dur: 8.5, color: 'text-amber-200/15' },
  { Icon: Users, left: '78%', top: '60%', size: 28, delay: 0.3, dur: 9.5, color: 'text-rose-200/12' },
  { Icon: ScrollText, left: '88%', top: '28%', size: 24, delay: 2.6, dur: 7.5, color: 'text-amber-200/15' },
  { Icon: Flag, left: '30%', top: '12%', size: 22, delay: 1.5, dur: 8, color: 'text-rose-300/15' },
  { Icon: Vote, left: '70%', top: '80%', size: 24, delay: 2.9, dur: 9, color: 'text-amber-200/12' },
  { Icon: Star, left: '92%', top: '70%', size: 18, delay: 0.9, dur: 6.5, color: 'text-amber-300/20' },
];

export const StateBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden>
      {/* Aurora đỏ – vàng */}
      <motion.div
        className="absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-red-600/20 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-amber-400/15 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-rose-500/12 blur-[110px]"
        animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ngôi sao vàng lớn, mờ, xoay chậm — biểu tượng cờ đỏ sao vàng */}
      <motion.div
        className="absolute right-[6%] top-[12%] text-amber-300/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="h-64 w-64" strokeWidth={0.6} fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute left-[-4%] bottom-[-4%] text-red-500/[0.05]"
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="h-72 w-72" strokeWidth={0.6} fill="currentColor" />
      </motion.div>

      {/* Lưới mảnh gợi sự trang nghiêm của thiết chế nhà nước */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(251,191,36,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Biểu tượng nhà nước trôi nhẹ + lấp lánh */}
      {floatingIcons.map(({ Icon, left, top, size, delay, dur, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left, top }}
          animate={{ y: [0, -26, 0], opacity: [0.35, 1, 0.35], rotate: [0, 8, 0] }}
          transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon style={{ width: size, height: size }} strokeWidth={1.4} />
        </motion.div>
      ))}

      {/* Bụi sao vàng lấp lánh */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={`sparkle-${i}`}
          className="absolute"
          style={{ left: `${(i * 67) % 100}%`, top: `${(i * 41) % 100}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4 + (i % 5) * 0.4, delay: (i % 7) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-3 w-3 text-amber-200/40" />
        </motion.span>
      ))}
    </div>
  );
};
