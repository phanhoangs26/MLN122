import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, ShieldCheck, Quote, Landmark, Scale, Flame, Building2, ScrollText, GraduationCap } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { StateBackground } from '../components/StateBackground';

const theoryCards = [
  {
    icon: Landmark,
    title: '1. Xã hội nguyên thủy chưa có nhà nước',
    summary: 'Nhà nước không phải hiện tượng vĩnh viễn, bất biến. Nó chỉ xuất hiện ở một giai đoạn nhất định của lịch sử.',
    bullets: [
      'Chưa có chế độ tư hữu, chưa phân chia giai cấp nên chưa có nhà nước.',
      'Quản lý bằng tổ chức thị tộc – bộ lạc dựa trên huyết thống và uy tín.',
      'Quyền lực mang tính xã hội, gắn với cộng đồng, chưa tách rời khỏi dân cư.',
    ],
  },
  {
    icon: Scale,
    title: '2. Tư hữu và sự phân hóa giai cấp',
    summary: 'Lực lượng sản xuất phát triển tạo ra sản phẩm dư thừa, chế độ tư hữu ra đời và xã hội bị chia cắt.',
    bullets: [
      'Tư liệu sản xuất rơi vào tay thiểu số, số đông bị tước đoạt.',
      'Xã hội phân chia thành giai cấp đối kháng: chủ nô – nô lệ là cặp đầu tiên.',
      'Lợi ích các giai cấp đối lập nhau, xung đột ngày càng gay gắt.',
    ],
  },
  {
    icon: Flame,
    title: '3. Mâu thuẫn giai cấp không thể điều hòa',
    summary: 'Đây là luận điểm trung tâm: nhà nước ra đời khi đối kháng giai cấp gay gắt tới mức không thể dung hòa.',
    bullets: [
      'Lợi ích căn bản của giai cấp thống trị và bị trị loại trừ lẫn nhau.',
      'Lênin: nếu mâu thuẫn điều hòa được thì nhà nước đã không cần xuất hiện.',
      'Nhà nước giữ xung đột trong “vòng trật tự” có lợi cho giai cấp thống trị.',
    ],
  },
  {
    icon: Building2,
    title: '4. Bản chất và đặc trưng của nhà nước',
    summary: 'Nhà nước là công cụ chuyên chính của giai cấp nắm kinh tế dùng để trấn áp giai cấp khác.',
    bullets: [
      'Mang tính giai cấp sâu sắc, đồng thời có chức năng quản lý xã hội.',
      'Ba đặc trưng (Ăngghen): lãnh thổ – quyền lực công cộng đặc biệt – thuế.',
      'Quyền lực công cộng: quân đội, cảnh sát, nhà tù, tòa án tách khỏi dân cư.',
    ],
  },
  {
    icon: ScrollText,
    title: '5. Các kiểu nhà nước trong lịch sử',
    summary: 'Mỗi phương thức sản xuất sinh ra một kiểu nhà nước tương ứng.',
    bullets: [
      'Chủ nô → phong kiến → tư sản → xã hội chủ nghĩa.',
      'Ba kiểu đầu đều là nhà nước của thiểu số bóc lột thống trị đa số.',
      'Nhà nước XHCN là nhà nước của số đông nhân dân lao động.',
    ],
  },
  {
    icon: GraduationCap,
    title: '6. Nhà nước tiêu vong & liên hệ Việt Nam',
    summary: 'Vì nhà nước sinh ra từ giai cấp, khi không còn giai cấp nó sẽ tự tiêu vong.',
    bullets: [
      'Nhà nước tiêu vong, không bị “xóa bỏ” bằng sắc lệnh (Ăngghen).',
      'Nhà nước CHXHCN Việt Nam: nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân.',
      'Mang bản chất giai cấp công nhân, tính nhân dân và tính dân tộc.',
    ],
  },
];

const evidence = [
  {
    tag: 'Tác phẩm gốc',
    title: 'Ph. Ăngghen – “Nguồn gốc của gia đình, của chế độ tư hữu và của nhà nước” (1884)',
    text: 'Ăngghen chứng minh nhà nước ra đời từ sự tan rã của xã hội thị tộc khi xuất hiện tư hữu và giai cấp, và chỉ ra ba đặc trưng cơ bản của nhà nước.',
  },
  {
    tag: 'Tác phẩm gốc',
    title: 'V.I. Lênin – “Nhà nước và Cách mạng” (1917)',
    text: 'Lênin khái quát: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.” Đây là cơ sở lý luận cho cách mạng vô sản.',
  },
  {
    tag: 'Liên hệ thực tiễn',
    title: 'Nhà nước Cộng hòa XHCN Việt Nam hôm nay',
    text: 'Hiến pháp 2013 khẳng định Nhà nước ta là nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân – vận dụng sáng tạo luận điểm của Lênin trong điều kiện mới.',
  },
  {
    tag: 'Quan sát đời sống',
    title: 'Đặc trưng nhà nước vẫn hiện diện quanh ta',
    text: 'Biên giới – lãnh thổ, lực lượng quân đội – công an – tòa án, và hệ thống thuế là ba đặc trưng do Ăngghen nêu, vẫn dễ dàng nhận ra trong mọi quốc gia ngày nay.',
  },
];

export default function Theory() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950/50 to-slate-900 text-white">
      <StateBackground />
      <TopBar />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-amber-300/20 bg-slate-950/60 p-8 shadow-2xl shadow-red-900/20 backdrop-blur"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-rose-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
              <BookOpen className="h-4 w-4" />
              Lý thuyết về nhà nước · Chương III
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
              Nguồn gốc và bản chất của nhà nước
            </h1>

            <figure className="mt-6 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
              <Quote className="h-7 w-7 text-cyan-200" />
              <blockquote className="mt-3 text-lg font-bold leading-8 text-white md:text-2xl">
                “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.”
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-cyan-200">— V.I. Lênin, “Nhà nước và Cách mạng” (1917)</figcaption>
            </figure>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/vietnam')}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-3 font-black text-slate-950 shadow-lg shadow-rose-500/20 transition-transform hover:scale-[1.02]"
              >
                Liên hệ Nhà nước Việt Nam
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/game')}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                Ôn tập qua trò chơi
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {theoryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.section
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6 shadow-xl shadow-black/10 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Khái niệm cốt lõi</div>
                    <h2 className="mt-2 text-xl font-black text-white md:text-2xl">{card.title}</h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-rose-400 text-slate-950">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{card.summary}</p>

                <ul className="mt-5 space-y-3 text-sm text-slate-200">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <div className="text-xs font-black uppercase tracking-[0.35em] text-amber-200">Dẫn chứng & liên hệ thực tiễn</div>
          <h3 className="mt-2 text-2xl font-black text-white md:text-3xl">Từ tác phẩm kinh điển đến đời sống hôm nay</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {evidence.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-amber-400/15 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 p-6 shadow-xl shadow-amber-500/5"
              >
                <span className="inline-block rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-amber-100">
                  {item.tag}
                </span>
                <h4 className="mt-3 text-lg font-black text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-[1.75rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-rose-500/10 p-6 shadow-xl shadow-cyan-500/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">Ôn tập</div>
              <h3 className="mt-2 text-2xl font-black text-white">Củng cố kiến thức qua trò chơi</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
                Hai trò chơi — Sắp xếp dòng thời gian và Nối khái niệm — giúp bạn khắc sâu mạch lý thuyết: từ xã hội chưa có nhà nước, qua tư hữu – giai cấp – mâu thuẫn không thể điều hòa, đến bản chất, các kiểu nhà nước và vận dụng thực tiễn.
              </p>
            </div>
            <button
              onClick={() => navigate('/game')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 transition-transform hover:scale-[1.02]"
            >
              Vào trò chơi
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
