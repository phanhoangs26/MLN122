import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { timelineRounds } from '../../data/stateContent';
import { useGameStore } from '../../store';
import { shuffle } from '../../utils/shuffle';

type Step = { label: string; note: string; correctIndex: number };

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
  const [wrongFlash, setWrongFlash] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const done = placed.length === ordered.length;
  const currentSlot = placed.length;

  const reset = (idx = roundIdx) => {
    const r = timelineRounds[idx];
    const steps = r.steps.map((s, i) => ({ ...s, correctIndex: i }));
    setPool(shuffle(steps));
    setPlaced([]);
    setWrongFlash(false);
  };

  const goRound = (idx: number) => {
    setRoundIdx(idx);
    setExpandedQuestion(null);
    reset(idx);
  };

  useEffect(() => {
    if (done) {
      addXp(80);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [done]);

  const placeFromPool = (step: Step) => {
    if (done) return;
    if (step.correctIndex === currentSlot) {
      setPool((p) => p.filter((s) => s.label !== step.label));
      setPlaced((p) => [...p, step]);
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 500);
    }
  };

  const hasNext = roundIdx < timelineRounds.length - 1;

  return (
    <div>
      {/* Header */}
      <div className="border-l-4 border-red-600 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Sắp xếp dòng thời gian</div>
            <h2 className="mt-2 font-serif text-2xl font-black text-slate-950 md:text-3xl">{round.title}</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700">{round.prompt}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">Vòng</div>
            <div className="text-2xl font-black text-slate-950">{roundIdx + 1}/{timelineRounds.length}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {timelineRounds.map((r, i) => (
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

      {/* Timeline slots */}
      <div className="mt-6 rounded border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-red-600">Thứ tự của bạn</h3>
          {done && (
            <span className="rounded bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Hoàn thành!
            </span>
          )}
        </div>

        <div className="space-y-2">
          {ordered.map((_, slot) => {
            const step = placed[slot];
            const isActive = !done && slot === currentSlot;
            const isCorrect = !!step;
            return (
              <div
                key={slot}
                className={clsx(
                  'flex items-center gap-3 rounded border px-3 py-3 transition-all duration-200',
                  isCorrect && 'border-emerald-300 bg-emerald-50',
                  isActive && !wrongFlash && 'border-red-300 bg-red-50',
                  isActive && wrongFlash && 'border-rose-500 bg-rose-100',
                  !isCorrect && !isActive && 'border-dashed border-slate-200 bg-slate-50',
                )}
              >
                <div className={clsx(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-black transition-colors',
                  isCorrect ? 'border-emerald-300 bg-emerald-100 text-emerald-700' : 'border-slate-200 bg-white text-slate-700',
                )}>
                  {slot + 1}
                </div>
                {step ? (
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-950">{step.label}</div>
                      {done && <div className="mt-0.5 text-xs leading-5 text-slate-600">{step.note}</div>}
                    </div>
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  </div>
                ) : isActive ? (
                  <span className="text-sm font-semibold text-red-500">
                    {wrongFlash ? 'Sai rồi, thử lại…' : 'Chọn thẻ tiếp theo ↓'}
                  </span>
                ) : (
                  <span className="text-sm text-slate-300">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card pool */}
      <AnimatePresence>
        {!done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 rounded border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-red-600">Các thẻ</h3>
            <div className="flex flex-wrap gap-2">
              {pool.map((step) => (
                <motion.button
                  key={step.label}
                  layout
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => placeFromPool(step)}
                  className="rounded border border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-slate-800 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                >
                  {step.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {done && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:border-red-300 hover:text-red-600"
          >
            <RotateCcw className="h-4 w-4" />
            Thử lại
          </button>
          {hasNext && (
            <button
              onClick={() => goRound(roundIdx + 1)}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-5 py-3 font-black text-white hover:bg-red-700"
            >
              Vòng tiếp theo
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Success message */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded border border-emerald-200 bg-emerald-50 p-5 text-emerald-800"
        >
          <div className="flex items-center gap-2 text-lg font-black">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            Chính xác!
          </div>
          {round.successInsight && (
            <p className="mt-3 border-l-4 border-emerald-400 pl-4 text-sm leading-7 text-emerald-900">
              {round.successInsight}
            </p>
          )}
        </motion.div>
      )}

      {/* Questions Section */}
      {round.questions && round.questions.length > 0 && (
        <div className="mt-6 rounded border border-red-200 bg-red-50 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-red-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-red-600">Câu hỏi ôn tập</h3>
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
    </div>
  );
};
