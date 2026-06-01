import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Bot, BookOpen, Landmark, Gamepad2 } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { centralThesis } from '../data/theoryContent';

const sections = [
  {
    to: '/theory',
    no: '01',
    icon: BookOpen,
    title: 'Nhà nước & Giai cấp',
    desc: 'Chương III: nguồn gốc, bản chất, đặc trưng, kiểu và hình thức nhà nước.',
    featured: true,
  },
  {
    to: '/tu-ban',
    no: '02',
    icon: Landmark,
    title: 'Nhà nước tư sản',
    desc: 'Một kiểu nhà nước điển hình trong xã hội tư bản chủ nghĩa.',
  },
  {
    to: '/game',
    no: '03',
    icon: Gamepad2,
    title: 'Ôn tập',
    desc: 'Học qua tương tác, ghi nhớ qua trải nghiệm.',
  },
  {
    to: '/chat',
    no: '04',
    icon: Bot,
    title: 'Hỏi đáp',
    desc: 'Tra cứu nhanh mọi vấn đề liên quan đến chuyên đề.',
  },
];

export default function Home() {
  const navigate = useNavigate();

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
          <div className="hero-tag">CHUYÊN ĐỀ · TRIẾT HỌC MÁC – LÊNIN</div>
          <h1>Nhà nước và <br/><em>Mâu thuẫn giai cấp</em></h1>
          
          <p className="lead mt-6 text-[#f3ead7]">Khám phá luận điểm nổi tiếng của V.I. Lênin về nguồn gốc và bản chất của nhà nước, quá trình xây dựng Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.</p>
          
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/theory')}
              className="inline-flex items-center gap-2 border-2 border-[#c8281e] bg-[#c8281e] px-6 py-3 font-bold text-white transition-colors hover:bg-[#8f1410] hover:border-[#8f1410] uppercase tracking-wider text-sm font-['Oswald']"
            >
              Khám phá chuyên đề
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="inline-flex items-center gap-2 border-2 border-[#d8a13a] bg-transparent px-6 py-3 font-bold text-[#d8a13a] transition-colors hover:bg-[rgba(216,161,58,0.1)] uppercase tracking-wider text-sm font-['Oswald']"
            >
              <Bot className="h-4 w-4" />
              Hỏi trợ lý
            </button>
          </div>

          <div className="quote-block mt-12 border-l-4 border-[#c8281e]">
            <p className="text-[#ece0c8]">“{centralThesis.quote}”</p>
            <cite className="text-[#d8a13a]">— {centralThesis.source}</cite>
          </div>
          
        </div>
        <div className="star">★</div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="wrap">
          <div className="kicker">MỤC LỤC</div>
          <div className="flex items-end justify-between border-b-2 border-[#2a201c] pb-2 mb-8">
            <h2>Nội dung chuyên đề</h2>
            <span className="text-sm font-bold text-[#6b5d4f] font-['Oswald'] tracking-widest">04 MỤC</span>
          </div>
          
          <div className="feat-grid">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.to}
                  onClick={() => navigate(s.to)}
                  className={`feat group flex flex-col ${s.featured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                >
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="fn text-[#171210] group-hover:text-[#c8281e] transition-colors">{s.no}</div>
                    <Icon className="h-8 w-8 text-[#c8281e]" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl mt-0 group-hover:underline decoration-2 underline-offset-4 decoration-[#c8281e]">{s.title}</h3>
                  <p className="muted mt-2 text-base flex-1">{s.desc}</p>
                  <div className="src mt-6 flex items-center gap-1 group-hover:text-[#c8281e] transition-colors">
                    TRUY CẬP <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-[#171210] text-[#f3ead7]"
      >
        <div className="wrap py-12">
          <div className="kicker text-[#d8a13a]">GỢI Ý LỘ TRÌNH</div>
          <h2 className="text-white mb-8">Hành trình khám phá</h2>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border-2 border-[#d8a13a] p-6 bg-[#1f1814]">
              <span className="font-['Oswald'] text-4xl font-bold text-[#c8281e] block mb-2">1</span>
              <p>Học lý thuyết ở mục <strong>Nhà nước & Giai cấp</strong> để nắm nguồn gốc, bản chất.</p>
            </div>
            <div className="border-2 border-[#d8a13a] p-6 bg-[#1f1814]">
              <span className="font-['Oswald'] text-4xl font-bold text-[#c8281e] block mb-2">2</span>
              <p>Đối chiếu <strong>Nhà nước tư sản</strong> và liên hệ <strong>Việt Nam</strong>.</p>
            </div>
            <div className="border-2 border-[#d8a13a] p-6 bg-[#1f1814]">
              <span className="font-['Oswald'] text-4xl font-bold text-[#c8281e] block mb-2">3</span>
              <p>Củng cố bằng <strong>Ôn tập</strong> và giải đáp thắc mắc ở <strong>Hỏi đáp</strong>.</p>
            </div>
          </div>
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
