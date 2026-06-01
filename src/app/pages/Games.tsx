import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ListOrdered, Link2, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { TimelineGame } from '../components/games/TimelineGame';
import { MatchingGame } from '../components/games/MatchingGame';
import { DebateGame } from '../components/games/DebateGame';
import { useGameStore } from '../store';

type Tab = 'timeline' | 'match' | 'debate';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'timeline', label: 'Dòng thời gian', icon: ListOrdered },
  { id: 'match', label: 'Nối khái niệm', icon: Link2 },
  { id: 'debate', label: 'Đấu trường lập luận', icon: ShieldAlert },
];

export default function Games() {
  const [tab, setTab] = useState<Tab>('timeline');
  const { playerName, setPlayerName } = useGameStore();
  const [tempName, setTempName] = useState('');

  const handleSaveName = () => {
    if (tempName.trim().length >= 2) {
      setPlayerName(tempName.trim());
    }
  };

  return (
    <div className="theory-page min-h-screen">
      <TopBar />

      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="wrap">
          <div className="hero-tag">HỌC MÀ CHƠI · CHƠI MÀ HỌC</div>
          <h1>Trạm ôn tập <em>Tương tác</em></h1>
          <p className="lead mt-6 text-[#f3ead7]">Khắc sâu lý thuyết và rèn luyện tư duy phản biện qua các bài tập mô phỏng.</p>
        </div>
        <div className="star">★</div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="wrap">
          <div className="flex flex-wrap gap-3 mb-8 border-b-2 border-[#2a201c] pb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={clsx(
                  'relative inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors border-2 font-["Oswald"]',
                  tab === id 
                    ? 'bg-[#c8281e] border-[#c8281e] text-white shadow-[4px_4px_0_#171210] translate-y-[-2px] translate-x-[-2px]' 
                    : 'bg-transparent border-[#2a201c] text-[#171210] hover:bg-[#171210] hover:text-[#f3ead7]',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {tab === 'debate' && !playerName ? (
            <div className="bg-white border-4 border-[#2a201c] p-6 sm:p-12 shadow-[8px_8px_0_#c8281e] max-w-xl mx-auto my-12 text-center">
              <h2 className="text-3xl font-black text-[#171210] font-['Oswald'] uppercase tracking-widest mb-4">Nhập tên để thi đấu</h2>
              <p className="text-[#6b5d4f] font-['Bitter'] mb-8 text-lg">Hệ thống sẽ lưu điểm và xếp hạng bạn với cả lớp khi tham gia Đấu trường.</p>
              
              <input 
                type="text" 
                placeholder="VD: SE190525" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="w-full border-4 border-[#171210] bg-[#f3ead7] p-4 text-xl font-bold text-[#171210] placeholder:text-[#a09486] focus:outline-none focus:bg-white transition-colors mb-6 text-center font-['Oswald'] tracking-wider"
              />
              
              <button 
                onClick={handleSaveName}
                disabled={tempName.trim().length < 2}
                className="w-full border-4 border-[#171210] bg-[#c8281e] px-8 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-[#8f1410] disabled:opacity-50 shadow-[6px_6px_0_#171210] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#171210] font-['Oswald'] text-xl"
              >
                Vào Đấu Trường
              </button>
            </div>
          ) : (

          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="bg-white border-4 border-[#2a201c] p-4 sm:p-8 shadow-[8px_8px_0_#c8281e]">
              {tab === 'timeline' && <TimelineGame />}
              {tab === 'match' && <MatchingGame />}
              {tab === 'debate' && <DebateGame />}
            </div>
          </motion.div>
          )}
        </div>
      </motion.section>

      <footer>
        <div className="wrap">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM • TRIẾT HỌC MÁC - LÊNIN • 2026
        </div>
      </footer>
    </div>
  );
}
