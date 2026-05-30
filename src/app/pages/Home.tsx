import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Bot } from 'lucide-react';
import { TopBar } from '../components/TopBar';

const sections = [
  {
    to: '/theory',
    no: '01',
    title: 'Nhà nước',
    desc: 'Nguồn gốc, bản chất, đặc trưng, chức năng và các kiểu nhà nước — kèm trích dẫn Ăngghen, Lênin.',
  },
  {
    to: '/vietnam',
    no: '02',
    title: 'Việt Nam',
    desc: 'Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân — vận dụng thực tiễn.',
  },
  {
    to: '/game',
    no: '03',
    title: 'Ôn tập',
    desc: 'Hai trò chơi kết hợp: sắp xếp Dòng thời gian và Nối khái niệm để khắc sâu kiến thức.',
  },
  {
    to: '/chat',
    no: '04',
    title: 'Hỏi đáp',
    desc: 'Trợ lý trả lời câu hỏi quanh chủ đề nhà nước — chạy offline, có thể bật chế độ AI.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-sm font-black uppercase tracking-widest text-red-600 mb-3">Triết học Mác – Lênin</div>
          <h1 className="font-serif text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Nhà nước & sự không thể điều hòa của mâu thuẫn giai cấp
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            Khóa học toàn diện về lý thuyết nhà nước theo triết học Mác – Lênin, từ nguồn gốc đến vận dụng thực tiễn xây dựng Nhà nước pháp quyền XHCN Việt Nam.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/theory')}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-black text-white transition-colors hover:bg-red-700"
            >
              Bắt đầu học
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="inline-flex items-center gap-2 rounded border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-700 transition-colors hover:bg-red-100"
            >
              <Bot className="h-4 w-4" />
              Hỏi trợ lý
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Bốn mục chính</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((s, i) => {
              return (
                <motion.button
                  key={s.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(s.to)}
                  className="group relative flex flex-col items-start gap-3 rounded border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-red-300 hover:bg-red-50"
                >
                  <div className="text-5xl font-black text-slate-200 group-hover:text-red-200">{s.no}</div>
                  <div className="relative flex-1">
                    <div className="flex items-center gap-2 text-xl font-black text-slate-950">
                      {s.title}
                      <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
