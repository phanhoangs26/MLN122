// src/pages/games/QuizGame.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { usePassportStore } from '@/store/passportStore';

const quizData = [
  {
    question: 'Hiệp định EVFTA có hiệu lực vào năm nào?',
    options: ['2019', '2020', '2021', '2022'],
    answer: 1, // 2020
  },
  {
    question: 'Việt Nam gia nhập ASEAN vào thời gian nào?',
    options: ['Tháng 7/1995', 'Tháng 1/2007', 'Tháng 11/1998', 'Tháng 12/2015'],
    answer: 0,
  },
  {
    question: 'WTO là tổ chức gì?',
    options: ['Tổ chức Y tế Thế giới', 'Tổ chức Thương mại Thế giới', 'Quỹ Tiền tệ Quốc tế', 'Ngân hàng Thế giới'],
    answer: 1,
  },
  {
    question: 'CPTPP là Hiệp định Đối tác Toàn diện và Tiến bộ xuyên:',
    options: ['Đại Tây Dương', 'Châu Âu', 'Thái Bình Dương', 'Châu Á'],
    answer: 2,
  },
];

export default function QuizGame() {
  const navigate = useNavigate();
  const setQuizScore = usePassportStore(s => s.setQuizScore);
  const bestScore = usePassportStore(s => s.quizScore);
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    
    if (index === quizData[currentQ].answer) {
      setScore(s => s + 25);
    }

    setTimeout(() => {
      if (currentQ < quizData.length - 1) {
        setCurrentQ(c => c + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
      } else {
        const finalScore = score + (index === quizData[currentQ].answer ? 25 : 0);
        setQuizScore(finalScore);
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
    setIsAnswered(false);
  };

  return (
    <Layout>
      <div style={{ background: 'var(--navy)', minHeight: 'calc(100vh - 60px)', padding: '2rem 0' }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <button 
            onClick={() => navigate('/games')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          
          {!showResult ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={currentQ}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--brass)', fontFamily: 'var(--font-mono)' }}>
                <span>Câu {currentQ + 1} / {quizData.length}</span>
                <span>Điểm: {score}</span>
              </div>
              
              <div className="card-navy" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>{quizData[currentQ].question}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {quizData[currentQ].options.map((opt, i) => {
                    const isCorrect = i === quizData[currentQ].answer;
                    const isSelected = selectedOpt === i;
                    
                    let bg = 'rgba(242,234,215,0.05)';
                    let border = '1px solid var(--border)';
                    
                    if (isAnswered) {
                      if (isCorrect) {
                        bg = 'rgba(34,197,94,0.15)';
                        border = '1px solid rgba(34,197,94,0.5)';
                      } else if (isSelected && !isCorrect) {
                        bg = 'rgba(239,68,68,0.15)';
                        border = '1px solid rgba(239,68,68,0.5)';
                      }
                    } else if (isSelected) {
                      bg = 'rgba(192,138,46,0.15)';
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={isAnswered}
                        style={{
                          background: bg,
                          border,
                          padding: '1rem',
                          borderRadius: 'var(--radius)',
                          color: 'var(--paper)',
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                          cursor: isAnswered ? 'default' : 'pointer'
                        }}
                      >
                        {opt}
                        {isAnswered && isCorrect && <CheckCircle size={18} color="#22c55e" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h2>Hoàn thành!</h2>
              <p style={{ margin: '1rem 0 2rem', color: 'var(--text-muted)' }}>
                Bạn đã trả lời xong các câu hỏi trắc nghiệm.
              </p>
              
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--brass)', marginBottom: '2rem' }}>
                {score} / 100
              </div>
              
              <p style={{ marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                Điểm cao nhất: {bestScore}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn-ghost" onClick={resetGame}>
                  <RotateCcw size={16} /> Chơi lại
                </button>
                <button className="btn-brass" onClick={() => navigate('/games')}>
                  Về kho minigame
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}
