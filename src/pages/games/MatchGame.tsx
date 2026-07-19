// src/pages/games/MatchGame.tsx
// Minigame "Nối khái niệm" — 5 mức độ hội nhập + 4 hình thức kinh tế đối ngoại

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trophy, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '@/components/Layout';
import { allMatchItems, matchGroups, type MatchItem } from '@/data/matchGame';
import { usePassportStore } from '@/store/passportStore';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchGame() {
  const navigate = useNavigate();
  const setMatchScore = usePassportStore(s => s.setMatchScore);
  const bestScore = usePassportStore(s => s.matchScore);

  const [shuffledDefs, setShuffledDefs] = useState(() => shuffle(allMatchItems));
  const [selected, setSelected] = useState<string | null>(null); // term id selected
  const [matched, setMatched] = useState<Record<string, string>>({}); // termId → defId
  const [wrong, setWrong] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeGroup, setActiveGroup] = useState<'level' | 'form'>('level');

  const currentItems = allMatchItems.filter(i => i.category === activeGroup);
  const currentDefs = shuffledDefs.filter(i => i.category === activeGroup);

  const handleTermClick = (id: string) => {
    if (submitted) return;
    if (matched[id]) return; // already matched
    setSelected(id === selected ? null : id);
    setWrong(null);
  };

  const handleDefClick = (defId: string) => {
    if (submitted) return;
    if (!selected) return;
    // Check if this def is already used
    const alreadyUsed = Object.values(matched).includes(defId);
    if (alreadyUsed) return;

    if (selected === defId) {
      // Correct match
      setMatched(m => ({ ...m, [selected]: defId }));
      setSelected(null);
      setWrong(null);
    } else {
      // Wrong match
      setWrong(defId);
      setTimeout(() => setWrong(null), 800);
    }
  };

  const reset = useCallback(() => {
    setShuffledDefs(shuffle(allMatchItems));
    setSelected(null);
    setMatched({});
    setWrong(null);
    setSubmitted(false);
    setScore(0);
    setActiveGroup('level');
  }, []);

  const handleSubmit = () => {
    const total = allMatchItems.length;
    const correct = Object.entries(matched).filter(([termId, defId]) => termId === defId).length;
    const pts = Math.round((correct / total) * 90);
    setScore(pts);
    setSubmitted(true);
    setMatchScore(pts);
  };

  const matchedCount = Object.keys(matched).filter(k => k.category === activeGroup || true).length;
  const totalItems = allMatchItems.length;
  const allGroupMatched = currentItems.every(i => matched[i.id]);

  return (
    <Layout>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #13315C 0%, #0B2545 100%)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
      }}>
        <div className="wrap">
          <button
            onClick={() => navigate('/games')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.8rem', marginBottom: '1rem', padding: 0,
            }}
          >
            <ArrowLeft size={14} /> Quay lại Minigame
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tag" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>🔗 MATCH GAME</span>
              <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>Nối Khái Niệm</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.35rem' }}>
                Chọn thuật ngữ → chọn định nghĩa phù hợp. {matchedCount}/{totalItems} cặp đã nối.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bestScore > 0 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  background: 'rgba(192,138,46,0.12)', border: '1px solid rgba(192,138,46,0.3)',
                  borderRadius: 'var(--radius)', padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem', color: 'var(--brass)', fontFamily: 'var(--font-mono)',
                }}>
                  <Trophy size={12} /> Kỷ lục: {bestScore}/90
                </div>
              )}
              <button onClick={reset} className="btn-ghost" style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
                <RefreshCw size={13} /> Làm lại
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0' }}>
        <div className="wrap">
          {!submitted ? (
            <>
              {/* Group tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {matchGroups.map(g => {
                  const cat = g.items[0].category;
                  const groupMatched = g.items.filter(i => matched[i.id]).length;
                  const isActive = activeGroup === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveGroup(cat)}
                      style={{
                        flex: 1,
                        padding: '0.6rem 1rem',
                        borderRadius: 'var(--radius)',
                        border: `1px solid ${isActive ? 'var(--brass)' : 'var(--border)'}`,
                        background: isActive ? 'rgba(192,138,46,0.12)' : 'transparent',
                        color: isActive ? 'var(--brass)' : 'var(--text-muted)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {g.label}
                      <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                        ({groupMatched}/{g.items.length})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Game grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Terms (left) */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Thuật ngữ
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {currentItems.map(item => {
                      const isMatched = !!matched[item.id];
                      const isSelected = selected === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => handleTermClick(item.id)}
                          whileHover={!isMatched ? { scale: 1.02 } : {}}
                          whileTap={!isMatched ? { scale: 0.98 } : {}}
                          style={{
                            background: isMatched
                              ? 'rgba(16,185,129,0.1)'
                              : isSelected
                              ? 'rgba(192,138,46,0.15)'
                              : 'var(--navy-mid)',
                            border: `2px solid ${isMatched ? '#10B981' : isSelected ? 'var(--brass)' : 'var(--border)'}`,
                            borderRadius: 'var(--radius)',
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            cursor: isMatched ? 'default' : 'pointer',
                            color: isMatched ? '#10B981' : 'var(--paper)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                          aria-pressed={isSelected}
                          aria-label={`Thuật ngữ: ${item.term}`}
                        >
                          {isMatched && <CheckCircle size={14} />}
                          {item.term}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Definitions (right) */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Định nghĩa
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {currentDefs.filter(i => i.category === activeGroup).map(item => {
                      const isUsed = Object.values(matched).includes(item.id);
                      const isWrong = wrong === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => handleDefClick(item.id)}
                          animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                          transition={{ duration: 0.3 }}
                          style={{
                            background: isUsed
                              ? 'rgba(16,185,129,0.08)'
                              : isWrong
                              ? 'rgba(163,50,58,0.15)'
                              : selected
                              ? 'rgba(242,234,215,0.05)'
                              : 'var(--navy-mid)',
                            border: `1.5px solid ${isUsed ? 'rgba(16,185,129,0.3)' : isWrong ? 'rgba(163,50,58,0.5)' : selected ? 'rgba(192,138,46,0.3)' : 'var(--border)'}`,
                            borderRadius: 'var(--radius)',
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            cursor: isUsed || !selected ? 'default' : 'pointer',
                            color: isUsed ? '#10B981' : isWrong ? 'var(--stamp)' : 'rgba(242,234,215,0.8)',
                            fontSize: '0.78rem',
                            lineHeight: 1.5,
                            transition: 'all 0.2s',
                            minHeight: 60,
                          }}
                          aria-label={`Định nghĩa: ${item.definition.slice(0, 40)}...`}
                        >
                          {item.definition}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Group completion hint */}
              {allGroupMatched && activeGroup === 'level' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 'var(--radius)',
                  color: '#10B981',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                }}>
                  ✅ Nhóm đầu hoàn thành! Chuyển sang nhóm tiếp theo →
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="btn-brass"
                style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', padding: '0.875rem' }}
                id="submit-match"
              >
                Nộp bài ✓
              </button>
            </>
          ) : (
            /* Results */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                textAlign: 'center',
                background: 'rgba(192,138,46,0.08)',
                border: '1px solid rgba(192,138,46,0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{ fontSize: 48, marginBottom: '0.5rem' }}>
                  {score >= 80 ? '🏆' : score >= 60 ? '✅' : '📝'}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 700, color: 'var(--brass)', lineHeight: 1 }}>
                  {score}/90
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {Object.entries(matched).filter(([k, v]) => k === v).length}/{allMatchItems.length} cặp đúng
                </div>
              </div>

              {/* Show correct answers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {allMatchItems.map(item => {
                  const userDef = matched[item.id];
                  const isCorrect = userDef === item.id;
                  return (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '0.75rem',
                      background: isCorrect ? 'rgba(16,185,129,0.07)' : 'rgba(163,50,58,0.07)',
                      border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(163,50,58,0.2)'}`,
                      borderRadius: 'var(--radius)',
                      padding: '0.75rem 1rem',
                    }}>
                      <span style={{ color: isCorrect ? '#10B981' : '#A3323A', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem' }}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--paper)', marginBottom: '0.25rem' }}>{item.term}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.definition}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button onClick={reset} className="btn-brass"><RefreshCw size={14} /> Chơi lại</button>
                <button onClick={() => navigate('/games')} className="btn-ghost">← Về Minigame</button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
