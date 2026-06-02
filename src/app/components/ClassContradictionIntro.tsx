import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { ArrowDown } from 'lucide-react';

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────
const QUIZ = [
  {
    id: 'a',
    scenario: 'Hai sinh viên tranh nhau chỗ ngồi.',
    correct: false,
    wrongExpl: 'Đây là mâu thuẫn cá nhân — không liên quan đến địa vị kinh tế hay lợi ích giai cấp.',
    rightExpl: '',
  },
  {
    id: 'b',
    scenario: 'Hai doanh nghiệp cạnh tranh giành khách hàng.',
    correct: false,
    wrongExpl: 'Đây là cạnh tranh kinh doanh trong cùng giai cấp, không phải xung đột lợi ích cơ bản giữa các giai cấp.',
    rightExpl: '',
  },
  {
    id: 'c',
    scenario: 'Chủ nô muốn giữ nô lệ. Nô lệ muốn được tự do.',
    correct: true,
    wrongExpl: '',
    rightExpl: 'Lợi ích cơ bản hoàn toàn đối lập: một bên muốn duy trì sở hữu, một bên muốn thoát khỏi nó.',
  },
  {
    id: 'd',
    scenario: 'Địa chủ muốn giữ ruộng đất. Nông dân muốn có ruộng đất.',
    correct: true,
    wrongExpl: '',
    rightExpl: 'Cùng một đối tượng — ruộng đất — nhưng lợi ích cơ bản đối lập nhau hoàn toàn.',
  },
  {
    id: 'e',
    scenario: 'Tư sản muốn tối đa hóa lợi nhuận. Công nhân muốn tăng lương.',
    correct: true,
    wrongExpl: '',
    rightExpl: 'Lợi nhuận của tư sản và tiền lương của công nhân xuất phát từ cùng một giá trị thặng dư — lợi ích của bên này tăng thì của bên kia giảm.',
  },
];

// ─── COMPARE DATA ─────────────────────────────────────────────────────────────
const LEFT_ITEMS  = ['Muốn giữ nô lệ', 'Muốn khai thác lao động', 'Muốn bảo vệ tài sản'];
const RIGHT_ITEMS = ['Muốn tự do', 'Muốn thoát khỏi bóc lột', 'Muốn làm chủ bản thân'];

// ─── RECONCILE DATA ───────────────────────────────────────────────────────────
const ACTIONS = [
  { label: 'Tăng khẩu phần ăn', plus: 'Điều kiện sống cải thiện', minus: ['Nô lệ vẫn là nô lệ', 'Chủ nô vẫn sở hữu nô lệ'] },
  { label: 'Giảm giờ lao động', plus: 'Căng thẳng giảm tạm thời', minus: ['Quan hệ chủ nô – nô lệ vẫn tồn tại'] },
  { label: 'Thưởng vật chất',   plus: 'Không khí dịu xuống',      minus: ['Nô lệ vẫn không có quyền sở hữu bản thân'] },
];

type Phase = 'quiz' | 'reveal' | 'compare' | 'reconcile' | 'conclusion' | 'transition';

export const ClassContradictionIntro: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [quizIdx, setQuizIdx]   = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [hoveredLeft, setHoveredLeft]   = useState<number | null>(null);
  const [hoveredRight, setHoveredRight] = useState<number | null>(null);
  const [actIdx, setActIdx]     = useState<number | null>(null);
  const [actsDone, setActsDone] = useState<Set<number>>(new Set());

  const current = QUIZ[quizIdx];
  const allActsDone = actsDone.size === 3;

  const handleAnswer = (yes: boolean) => {
    setAnswered(yes);
  };

  const handleNext = () => {
    if (quizIdx < QUIZ.length - 1) {
      setQuizIdx(q => q + 1);
      setAnswered(null);
    } else {
      setPhase('reveal');
    }
  };

  const handleAction = (i: number) => {
    setActIdx(i);
    setActsDone(prev => new Set([...prev, i]));
  };

  const isCorrect = answered !== null && answered === current.correct;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="wrap">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="kicker">Tầng 0 — Điểm khởi đầu</div>
          <h2 style={{ fontSize: 'clamp(28px,5vw,50px)' }}>
            Mâu thuẫn giai cấp<br /><em>thực chất là gì?</em>
          </h2>
          <p className="lead muted mt-2">
            Trước khi tìm hiểu nhà nước, hãy xác định điều gì đã tạo ra nó.
          </p>
        </div>

        {/* ── QUIZ ─────────────────────────────────────────── */}
        {phase === 'quiz' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={quizIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress dots */}
              <div className="flex gap-2 mb-6">
                {QUIZ.map((_, i) => (
                  <div key={i} className={clsx(
                    'h-1.5 flex-1 rounded-full transition-colors',
                    i < quizIdx ? 'bg-[#c8281e]' : i === quizIdx ? 'bg-[#d8a13a]' : 'bg-[#cdc0a8]',
                  )} />
                ))}
              </div>

              <div className="bg-white border-4 border-[#171210] shadow-[6px_6px_0_#c8281e] overflow-hidden">
                <div className="p-6 sm:p-8">
                  <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f] mb-4">
                    ĐÂU LÀ MÂU THUẪN GIAI CẤP? ({quizIdx + 1}/{QUIZ.length})
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-[#171210] mb-8 leading-snug">
                    {current.scenario}
                  </p>

                  {answered === null ? (
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => handleAnswer(true)}
                        className="flex-1 min-w-[140px] px-6 py-3 border-2 border-[#171210] bg-white font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#171210] hover:text-white transition-colors"
                      >
                        Mâu thuẫn giai cấp
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="flex-1 min-w-[140px] px-6 py-3 border-2 border-[#171210] bg-white font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#171210] hover:text-white transition-colors"
                      >
                        Không phải
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <div className={clsx(
                        'p-4 border-l-4 mb-6',
                        isCorrect ? 'border-green-600 bg-green-50' : 'border-[#c8281e] bg-[#f9e8e8]',
                      )}>
                        <p className={clsx('font-bold text-sm mb-1', isCorrect ? 'text-green-700' : 'text-[#c8281e]')}>
                          {isCorrect ? '✓ Đúng!' : '✗ Chưa chính xác.'}
                        </p>
                        <p className="text-sm text-[#171210]">
                          {current.correct
                            ? current.rightExpl
                            : current.wrongExpl}
                        </p>
                      </div>
                      <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-[#171210] text-white font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#c8281e] transition-colors"
                      >
                        {quizIdx < QUIZ.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── REVEAL ───────────────────────────────────────── */}
        {phase === 'reveal' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-[#171210] text-[#f3ead7] border-4 border-[#c8281e] p-8 sm:p-12 mb-10">
              <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#d8a13a] mb-4">Kết quả</p>
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-black uppercase mb-6 leading-tight">
                Mâu thuẫn giai cấp không phải là mâu thuẫn giữa những cá nhân.
              </h3>
              <p className="text-[#ece0c8] text-lg mb-4">
                Nó là sự <strong className="text-white">đối lập về lợi ích cơ bản</strong> giữa các giai cấp có <strong className="text-white">vị trí kinh tế khác nhau</strong>.
              </p>
              <p className="italic text-[#d8a13a] border-l-4 border-[#d8a13a] pl-4">
                "những giai cấp có quyền lợi kinh tế mâu thuẫn nhau"
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setPhase('compare')}
                className="px-10 py-4 bg-[#c8281e] text-white border-4 border-[#171210] font-['Oswald'] font-bold uppercase tracking-widest text-base hover:bg-[#8b1a1a] transition-colors"
              >
                Xem so sánh trực quan →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── COMPARE ──────────────────────────────────────── */}
        {phase === 'compare' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f] mb-6">
              Hover vào từng ý để thấy lợi ích đối lập:
            </p>

            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-0 mb-10">
              {/* LEFT */}
              <div className="bg-[#e4d9c4] border-4 border-[#171210] p-6 sm:border-r-0">
                <h3 className="font-['Oswald'] text-sm font-bold uppercase tracking-widest text-[#c8281e] border-b-2 border-[#d8a13a] pb-2 mb-4">Chủ nô</h3>
                <ul className="space-y-3">
                  {LEFT_ITEMS.map((item, i) => (
                    <li
                      key={i}
                      onMouseEnter={() => setHoveredLeft(i)}
                      onMouseLeave={() => setHoveredLeft(null)}
                      className={clsx(
                        'flex gap-3 p-2 rounded transition-all cursor-default text-sm',
                        hoveredLeft === i ? 'bg-[#c8281e] text-white' : 'text-[#171210]',
                      )}
                    >
                      <span className={clsx('font-bold', hoveredLeft === i ? 'text-white' : 'text-[#c8281e]')}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* VS badge */}
              <div className="hidden sm:flex items-center justify-center bg-[#171210] px-4">
                <span className="font-['Oswald'] font-black text-[#d8a13a] text-lg rotate-0">VS</span>
              </div>

              {/* RIGHT */}
              <div className="bg-[#e4d9c4] border-4 border-[#171210] p-6 sm:border-l-0">
                <h3 className="font-['Oswald'] text-sm font-bold uppercase tracking-widest text-[#c8281e] border-b-2 border-[#d8a13a] pb-2 mb-4">Nô lệ</h3>
                <ul className="space-y-3">
                  {RIGHT_ITEMS.map((item, i) => (
                    <li
                      key={i}
                      onMouseEnter={() => setHoveredRight(i)}
                      onMouseLeave={() => setHoveredRight(null)}
                      className={clsx(
                        'flex gap-3 p-2 rounded transition-all cursor-default text-sm',
                        hoveredRight === i || hoveredLeft === i ? 'bg-[#c8281e] text-white' : 'text-[#171210]',
                      )}
                    >
                      <span className={clsx('font-bold', (hoveredRight === i || hoveredLeft === i) ? 'text-white' : 'text-[#c8281e]')}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="inline-block bg-[#c8281e] text-white font-['Oswald'] font-bold uppercase tracking-widest text-sm px-6 py-2">
                Lợi ích cơ bản đối lập
              </span>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setPhase('reconcile')}
                className="px-10 py-4 bg-[#c8281e] text-white border-4 border-[#171210] font-['Oswald'] font-bold uppercase tracking-widest text-base hover:bg-[#8b1a1a] transition-colors"
              >
                Liệu mâu thuẫn có thể biến mất? →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── RECONCILE ────────────────────────────────────── */}
        {phase === 'reconcile' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="font-['Oswald'] text-2xl font-black uppercase tracking-wide mb-2">
              Liệu mâu thuẫn có thể biến mất?
            </h3>
            <p className="lead muted mb-8">Thử áp dụng các biện pháp cải thiện cho quan hệ Chủ nô ↔ Nô lệ.</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {ACTIONS.map((act, i) => (
                <button
                  key={i}
                  onClick={() => handleAction(i)}
                  className={clsx(
                    "p-4 border-2 font-bold uppercase tracking-wider text-sm text-left transition-all font-['Oswald']",
                    actsDone.has(i)
                      ? 'border-green-600 bg-green-50 text-green-800'
                      : 'border-[#171210] bg-white hover:bg-[#f3ead7]',
                  )}
                >
                  {actsDone.has(i) && '✓ '}{act.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {actIdx !== null && !allActsDone && (
                <motion.div
                  key={actIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-4 border-[#171210] overflow-hidden mb-8"
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#c8281e] to-[#8b1a1a]" />
                  <div className="p-6 space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="text-green-600 font-black text-lg">✓</span>
                      <span className="text-sm">{ACTIONS[actIdx].plus}</span>
                    </div>
                    <div className="h-px bg-[#cdc0a8]" />
                    {ACTIONS[actIdx].minus.map((m, i) => (
                      <div key={i} className="flex gap-3 items-start text-[#5e0f0f]">
                        <span className="text-[#c8281e] font-black text-lg">✗</span>
                        <span className="text-sm">{m}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {allActsDone && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="bg-[#f3ead7] border-4 border-[#171210] p-6 mb-6">
                  <p className="font-['Oswald'] font-black text-lg uppercase tracking-wide text-[#171210] mb-2">
                    Bạn đã làm dịu xung đột.
                  </p>
                  <p className="text-[#5e3a2a]">Nhưng chưa xóa bỏ <strong>nguyên nhân</strong> của nó.</p>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setPhase('conclusion')}
                    className="px-10 py-4 bg-[#c8281e] text-white border-4 border-[#171210] font-['Oswald'] font-bold uppercase tracking-widest text-base hover:bg-[#8b1a1a] transition-colors"
                  >
                    Xem kết luận →
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── CONCLUSION ───────────────────────────────────── */}
        {phase === 'conclusion' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-[#171210] text-[#f3ead7] border-4 border-[#c8281e] p-8 sm:p-12 mb-8 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-8xl opacity-5 font-black">☭</div>
              <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#c8281e] mb-4">
                Tại sao gọi là "Mâu thuẫn không thể điều hòa"?
              </p>
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-black uppercase mb-6 leading-tight text-white">
                Các giai cấp có thể thỏa hiệp tạm thời.
              </h3>
              <div className="space-y-4 text-[#ece0c8]">
                <p>Nhưng khi <strong className="text-white">lợi ích cơ bản vẫn đối lập</strong>, mâu thuẫn vẫn tồn tại.</p>
                <p>Đó là điều Marx, Engels và Lenin gọi là <strong className="text-[#ffd98a]">mâu thuẫn giai cấp không thể điều hòa</strong>.</p>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => setPhase('transition')}
                className="px-10 py-4 bg-[#c8281e] text-white border-4 border-[#171210] font-['Oswald'] font-bold uppercase tracking-widest text-base hover:bg-[#8b1a1a] transition-colors"
              >
                Tiếp tục →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── TRANSITION ───────────────────────────────────── */}
        {phase === 'transition' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex flex-col items-center gap-1 bg-white border-4 border-[#171210] px-12 py-10 shadow-[8px_8px_0_#c8281e]">
              {[
                'Mâu thuẫn giai cấp',
                'không thể điều hòa',
                'Nhà nước xuất hiện',
              ].map((text, i) => (
                <React.Fragment key={i}>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className={clsx(
                      "font-['Oswald'] font-black uppercase tracking-widest",
                      i === 2 ? 'text-[#c8281e] text-2xl' : 'text-[#171210] text-lg',
                    )}
                  >
                    {text}
                  </motion.p>
                  {i < 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.3 + 0.15 }}
                    >
                      <ArrowDown className="w-5 h-5 text-[#d8a13a] my-1" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-xs text-[#6b5d4f] font-['Oswald'] uppercase tracking-widest"
              >
                ↓ Cuộn xuống để tiếp tục
              </motion.p>
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
};
