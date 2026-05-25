import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { TopBar } from '../components/TopBar';

const theoryCards = [
  {
    title: 'Chủ nghĩa duy vật biện chứng',
    summary: 'Vật chất là cái có trước, ý thức là sự phản ánh thế giới khách quan.',
    bullets: ['Nghiên cứu mối liên hệ, vận động và phát triển.', 'Nhìn sự vật trong tính toàn diện và lịch sử cụ thể.', 'Mâu thuẫn là nguồn gốc của phát triển.'],
  },
  {
    title: 'Luật thống nhất và đấu tranh của các mặt đối lập',
    summary: 'Mọi sự vật đều chứa đựng những mặt đối lập, và sự đấu tranh của chúng thúc đẩy biến đổi.',
    bullets: ['Không có sự vật nào đứng yên tuyệt đối.', 'Cần xác định đúng mâu thuẫn chủ yếu.', 'Giải quyết mâu thuẫn là động lực của bước tiến.'],
  },
  {
    title: 'Chủ nghĩa duy vật lịch sử',
    summary: 'Sản xuất vật chất và quan hệ sản xuất tạo nền tảng cho sự vận động của xã hội.',
    bullets: ['Cơ sở hạ tầng quyết định kiến trúc thượng tầng.', 'Đấu tranh giai cấp là động lực quan trọng của lịch sử.', 'Con người làm ra lịch sử trong những điều kiện nhất định.'],
  },
  {
    title: 'Giá trị thặng dư và lao động',
    summary: 'Giá trị thặng dư được tạo ra từ phần lao động vượt quá thời gian cần thiết để tái sản xuất sức lao động.',
    bullets: ['Đây là hạt nhân của phân tích kinh tế trong tư bản chủ nghĩa.', 'Giải thích vì sao lợi nhuận xuất hiện trong trao đổi hàng hóa.', 'Liên hệ trực tiếp với điều kiện lao động của công nhân.'],
  },
];

export default function Theory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <TopBar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/60 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
                <BookOpen className="h-4 w-4" />
                Page Lý thuyết
              </div>
              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                Ôn lý thuyết trước khi vào trận
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Đây là khu tham khảo nhanh cho người chơi: đọc ngắn gọn, nắm ý chính, rồi quay lại bản đồ để chiến đấu.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/map')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.02]"
                >
                  Vào game
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Về trang chủ
                </button>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div className="rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  Cách dùng nhanh
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Đọc từng khối kiến thức, ghi nhớ cụm từ khóa, rồi thử lại trong game để kiểm tra mức độ hiểu bài.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
                  <div className="text-2xl font-black text-white">6</div>
                  Màn chơi
                </div>
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-100">
                  <div className="text-2xl font-black text-white">5</div>
                  Trang bị
                </div>
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-100">
                  <div className="text-2xl font-black text-white">1</div>
                  Boss cuối
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-100">
                  <div className="text-2xl font-black text-white">100</div>
                  XP / cấp
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {theoryCards.map((card, index) => (
            <motion.section
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6 shadow-xl shadow-black/10 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Khái niệm cốt lõi</div>
                  <h2 className="mt-2 text-2xl font-black text-white">{card.title}</h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">{card.summary}</p>

              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 rounded-[1.75rem] border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-6 shadow-xl shadow-amber-500/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.35em] text-amber-200">Kết nối với game</div>
              <h3 className="mt-2 text-2xl font-black text-white">Học xong là vào bản đồ, không cần thoát khỏi flow</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
                Mỗi màn trong game ứng với một chủ đề, nên page này là nơi ôn nhanh trước khi chọn stage và làm câu hỏi.
              </p>
            </div>
            <button
              onClick={() => navigate('/map')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 transition-transform hover:scale-[1.02]"
            >
              Đi tới bản đồ
              <Trophy className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}