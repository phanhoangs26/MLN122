import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

type Scenario = 0 | 1 | 2;

const SCENARIOS = [
  {
    tab: 'Chủ nô vs Nô lệ',
    left: 'Chủ nô',
    right: 'Nô lệ',
    actions: [
      { label: 'Tăng khẩu phần', leftDelta: -15, rightDelta: +15 },
      { label: 'Giảm giờ làm',   leftDelta: -20, rightDelta: +20 },
      { label: 'Thưởng vật chất', leftDelta: -10, rightDelta: +10 },
    ],
    leftWant:  'Giữ toàn bộ quyền sở hữu nô lệ',
    rightWant: 'Được tự do hoàn toàn',
    leftFinal:  'Chủ nô vẫn là chủ nô.',
    rightFinal: 'Nô lệ vẫn là nô lệ.',
  },
  {
    tab: 'Địa chủ vs Nông dân',
    left: 'Địa chủ',
    right: 'Nông dân',
    actions: [
      { label: 'Giảm tô',          leftDelta: -20, rightDelta: +20 },
      { label: 'Miễn thuế',        leftDelta: -15, rightDelta: +15 },
      { label: 'Hỗ trợ mùa màng',  leftDelta: -10, rightDelta: +10 },
    ],
    leftWant:  'Duy trì quyền chiếm hữu ruộng đất',
    rightWant: 'Trực tiếp sở hữu ruộng đất',
    leftFinal:  'Địa chủ vẫn là địa chủ.',
    rightFinal: 'Nông dân vẫn lệ thuộc ruộng đất.',
  },
  {
    tab: 'Tư sản vs Công nhân',
    left: 'Tư sản',
    right: 'Công nhân',
    actions: [
      { label: 'Tăng lương',       leftDelta: -20, rightDelta: +20 },
      { label: 'Giảm giờ làm',     leftDelta: -20, rightDelta: +20 },
      { label: 'Thưởng cuối năm',  leftDelta: -10, rightDelta: +10 },
    ],
    leftWant:  'Giữ quyền sở hữu tư liệu sản xuất và kiểm soát giá trị thặng dư',
    rightWant: 'Thoát khỏi sự phụ thuộc vào tư bản, được hưởng đầy đủ giá trị lao động',
    leftFinal:  'Tư sản vẫn sở hữu tư liệu sản xuất.',
    rightFinal: 'Công nhân vẫn phải bán sức lao động.',
  },
];

function InterestBar({ label, value, side }: { label: string; value: number; side: 'left' | 'right' }) {
  const color = side === 'left' ? '#c8281e' : '#2a6496';
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f]">{label}</span>
        <span className="font-['Oswald'] text-sm font-black" style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 bg-[#e4d9c4] rounded-full overflow-hidden border border-[#cdc0a8]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export const ContradictionResolver: React.FC = () => {
  const [current, setCurrent] = useState<Scenario>(0);
  const [done, setDone] = useState<Set<Scenario>>(new Set());
  const [showFinalQ, setShowFinalQ] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState<'yes' | 'no' | null>(null);
  const [showConclusion, setShowConclusion] = useState(false);

  // Per-scenario state
  const [scores, setScores] = useState<Record<number, { left: number; right: number }>>({
    0: { left: 50, right: 50 },
    1: { left: 50, right: 50 },
    2: { left: 50, right: 50 },
  });
  const [usedActions, setUsedActions] = useState<Record<number, Set<number>>>({
    0: new Set(), 1: new Set(), 2: new Set(),
  });
  const [lastAction, setLastAction] = useState<{ leftDelta: number; rightDelta: number } | null>(null);
  const [showZeroSum, setShowZeroSum] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const s = SCENARIOS[current];
  const score = scores[current];
  const used = usedActions[current];
  const allActionsUsed = used.size === s.actions.length;
  const allDone = done.size === 3;

  const handleAction = (idx: number) => {
    if (used.has(idx)) return;
    const action = s.actions[idx];
    setLastAction(action);
    setScores(prev => ({
      ...prev,
      [current]: {
        left:  Math.max(0, Math.min(100, prev[current].left  + action.leftDelta)),
        right: Math.max(0, Math.min(100, prev[current].right + action.rightDelta)),
      },
    }));
    setUsedActions(prev => {
      const next = new Set(prev[current]);
      next.add(idx);
      const newUsed = { ...prev, [current]: next };
      // all actions done → mark scenario done, show zero-sum reveal
      if (next.size === s.actions.length) {
        setDone(d => new Set([...d, current]));
        setShowZeroSum(z => ({ ...z, [current]: true }));
      }
      return newUsed;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="wrap">
        <div className="kicker">Tầng 3 — Thử điều hòa mâu thuẫn</div>
        <h2 style={{ fontSize: 'clamp(28px,5vw,46px)' }}>
          Thử điều hòa <em>mâu thuẫn</em>
        </h2>
        <p className="lead muted">
          Nếu các giai cấp có thể dung hòa lợi ích với nhau, liệu nhà nước có cần xuất hiện?
          Hãy thử từng biện pháp và quan sát kết quả.
        </p>

        {!showConclusion ? (
          <>
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex gap-0 border-b-4 border-[#171210]">
                {SCENARIOS.map((sc, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i as Scenario); setLastAction(null); }}
                    className={clsx(
                      'px-5 py-3 font-bold uppercase tracking-widest text-sm transition-all',
                      "font-['Oswald']",
                      current === i
                        ? 'bg-[#171210] text-[#f3ead7]'
                        : 'bg-transparent text-[#8a7a60] hover:text-[#171210]',
                    )}
                  >
                    {sc.tab}
                    {done.has(i as Scenario) && <span className="ml-2 text-[#7ec97e]">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Interest bars */}
                <div className="bg-white border-4 border-[#171210] p-6 mb-6 space-y-4">
                  <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f] mb-4">
                    Mức độ lợi ích được thỏa mãn:
                  </p>
                  <InterestBar label={s.left}  value={score.left}  side="left"  />
                  <InterestBar label={s.right} value={score.right} side="right" />

                  {/* Last action delta */}
                  <AnimatePresence>
                    {lastAction && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-6 pt-2 border-t border-[#cdc0a8] text-sm"
                      >
                        <span className="text-[#c8281e] font-bold">
                          {s.left}: {lastAction.leftDelta > 0 ? '+' : ''}{lastAction.leftDelta}%
                        </span>
                        <span className="text-[#2a6496] font-bold">
                          {s.right}: {lastAction.rightDelta > 0 ? '+' : ''}{lastAction.rightDelta}%
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                {!allActionsUsed && (
                  <div className="mb-6">
                    <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#171210] mb-3">
                      Thử điều hòa:
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {s.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(i)}
                          disabled={used.has(i)}
                          className={clsx(
                            'px-5 py-3 border-2 font-bold text-sm uppercase tracking-wide transition-all',
                            used.has(i)
                              ? 'border-green-600 bg-green-50 text-green-700 opacity-60 cursor-not-allowed'
                              : 'border-[#171210] bg-white hover:bg-[#171210] hover:text-white',
                          )}
                        >
                          {used.has(i) ? '✓ ' : ''}{action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zero-sum reveal */}
                <AnimatePresence>
                  {showZeroSum[current] && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#171210] text-[#f3ead7] border-4 border-[#c8281e] p-6 mb-6"
                    >
                      <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#c8281e] mb-4">
                        Bạn đã thử mọi giải pháp.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#2a201c] p-4 border border-[#3a3028]">
                          <p className="text-xs text-[#d8a13a] uppercase tracking-widest font-bold mb-2">{s.left} muốn</p>
                          <p className="text-white font-semibold">{s.leftWant}</p>
                        </div>
                        <div className="bg-[#2a201c] p-4 border border-[#3a3028]">
                          <p className="text-xs text-[#2a6496] uppercase tracking-widest font-bold mb-2">{s.right} muốn</p>
                          <p className="text-white font-semibold">{s.rightWant}</p>
                        </div>
                      </div>
                      <p className="text-[#ffd98a] font-['Oswald'] font-bold text-lg">
                        ⇒ Không tồn tại trạng thái cùng thắng hoàn toàn.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next / See conclusion */}
                {showZeroSum[current] && (
                  <div className="flex gap-3 flex-wrap">
                    {!allDone && (
                      <button
                        onClick={() => {
                          const next = ([0,1,2] as Scenario[]).find(i => !done.has(i) && i !== current);
                          if (next !== undefined) { setCurrent(next); setLastAction(null); }
                        }}
                        className="px-8 py-3 border-2 border-[#171210] bg-white font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#f3ead7] transition-colors"
                      >
                        Thử scenario tiếp →
                      </button>
                    )}
                    {allDone && (
                      <button
                        onClick={() => setShowFinalQ(true)}
                        className="px-8 py-3 bg-[#c8281e] text-white border-2 border-[#171210] font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#8b1a1a] transition-colors"
                      >
                        Xem kết quả thí nghiệm →
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : showFinalQ && !showConclusion ? (
          /* Final question */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white border-4 border-[#171210] p-10 shadow-[8px_8px_0_#c8281e] mb-6">
              <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f] mb-6">Câu hỏi cuối</p>
              <h3 className="font-['Oswald'] text-xl sm:text-2xl font-black uppercase leading-tight mb-8 text-[#171210]">
                Nếu các giai cấp có thể dung hòa hoàn toàn lợi ích, nhà nước có cần xuất hiện không?
              </h3>
              {finalAnswer === null ? (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setFinalAnswer('yes')}
                    className="flex-1 max-w-[140px] px-6 py-4 border-4 border-[#171210] bg-white font-['Oswald'] font-black uppercase tracking-widest text-lg hover:bg-[#171210] hover:text-white transition-colors"
                  >
                    Có
                  </button>
                  <button
                    onClick={() => setFinalAnswer('no')}
                    className="flex-1 max-w-[140px] px-6 py-4 border-4 border-[#171210] bg-white font-['Oswald'] font-black uppercase tracking-widest text-lg hover:bg-[#171210] hover:text-white transition-colors"
                  >
                    Không
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    {finalAnswer === 'no' ? (
                      <div className="border-l-4 border-green-600 bg-green-50 p-4 text-left mb-6">
                        <p className="font-bold text-green-700 mb-2">✓ Chính xác.</p>
                        <p className="text-[#171210]">Theo Lenin, nhà nước chỉ xuất hiện khi các mâu thuẫn giai cấp <strong>không thể điều hòa được</strong>.</p>
                      </div>
                    ) : (
                      <div className="border-l-4 border-[#c8281e] bg-[#f9e8e8] p-4 text-left mb-6">
                        <p className="font-bold text-[#c8281e] mb-2">Hãy suy nghĩ lại.</p>
                        <p className="text-[#171210]">Nếu mâu thuẫn đã được giải quyết hoàn toàn, không còn xung đột lợi ích — nhà nước sẽ không còn lý do để tồn tại.</p>
                      </div>
                    )}
                    <button
                      onClick={() => setShowConclusion(true)}
                      className="px-8 py-3 bg-[#c8281e] text-white border-2 border-[#171210] font-['Oswald'] font-bold uppercase tracking-wider text-sm hover:bg-[#8b1a1a] transition-colors"
                    >
                      Xem kết luận đầy đủ →
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        ) : (
          /* Grand conclusion */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#171210] text-[#f3ead7] border-4 border-[#c8281e] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-9xl opacity-5 font-black">☭</div>

              <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#c8281e] mb-4">
                Kết quả thí nghiệm
              </p>
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-black uppercase mb-6 leading-tight">
                Bạn đã thử tăng lương, giảm tô,<br />thưởng vật chất và nhiều biện pháp khác.
              </h3>

              <p className="text-[#ece0c8] mb-6">
                Chúng có thể làm giảm căng thẳng tạm thời. Nhưng <strong className="text-white">không thay đổi địa vị kinh tế của các giai cấp.</strong>
              </p>

              <div className="space-y-2 mb-8 font-['Oswald'] text-base">
                {SCENARIOS.map((sc, i) => (
                  <div key={i} className="grid sm:grid-cols-2 gap-2">
                    <p className="text-[#ece0c8]">{sc.leftFinal}</p>
                    <p className="text-[#ece0c8]">{sc.rightFinal}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#3a3028] pt-6 space-y-3">
                <p className="text-[#ece0c8]">
                  Vì vậy, theo Lenin, đây không phải những xung đột có thể thương lượng hoàn toàn.
                </p>
                <p className="text-[#ffd98a] font-semibold text-lg italic">
                  "Chúng là những mâu thuẫn giai cấp không thể điều hòa được."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
