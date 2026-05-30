import React from 'react';
import {
  BookOpen,
  Bot,
  Flag,
  Gamepad2,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wheat,
} from 'lucide-react';
import clsx from 'clsx';

type BadgeKind =
  | 'theory'
  | 'vietnam'
  | 'game'
  | 'chat'
  | 'people'
  | 'law'
  | 'state'
  | 'history'
  | 'target'
  | 'default';

type Props = {
  kind?: BadgeKind;
  className?: string;
  iconClassName?: string;
};

const mainIcons: Record<BadgeKind, React.ElementType> = {
  theory: BookOpen,
  vietnam: Star,
  game: Gamepad2,
  chat: Bot,
  people: Users,
  law: Scale,
  state: Landmark,
  history: Flag,
  target: ShieldCheck,
  default: Star,
};

export const SocialistIconBadge: React.FC<Props> = ({
  kind = 'default',
  className,
  iconClassName,
}) => {
  const MainIcon = mainIcons[kind];

  return (
    <span
      className={clsx(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-200/35 bg-gradient-to-br from-red-700 via-red-600 to-amber-400 text-amber-50 shadow-lg shadow-red-950/25',
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.34),transparent_28%),linear-gradient(135deg,rgba(255,238,170,0.22),transparent_48%)]" />
      <Star className="absolute right-1 top-1 h-3 w-3 text-amber-100/85" fill="currentColor" strokeWidth={0.8} />
      <Wheat className="absolute -bottom-1 -left-1 h-5 w-5 rotate-[-22deg] text-amber-100/40" strokeWidth={1.4} />
      <Sparkles className="absolute bottom-1 right-1 h-3 w-3 text-amber-100/55" strokeWidth={1.5} />
      <MainIcon className={clsx('relative z-10 h-5 w-5 drop-shadow', iconClassName)} strokeWidth={2.2} />
    </span>
  );
};
