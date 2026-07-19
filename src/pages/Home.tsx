// src/pages/Home.tsx
// Trang chủ — "Hộ chiếu hội nhập"

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BookOpen, Gamepad2, Info, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { StampBadge } from '@/components/StampBadge';
import { usePassportStore } from '@/store/passportStore';
import { chapters } from '@/data/chapters';

const sections = [
  {
    to: '/theory',
    no: '01',
    icon: BookOpen,
    title: 'Thư viện lý thuyết',
    desc: '3 chương về khái niệm, nội dung hội nhập và liên hệ thực tiễn Việt Nam. Đọc xong mỗi chương nhận dấu Passport 2.0.',
    color: '#C08A2E',
  },
  {
    to: '/games',
    no: '02',
    icon: Gamepad2,
    title: 'Minigame ôn tập',
    desc: 'Chơi các trò chơi tương tác như: kéo thả sắp xếp các mốc thời gian lịch sử và nối các khái niệm kinh tế phù hợp để củng cố kiến thức.',
    color: '#3B82F6',
  },

  {
    to: '/about',
    no: '03',
    icon: Info,
    title: 'Giới thiệu dự án',
    desc: 'Tìm hiểu về mục tiêu, ý nghĩa và đội ngũ thực hiện dự án "Passport 2.0 Hội nhập".',
    color: '#8B5CF6',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const stampedChapters = usePassportStore(s => s.stampedChapters);
  const playerName = usePassportStore(s => s.playerName);
  const setPlayerName = usePassportStore(s => s.setPlayerName);
  const getTotalScore = usePassportStore(s => s.getTotalScore);
  const [nameInput, setNameInput] = useState(playerName);
  const [nameSaved, setNameSaved] = useState(!!playerName);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setNameSaved(true);
    }
  };

  const totalStamps = Object.values(stampedChapters).filter(Boolean).length;

  return (
    <Layout>
      {/* ── Hero Section ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0B2545 0%, #13315C 50%, #0B2545 100%)',
          borderBottom: '1px solid rgba(192,138,46,0.2)',
          padding: 'clamp(3rem, 8vw, 6rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(192,138,46,0.5) 39px, rgba(192,138,46,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(192,138,46,0.5) 39px, rgba(192,138,46,0.5) 40px)',
          pointerEvents: 'none',
        }} />

        <div className="wrap" style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="tag" style={{ marginBottom: '1.5rem' }}>
              KINH TẾ CHÍNH TRỊ MÁC–LÊNIN · CHUYÊN ĐỀ
            </div>

            <h1 style={{ marginBottom: '1rem', maxWidth: 700 }}>
              Hội Nhập Kinh Tế{' '}
              <em style={{ color: 'var(--brass)', fontStyle: 'italic' }}>Quốc Tế</em>
              <br />của Việt Nam
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--text-muted)',
              maxWidth: 560,
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}>
              Từ Đổi mới 1986 đến CPTPP, EVFTA và RCEP — hành trình hội nhập của Việt Nam
              qua lý thuyết và các minigame tương tác.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <button className="btn-brass" onClick={() => navigate('/theory')}>
                Bắt đầu học <ArrowRight size={16} />
              </button>
              <button className="btn-ghost" onClick={() => navigate('/games')}>
                <Gamepad2 size={16} /> Chơi minigame
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Passport Progress ── */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Passport card */}
            <div style={{
              background: 'var(--paper)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              maxWidth: 720,
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Watermark */}
              <div style={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                fontSize: 120,
                opacity: 0.04,
                color: '#17233A',
                pointerEvents: 'none',
                userSelect: 'none',
                fontFamily: 'var(--font-display)',
              }}>
                🛂
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'var(--stamp)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                    }}>
                      PASSPORT 2.0 HỌC TẬP
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
                      EDUCATIONAL PASSPORT 2.0 · HỘI NHẬP KINH TẾ QUỐC TẾ
                    </div>
                  </div>

                  {/* Name input */}
                  {!nameSaved ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Nhập tên của bạn..."
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                        style={{
                          background: 'var(--paper-dark)',
                          border: '1px solid rgba(23,35,58,0.3)',
                          borderRadius: 'var(--radius)',
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.85rem',
                          color: 'var(--ink)',
                          fontFamily: 'var(--font-body)',
                          minWidth: 320,
                        }}
                      />
                      <button
                        onClick={handleSaveName}
                        style={{
                          background: 'var(--stamp)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 'var(--radius)',
                          padding: '0.4rem 0.9rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                        NGƯỜI HỌC
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                      }}>
                        {playerName}
                      </div>
                      <button
                        onClick={() => setNameSaved(false)}
                        style={{ background: 'none', border: 'none', fontSize: '0.7rem', color: 'var(--ink-faint)', cursor: 'pointer', padding: 0 }}
                      >
                        đổi tên
                      </button>
                    </div>
                  )}
                </div>

                {/* Stamps row */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'var(--ink-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}>
                    DẤU NHẬP CẢNH ({totalStamps}/3 chương hoàn thành)
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {chapters.map(ch => (
                      <div key={ch.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <StampBadge
                          label={ch.stampLabel}
                          number={`Ch.${ch.number}`}
                          achieved={stampedChapters[ch.id] || false}
                          size={90}
                        />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          color: 'var(--ink-muted)',
                          textAlign: 'center',
                          maxWidth: 80,
                        }}>
                          {ch.title.split(' ').slice(0, 3).join(' ')}...
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MRZ strip */}
                <div style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px dashed rgba(23,35,58,0.2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.12em',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                }}>
                  {'VNMLEARNER<<' + (playerName || 'ANONYMOUS').toUpperCase().replace(/ /g,'<').padEnd(19,'<') + '<<<<<<<'}
                  <br />
                  {'HNKTE' + String(getTotalScore()).padStart(3,'0') + '<<2026' + totalStamps + 'STMPS<<<<<<<<<<<<<<<<<<'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── YouTube Section ── */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <span className="tag tag-paper">VIDEO NỔI BẬT</span>
            <h2 style={{ marginTop: '0.75rem' }}>Khám phá nhanh</h2>
          </div>
          <div style={{ 
            width: '100%', 
            maxWidth: 800,
            aspectRatio: '16/9', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            border: '1px solid var(--border)'
          }}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/IiP51sJfgFU" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="wrap">
          <div style={{ marginBottom: '2rem' }}>
            <span className="tag tag-paper">MỤC LỤC</span>
            <h2 style={{ marginTop: '0.75rem' }}>Các tính năng học tập</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            {sections.map((s, i) => {
              const Icon = !s.isEmoji ? s.icon as React.ElementType : null;
              return (
                <motion.div
                  key={s.to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => navigate(s.to)}
                  style={{
                    background: 'var(--navy-mid)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                  whileHover={{ y: -4, boxShadow: `0 12px 30px rgba(0,0,0,0.4)` }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(s.to)}
                  aria-label={`Truy cập ${s.title}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                    }}>{s.no}</span>
                    {Icon ? (
                      <Icon size={22} color={s.color} />
                    ) : (
                      <span style={{ fontSize: 22 }}>{s.icon as string}</span>
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--paper)' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: s.color,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginTop: 'auto',
                  }}>
                    TRUY CẬP <ArrowRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Learning Path ── */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
        <div className="wrap">
          <div style={{ marginBottom: '2rem' }}>
            <span className="tag">LỘ TRÌNH</span>
            <h2 style={{ marginTop: '0.75rem' }}>Hành trình học tập gợi ý</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}>
            {[
              { step: '01', title: 'Đọc lý thuyết', desc: 'Nắm 3 chương, nhận 3 dấu Passport 2.0 khi hoàn thành', icon: '📖' },
              { step: '02', title: 'Chinh phục minigame', desc: 'Thao tác kéo thả và nối đáp án để vượt qua các thử thách', icon: '🎮' },
              { step: '03', title: 'Khám phá dự án', desc: 'Tìm hiểu thêm về định hướng và thông tin của dự án', icon: 'ℹ️' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: '2px solid var(--brass)',
                  background: 'rgba(192,138,46,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--brass)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    BƯỚC {item.step}
                  </div>
                  <h4 style={{ color: 'var(--paper)', marginBottom: '0.35rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
