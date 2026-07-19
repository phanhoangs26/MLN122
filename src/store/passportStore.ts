// src/store/passportStore.ts
// Zustand store — theo dõi tiến trình "hộ chiếu hội nhập"
// persist: localStorage

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chapters } from '@/data/chapters';

// ID của tất cả sections
const allSectionIds = chapters.flatMap(ch => ch.sections.map(s => s.id));
// ID của tất cả chapters
const allChapterIds = chapters.map(ch => ch.id);

interface PassportState {
  // Tiến trình đọc lý thuyết
  readSections: Record<string, boolean>;   // sectionId → đã đọc
  stampedChapters: Record<string, boolean>; // chapterId → đã đóng dấu

  // Điểm số game
  quizScore: number;       // điểm tốt nhất minigame quiz
  matchScore: number;      // điểm tốt nhất minigame match

  // Thông tin người chơi
  playerName: string;

  // Actions
  markSectionRead: (sectionId: string) => void;
  checkAndStampChapter: (chapterId: string) => void;
  setQuizScore: (score: number) => void;
  setMatchScore: (score: number) => void;
  setPlayerName: (name: string) => void;
  resetProgress: () => void;

  // Computed helpers
  getSectionProgress: (chapterId: string) => { read: number; total: number };
  getTotalStamps: () => number;
  getTotalScore: () => number;
}

export const usePassportStore = create<PassportState>()(
  persist(
    (set, get) => ({
      readSections: Object.fromEntries(allSectionIds.map(id => [id, false])),
      stampedChapters: Object.fromEntries(allChapterIds.map(id => [id, false])),
      quizScore: 0,
      matchScore: 0,
      playerName: '',

      markSectionRead: (sectionId) => {
        set(state => ({
          readSections: { ...state.readSections, [sectionId]: true },
        }));
        // tự động kiểm tra chapter sau khi đánh dấu
        const chapter = chapters.find(ch => ch.sections.some(s => s.id === sectionId));
        if (chapter) {
          get().checkAndStampChapter(chapter.id);
        }
      },

      checkAndStampChapter: (chapterId) => {
        const chapter = chapters.find(ch => ch.id === chapterId);
        if (!chapter) return;
        const { readSections } = get();
        const allRead = chapter.sections.every(s => readSections[s.id]);
        if (allRead) {
          set(state => ({
            stampedChapters: { ...state.stampedChapters, [chapterId]: true },
          }));
        }
      },

      setQuizScore: (score) =>
        set(state => ({ quizScore: Math.max(state.quizScore, score) })),

      setMatchScore: (score) =>
        set(state => ({ matchScore: Math.max(state.matchScore, score) })),

      setPlayerName: (name) => set({ playerName: name }),

      resetProgress: () =>
        set({
          readSections: Object.fromEntries(allSectionIds.map(id => [id, false])),
          stampedChapters: Object.fromEntries(allChapterIds.map(id => [id, false])),
          quizScore: 0,
          matchScore: 0,
        }),

      getSectionProgress: (chapterId) => {
        const chapter = chapters.find(ch => ch.id === chapterId);
        if (!chapter) return { read: 0, total: 0 };
        const { readSections } = get();
        const read = chapter.sections.filter(s => readSections[s.id]).length;
        return { read, total: chapter.sections.length };
      },

      getTotalStamps: () => {
        const { stampedChapters } = get();
        return Object.values(stampedChapters).filter(Boolean).length;
      },

      getTotalScore: () => {
        const { quizScore, matchScore } = get();
        return quizScore + matchScore;
      },
    }),
    {
      name: 'hnkte-passport-v2',
    }
  )
);
