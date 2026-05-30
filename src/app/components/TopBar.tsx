import React from 'react';
import { Landmark, BookOpen, Star, Gamepad2, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';

const navItems = [
  { to: '/theory', label: 'Lý thuyết', icon: BookOpen },
  { to: '/vietnam', label: 'Nhà nước VN', icon: Star },
  { to: '/game', label: 'Trò chơi', icon: Gamepad2 },
  { to: '/chat', label: 'Chatbox', icon: Bot },
];

export const TopBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-[0_8px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/30 bg-gradient-to-br from-red-600/30 to-amber-400/20 text-amber-200">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.3em] text-white">Nhà nước &amp; Giai cấp</div>
            <div className="hidden text-xs text-slate-400 sm:block">Học thuyết Mác – Lênin về nhà nước</div>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors sm:px-4',
                  active
                    ? 'border-amber-300/40 bg-amber-400/15 text-amber-50'
                    : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10',
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
