import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, RefreshCw, AlertCircle } from 'lucide-react';
import { TopBar } from '../components/TopBar';

type LeaderboardEntry = {
  name: string;
  xp: number;
};

export default function Dashboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) throw new Error('Không thể tải bảng xếp hạng');
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="theory-page min-h-screen">
      <TopBar />

      <motion.section 
        className="hero pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="wrap">
          <div className="hero-tag">THỐNG KÊ TOÀN CẦU</div>
          <h1>Bảng Xếp Hạng <em>Danh Dự</em></h1>
          <p className="lead mt-6 text-[#f3ead7]">Nơi vinh danh những trí tuệ sắc bén nhất trong quá trình ôn luyện chuyên đề.</p>
        </div>
        <div className="star">★</div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="wrap max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-4 border-[#171210] pb-4 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#c8281e]" />
              <h2 className="text-3xl font-black text-[#171210] font-['Oswald'] uppercase tracking-widest m-0">Top 50 Sinh Viên</h2>
            </div>
            <button 
              onClick={fetchLeaderboard}
              disabled={loading}
              className="flex items-center gap-2 border-2 border-[#171210] bg-[#171210] text-[#f3ead7] px-4 py-2 font-bold font-['Oswald'] tracking-widest uppercase transition-all hover:bg-[#c8281e] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>

          {error && (
            <div className="mb-8 border-4 border-[#c8281e] bg-rose-100 p-4 flex items-center gap-3 text-[#c8281e] font-bold">
              <AlertCircle className="h-6 w-6" />
              <span>{error}</span>
            </div>
          )}

          <div className="border-4 border-[#171210] bg-white shadow-[8px_8px_0_#171210] overflow-hidden">
            {loading && leaderboard.length === 0 ? (
              <div className="p-12 text-center text-[#171210] font-black font-['Oswald'] text-xl uppercase tracking-widest animate-pulse">
                Đang kết nối hệ thống...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="p-12 text-center text-[#6b5d4f] font-bold text-lg font-['Bitter']">
                Chưa có ai ghi danh lên bảng vàng. Hãy là người đầu tiên!
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#171210] text-[#f3ead7] font-['Oswald'] uppercase tracking-widest text-lg">
                      <th className="p-4 border-b-4 border-[#171210] w-24 text-center">Hạng</th>
                      <th className="p-4 border-b-4 border-[#171210]">Sinh viên</th>
                      <th className="p-4 border-b-4 border-[#171210] text-right">Điểm Đấu Trường</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => (
                      <tr 
                        key={idx} 
                        className={`font-['Oswald'] tracking-wide text-xl border-b-2 border-[#171210] transition-colors hover:bg-[#ece0c8] ${idx < 3 ? 'bg-amber-50' : 'bg-white'}`}
                      >
                        <td className="p-4 text-center font-black">
                          {idx === 0 ? <Trophy className="inline-block h-6 w-6 text-yellow-500" /> : 
                           idx === 1 ? <Trophy className="inline-block h-6 w-6 text-slate-400" /> : 
                           idx === 2 ? <Trophy className="inline-block h-6 w-6 text-amber-700" /> : 
                           `#${idx + 1}`}
                        </td>
                        <td className="p-4 font-bold text-[#171210] truncate max-w-[200px] sm:max-w-none">
                          {entry.name}
                        </td>
                        <td className="p-4 text-right font-black text-[#c8281e]">
                          {entry.xp.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <footer>
        <div className="wrap mt-16">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM • TRIẾT HỌC MÁC - LÊNIN • 2026
        </div>
      </footer>
    </div>
  );
}
