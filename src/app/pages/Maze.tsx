import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { RotateCcw, Flag, Home, ScrollText, MapPinned, Gem } from 'lucide-react';
import clsx from 'clsx';
import { useGameStore } from '../store';

type Point = { x: number; y: number };
type MazeQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const mazeStages = {
  1: {
    title: 'Rừng Tri Thức',
    reward: 'sword' as const,
    routeLabel: 'Mê cung 1',
    accent: 'emerald',
    intro: 'Bắt đầu bằng mê cung đơn giản: tìm lối ra, nhặt đủ cuộn nội dung và tránh lính gác đầu tiên.',
    requiredScrolls: 3,
    rows: [
      '###########',
      '#S..#..C..#',
      '#.#.#.###.#',
      '#.#...#..C#',
      '#.###.#.#R#',
      '#...#...#.#',
      '###.#.###.#',
      '#..C#...#E#',
      '###########',
    ],
    guardPath: [
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 9, y: 1 },
      { x: 8, y: 1 },
    ],
    storyCards: [
      { title: 'Bước đầu', text: 'Quan sát lối đi trước khi di chuyển. Mỗi bức tường đều cho biết hướng rẽ an toàn hơn.' },
      { title: 'Nhịp đi', text: 'Đi theo đường ngắn nhất chỉ khi đã nhìn thấy bẫy và vị trí của lính gác.' },
      { title: 'Điểm rơi', text: 'Một cuộn nội dung được đặt gần cổng thoát để nhắc bạn luôn kiểm tra lối về.' },
    ],
  },
  2: {
    title: 'Núi Khôn Ngoan',
    reward: 'shield' as const,
    routeLabel: 'Mê cung 2',
    accent: 'sky',
    intro: 'Mê cung bắt đầu hẹp lại, buộc bạn phải đổi hướng nhiều hơn và giữ nhịp di chuyển ổn định.',
    requiredScrolls: 3,
    rows: [
      '###########',
      '#S..#..C..#',
      '#.#.#.##..#',
      '#C#...#..R#',
      '#.#.#.#.#.#',
      '#..#...#C.#',
      '###.#.###.#',
      '#..#...#E.#',
      '###########',
    ],
    guardPath: [
      { x: 6, y: 1 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 7, y: 1 },
    ],
    storyCards: [
      { title: 'Quan sát', text: 'Lối đi hẹp khiến mọi bước rẽ đều quan trọng. Đừng lao vào ô chưa nhìn rõ.' },
      { title: 'Đọc mẫu', text: 'Nhận ra mẫu tường lặp lại để đoán vị trí bẫy trước khi chạm vào.' },
      { title: 'Bình tĩnh', text: 'Đây là chặng luyện kiên nhẫn. Đi chậm sẽ tiết kiệm mạng hơn là chạy nước rút.' },
    ],
  },
  3: {
    title: 'Thung Lũng Biện Chứng',
    reward: 'helmet' as const,
    routeLabel: 'Mê cung 3',
    accent: 'violet',
    intro: 'Địa hình bắt đầu có nhánh phụ. Muốn đi nhanh phải chấp nhận đi chậm để đọc toàn bộ bản đồ.',
    requiredScrolls: 3,
    rows: [
      '###########',
      '#S#...#..C#',
      '#.#.#.#.#.#',
      '#.#C#.#.#R#',
      '#.#.#.#.#.#',
      '#...#...#.#',
      '###.#.###.#',
      '#..C#...#E#',
      '###########',
    ],
    guardPath: [
      { x: 8, y: 1 },
      { x: 9, y: 1 },
      { x: 8, y: 1 },
      { x: 7, y: 1 },
    ],
    storyCards: [
      { title: 'Nhánh rẽ', text: 'Các lối phụ trong chặng này không phải để đi lạc, mà để luyện khả năng chọn đường.' },
      { title: 'Mâu thuẫn', text: 'Bẫy và cổng ra nằm gần nhau để buộc bạn cân nhắc trước khi băng qua.' },
      { title: 'Giữ nhịp', text: 'Nếu thấy bí, hãy quay lại điểm cuối cùng an toàn thay vì cố đâm đầu vào tường.' },
    ],
  },
  4: {
    title: 'Pháo Đài Cổ Xưa',
    reward: 'armor' as const,
    routeLabel: 'Mê cung 4',
    accent: 'amber',
    intro: 'Mê cung thành lũy có nhiều khúc khuất hơn. Đây là chặng cần nhớ đường quay lui rõ nhất.',
    requiredScrolls: 3,
    rows: [
      '###########',
      '#S#C..###C#',
      '#.#.#...#.#',
      '#.#.#.###R#',
      '#.#C#.....#',
      '#.#.###.#.#',
      '#...#...#.#',
      '#...#...E.#',
      '###########',
    ],
    guardPath: [
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 9, y: 1 },
      { x: 8, y: 1 },
    ],
    storyCards: [
      { title: 'Tường dày', text: 'Pháo đài có nhiều bức tường hơn, nên chọn hướng đi phải dứt khoát hơn.' },
      { title: 'Cảnh giới', text: 'Lính gác ở chặng này đứng gần cửa. Cần canh nhịp để không bị chặn giữa đường.' },
      { title: 'Bản lề', text: 'Một cuộn nội dung nằm ngay khúc ngoặt cuối cùng, như một bài kiểm tra ghi nhớ lộ trình.' },
    ],
  },
  5: {
    title: 'Nhà Ngựa Hoàng Gia',
    reward: 'horse' as const,
    routeLabel: 'Mê cung 5',
    accent: 'rose',
    intro: 'Chặng cuối của mê cung trước boss. Đường đi dồn dập hơn, nhưng phần thưởng cũng rõ ràng nhất.',
    requiredScrolls: 3,
    rows: [
      '###########',
      '#S.#.###..#',
      '#.#.#...#C#',
      '#.#.###.#.#',
      '#...#...#.#',
      '###.#.###.#',
      '#C..#...#R#',
      '#..C#...E.#',
      '###########',
    ],
    guardPath: [
      { x: 6, y: 1 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 7, y: 1 },
    ],
    storyCards: [
      { title: 'Áp lực', text: 'Các ngã rẽ ít hơn nhưng sai một bước là phải đi vòng rất xa.' },
      { title: 'Nước rút', text: 'Đây là lúc dùng kinh nghiệm từ bốn chặng trước để chọn đường ngắn nhất.' },
      { title: 'Chuẩn bị boss', text: 'Hoàn thành chặng này sẽ mở cửa sang màn đánh boss cuối như cũ.' },
    ],
  },
} as const;

type MazeStageId = keyof typeof mazeStages;

const mazeQuestions: Record<MazeStageId, MazeQuestion[]> = {
  1: [
    { prompt: 'Bước đầu tiên khi vào mê cung là gì?', options: ['Chạy thật nhanh', 'Quan sát bản đồ và chướng ngại', 'Nhắm mắt đi thẳng', 'Bỏ qua cổng ra'], answer: 1, explanation: 'Muốn đi an toàn thì phải đọc bản đồ trước.' },
    { prompt: 'Điều gì giúp tránh bị lạc?', options: ['Đi vòng ngẫu nhiên', 'Nhớ điểm xuất phát và điểm ra', 'Chỉ nhìn vào nhân vật', 'Tắt âm thanh'], answer: 1, explanation: 'Ghi nhớ mốc quan trọng giúp bạn định hướng tốt hơn.' },
    { prompt: 'Cuộn giấy trong mê cung đại diện cho gì?', options: ['Chỉ để trang trí', 'Mảnh nội dung cần học', 'Vật phẩm vô dụng', 'Phần thưởng ẩn'], answer: 1, explanation: 'Cuộn giấy là nội dung học tập được gắn vào mỗi chặng.' },
  ],
  2: [
    { prompt: 'Chướng ngại nguy hiểm nhất trong mê cung là gì?', options: ['Tường', 'Lính gác và bẫy', 'Màu nền', 'Nút quay lại'], answer: 1, explanation: 'Lính gác và bẫy trực tiếp làm mất mạng.' },
    { prompt: 'Khi đường đi hẹp lại, nên làm gì?', options: ['Đi nhanh hơn', 'Giảm tốc và quan sát', 'Nhảy qua tường', 'Bỏ cuộc'], answer: 1, explanation: 'Đường hẹp đòi hỏi kiểm tra kỹ từng bước.' },
    { prompt: 'Điều nào sau đây giúp tối ưu lượt đi?', options: ['Cố đi thẳng mọi lúc', 'Chọn đường ngắn nhất nhưng an toàn', 'Chỉ đi theo cảm giác', 'Luôn quay lại đầu màn'], answer: 1, explanation: 'Ngắn nhất chỉ tốt khi không đâm vào chướng ngại.' },
  ],
  3: [
    { prompt: 'Khi có nhiều nhánh rẽ, cách chọn tốt nhất là gì?', options: ['Chọn ngẫu nhiên', 'Đọc toàn bộ ngã rẽ trước', 'Đi theo tường', 'Đi theo màu nền'], answer: 1, explanation: 'Đọc nhánh rẽ giúp tránh đi vòng không cần thiết.' },
    { prompt: 'Mê cung có nhiều bẫy thì cần gì nhất?', options: ['Kiên nhẫn', 'Vội vàng', 'Im lặng', 'Bỏ qua bản đồ'], answer: 0, explanation: 'Kiên nhẫn giúp bạn tránh mất mạng vô ích.' },
    { prompt: 'Nếu bị lạc nhịp, nên làm gì?', options: ['Tiếp tục lao tới', 'Quay về điểm an toàn gần nhất', 'Đóng game', 'Nhảy liên tục'], answer: 1, explanation: 'Lùi lại điểm an toàn là cách lấy lại kiểm soát.' },
  ],
  4: [
    { prompt: 'Trong pháo đài, yếu tố nào dễ gây nhầm hướng?', options: ['Nhiều ngã rẽ', 'Âm thanh nền', 'Màu chữ', 'Thanh máu'], answer: 0, explanation: 'Pháo đài có nhiều khúc cua và lối phụ.' },
    { prompt: 'Bẫy gần cổng ra có ý nghĩa gì?', options: ['Để trang trí', 'Để thử khả năng quan sát', 'Để tăng tốc', 'Để thay nút điều khiển'], answer: 1, explanation: 'Bẫy gần đích là bài kiểm tra cuối của chặng.' },
    { prompt: 'Một chiến lược tốt là gì?', options: ['Đi liều', 'Nhìn trước một bước', 'Chỉ bấm liên tục', 'Đợi máy tự đi'], answer: 1, explanation: 'Đi trước một bước giúp bạn không rơi vào bẫy.' },
  ],
  5: [
    { prompt: 'Chặng cuối của mê cung trước boss đòi hỏi điều gì?', options: ['Sự hấp tấp', 'Kỷ luật và nhớ đường', 'Bấm thật mạnh', 'Không cần quan sát'], answer: 1, explanation: 'Đây là chặng tổng hợp mọi kỹ năng đã học.' },
    { prompt: 'Khi nào nên vào cổng thoát?', options: ['Khi nhặt đủ giấy và an toàn', 'Ngay khi nhìn thấy', 'Khi còn 0 mạng', 'Sau khi quay lại đầu màn'], answer: 0, explanation: 'Chỉ vào cổng khi đã hoàn thành nhiệm vụ chặng.' },
    { prompt: 'Sau khi hoàn thành 5 mê cung sẽ mở gì?', options: ['Màn phụ', 'Boss cuối', 'Màn tập luyện lại', 'Không mở gì'], answer: 1, explanation: 'Hoàn thành chặng 5 sẽ dẫn tới boss cuối.' },
  ],
};

function getQuestionsForStage(stageId: MazeStageId): MazeQuestion[] {
  return mazeQuestions[stageId] ?? mazeQuestions[1];
}

function findPoint(rows: string[], target: string): Point {
  for (let y = 0; y < rows.length; y += 1) {
    const x = rows[y].indexOf(target);
    if (x >= 0) return { x, y };
  }
  return { x: 1, y: 1 };
}

function findAllPoints(rows: string[], target: string): Point[] {
  const points: Point[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y].length; x += 1) {
      if (rows[y][x] === target) points.push({ x, y });
    }
  }
  return points;
}

export default function Maze() {
  const navigate = useNavigate();
  const { stageId } = useParams();
  const addXp = useGameStore((state) => state.addXp);
  const unlockItem = useGameStore((state) => state.unlockItem);
  const completeStage = useGameStore((state) => state.completeStage);

  const stageNum = Number(stageId || '1') as MazeStageId;
  const stage = mazeStages[stageNum];
  const stageQuestions = getQuestionsForStage(stageNum);

  const rows = stage?.rows ?? mazeStages[1].rows;
  const start = useMemo(() => findPoint(rows, 'S'), [rows]);
  const exit = useMemo(() => findPoint(rows, 'E'), [rows]);
  const relics = useMemo(() => findAllPoints(rows, 'R'), [rows]);
  const scrolls = useMemo(() => findAllPoints(rows, 'C'), [rows]);

  const [player, setPlayer] = useState<Point>(start);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [foundScrolls, setFoundScrolls] = useState<number[]>([]);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number | null>(null);
  const [questionCursor, setQuestionCursor] = useState(0);
  const [answeredScrolls, setAnsweredScrolls] = useState<number[]>([]);
  const [questionReveal, setQuestionReveal] = useState<{ correctAnswer: string; explanation: string } | null>(null);
  const [collectedRelics, setCollectedRelics] = useState<number[]>([]);
  const collectedScrollSet = useMemo(() => new Set(answeredScrolls), [answeredScrolls]);
  const collectedRelicSet = useMemo(() => new Set(collectedRelics), [collectedRelics]);

  const reset = () => {
    setPlayer(start);
    setLives(3);
    setStatus('playing');
    setFoundScrolls([]);
    setActiveScrollIndex(null);
    setQuestionCursor(0);
    setAnsweredScrolls([]);
    setQuestionReveal(null);
    setCollectedRelics([]);
  };

  const consumeQuestionLife = () => {
    const nextLives = lives - 1;
    setLives(Math.max(0, nextLives));
    return nextLives;
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId]);

  const move = (dx: number, dy: number) => {
    if (status !== 'playing' || activeScrollIndex !== null) return;

    setPlayer((current) => {
      const next = { x: current.x + dx, y: current.y + dy };
      const tile = rows[next.y]?.[next.x];

      if (!tile || tile === '#') return current;

      if (tile === 'C') {
        const scrollIndex = scrolls.findIndex((scroll) => scroll.x === next.x && scroll.y === next.y);
        if (scrollIndex >= 0 && !answeredScrolls.includes(scrollIndex)) {
          setActiveScrollIndex(scrollIndex);
        }
      }

      if (tile === 'R') {
        const relicIndex = relics.findIndex((relic) => relic.x === next.x && relic.y === next.y);
        if (relicIndex >= 0 && !collectedRelicSet.has(relicIndex)) {
          setCollectedRelics((current) => [...current, relicIndex]);
          addXp(10);
        }
      }

      if (next.x === exit.x && next.y === exit.y) {
        if (foundScrolls.length >= (stage?.requiredScrolls ?? 3)) {
          setStatus('won');
          addXp(120 + (stageNum - 1) * 10);
          if (stage?.reward) unlockItem(stage.reward);
          completeStage(stageNum);
        }
      }

      return next;
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
      }

      if (event.key === 'ArrowUp' || key === 'w') move(0, -1);
      if (event.key === 'ArrowDown' || key === 's') move(0, 1);
      if (event.key === 'ArrowLeft' || key === 'a') move(-1, 0);
      if (event.key === 'ArrowRight' || key === 'd') move(1, 0);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [status, activeScrollIndex, move]);

  const activeQuestion = stageQuestions[questionCursor % stageQuestions.length];

  const answerQuestion = (choiceIndex: number) => {
    if (activeScrollIndex === null || !activeQuestion) return;

    if (choiceIndex === activeQuestion.answer) {
      setAnsweredScrolls((current) => [...current, activeScrollIndex]);
      setFoundScrolls((current) => [...current, activeScrollIndex]);
      addXp(20);
      setQuestionCursor((current) => current + 1);
      setQuestionReveal(null);
      setActiveScrollIndex(null);
      return;
    }

    const nextLives = consumeQuestionLife();

    setQuestionReveal({
      correctAnswer: activeQuestion.options[activeQuestion.answer],
      explanation: activeQuestion.explanation,
    });

    window.setTimeout(() => {
      if (nextLives <= 0) {
        reset();
        return;
      }

      setQuestionCursor((current) => current + 1);
      setQuestionReveal(null);
    }, 1400);
  };

  if (!stage) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Mê cung</div>
          <h1 className="mt-3 text-3xl font-black">Màn chơi không tồn tại</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Chọn một chặng từ 1 đến 5 trong bản đồ để vào mê cung, hoặc đi chặng 6 để đánh boss.</p>
          <button onClick={() => navigate('/map')} className="mt-6 rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">Quay lại bản đồ</button>
        </div>
      </div>
    );
  }

  const accentStyles: Record<string, string> = {
    emerald: 'from-emerald-950 via-slate-900 to-slate-950',
    sky: 'from-sky-950 via-slate-900 to-slate-950',
    violet: 'from-violet-950 via-slate-900 to-slate-950',
    amber: 'from-amber-950 via-slate-900 to-slate-950',
    rose: 'from-rose-950 via-slate-900 to-slate-950',
  };

  return (
    <div className={clsx('min-h-screen text-white relative overflow-hidden bg-gradient-to-br', accentStyles[stage.accent])}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(148,163,184,0.08),transparent_28%)]" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-3 py-4 relative z-10 sm:px-4 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur sm:p-5">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">{stage.routeLabel}</div>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">{stage.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{stage.intro}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold sm:px-4 sm:py-3">Mạng: {lives}</div>
            <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10 sm:px-4 sm:py-3">
              <Home className="h-4 w-4" />
              Về trang chủ
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-slate-950 hover:scale-[1.02] transition-transform sm:px-4 sm:py-3">
              <RotateCcw className="h-4 w-4" />
              Chơi lại
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <MapPinned className="h-4 w-4 text-slate-300" />
                Cuộn: {foundScrolls.length}/{stage.requiredScrolls}
              </div>
            </div>

            <div
              className="mx-auto grid max-w-4xl gap-1 rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-2 shadow-inner sm:p-3"
              style={{ gridTemplateColumns: `repeat(${rows[0].length}, minmax(0, 1fr))` }}
            >
              {rows.flatMap((row, y) => row.split('').map((cell, x) => {
                const isPlayer = player.x === x && player.y === y;
                const isRelic = relics.some((relic) => relic.x === x && relic.y === y);
                const relicIndex = relics.findIndex((relic) => relic.x === x && relic.y === y);
                const isCollectedRelic = relicIndex >= 0 && collectedRelicSet.has(relicIndex);
                const scrollIndex = scrolls.findIndex((scrollItem) => scrollItem.x === x && scrollItem.y === y);
                const isScroll = scrollIndex >= 0 && !collectedScrollSet.has(scrollIndex);
                const isStart = start.x === x && start.y === y;
                const isExit = exit.x === x && exit.y === y;
                const isWall = cell === '#';

                return (
                  <div
                    key={`${x}-${y}`}
                    className={clsx(
                      'aspect-square rounded-md border flex items-center justify-center text-sm font-black transition-colors',
                      isWall ? 'border-slate-700 bg-slate-800' : 'border-slate-700/40 bg-slate-950/60',
                      isRelic && !isCollectedRelic && 'bg-gradient-to-br from-rose-500/25 via-fuchsia-400/15 to-amber-200/10 border-rose-300/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
                      isCollectedRelic && 'bg-slate-900/60 border-slate-700/30 opacity-20',
                      isScroll && 'bg-cyan-400/15 border-cyan-300/20',
                      isExit && 'bg-emerald-400/15 border-emerald-400/20',
                      isStart && 'bg-cyan-400/10 border-cyan-400/20',
                      isPlayer && 'bg-white text-slate-950 border-white shadow-lg shadow-white/10'
                    )}
                  >
                    {isPlayer ? '☺' : isExit ? <Flag className="h-4 w-4" /> : isScroll ? <ScrollText className="h-4 w-4 text-cyan-200" /> : isRelic && !isCollectedRelic ? <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 shadow-[0_0_18px_rgba(251,113,133,0.35)]"><Gem className="h-3.5 w-3.5 text-rose-200" /></span> : isStart ? 'S' : cell === 'E' ? <Flag className="h-4 w-4 text-emerald-300" /> : cell === 'S' ? 'S' : ''}
                  </div>
                );
              }))}
            </div>

          </section>

          <aside className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 shadow-xl shadow-black/20 backdrop-blur">
            {status !== 'playing' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  'rounded-3xl border p-5 text-center',
                  status === 'won' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100' : 'border-rose-400/20 bg-rose-400/10 text-rose-100'
                )}
              >
                <div className="text-2xl font-black">{status === 'won' ? 'Vượt mê cung thành công' : 'Bạn đã gặp quá nhiều chướng ngại'}</div>
                <p className="mt-2 text-sm leading-6 opacity-90">
                  {status === 'won' ? 'Bạn đã thu thập đủ cuộn nội dung, mở khóa XP và có thể sang chặng kế tiếp.' : 'Nhấn chơi lại để thử cách đi khác, nhặt đủ tài liệu và né bẫy tốt hơn.'}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <button onClick={reset} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 hover:scale-[1.02] transition-transform">Chơi lại</button>
                  <button onClick={() => navigate(stageNum === 5 ? '/quiz/6' : '/map')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">{stageNum === 5 ? 'Đánh boss' : 'Đi tới bản đồ'}</button>
                </div>
              </motion.div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-slate-200">
              <div className="mb-1 text-xs font-black uppercase tracking-[0.35em] text-slate-400">Mục tiêu</div>
              Nhặt đủ cuộn giấy và vật phẩm boss để mở chặng kế tiếp.
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
              <div className="mb-1 text-xs font-black uppercase tracking-[0.35em] text-slate-400">Mạng còn lại</div>
              <div className="text-3xl font-black tracking-tight">{lives}</div>
              <div className="mt-2 text-sm leading-6 text-slate-400">Trả lời sai sẽ trừ 1 mạng, hết mạng thì quay lại đầu chặng.</div>
            </div>
          </aside>
        </div>

        {activeScrollIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Cuộn nội dung</div>
                  <h2 className="mt-2 text-2xl font-black text-white">{activeQuestion.prompt}</h2>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-100">
                  {questionReveal ? 'Đáp án đúng' : 'Câu hỏi'}
                </div>
              </div>

              {!questionReveal ? (
                <>
                  <div className="mt-6 grid gap-3">
                    {activeQuestion.options.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => answerQuestion(index)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
                      >
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-black text-slate-300">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                    Chọn một đáp án để mở kết quả của cuộn giấy này.
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                    <div className="font-black text-lg">Đáp án đúng</div>
                    <div className="mt-2">{questionReveal.correctAnswer}</div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                    {questionReveal.explanation}
                  </div>

                  <div className="mt-4 text-sm font-semibold text-slate-400">Câu hỏi tiếp theo sẽ hiện sau chốc lát.</div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}