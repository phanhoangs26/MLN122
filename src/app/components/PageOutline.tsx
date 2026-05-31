import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export type OutlineItem = { id: string; label: string };

export const OutlineLayout: React.FC<{ items: OutlineItem[]; children: React.ReactNode }> = ({ items, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <main
      className={`mx-auto grid max-w-6xl gap-7 px-4 py-7 ${
        open ? 'lg:grid-cols-[14rem_minmax(0,1fr)]' : 'lg:grid-cols-[4rem_minmax(0,1fr)]'
      }`}
    >
      <aside className="hidden lg:block">
        <div className="sticky top-6 border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            {open && <div className="text-sm font-black uppercase tracking-widest text-red-600">Mục lục</div>}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Thu gọn mục lục' : 'Mở mục lục'}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          {open && (
            <nav className="divide-y divide-slate-100">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </aside>

      <div className="min-w-0 overflow-x-hidden">{children}</div>
    </main>
  );
};
