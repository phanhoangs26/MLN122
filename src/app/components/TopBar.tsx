import React from 'react';
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/theory', label: 'Lý luận nhà nước' },
  { to: '/vietnam', label: 'Việt Nam' },
  { to: '/tu-ban', label: 'Nhà nước tư sản' },
  { to: '/game', label: 'Ôn tập' },
  { to: '/chat', label: 'Hỏi đáp' },
];

export const TopBar: React.FC = () => {
  const { pathname } = useLocation();
  const today = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white text-slate-950 shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4 text-center">
        <Link to="/" className="flex items-center justify-center">
          <span>
            <span className="block text-sm font-black uppercase tracking-wide text-slate-800 md:text-base">
              Học phần Triết học Mác - Lênin
            </span>
            <span className="font-serif text-4xl font-black leading-tight text-red-600 md:text-6xl">
              Chuyên đề Nhà nước
            </span>
            <span className="mt-1 block text-sm font-semibold text-slate-700 md:text-base">
              {today.charAt(0).toUpperCase() + today.slice(1)} <span className="mx-2 text-slate-300">|</span> Học thuyết Mác - Lênin
            </span>
          </span>
        </Link>
      </div>

      <nav className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4">
          {navItems.map(({ to, label }) => {
            const active = pathname === to || (to === '/theory' && pathname === '/theory');
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'relative flex min-h-16 shrink-0 items-center px-4 text-sm font-black uppercase tracking-wide transition-colors md:px-6 md:text-base',
                  active
                    ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-red-600'
                    : 'text-slate-950 hover:text-red-600',
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
