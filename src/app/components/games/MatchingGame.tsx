import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ArrowRight, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { matchRounds } from '../../data/stateContent';
import { useGameStore } from '../../store';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
    } else {
      setWrong({ left: selLeft, right: selRight });
      setMistakes((m) => m + 1);
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
      'w-full rounded border px-4 py-4 text-left text-sm font-bold transition-all',
      state === 'idle' && 'border-slate-200 bg-white text-slate-800 hover:border-red-300 hover:bg-red-50',
      state === 'selected' && 'border-red-400 bg-red-50 text-red-700 ring-1 ring-red-300',
      state === 'matched' && 'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-80',
      state === 'wrong' && 'border-rose-300 bg-rose-50 text-rose-700',
    );

  return (
    <div>
      {/* Header */}
      <div className="border-l-4 border-red-600 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Nối khái niệm</div>
            <h2 className="mt-2 font-serif text-2xl font-black text-slate-950 md:text-3xl">{round.title}</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700">{round.prompt}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">Đã nối</div>
            <div className="text-2xl font-black text-slate-950">{matched.size}/{round.pairs.length}</div>
            <div className="mt-1 text-xs text-slate-500">Sai: {mistakes}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {matchRounds.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goRound(i)}
              className={clsx(
                'rounded border px-4 py-2 text-sm font-bold transition-colors',
                i === roundIdx
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-600',
              )}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Section */}
      {round.questions && round.questions.length > 0 && (
        <div className="mt-6 rounded border border-red-200 bg-red-50 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-red-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-red-600">6 câu hỏi ôn tập</h3>
          </div>
          <div className="space-y-2">
            {round.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                className="w-full text-left"
              >
                <div className="rounded border border-red-200 bg-white p-4 transition-colors hover:border-red-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">
                        <span className="mr-2 text-red-600">{i + 1}.</span>
                        {q.front}
                      </p>
                      <AnimatePresence initial={false}>
                        {expandedQuestion === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden text-sm leading-6 text-slate-700"
                          >
                            {q.back}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="shrink-0 text-xs font-black text-red-500">{expandedQuestion === i ? '▼' : '▶'}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matching board */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5">
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-red-600">Khái niệm</h3>
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

        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-red-600">Nội dung</h3>
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

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:border-red-300 hover:text-red-600"
        >
          <RotateCcw className="h-4 w-4" />
          Trộn lại
        </button>
        {done && hasNext && (
          <button
            onClick={() => goRound(roundIdx + 1)}
            className="inline-flex items-center gap-2 rounded bg-red-600 px-5 py-3 font-black text-white hover:bg-red-700"
          >
            Vòng tiếp theo
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded border border-emerald-200 bg-emerald-50 p-5 text-emerald-800"
        >
          <div className="flex items-center gap-2 text-lg font-black">
            <Trophy className="h-5 w-5" />
            Hoàn thành! {mistakes === 0 ? 'Không sai lần nào 🎉' : `Sai ${mistakes} lần`}
          </div>
          <p className="mt-1 text-sm leading-6 text-emerald-700">Bạn đã ghép đúng toàn bộ cặp khái niệm trong vòng này.</p>
        </motion.div>
      )}
    </div>
  );
};
