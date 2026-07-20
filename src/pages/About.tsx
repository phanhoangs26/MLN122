// src/pages/About.tsx
// Trang giới thiệu dự án

import React from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/Layout';
import { Info, Users, Globe, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <section style={{
        background: 'linear-gradient(135deg, #0B2545 0%, #13315C 100%)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(2rem, 5vw, 4rem) 0',
      }}>
        <div className="wrap">
          <span className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>ℹ️ THÔNG TIN DỰ ÁN</span>
          <h1 style={{ marginBottom: '1rem' }}>Về dự án Passport 2.0</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 600, fontSize: '1.05rem', lineHeight: 1.6 }}>
            Một cách tiếp cận mới mẻ, tương tác và thú vị hơn đối với học phần Kinh tế Chính trị Mác-Lênin, 
            chuyên đề Hội nhập Kinh tế Quốc tế của Việt Nam.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--navy-mid)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
              }}
            >
              <Globe size={32} color="var(--brass)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Mục tiêu</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Giúp người học dễ dàng nắm bắt các khái niệm phức tạp về hội nhập kinh tế thông qua 
                phương pháp "Gamification" (Trò chơi hoá). Biến lý thuyết khô khan thành những dấu ấn 
                trên cuốn Passport học tập.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'var(--navy-mid)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
              }}
            >
              <BookOpen size={32} color="#3B82F6" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Nội dung</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Được biên soạn bám sát giáo trình chuẩn, nội dung bao quát từ lịch sử đổi mới (1986), 
                gia nhập ASEAN, WTO, đến các hiệp định thương mại tự do thế hệ mới như CPTPP, EVFTA.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'var(--navy-mid)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
              }}
            >
              <Users size={32} color="#8B5CF6" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Đội ngũ</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Dự án được thực hiện nhằm mục đích đổi mới phương pháp giảng dạy, 
                tạo ra môi trường học tập tích cực, chủ động cho thế hệ sinh viên kỷ nguyên số.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Công cụ AI sử dụng</h2>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              background: 'var(--navy-mid)',
            }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', borderBottom: '1px solid var(--border)', width: '25%', fontSize: '1.1rem' }}>Công cụ AI</th>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: '1.1rem' }}>Mục đích sử dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', fontSize: '1.1rem', verticalAlign: 'top' }}>
                    ChatGPT / Claude
                  </td>
                  <td style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', lineHeight: 1.6, verticalAlign: 'top' }}>
                    Hỗ trợ tìm kiếm và phát triển ý tưởng cho dự án, gợi ý nội dung trình bày, đề xuất thiết kế giao diện (UI/UX), giải thích các khái niệm kỹ thuật, hỗ trợ xử lý lỗi trong quá trình phát triển và rà soát, chỉnh sửa văn phong để nội dung rõ ràng, mạch lạc hơn.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem', verticalAlign: 'top' }}>
                    Antigravity
                  </td>
                  <td style={{ padding: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6, verticalAlign: 'top' }}>
                    Hỗ trợ triển khai mã nguồn dựa trên yêu cầu, xây dựng các chức năng của hệ thống, đề xuất cấu trúc dự án, hỗ trợ tối ưu và chỉnh sửa mã nguồn, đồng thời đưa ra các giải pháp kỹ thuật giúp hoàn thiện sản phẩm.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
