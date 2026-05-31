import React from 'react';
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/theory', label: 'Lý luận nhà nước' },
  { to: '/vietnam', label: 'Cộng hòa XHCN Việt Nam' },
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
    <header className="w-full overflow-x-hidden border-b border-slate-200 bg-white text-slate-950 shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4 text-center">
        <Link to="/" className="flex items-center justify-center">
          <span>
            <span className="block text-xs font-black uppercase tracking-wide text-slate-800 sm:text-sm md:text-base">
              Học phần Triết học Mác - Lênin
            </span>
            <span className="font-serif text-2xl font-black leading-tight text-red-600 sm:text-3xl md:text-5xl lg:text-6xl">
              Chuyên đề Nhà nước
            </span>
            <span className="mt-1 block text-xs font-semibold text-slate-700 sm:text-sm md:text-base">
              {today.charAt(0).toUpperCase() + today.slice(1)} <span className="mx-2 text-slate-300">|</span> Học thuyết Mác - Lênin
            </span>
          </span>
        </Link>
      </div>

      <nav className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-0 overflow-x-auto px-2 sm:gap-2 sm:px-4">
          {navItems.map(({ to, label }) => {
            const active = pathname === to || (to === '/theory' && pathname === '/theory');
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'relative flex min-h-14 shrink-0 items-center px-2 text-xs font-black uppercase tracking-wide transition-colors sm:min-h-16 sm:px-4 sm:text-sm md:px-6 md:text-base',
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
