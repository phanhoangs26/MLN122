import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { debateRounds } from '../../data/debateData';
import { ShieldAlert, Trophy, Loader2, Send } from 'lucide-react';
import clsx from 'clsx';

type JudgeResult = {
  scores: { ly_luan: number; trich_dan: number; logic: number };
  feedback: string;
  next_claim?: string;
};

export function DebateGame() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [error, setError] = useState('');
  const [totalScores, setTotalScores] = useState({ ly_luan: 0, trich_dan: 0, logic: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [dynamicClaim, setDynamicClaim] = useState('');

  const currentRound = debateRounds[roundIdx];
  const activeClaim = dynamicClaim || currentRound?.claim;

  useEffect(() => {
    if (result || isGameOver || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [result, isGameOver, loading, roundIdx]);

  const handleSubmit = async () => {
    const text = answer.trim();
    if (text.length < 10 && timeLeft > 0) {
      setError('Câu trả lời quá ngắn, hãy lập luận thêm!');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: activeClaim,
          user_answer: text || '(Không có câu trả lời)',
          expected_points: currentRound.expected_points,
          source_chunk: currentRound.source_chunk
        })
      });

      if (!res.ok) throw new Error('Lỗi từ hệ thống chấm điểm');
      
      const data: JudgeResult = await res.json();
      setResult(data);
      setTotalScores(prev => ({
        ly_luan: prev.ly_luan + data.scores.ly_luan,
        trich_dan: prev.trich_dan + data.scores.trich_dan,
        logic: prev.logic + data.scores.logic
      }));
    } catch (err: any) {
      setError('Có lỗi xảy ra: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextRound = () => {
    if (roundIdx < debateRounds.length - 1) {
      setRoundIdx(prev => prev + 1);
      setResult(null);
      setAnswer('');
      setTimeLeft(60);
      setDynamicClaim(result?.next_claim || '');
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setRoundIdx(0);
    setResult(null);
    setAnswer('');
    setTimeLeft(60);
    setIsGameOver(false);
    setDynamicClaim('');
    setTotalScores({ ly_luan: 0, trich_dan: 0, logic: 0 });
  };

  if (isGameOver) {
    const finalScore = Math.round(((totalScores.ly_luan + totalScores.trich_dan + totalScores.logic) / (debateRounds.length * 30)) * 100);
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm border border-slate-200">
        <Trophy className="mb-4 h-16 w-16 text-yellow-500" />
        <h2 className="text-3xl font-black text-slate-800">Hoàn thành Đấu trường!</h2>
        <p className="mt-2 text-slate-600">Điểm tổng kết của bạn: {finalScore}/100</p>
        <div className="mt-6 flex gap-4 text-sm font-bold text-slate-600">
          <div className="rounded-lg bg-slate-50 px-4 py-2 border border-slate-100">Lý luận: {totalScores.ly_luan}</div>
          <div className="rounded-lg bg-slate-50 px-4 py-2 border border-slate-100">Trích dẫn: {totalScores.trich_dan}</div>
          <div className="rounded-lg bg-slate-50 px-4 py-2 border border-slate-100">Logic: {totalScores.logic}</div>
        </div>
        <button onClick={handleRestart} className="mt-8 rounded bg-red-600 px-6 py-2.5 font-bold text-white shadow-sm hover:bg-red-700">Chơi lại</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 rounded-t-xl">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <ShieldAlert className="h-5 w-5 text-red-600" />
          Vòng {roundIdx + 1}/{debateRounds.length}
        </div>
        {!result && (
          <div className={clsx("font-mono font-bold text-lg", timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-slate-600")}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-100">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-2">Luận điểm của AI</p>
          <p className="text-lg font-serif text-slate-900 font-medium">"{activeClaim}"</p>
        </div>

        {!result ? (
          <div className="space-y-4">
            <textarea
              className="w-full rounded-lg border border-slate-200 p-4 text-slate-800 placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-shadow min-h-[120px] resize-y"
              placeholder="Nhập phản biện của bạn (dựa trên lý luận Mác-Lênin)..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={loading}
            />
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-bold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              {loading ? 'AI đang chấm điểm...' : 'Gửi phản biện'}
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <ScoreCard label="Lý luận" score={result.scores.ly_luan} />
              <ScoreCard label="Trích dẫn" score={result.scores.trich_dan} />
              <ScoreCard label="Logic" score={result.scores.logic} />
            </div>
            
            <div className="rounded-lg bg-slate-50 p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">Nhận xét từ AI:</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{result.feedback}</p>
            </div>

            <button
              onClick={handleNextRound}
              className="w-full rounded-lg bg-red-600 px-4 py-3 font-bold text-white transition-colors hover:bg-red-700"
            >
              {roundIdx < debateRounds.length - 1 ? 'Tiếp tục Vòng sau' : 'Xem kết quả chung cuộc'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  let color = 'text-green-600';
  if (score < 5) color = 'text-red-600';
  else if (score < 8) color = 'text-yellow-600';
  
  return (
    <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <span className="text-xs font-bold uppercase text-slate-500 mb-1">{label}</span>
      <span className={clsx("text-2xl font-black", color)}>{score}/10</span>
    </div>
  );
}
