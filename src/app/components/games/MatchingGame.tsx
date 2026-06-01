import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ArrowRight, Trophy, HelpCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { matchRounds } from '../../data/stateContent';
import { useGameStore } from '../../store';
import { shuffle } from '../../utils/shuffle';

export const MatchingGame: React.FC = () => {
  const addXp = useGameStore((s) => s.addXp);

  const [roundIdx, setRoundIdx] = useState(0);
  const round = matchRounds[roundIdx];

  const correctMap = useMemo(() => {
    const m: Record<string, string> = {};
    round.pairs.forEach((p) => { m[p.left] = p.right; });
    return m;
  }, [round]);

  const [lefts, setLefts] = useState<string[]>(() => shuffle(round.pairs.map((p) => p.left)));
  const [rights, setRights] = useState<string[]>(() => shuffle(round.pairs.map((p) => p.right)));
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [selRight, setSelRight] = useState<string | null>(null);
  const [wrong, setWrong] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [wrongQuote, setWrongQuote] = useState<string | null>(null);

  const quotes = [
    "Thất bại là mẹ thành công!",
    "Sai một li, đi một dặm... nhưng không sao, thử lại nào!",
    "Đừng nản chí, kiên trì nhé!",
    "Hãy suy nghĩ kỹ hơn một chút!",
    "Có công mài sắt, có ngày nên kim!",
    "Không có việc gì khó, chỉ sợ lòng không bền!",
    "Học, học nữa, học mãi!",
    "Lịch sử vừa yêu cầu bạn thử lại.",
    "Chưa đúng, nhưng đang tiến gần hơn.",
    "Kiến thức cũng cần vài lần thử nghiệm.",
    "Sai lầm là một phần của quá trình học.",
    "Thất bại tạm thời, tiến bộ lâu dài.",
    "Lần này chưa đúng, lần sau có thể khác."
  ];

  const reset = (idx = roundIdx) => {
    const r = matchRounds[idx];
    setLefts(shuffle(r.pairs.map((p) => p.left)));
    setRights(shuffle(r.pairs.map((p) => p.right)));
    setMatched(new Set());
    setSelLeft(null);
    setSelRight(null);
    setWrong(null);
    setMistakes(0);
  };

  const goRound = (idx: number) => {
    setRoundIdx(idx);
    setExpandedQuestion(null);
    reset(idx);
  };

  const matchedRights = useMemo(() => new Set([...matched].map((l) => correctMap[l])), [matched, correctMap]);
  const done = matched.size === round.pairs.length;

  useEffect(() => {
    if (!selLeft || !selRight) return;
    if (correctMap[selLeft] === selRight) {
      setMatched((prev) => new Set(prev).add(selLeft));
      setSelLeft(null);
      setSelRight(null);
      setWrongQuote(null);
    } else {
      setWrong({ left: selLeft, right: selRight });
      setMistakes((m) => m + 1);

      setWrongQuote(quotes[Math.floor(Math.random() * quotes.length)]);

      const t = setTimeout(() => {
        setWrong(null);
        setSelLeft(null);
        setSelRight(null);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [selLeft, selRight, correctMap]);

  useEffect(() => {
    if (done) {
      const reward = Math.max(20, 70 - mistakes * 10);
      addXp(reward);
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const hasNext = roundIdx < matchRounds.length - 1;

  const leftState = (label: string) => {
    if (matched.has(label)) return 'matched';
    if (wrong?.left === label) return 'wrong';
    if (selLeft === label) return 'selected';
    return 'idle';
  };
  const rightState = (label: string) => {
    if (matchedRights.has(label)) return 'matched';
    if (wrong?.right === label) return 'wrong';
    if (selRight === label) return 'selected';
    return 'idle';
  };

  const cls = (state: string) =>
    clsx(
      'w-full border-2 px-4 py-4 text-left text-base font-bold transition-all shadow-[2px_2px_0_#171210]',
      state === 'idle' && 'border-[#171210] bg-[#f3ead7] text-[#171210] hover:bg-[#171210] hover:text-[#f3ead7]',
      state === 'selected' && 'border-[#171210] bg-[#c8281e] text-white shadow-[4px_4px_0_#171210] translate-y-[-2px] translate-x-[-2px]',
      state === 'matched' && 'border-[#171210] bg-[#171210] text-[#f3ead7] opacity-50 shadow-none translate-y-[2px] translate-x-[2px]',
      state === 'wrong' && 'border-[#171210] bg-rose-600 text-white',
    );

  return (
    <div>
      {/* Header */}
      <div className="border-l-4 border-[#c8281e] bg-[#f3ead7] p-6 shadow-[4px_4px_0_#171210] mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-black uppercase tracking-widest text-[#c8281e] font-['Oswald']">Nối khái niệm</div>
            <h2 className="mt-2 font-serif text-2xl font-black text-[#171210] md:text-3xl">{round.title}</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#6b5d4f]">{round.prompt}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-black uppercase tracking-widest text-[#6b5d4f] font-['Oswald']">Đã nối</div>
            <div className="text-3xl font-black text-[#171210] font-['Oswald']">{matched.size}/{round.pairs.length}</div>
            <div className="mt-1 text-sm font-bold text-[#c8281e]">Sai: {mistakes}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {matchRounds.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goRound(i)}
              className={clsx(
                'border-2 px-4 py-2 text-sm font-bold transition-colors font-["Oswald"] uppercase tracking-wider',
                i === roundIdx
                  ? 'border-[#171210] bg-[#c8281e] text-white shadow-[2px_2px_0_#171210] translate-y-[-1px] translate-x-[-1px]'
                  : 'border-[#2a201c] bg-white text-[#171210] hover:bg-[#171210] hover:text-white',
              )}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Wrong Quote Notification */}
      <AnimatePresence>
        {wrongQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171210]/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm border-4 border-[#171210] bg-[#f3ead7] p-8 shadow-[8px_8px_0_#c8281e]"
            >
              <button
                onClick={() => setWrongQuote(null)}
                className="absolute right-4 top-4 border-2 border-[#171210] bg-white p-1 text-[#171210] transition-colors hover:bg-[#c8281e] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center border-4 border-[#171210] bg-[#c8281e] text-white">
                  <HelpCircle className="h-8 w-8" />
                </div>
                <h4 className="mb-3 font-['Oswald'] uppercase tracking-wider text-2xl font-black text-[#171210]">Oops! Chưa chính xác</h4>
                <p className="mb-8 text-lg font-medium italic text-[#6b5d4f]">"{wrongQuote}"</p>
                <button
                  onClick={() => setWrongQuote(null)}
                  className="w-full border-2 border-[#171210] bg-[#171210] px-4 py-3 font-bold uppercase tracking-widest text-[#f3ead7] transition-colors hover:bg-[#c8281e] font-['Oswald']"
                >
                  Thử lại nhé
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matching board */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#c8281e] font-['Oswald'] mb-2">Khái niệm</h3>
          {lefts.map((label) => {
            const state = leftState(label);
            return (
              <motion.button
                key={label}
                layout
                whileTap={state === 'idle' || state === 'selected' ? { scale: 0.98 } : {}}
                animate={state === 'wrong' ? { x: [-6, 6, -6, 6, 0] } : {}}
                disabled={state === 'matched'}
                onClick={() => setSelLeft((cur) => (cur === label ? null : label))}
                className={cls(state)}
              >
                {label}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#c8281e] font-['Oswald'] mb-2">Nội dung</h3>
          {rights.map((label) => {
            const state = rightState(label);
            return (
              <motion.button
                key={label}
                layout
                whileTap={state === 'idle' || state === 'selected' ? { scale: 0.98 } : {}}
                animate={state === 'wrong' ? { x: [-6, 6, -6, 6, 0] } : {}}
                disabled={state === 'matched'}
                onClick={() => setSelRight((cur) => (cur === label ? null : label))}
                className={cls(state)}
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t-2 border-[#2a201c] pt-6">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 border-2 border-[#171210] bg-white px-6 py-3 font-bold text-[#171210] hover:bg-[#171210] hover:text-white font-['Oswald'] uppercase tracking-widest"
        >
          <RotateCcw className="h-4 w-4" />
          Trộn lại
        </button>
        {done && hasNext && (
          <button
            onClick={() => goRound(roundIdx + 1)}
            className="inline-flex items-center gap-2 border-2 border-[#171210] bg-[#c8281e] px-6 py-3 font-black text-white hover:bg-[#8f1410] font-['Oswald'] uppercase tracking-widest shadow-[4px_4px_0_#171210] translate-y-[-2px] translate-x-[-2px]"
          >
            Vòng tiếp theo
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Success message */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 border-l-4 border-[#c8281e] bg-[#f3ead7] p-6 shadow-[4px_4px_0_#171210]"
        >
          <div className="flex items-center gap-2 text-xl font-black font-['Oswald'] uppercase tracking-widest text-[#171210]">
            <Trophy className="h-6 w-6 shrink-0 text-[#d8a13a]" />
            Chính xác!
          </div>
          {round.successInsight && (
            <p className="mt-3 border-l-2 border-[#171210] pl-4 text-base leading-7 text-[#6b5d4f] italic">
              {round.successInsight}
            </p>
          )}
        </motion.div>
      )}

      {/* Questions Section */}
      {round.questions && round.questions.length > 0 && (
        <div className="mt-8 border-4 border-[#171210] bg-white p-6 md:p-8 shadow-[8px_8px_0_#c8281e]">
          <div className="mb-6 flex items-center gap-3 border-b-2 border-[#171210] pb-4">
            <HelpCircle className="h-6 w-6 text-[#c8281e]" />
            <h3 className="text-lg font-black uppercase tracking-widest text-[#171210] font-['Oswald']">Phân tích chuyên sâu</h3>
          </div>
          <div className="space-y-4">
            {round.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                className="w-full text-left"
              >
                <div className="border-2 border-[#171210] bg-[#f3ead7] p-5 transition-colors hover:bg-white shadow-[2px_2px_0_#171210]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-[#171210] text-lg">
                        <span className="mr-3 font-['Oswald'] text-[#c8281e]">0{i + 1}.</span>
                        {q.front}
                      </p>
                      <AnimatePresence initial={false}>
                        {expandedQuestion === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden text-base leading-7 text-[#6b5d4f] border-t-2 border-dashed border-[#171210] pt-4"
                          >
                            {q.back}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="shrink-0 text-xs font-black text-[#c8281e] mt-1">{expandedQuestion === i ? '▼' : '▶'}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
