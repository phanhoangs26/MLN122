// src/components/Nav.tsx
// Navigation bar — passport themed

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Gamepad2, Info, Menu, X } from 'lucide-react';
import { usePassportStore } from '@/store/passportStore';

const navLinks = [
  { to: '/theory',     label: 'Lý thuyết',  icon: BookOpen },
  { to: '/games',      label: 'Minigame',    icon: Gamepad2 },
  { to: '/about',      label: 'Giới thiệu',  icon: Info },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const stamps = usePassportStore(s => s.getTotalStamps());
  const playerName = usePassportStore(s => s.playerName);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(11,37,69,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(192,138,46,0.2)',
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: 60 }}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="Trang chủ"
        >
          <span style={{ fontSize: 22 }}>🛂</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--paper)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            Hội Nhập<br />
            <span style={{ color: 'var(--brass)', fontStyle: 'italic' }}>Kinh Tế</span>
          </span>
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav links */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          className="hidden-mobile"
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--brass)' : 'rgba(242,234,215,0.7)',
                background: isActive ? 'rgba(192,138,46,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(192,138,46,0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              })}
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Stamp counter */}
        <div
          title={`${stamps}/3 dấu Passport 2.0 đã nhận`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'rgba(163,50,58,0.15)',
            border: '1px solid rgba(163,50,58,0.35)',
            borderRadius: 'var(--radius)',
            padding: '0.3rem 0.6rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--stamp)',
            cursor: 'default',
            flexShrink: 0,
          }}
        >
          <span>🔖</span>
          {stamps}/3
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          className="show-mobile"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '0.35rem',
            color: 'var(--paper)',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border-faint)' }}
            aria-label="Mobile navigation"
          >
            <div className="wrap" style={{ padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--brass)' : 'var(--paper)',
                    background: isActive ? 'rgba(192,138,46,0.1)' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
