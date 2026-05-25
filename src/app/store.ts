import { create } from 'zustand';

export type EquipmentItem = 'sword' | 'shield' | 'helmet' | 'armor' | 'horse';

interface GameState {
  hearts: number;
  maxHearts: number;
  xp: number;
  level: number;
  coins: number;
  currentStage: number;
  inventory: Record<EquipmentItem, boolean>;
  loseHeart: () => void;
  addXp: (amount: number) => void;
  unlockItem: (item: EquipmentItem) => void;
  resetGame: () => void;
  completeStage: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  hearts: 5,
  maxHearts: 5,
  xp: 0,
  level: 1,
  coins: 0,
  currentStage: 1,
  inventory: {
    sword: false,
    shield: false,
    helmet: false,
    armor: false,
    horse: false,
  },
  loseHeart: () => set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
    return { xp: newXp, level: newLevel };
  }),
  unlockItem: (item) => set((state) => ({
    inventory: { ...state.inventory, [item]: true }
  })),
  completeStage: () => set((state) => ({
    currentStage: state.currentStage + 1,
    coins: state.coins + 50,
  })),
  resetGame: () => set({
    hearts: 5,
    xp: 0,
    level: 1,
    coins: 0,
    currentStage: 1,
    inventory: {
      sword: false,
      shield: false,
      helmet: false,
      armor: false,
      horse: false,
    }
  }),
}));
