import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

type Scenario = 0 | 1 | 2;

const SCENARIOS = [
  {
    tab: 'Chủ nô vs Nô lệ',
    left: { title: 'Lợi ích của Chủ nô', items: ['Giữ quyền sở hữu nô lệ', 'Duy trì lao động miễn phí', 'Bảo vệ tài sản'] },
    right: { title: 'Lợi ích của Nô lệ', items: ['Được tự do', 'Chấm dứt bị bóc lột', 'Có quyền sở hữu bản thân'] },
    actions: ['Tăng khẩu phần', 'Giảm giờ làm', 'Thưởng vật chất'],
    plus: ['Điều kiện sống cải thiện'],
    minus: ['Nô lệ vẫn là nô lệ', 'Chủ nô vẫn sở hữu nô lệ'],
    conclusion: 'Mâu thuẫn cơ bản vẫn tồn tại',
  },
  {
    tab: 'Địa chủ vs Nông dân',
    left: { title: 'Lợi ích của Địa chủ', items: ['Muốn giữ ruộng đất', 'Giữ địa tô', 'Duy trì quyền chiếm hữu'] },
    right: { title: 'Lợi ích của Nông dân', items: ['Muốn có ruộng đất', 'Thoát khỏi địa tô', 'Làm chủ tư liệu canh tác'] },
    actions: ['Giảm tô', 'Miễn thuế', 'Hỗ trợ mùa màng'],
    plus: ['Giảm căng thẳng tạm thời'],
    minus: ['Quyền sở hữu ruộng đất không đổi'],
    conclusion: 'Mâu thuẫn vẫn tồn tại',
  },
  {
    tab: 'Tư sản vs Công nhân',
    left: { title: 'Lợi ích của Tư sản', items: ['Tối đa lợi nhuận', 'Giữ tư liệu sản xuất', 'Kiểm soát giá trị thặng dư'] },
    right: { title: 'Lợi ích của Công nhân', items: ['Tăng lương và phúc lợi', 'Cải thiện điều kiện lao động', 'Được hưởng giá trị mình tạo ra'] },
    actions: ['Tăng lương', 'Giảm giờ làm', 'Thưởng cuối năm'],
    plus: ['Điều kiện lao động cải thiện'],
    minus: ['Doanh nghiệp vẫn sở hữu tư liệu sản xuất', 'Công nhân vẫn bán sức lao động'],
    conclusion: 'Mâu thuẫn cơ bản chưa mất đi',
  },
];

const LOAD_MSGS = ['Đang áp dụng biện pháp…', 'Đo lường lại lợi ích hai bên…', 'Kiểm tra mâu thuẫn cơ bản…'];

export const ContradictionResolver: React.FC = () => {
  const [current, setCurrent] = useState<Scenario>(0);
  const [done, setDone] = useState<Set<Scenario>>(new Set());
  const [attempting, setAttempting] = useState<Scenario | null>(null);
  const [showResult, setShowResult] = useState<Scenario | null>(null);
  const [loadMsg, setLoadMsg] = useState('');
  const [showConclusion, setShowConclusion] = useState(false);

  const handleTryReconcile = (s: Scenario) => {
    setShowResult(null);
    setAttempting(s);
    setLoadMsg(LOAD_MSGS[Math.floor(Math.random() * LOAD_MSGS.length)]);

    setTimeout(() => {
      setShowResult(s);
      setAttempting(null);
      if (!done.has(s)) {
        setDone(prev => new Set([...prev, s]));
      }
    }, 1200);
  };

  const allDone = done.size === 3;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="wrap">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-block bg-[#c8281e] text-[#f3ead7] px-4 py-2 font-['Oswald'] font-bold uppercase tracking-widest text-xs rounded">
            Tầng 1.5 · Thí nghiệm tương tác
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl font-['Oswald'] font-black uppercase tracking-wide leading-tight mb-4">
          Thử điều hòa <em className="text-[#c8281e] not-italic">mâu thuẫn</em>
        </h2>

        <p className="text-lg text-[#6b5d4f] italic border-l-4 border-[#d8a13a] pl-4 mb-8 max-w-2xl">
          Nếu các giai cấp có thể dung hòa lợi ích với nhau, liệu nhà nước có cần xuất hiện?
        </p>

        {/* Tabs */}
        <div className="mb-6">
          <p className="font-['Oswald'] uppercase tracking-widest text-xs font-bold text-[#6b5d4f] mb-3">
            Chọn một mâu thuẫn lịch sử
          </p>
          <div className="flex gap-0 border-b-4 border-[#171210]">
            {SCENARIOS.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i as Scenario)}
                className={clsx(
                  'px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all',
                  "font-['Oswald']",
                  current === i
                    ? 'bg-[#171210] text-[#f3ead7]'
                    : 'bg-transparent text-[#8a7a60] hover:text-[#171210]',
                )}
              >
                {s.tab}
                {done.has(i as Scenario) && <span className="ml-2 text-[#7ec97e]">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Panel */}
        <AnimatePresence mode="wait">
          {!allDone || !showConclusion ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* VS Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8 sm:gap-0">
                {/* Left */}
                <div className="bg-[#e4d9c4] border-4 border-[#171210] p-6 sm:border-r-0">
                  <h3 className="font-['Oswald'] text-sm font-bold uppercase tracking-widest text-[#c8281e] border-b-2 border-[#d8a13a] pb-2 mb-4">
                    {SCENARIOS[current].left.title}
                  </h3>
                  <ul className="space-y-2">
                    {SCENARIOS[current].left.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-[#c8281e] font-bold">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right */}
                <div className="bg-[#e4d9c4] border-4 border-[#171210] p-6 sm:border-l-0">
                  <h3 className="font-['Oswald'] text-sm font-bold uppercase tracking-widest text-[#c8281e] border-b-2 border-[#d8a13a] pb-2 mb-4">
                    {SCENARIOS[current].right.title}
                  </h3>
                  <ul className="space-y-2">
                    {SCENARIOS[current].right.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-[#c8281e] font-bold">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="text-center mb-6">
                <p className="font-['Oswald'] uppercase tracking-widest text-sm font-bold text-[#171210] mb-4">
                  Thử Điều Hòa
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {SCENARIOS[current].actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleTryReconcile(current)}
                      disabled={attempting === current}
                      className="px-5 py-3 bg-white border-2 border-[#171210] font-bold text-sm uppercase tracking-wide hover:bg-[#171210] hover:text-white transition-colors disabled:opacity-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading */}
              <AnimatePresence>
                {attempting === current && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center mb-6"
                  >
                    <div className="h-1 bg-[#e4d9c4] rounded-full overflow-hidden max-w-sm mx-auto mb-3">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#d8a13a] to-[#c8281e]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <p className="text-sm italic text-[#7a6a52]">{loadMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              <AnimatePresence>
                {showResult === current && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white border-4 border-[#171210] overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-[#c8281e] to-[#8b1a1a]" />
                      <div className="p-6 space-y-3">
                        {SCENARIOS[current].plus.map((msg, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{msg}</span>
                          </div>
                        ))}
                        <div className="h-px bg-[#cdc0a8]" />
                        {SCENARIOS[current].minus.map((msg, i) => (
                          <div key={i} className="flex gap-3 items-start text-[#5e0f0f]">
                            <XCircle className="w-5 h-5 text-[#c8281e] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{msg}</span>
                          </div>
                        ))}
                        <div className="h-px bg-[#cdc0a8]" />
                        <div className="flex gap-2 items-start">
                          <span className="text-[#d8a13a] font-bold">⇒</span>
                          <span className="font-bold text-[#5e0f0f] text-sm uppercase tracking-wide">
                            {SCENARIOS[current].conclusion}
                          </span>
                        </div>
                      </div>
                    </div>

                    {allDone && !showConclusion && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setShowConclusion(true)}
                        className="w-full px-8 py-4 bg-[#c8281e] text-white font-['Oswald'] font-bold uppercase tracking-widest text-lg border-4 border-[#171210] hover:bg-[#8b1a1a] transition-colors"
                      >
                        Xem kết luận →
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : showConclusion ? (
            /* Grand Conclusion */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#c8281e] to-[#8b1a1a] text-[#f3ead7] p-8 sm:p-12 rounded relative overflow-hidden border-4 border-[#171210]"
            >
              <div className="absolute -right-20 -bottom-20 text-9xl opacity-5 font-black">☭</div>

              <p className="font-['Oswald'] uppercase tracking-widest text-xs font-bold text-[#d8a13a] mb-3">
                Kết luận thí nghiệm
              </p>

              <h3 className="text-3xl sm:text-4xl font-['Oswald'] font-black uppercase tracking-wide mb-6 leading-tight">
                Tại sao không thể điều hòa?
              </h3>

              <div className="space-y-4 mb-8 text-[#f3e6d4]">
                <p>
                  Theo quan điểm Mác – Lênin, <strong>mâu thuẫn giai cấp không phải là mâu thuẫn cá nhân.</strong>
                </p>
                <p>
                  Nó bắt nguồn từ <strong>địa vị kinh tế</strong> và <strong>lợi ích cơ bản đối lập</strong> giữa các giai cấp.
                </p>
                <p>
                  Vì vậy các biện pháp cải thiện chỉ có thể <strong>làm dịu xung đột</strong>, không thể xóa bỏ nguyên nhân sâu xa.
                </p>
              </div>

              <div className="border-t border-[rgba(255,220,180,0.25)] pt-6 mb-6 text-sm italic text-[#e9d6bd]">
                <p className="mb-2">Nguồn — luận điểm của Lênin:</p>
                <p className="text-[#ffd98a] mb-3">
                  "… những giai cấp có quyền lợi kinh tế mâu thuẫn nhau …"
                </p>
                <p>
                  Nhà nước xuất hiện khi
                </p>
                <p className="text-[#ffd98a]">
                  "… những mâu thuẫn giai cấp không thể điều hòa được."
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 border border-[rgba(255,220,180,0.4)] rounded-full text-xs font-['Oswald'] uppercase tracking-widest">
                  Nhà nước
                </span>
                <span className="px-3 py-1 border border-[rgba(255,220,180,0.4)] rounded-full text-xs font-['Oswald'] uppercase tracking-widest">
                  là sản phẩm
                </span>
                <span className="px-3 py-1 border border-[rgba(255,220,180,0.4)] rounded-full text-xs font-['Oswald'] uppercase tracking-widest">
                  và biểu hiện
                </span>
                <span className="px-3 py-1 border border-[rgba(255,220,180,0.4)] rounded-full text-xs font-['Oswald'] uppercase tracking-widest">
                  của những mâu thuẫn giai cấp
                </span>
                <span className="px-3 py-1 bg-[#d8a13a] text-[#8b1a1a] rounded-full text-xs font-['Oswald'] font-bold uppercase tracking-widest border border-[#d8a13a]">
                  không thể điều hòa được 🥀
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
