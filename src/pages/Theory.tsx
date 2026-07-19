// src/pages/Theory.tsx
// Thư viện lý thuyết — "Trang hộ chiếu" 3 chương

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, ChevronDown, ChevronRight, Quote } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { StampBadge } from '@/components/StampBadge';
import { chapters } from '@/data/chapters';
import { usePassportStore } from '@/store/passportStore';

export default function Theory() {
  const { readSections, stampedChapters, markSectionRead, getSectionProgress } = usePassportStore();
  const [openChapter, setOpenChapter] = useState<string>(chapters[0].id);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleMarkRead = (sectionId: string) => {
    markSectionRead(sectionId);
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
          <span className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            <BookOpen size={10} style={{ display: 'inline', marginRight: 4 }} />
            THƯ VIỆN LÝ THUYẾT
          </span>
          <h1 style={{ marginBottom: '0.5rem' }}>Giáo trình học phần</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, fontSize: '0.95rem' }}>
            Đọc từng mục và đánh dấu hoàn thành. Khi đọc xong toàn bộ một chương, bạn sẽ nhận được dấu Passport 2.0.
          </p>

          {/* Chapter stamps overview */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {chapters.map(ch => {
              const prog = getSectionProgress(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => setOpenChapter(ch.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: openChapter === ch.id ? 'rgba(192,138,46,0.12)' : 'rgba(242,234,215,0.05)',
                    border: `1px solid ${openChapter === ch.id ? 'var(--brass)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <StampBadge
                    label={ch.stampLabel}
                    number={`Ch.${ch.number}`}
                    achieved={stampedChapters[ch.id] || false}
                    size={50}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--brass)', letterSpacing: '0.05em' }}>
                      CHƯƠNG {ch.number}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--paper)', fontWeight: 600 }}>
                      {prog.read}/{prog.total} mục
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
        <div className="wrap">
          {chapters.map(ch => (
            <motion.div
              key={ch.id}
              style={{
                display: openChapter === ch.id ? 'block' : 'none',
              }}
            >
              {/* Chapter header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--border)',
              }}>
                <StampBadge
                  label={ch.stampLabel}
                  number={`Ch.${ch.number}`}
                  achieved={stampedChapters[ch.id] || false}
                  size={80}
                />
                <div>
                  <div className="data-mono" style={{ marginBottom: '0.4rem' }}>CHƯƠNG {ch.number}</div>
                  <h2 style={{ marginBottom: '0.35rem' }}>{ch.title}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{ch.subtitle}</p>
                  {stampedChapters[ch.id] && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      marginTop: '0.75rem',
                      background: 'rgba(163,50,58,0.15)',
                      border: '1px solid rgba(163,50,58,0.4)',
                      borderRadius: 'var(--radius)',
                      padding: '0.3rem 0.7rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--stamp)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      <CheckCircle size={12} /> Đã đóng dấu ✓
                    </div>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {ch.sections.map((sec, sIdx) => {
                  const isRead = readSections[sec.id] || false;
                  const isOpen = openSection === sec.id;

                  return (
                    <motion.div
                      key={sec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sIdx * 0.08 }}
                      style={{
                        background: isRead
                          ? 'rgba(163,50,58,0.06)'
                          : 'var(--navy-mid)',
                        border: `1px solid ${isRead ? 'rgba(163,50,58,0.3)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        transition: 'border-color 0.3s ease',
                      }}
                    >
                      {/* Section header */}
                      <button
                        id={`section-toggle-${sec.id}`}
                        aria-expanded={isOpen}
                        aria-controls={`section-content-${sec.id}`}
                        onClick={() => setOpenSection(isOpen ? null : sec.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem 1.25rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {/* Read indicator */}
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: `2px solid ${isRead ? 'var(--stamp)' : 'var(--border)'}`,
                          background: isRead ? 'var(--stamp)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                        }}>
                          {isRead && <CheckCircle size={14} color="#fff" />}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            marginBottom: '0.2rem',
                          }}>
                            MỤC {sIdx + 1}
                          </div>
                          <div style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: isRead ? 'rgba(242,234,215,0.6)' : 'var(--paper)',
                          }}>
                            {sec.title}
                          </div>
                        </div>

                        {isOpen ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                      </button>

                      {/* Section content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={`section-content-${sec.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '0 1.25rem 1.5rem 1.25rem' }}>
                              {/* Highlight quote */}
                              {sec.highlight && (
                                <div style={{
                                  background: 'rgba(192,138,46,0.08)',
                                  border: '1px solid rgba(192,138,46,0.3)',
                                  borderLeft: '4px solid var(--brass)',
                                  borderRadius: '0 var(--radius) var(--radius) 0',
                                  padding: '1rem 1.25rem',
                                  marginBottom: '1.25rem',
                                  display: 'flex',
                                  gap: '0.75rem',
                                }}>
                                  <Quote size={18} color="var(--brass)" style={{ flexShrink: 0, marginTop: 2 }} />
                                  <p style={{
                                    fontFamily: 'var(--font-display)',
                                    fontStyle: 'italic',
                                    fontSize: '1.1rem',
                                    color: 'var(--paper)',
                                    lineHeight: 1.7,
                                  }}>
                                    {sec.highlight}
                                  </p>
                                </div>
                              )}

                              {/* Content paragraphs */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {sec.content.map((para, pIdx) => {
                                  const isNumbered = /^[①②③④⑤abcd]/.test(para);
                                  const isBullet = para.startsWith('•');
                                  return (
                                    <p
                                      key={pIdx}
                                      style={{
                                        fontSize: '1.25rem',
                                        lineHeight: 1.75,
                                        color: 'rgba(242,234,215,0.95)',
                                        paddingLeft: (isNumbered || isBullet) ? '0.5rem' : 0,
                                        fontWeight: isNumbered ? 600 : 500,
                                      }}
                                    >
                                      {para}
                                    </p>
                                  );
                                })}
                              </div>

                              {/* Mark read button */}
                              {!isRead && (
                                <button
                                  onClick={() => handleMarkRead(sec.id)}
                                  className="btn-stamp"
                                  style={{ marginTop: '1.5rem' }}
                                  id={`mark-read-${sec.id}`}
                                >
                                  <CheckCircle size={14} />
                                  Đánh dấu đã đọc
                                </button>
                              )}
                              {isRead && (
                                <div style={{
                                  marginTop: '1rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  fontSize: '0.8rem',
                                  color: 'var(--stamp)',
                                  fontWeight: 600,
                                }}>
                                  <CheckCircle size={14} /> Mục này đã hoàn thành
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Chapter navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                {chapters.findIndex(c => c.id === ch.id) > 0 && (
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      const idx = chapters.findIndex(c => c.id === ch.id);
                      setOpenChapter(chapters[idx - 1].id);
                    }}
                  >
                    ← Chương trước
                  </button>
                )}
                {chapters.findIndex(c => c.id === ch.id) < chapters.length - 1 && (
                  <button
                    className="btn-brass"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => {
                      const idx = chapters.findIndex(c => c.id === ch.id);
                      setOpenChapter(chapters[idx + 1].id);
                      setOpenSection(null);
                    }}
                  >
                    Chương tiếp theo →
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
