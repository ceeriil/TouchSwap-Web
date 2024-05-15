import { create } from "zustand";

type TAppStore = {
  balance: number;
  boosts: { [title: string]: number };
  updateBalance: (newBalance: number) => void;
  updateBoostLevel: (title: string, newLevel: number) => void;
};

export const useAppStore = create<TAppStore>((set, get) => ({
  balance: 10000,
  boosts: {},
  updateBalance: (newBalance: number): void =>
    set(() => ({
      balance: newBalance,
    })),
  updateBoostLevel: (title: string, newLevel: number): void => {
    const { boosts } = get();
    const updatedBoosts = { ...boosts, [title]: newLevel };
    set(() => ({
      boosts: updatedBoosts,
    }));
  },
}));
