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
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [error, setError] = useState('');
  const [totalScores, setTotalScores] = useState({ ly_luan: 0, trich_dan: 0, logic: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [dynamicClaim, setDynamicClaim] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

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

  const handleRetryRound = () => {
    if (result) {
      setTotalScores(prev => ({
        ly_luan: prev.ly_luan - result.scores.ly_luan,
        trich_dan: prev.trich_dan - result.scores.trich_dan,
        logic: prev.logic - result.scores.logic
      }));
    }
    setResult(null);
    setTimeLeft(300);
    setShowAnswer(false);
  };

  const handleNextRound = () => {
    if (roundIdx < debateRounds.length - 1) {
      setRoundIdx(prev => prev + 1);
      setResult(null);
      setAnswer('');
      setTimeLeft(300);
      setDynamicClaim(result?.next_claim || '');
      setShowAnswer(false);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setRoundIdx(0);
    setResult(null);
    setAnswer('');
    setTimeLeft(300);
    setIsGameOver(false);
    setDynamicClaim('');
    setTotalScores({ ly_luan: 0, trich_dan: 0, logic: 0 });
    setShowAnswer(false);
  };

  if (isGameOver) {
    const finalScore = Math.round(((totalScores.ly_luan + totalScores.trich_dan + totalScores.logic) / (debateRounds.length * 30)) * 100);
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center border-4 border-[#171210] bg-[#f3ead7] p-8 text-center shadow-[8px_8px_0_#c8281e]">
        <Trophy className="mb-6 h-20 w-20 text-[#c8281e]" />
        <h2 className="text-4xl font-black text-[#171210] font-['Oswald'] uppercase tracking-widest">Hoàn thành Đấu trường!</h2>
        <p className="mt-4 text-xl font-bold text-[#6b5d4f]">Điểm tổng kết của bạn: <span className="text-[#c8281e]">{finalScore}/100</span></p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-base font-bold text-[#171210]">
          <div className="border-2 border-[#171210] bg-white px-5 py-3 shadow-[4px_4px_0_#171210]">Lý luận: {totalScores.ly_luan}</div>
          <div className="border-2 border-[#171210] bg-white px-5 py-3 shadow-[4px_4px_0_#171210]">Trích dẫn: {totalScores.trich_dan}</div>
          <div className="border-2 border-[#171210] bg-white px-5 py-3 shadow-[4px_4px_0_#171210]">Logic: {totalScores.logic}</div>
        </div>
        <button onClick={handleRestart} className="mt-10 border-2 border-[#171210] bg-[#171210] px-8 py-4 font-bold uppercase tracking-widest text-[#f3ead7] shadow-[6px_6px_0_#c8281e] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#c8281e] font-['Oswald']">
          Chơi lại từ đầu
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl border-4 border-[#171210] bg-white shadow-[8px_8px_0_#171210] mb-8">
      <div className="flex flex-wrap items-center justify-between border-b-4 border-[#171210] bg-[#f3ead7] px-6 py-5">
        <div className="flex items-center gap-3 font-bold text-[#171210] text-lg font-['Oswald'] uppercase tracking-widest">
          <ShieldAlert className="h-6 w-6 text-[#c8281e]" />
          Vòng {roundIdx + 1}/{debateRounds.length}
        </div>
        {!result && (
          <div className={clsx("font-['Oswald'] font-black text-2xl tracking-widest", timeLeft <= 30 ? "text-[#c8281e] animate-pulse" : "text-[#171210]")}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-8 border-l-8 border-[#c8281e] bg-[#ece0c8] p-6 shadow-[4px_4px_0_#171210]">
          <p className="text-sm font-black uppercase tracking-widest text-[#c8281e] mb-3 font-['Oswald']">Luận điểm của AI</p>
          <p className="text-xl font-serif text-[#171210] font-bold leading-relaxed">"{activeClaim}"</p>
        </div>

        {!result ? (
          <div className="space-y-6">
            <textarea
              className="w-full border-4 border-[#171210] bg-[#f3ead7] p-5 text-lg text-[#171210] placeholder:text-[#6b5d4f] focus:bg-white focus:outline-none focus:ring-0 transition-colors min-h-[160px] resize-y shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] font-['Bitter']"
              placeholder="Nhập phản biện của bạn (dựa trên lý luận Mác-Lênin)..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={loading}
            />
            {error && <p className="text-base font-bold text-[#c8281e] bg-rose-100 p-3 border-2 border-[#c8281e]">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 border-4 border-[#171210] bg-[#171210] px-6 py-4 font-black uppercase tracking-widest text-[#f3ead7] transition-all hover:bg-[#c8281e] disabled:opacity-70 disabled:hover:bg-[#171210] shadow-[6px_6px_0_#c8281e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#c8281e] font-['Oswald'] text-lg"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
              {loading ? 'Hệ thống đang chấm điểm...' : 'Gửi phản biện'}
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <ScoreCard label="Lý luận" score={result.scores.ly_luan} />
              <ScoreCard label="Trích dẫn" score={result.scores.trich_dan} />
              <ScoreCard label="Logic" score={result.scores.logic} />
            </div>
            
            {/* User Answer Accordion */}
            <div className="border-4 border-[#171210] bg-white shadow-[6px_6px_0_#171210]">
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full flex items-center justify-between p-4 bg-[#f3ead7] hover:bg-white transition-colors"
              >
                <span className="font-black text-[#171210] font-['Oswald'] uppercase tracking-widest text-lg">Bài làm của bạn</span>
                <span className="font-black text-[#c8281e]">{showAnswer ? '▲ ĐÓNG' : '▼ XEM LẠI'}</span>
              </button>
              {showAnswer && (
                <div className="p-5 border-t-4 border-[#171210] bg-white">
                  <p className="text-[#171210] whitespace-pre-line text-lg font-['Bitter']">{answer}</p>
                </div>
              )}
            </div>

            <div className="border-4 border-[#171210] bg-[#f3ead7] p-6 shadow-[6px_6px_0_#171210]">
              <h4 className="font-black text-[#171210] mb-3 text-lg font-['Oswald'] uppercase tracking-widest border-b-2 border-[#171210] pb-2">Nhận xét từ hệ thống:</h4>
              <p className="text-[#171210] leading-relaxed whitespace-pre-line text-lg italic mt-4">{result.feedback}</p>
            </div>

            <div className="border-4 border-[#171210] bg-white p-6 shadow-[6px_6px_0_#c8281e]">
              <h4 className="font-black text-[#c8281e] mb-4 text-lg font-['Oswald'] uppercase tracking-widest border-b-2 border-[#c8281e] pb-2">Gợi ý đáp án (Các ý cần có)</h4>
              <ul className="list-disc pl-5 space-y-2 mb-6 text-[#171210] font-bold text-base">
                {currentRound.expected_points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
              
              <h4 className="font-black text-[#6b5d4f] mb-3 text-sm font-['Oswald'] uppercase tracking-widest">Trích dẫn tham chiếu</h4>
              <p className="text-[#6b5d4f] italic border-l-4 border-[#6b5d4f] pl-4 text-base">
                {currentRound.source_chunk}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetryRound}
                className="w-full border-4 border-[#171210] bg-[#f3ead7] px-6 py-4 font-black uppercase tracking-widest text-[#171210] transition-all hover:bg-[#ece0c8] shadow-[6px_6px_0_#171210] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#171210] font-['Oswald'] text-lg"
              >
                Thử lại vòng này
              </button>
              <button
                onClick={handleNextRound}
                className="w-full border-4 border-[#171210] bg-[#c8281e] px-6 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-[#8f1410] shadow-[6px_6px_0_#171210] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#171210] font-['Oswald'] text-lg"
              >
                {roundIdx < debateRounds.length - 1 ? 'Tiếp tục Vòng sau' : 'Xem kết quả chung cuộc'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  let colorClass = 'text-[#171210] bg-emerald-400';
  if (score < 5) colorClass = 'text-white bg-[#c8281e]';
  else if (score < 8) colorClass = 'text-[#171210] bg-[#d8a13a]';
  
  return (
    <div className="flex flex-col items-center border-4 border-[#171210] bg-white shadow-[6px_6px_0_#171210] overflow-hidden">
      <div className="w-full bg-[#171210] text-[#f3ead7] py-2 text-center text-sm font-bold uppercase tracking-widest font-['Oswald'] border-b-4 border-[#171210]">
        {label}
      </div>
      <div className={clsx("w-full py-6 text-center text-4xl font-black font-['Oswald']", colorClass)}>
        {score}/10
      </div>
    </div>
  );
}
