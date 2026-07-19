// src/pages/Games.tsx
// Hub trang chọn minigame

import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Layout } from '@/components/Layout';
import { usePassportStore } from '@/store/passportStore';

const games = [
  {
    id: 'quiz',
    to: '/games/quiz',
    title: 'Trắc Nghiệm Nhanh',
    emoji: '📝',
    desc: 'Trả lời nhanh các câu hỏi trắc nghiệm về hội nhập kinh tế quốc tế.',
    difficulty: 'Cơ bản',
    maxScore: 100,
    color: '#C08A2E',
    hint: 'Đọc kỹ câu hỏi và chọn một đáp án đúng nhất.',
  },
  {
    id: 'match',
    to: '/games/match',
    title: 'Nối Khái Niệm',
    emoji: '🔗',
    desc: 'Ghép 5 mức độ hội nhập và 4 hình thức kinh tế đối ngoại với đúng định nghĩa của chúng.',
    difficulty: 'Trung bình',
    maxScore: 90,
    color: '#3B82F6',
    hint: 'Chọn thuật ngữ bên trái rồi chọn định nghĩa bên phải để nối.',
  },
];

export default function Games() {
  const navigate = useNavigate();
  const quizScore = usePassportStore(s => s.quizScore);
  const matchScore = usePassportStore(s => s.matchScore);

  const scores: Record<string, number> = {
    quiz: quizScore,
    match: matchScore,
  };

  return (
    <Layout>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #13315C 0%, #0B2545 100%)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
      }}>
        <div className="wrap">
          <span className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>🎮 MINIGAME ÔN TẬP</span>
          <h1>Ôn luyện qua trò chơi</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Ba trò chơi tương tác giúp bạn củng cố kiến thức về hội nhập kinh tế quốc tế.
          </p>
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '1rem', borderRadius: 'var(--radius)', marginTop: '1.5rem', color: 'var(--paper)' }}>
            <strong>💡 Hướng dẫn chung:</strong> Nhấn chọn một trong các trò chơi bên dưới. Với mỗi trò chơi, bạn sẽ sử dụng thao tác <strong>kéo thả</strong> các thẻ thông tin hoặc <strong>nhấp chọn để nối đáp án</strong>. Hãy đọc kỹ phần gợi ý ở từng tựa game!
          </div>
        </div>
      </section>

      {/* Game cards */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {games.map((game, i) => {
              const myScore = scores[game.id] || 0;
              const pct = Math.round((myScore / game.maxScore) * 100);

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(game.to)}
                  style={{
                    background: 'var(--navy-mid)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${game.color}33`,
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(game.to)}
                  aria-label={`Chơi ${game.title}`}
                >
                  {/* Emoji */}
                  <div style={{
                    width: 64,
                    height: 64,
                    background: `${game.color}15`,
                    border: `1.5px solid ${game.color}40`,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}>
                    {game.emoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                      <h3 style={{ color: 'var(--paper)', fontSize: '1.1rem', margin: 0 }}>{game.title}</h3>
                      <span className="tag" style={{
                        background: `${game.color}15`,
                        color: game.color,
                        borderColor: `${game.color}30`,
                      }}>
                        {game.difficulty}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                      {game.desc}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                      💡 {game.hint}
                    </p>

                    {/* Score bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          Điểm cao nhất
                        </span>
                        <span style={{ fontSize: '0.72rem', color: game.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {myScore} / {game.maxScore}
                        </span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(242,234,215,0.1)', borderRadius: 2 }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                          style={{ height: '100%', background: game.color, borderRadius: 2 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{
                    alignSelf: 'center',
                    fontSize: '1.2rem',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    →
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
