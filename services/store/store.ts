
import { create } from "zustand";
import { Energy } from "../db/user";
import { Boost } from "../db/boost";
import { Energy } from "../db/user";
import { create } from "zustand";

export type TScreens = "badges" | "boost" | "home" | "refs" | "stats" | "quests" | "social" | "wallet";

export type TBoost = {
  type: string;
  boostId: number;
  totalPerDay?: number;
  level?: number;
  maximumLevel?: number;
  cost?: number; 
  userId: number;
};

export type TScreenPayload = {
  data?: string;
};

export type TUser = {
  id: number;
  username: string;
  first: string;
  last: string;
  touches: number;
  tapValue: number;
  balance: number;
  rank: number;
  energy: Energy;
  connectionId: string;
};

const emptyUser: TUser = {
  id: 0,
  username: "",
  first: "",
  last: "",
  touches: 0,
  balance: 1000,
  rank: 0,
  tapValue: 1,
  energy: {
    maxEnergy: 500,
    energyLeft: 100,
  },
  connectionId: "",
};

type TAppStore = {
  extraTap: boolean;
  freeBoosts: TBoost[];
  paidBoosts: TBoost[];
  screen: TScreens;
  user: TUser;
  setScreen: (newValue: TScreens, payload?: TScreenPayload | null) => void;
  updateBalance: (newBalance: number) => void;
  updatePaidBoostLevel: (boostId: number, newLevel: number) => void;
  useEnergy: (amount: number) => void;
  updateUser: (updatedFields: Partial<TUser>) => void;
  setExtraTap: (isTrue: boolean) => void;
  setPaidBoosts: (boostFields: TBoost[]) => void;
  setFreeBoosts: (boostFields: TBoost[]) => void;
  useDailyRefill: () => void;
};

export const useAppStore = create<TAppStore>((set, get) => ({
  extraTap: false,
  freeBoosts: [],
  paidBoosts: [],
  screen: 'home',
  user: emptyUser,
  setScreen: (newValue: TScreens, payload: TScreenPayload | null | undefined): void =>
    set(() => ({ screen: newValue, screenPayload: payload })),
  setExtraTap: (isTrue: boolean): void => {
    const { user, freeBoosts } = get();
    console.log(freeBoosts.find(boost=> boost.boostId == 1))
    const touchValue = isTrue ? Math.floor(user.tapValue * 5) : Math.max(Math.floor(user.tapValue / 5), 1);
    set(() => ({
      extraTap: isTrue, 
      user: {
        ...user,
        tapValue: touchValue
      }
    }));
  },
  updateBalance: (newBalance: number): void => {
    const { user } = get();
    set(() => ({
      user: {
        ...user,
        balance: newBalance
      }
    }));
  },
  useDailyRefill: (): void => {
    const { user, freeBoosts } = get();
    console.log(freeBoosts.find(boost=> boost.boostId == 2))
    console.log(freeBoosts)
    set(() => ({
      user: {
        ...user,
        energy: {
          ...user.energy,
          energyLeft: user.energy.maxEnergy
        }
      }
    }));
  },
  updatePaidBoostLevel: (boostId: number, newLevel: number): void => {
    const { paidBoosts } = get();
    const updatedBoosts = paidBoosts.map(boost => 
      boost.boostId === boostId ? { ...boost, level: newLevel } : boost
    );
    set(() => ({ paidBoosts: updatedBoosts }));
  },
  useEnergy: (amount: number): void => {
    const { user, extraTap } = get();
    const newCurrentEnergy = extraTap ?  Math.max(user.energy.energyLeft - 0, 0) :  Math.max(user.energy.energyLeft - amount, 0) ; // Ensure energy doesn't go below 0
    set(() => ({
      user: {
        ...user,
        energy: {
          ...user.energy,
          energyLeft: newCurrentEnergy,
        },
      },
    }));
  },
  updateUser: (updatedFields: Partial<TUser>): void => {
    const { user } = get();
    set(() => ({
      user: {
        ...user,
        ...updatedFields,
      },
    }));
  },
  setPaidBoosts: (boosts: TBoost[]): void => set(() => ({ paidBoosts: boosts })),
  setFreeBoosts: (boosts: TBoost[]): void => set(() => ({ freeBoosts: boosts })),
}));
