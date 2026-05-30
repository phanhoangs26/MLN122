import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListOrdered, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { timelineRounds } from '../../data/stateContent';
import { useGameStore } from '../../store';

type Step = { label: string; note: string; correctIndex: number };

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const TimelineGame: React.FC = () => {
  const addXp = useGameStore((s) => s.addXp);

  const [roundIdx, setRoundIdx] = useState(0);
  const round = timelineRounds[roundIdx];

  const ordered: Step[] = useMemo(
    () => round.steps.map((s, i) => ({ ...s, correctIndex: i })),
    [round],
  );

  const [pool, setPool] = useState<Step[]>(() => shuffle(ordered));
  const [placed, setPlaced] = useState<Step[]>([]);
  const [checked, setChecked] = useState(false);

  const reset = (idx = roundIdx) => {
    const r = timelineRounds[idx];
    const steps = r.steps.map((s, i) => ({ ...s, correctIndex: i }));
    setPool(shuffle(steps));
    setPlaced([]);
    setChecked(false);
  };

  const goRound = (idx: number) => {
    setRoundIdx(idx);
    reset(idx);
  };

  const placeFromPool = (step: Step) => {
    if (checked) return;
    setPool((p) => p.filter((s) => s.label !== step.label));
    setPlaced((p) => [...p, step]);
  };

  const removeFromPlaced = (step: Step) => {
    if (checked) return;
    setPlaced((p) => p.filter((s) => s.label !== step.label));
    setPool((p) => [...p, step]);
  };

  const allPlaced = placed.length === ordered.length;
  const correctCount = placed.filter((s, i) => s.correctIndex === i).length;
  const isPerfect = checked && correctCount === ordered.length;

  const check = () => {
    if (!allPlaced) return;
    setChecked(true);
    if (correctCount === ordered.length) {
      addXp(80);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const hasNext = roundIdx < timelineRounds.length - 1;

  return (
    <div>
      <div className="rounded-[1.75rem] border border-amber-300/20 bg-slate-950/50 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-100">
              <ListOrdered className="h-4 w-4" />
              Sắp xếp dòng thời gian
            </div>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">{round.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{round.prompt}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Vòng</div>
            <div className="text-2xl font-black">{roundIdx + 1}/{timelineRounds.length}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {timelineRounds.map((r, i) => (
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

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5 shadow-xl backdrop-blur md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Thứ tự của bạn</h3>
          {checked && (
            <span className={clsx('rounded-full px-3 py-1 text-xs font-black', isPerfect ? 'bg-emerald-400/15 text-emerald-100' : 'bg-amber-400/15 text-amber-100')}>
              Đúng {correctCount}/{ordered.length}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {ordered.map((_, slot) => {
            const step = placed[slot];
            const correct = checked && step && step.correctIndex === slot;
            const wrong = checked && step && step.correctIndex !== slot;
            return (
              <div
                key={slot}
                className={clsx(
                  'flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors',
                  !step && 'border-dashed border-white/15 bg-white/[0.02]',
                  step && !checked && 'border-white/10 bg-white/5',
                  correct && 'border-emerald-400/30 bg-emerald-400/10',
                  wrong && 'border-rose-400/30 bg-rose-400/10',
                )}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black text-slate-200">
                  {slot + 1}
                </div>
                {step ? (
                  <button
                    onClick={() => removeFromPlaced(step)}
                    disabled={checked}
                    className="flex flex-1 items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="font-bold text-white">{step.label}</div>
                      {checked && <div className="mt-0.5 text-xs leading-5 text-slate-300">{step.note}</div>}
                    </div>
                    {checked ? (
                      correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" /> : <XCircle className="h-5 w-5 shrink-0 text-rose-300" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Bỏ ra ✕</span>
                    )}
                  </button>
                ) : (
                  <span className="text-sm text-slate-500">Chọn một thẻ ở dưới…</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {pool.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5 shadow-xl backdrop-blur"
          >
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-slate-400">Các thẻ</h3>
            <div className="flex flex-wrap gap-2">
              {pool.map((step) => (
                <motion.button
                  key={step.label}
                  layout
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => placeFromPool(step)}
                  className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-left font-bold text-amber-50 transition-colors hover:bg-amber-400/20"
                >
                  {step.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button
            onClick={check}
            disabled={!allPlaced}
            className={clsx(
              'inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-black transition-transform',
              allPlaced ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 hover:scale-[1.02]' : 'cursor-not-allowed bg-white/5 text-slate-500',
            )}
          >
            Kiểm tra
            <CheckCircle2 className="h-4 w-4" />
          </button>
        ) : (
          <>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              Thử lại
            </button>
            {hasNext && (
              <button
                onClick={() => goRound(roundIdx + 1)}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 hover:scale-[1.02]"
              >
                Vòng tiếp theo
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </>
        )}
      </div>

      {isPerfect && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100"
        >
          <div className="text-lg font-black">Chính xác toàn bộ! +80 XP</div>
          <p className="mt-1 text-sm leading-6">
            Bạn đã nắm đúng trình tự — đây chính là mạch logic dẫn tới luận điểm của Lênin về nguồn gốc nhà nước.
          </p>
        </motion.div>
      )}
    </div>
  );
};
