import { create } from "zustand";

export type TScreens = "badges" | "boost" | "home" | "refs" | "stats" | "quests";

export type TScreenPayload = {
  data?: string;
};
type TAppStore = {
  balance: number;
  boosts: { [title: string]: number };
  screen: TScreens;
  setScreen: (newValue: TScreens, payload?: TScreenPayload | null) => void;
  updateBalance: (newBalance: number) => void;
  updateBoostLevel: (title: string, newLevel: number) => void;
};

export const useAppStore = create<TAppStore>((set, get) => ({
  balance: 10000,
  boosts: {},
  screen: "home",
  setScreen: (newValue: TScreens, payload: TScreenPayload | null | undefined): void =>
    set(() => ({ screen: newValue, screenPayload: payload })),
  updateBalance: (newBalance: number): void => set(() => ({balance: newBalance})),
  updateBoostLevel: (title: string, newLevel: number): void => {
    const { boosts } = get();
    const updatedBoosts = { ...boosts, [title]: newLevel };
    set(() => ({
      boosts: updatedBoosts,
    }));
  },
}));
