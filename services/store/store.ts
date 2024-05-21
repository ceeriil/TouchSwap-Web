import { Energy } from "../db/user";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type TScreens = "badges" | "boost" | "home" | "refs" | "stats" | "quests" | "social" | "wallet";

export type TBoost = {
  type: string;
  boostId: number;
  totalPerDay?: number;
  left?: number;
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

export const STORE_NAME = "Touch_Swap_Store";

export const emptyUser: TUser = {
  id: -1,
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
  rechargeSpeed: number;
  defaultData: boolean;
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
  useRefill: () => void;
  updateDefaultData: () => void;
  increaseMaxEnergy: () => void;
  increaseTap: () => void;
  updateEnergyByTime: () => void;
};

export const useAppStore = create<TAppStore>()(
  devtools(
    persist(
      (set, get) => ({
        rechargeSpeed: 0,
        defaultData: true,
        extraTap: false,
        freeBoosts: [],
        paidBoosts: [],
        screen: "home",
        user: emptyUser,
        setScreen: (newValue: TScreens, payload: TScreenPayload | null | undefined): void =>
          set(() => ({ screen: newValue, screenPayload: payload })),
        setExtraTap: (isTrue: boolean): void => {
          const { user } = get();
          const touchValue = isTrue ? Math.floor(user.tapValue * 5) : Math.max(Math.floor(user.tapValue / 5), 1);
          set(() => ({
            extraTap: isTrue,
            user: {
              ...user,
              tapValue: touchValue,
            },
          }));
        },
        updateBalance: (newBalance: number): void => {
          const { user } = get();
          set(() => ({
            user: {
              ...user,
              balance: newBalance,
            },
          }));
        },
        useRefill: (): void => {
          const { user } = get();
          set(() => ({
            user: {
              ...user,
              energy: {
                ...user.energy,
                energyLeft: user.energy.maxEnergy , // Reset current energy to new max energy
              },
            },
          }));
        },
        updatePaidBoostLevel: (boostId: number): void => {
          const { paidBoosts } = get();
          const updatedBoosts = paidBoosts.map(boost => {
            if(boost.boostId == boostId){
              return  {...boost, level: boost.level!+1, cost: Math.imul(boost.cost!,2)  }
            }
            return boost
        });
          set(() => ({ paidBoosts: updatedBoosts }));
        },
        useEnergy: (amount: number): void => {
          const { user, extraTap } = get();
          const newCurrentEnergy = extraTap
            ? Math.max(user.energy.energyLeft - 0, 0)
            : Math.max(user.energy.energyLeft - amount, 0); // Ensure energy doesn't go below 0
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
        updateDefaultData: (): void => set(() => ({ defaultData: false })),
        increaseMaxEnergy: (): void => {
          const { user } = get();
          set(() => ({
            user: {
              ...user,
              energy: {
                ...user.energy,
                maxEnergy: user.energy.maxEnergy + 500,
              },
            },
          }));
        },
        increaseTap: (): void => {
          const { user } = get();
          set(() => ({
            user: {
              ...user,
              tapValue: user.tapValue + 1,
            },
          }));
        },
        updateEnergyByTime: (): void => {
          const { user, paidBoosts } = get();

          if (user.energy.energyLeft === user.energy.maxEnergy) return;
          const boostLevel = (paidBoosts.find(boost => boost.boostId === 3)?.level!) + 1; 
          let newEnergyLeft = user.energy.energyLeft + boostLevel;

          if (newEnergyLeft > user.energy.maxEnergy) {
            newEnergyLeft = user.energy.maxEnergy;
          }

          set(() => ({
            user: {
              ...user,
              energy: {
                ...user.energy,
                energyLeft: newEnergyLeft,
              },
            },
          }));
        },
      }),
      {
        name: STORE_NAME,
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: state => {
          let previousState = localStorage.getItem(STORE_NAME);
          let defaultStateString = JSON.stringify({ state, version: 0 });
          return (state, error) => {
            if (error) {
              localStorage.setItem(STORE_NAME, defaultStateString);
            } else {
              localStorage.setItem(STORE_NAME, previousState || defaultStateString);
            }
          };
        },
      },
    ),
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool(STORE_NAME, useAppStore);
}
