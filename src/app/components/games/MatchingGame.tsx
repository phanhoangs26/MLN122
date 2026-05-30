import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link2, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
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
      'w-full rounded-2xl border px-4 py-4 text-left text-sm font-bold transition-all',
      state === 'idle' && 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10',
      state === 'selected' && 'border-amber-300/50 bg-amber-400/15 text-amber-50 ring-1 ring-amber-300/30',
      state === 'matched' && 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100/80 opacity-70',
      state === 'wrong' && 'border-rose-400/40 bg-rose-400/15 text-rose-100',
    );

  return (
    <div>
      <div className="rounded-[1.75rem] border border-amber-300/20 bg-slate-950/50 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-100">
              <Link2 className="h-4 w-4" />
              Nối khái niệm
            </div>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">{round.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{round.prompt}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Đã nối</div>
            <div className="text-2xl font-black">{matched.size}/{round.pairs.length}</div>
            <div className="mt-1 text-xs text-slate-400">Sai: {mistakes}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {matchRounds.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goRound(i)}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-bold transition-colors',
                i === roundIdx ? 'border-amber-300/40 bg-amber-400/15 text-amber-50' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10',
              )}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5">
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Khái niệm</h3>
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
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Nội dung</h3>
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
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
          Trộn lại
        </button>
        {done && hasNext && (
          <button
            onClick={() => goRound(roundIdx + 1)}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 hover:scale-[1.02]"
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
          className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100"
        >
          <div className="flex items-center gap-2 text-lg font-black">
            <Trophy className="h-5 w-5" />
            Hoàn thành! {mistakes === 0 ? 'Không sai lần nào 🎉' : `Sai ${mistakes} lần`}
          </div>
          <p className="mt-1 text-sm leading-6">Bạn đã ghép đúng toàn bộ cặp khái niệm trong vòng này.</p>
        </motion.div>
      )}
    </div>
  );
};
