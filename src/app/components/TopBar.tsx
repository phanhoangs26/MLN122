import React from 'react';
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/theory', label: 'Nhà nước & Giai cấp' },
  { to: '/tu-ban', label: 'Nhà nước tư sản' },
  { to: '/game', label: 'Ôn tập' },
  { to: '/chat', label: 'Hỏi đáp' },
  { to: '/dashboard', label: 'Xếp hạng' },
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
    <header className="w-full overflow-x-hidden border-b-4 border-[#2a201c] bg-[#f3ead7] text-[#171210] shadow-sm font-['Bitter']">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-6 text-center">
        <Link to="/" className="flex flex-col items-center justify-center hover:opacity-90 transition-opacity">
          <span className="block text-sm font-black uppercase tracking-[0.2em] text-[#6b5d4f] mb-2 font-['Oswald']">
            Học phần Triết học Mác - Lênin
          </span>
          <span className="font-['Oswald'] text-4xl font-black leading-tight text-[#c8281e] sm:text-5xl md:text-6xl uppercase">
            Chuyên đề Nhà nước
          </span>
          <span className="mt-3 block text-sm italic text-[#6b5d4f] border-y border-[#2a201c] py-1 px-4">
            {today.charAt(0).toUpperCase() + today.slice(1)} <span className="mx-2 text-[#d8a13a]">★</span> Lênin 1917
          </span>
        </Link>
      </div>

      <nav className="border-t-[3px] border-[#2a201c] bg-[#171210]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-0 overflow-x-auto px-2 sm:gap-4 sm:px-4">
          {navItems.map(({ to, label }) => {
            const active = pathname === to || (to === '/theory' && pathname === '/theory');
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'relative flex min-h-12 shrink-0 items-center px-3 text-xs font-black uppercase tracking-[0.1em] transition-colors sm:min-h-14 sm:px-4 sm:text-sm font-["Oswald"]',
                  active
                    ? 'text-[#f3ead7] bg-[#c8281e]'
                    : 'text-[#ece0c8] hover:text-[#d8a13a] hover:bg-[rgba(255,255,255,0.05)]',
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
