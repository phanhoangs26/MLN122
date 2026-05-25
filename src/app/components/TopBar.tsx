import React from 'react';
import { Crown, BookOpen, Map } from 'lucide-react';
import { Link } from 'react-router';

export const TopBar: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-[0_8px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.3em] text-white">MLN Study</div>
            <div className="text-xs text-slate-400">Trang học lý thuyết và luyện tập</div>
          </div>
        </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/theory" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 transition-colors hover:bg-white/10 sm:px-4">
              <BookOpen className="h-4 w-4" />
              Lý thuyết
            </Link>
            <Link to="/map" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 transition-colors hover:bg-white/10 sm:px-4">
              <Map className="h-4 w-4" />
              Bản đồ
            </Link>
          </div>
      </div>
    </div>
  );
};
