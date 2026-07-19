// src/components/Layout.tsx
// Shared layout wrapper

import React from 'react';
import { Nav } from './Nav';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main className={className} style={{ flex: 1 }}>
        {children}
      </main>
      <footer
        style={{
          borderTop: '1px solid var(--border-faint)',
          padding: '1.5rem 0',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
        }}
      >
        <div className="wrap">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM · HỘI NHẬP KINH TẾ QUỐC TẾ · KINH TẾ CHÍNH TRỊ MÁC–LÊNIN · 2026
        </div>
      </footer>
    </div>
  );
}
