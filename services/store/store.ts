import { create } from "zustand";

type TAppStore = {
  balance: number;
  updateBalance: (newBalance: number) => void;
};

export const useAppStore = create<TAppStore>(set => ({
  balance: 1,
  updateBalance: (newBalance: number): void => set(() => ({ balance: newBalance })),
}));
