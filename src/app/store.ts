import { create } from 'zustand';
import { argumentItems } from './data/stateContent';

// Một "luận cứ" được nhận diện bằng id (xem argumentItems trong stateContent).
export type EquipmentItem = string;

const emptyInventory = (): Record<string, boolean> =>
  Object.fromEntries(argumentItems.map((i) => [i.id, false]));

interface GameState {
  hearts: number;
  maxHearts: number;
  xp: number;
  level: number;
  coins: number;
  currentStage: number;
  inventory: Record<string, boolean>;
  playerName: string;
  loseHeart: () => void;
  addXp: (amount: number) => void;
  unlockItem: (item: EquipmentItem) => void;
  resetGame: () => void;
  completeStage: (stageId: number) => void;
  setPlayerName: (name: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  hearts: 5,
  maxHearts: 5,
  xp: 0,
  level: 1,
  coins: 0,
  currentStage: 1,
  inventory: emptyInventory(),
  playerName: '',
  setPlayerName: (name) => set({ playerName: name }),
  loseHeart: () => set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
    return { xp: newXp, level: newLevel };
  }),
  unlockItem: (item) => set((state) => ({
    inventory: { ...state.inventory, [item]: true }
  })),
  completeStage: (stageId) => set((state) => {
    if (state.currentStage !== stageId) return {};

    return {
      currentStage: state.currentStage + 1,
      coins: state.coins + 50,
    };
  }),
  resetGame: () => set({
    hearts: 5,
    xp: 0,
    level: 1,
    coins: 0,
    currentStage: 1,
    inventory: emptyInventory(),
  }),
}));
