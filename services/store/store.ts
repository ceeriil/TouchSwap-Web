import { Boost } from "../db/boost";
import { Energy } from "../db/user";
import { del, get, set } from "idb-keyval";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { StateStorage, createJSONStorage, devtools, persist } from "zustand/middleware";

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
  useRefill: () => void;
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    let data = await get(name);
    return (await get(name)) || Promise.reject(null);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export const useAppStore = create<TAppStore>()(
  devtools(
    persist(
      (set, get) => ({
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
                energyLeft: user.energy.maxEnergy,
              },
            },
          }));
        },
        updatePaidBoostLevel: (boostId: number, newLevel: number): void => {
          const { paidBoosts } = get();
          const updatedBoosts = paidBoosts.map(boost =>
            boost.boostId === boostId ? { ...boost, level: newLevel } : boost,
          );
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
      }),
      {
        name: "AppStore",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: state => {
          let previousState = localStorage.getItem("AppStore");
          let defaultStateString = JSON.stringify({ state, version: 0 });
          console.log("hydration starts", JSON.parse(previousState || ""));
          return (state, error) => {
            if (error) {
              localStorage.setItem("AppState", defaultStateString);
            } else {
              console.log(previousState);
              localStorage.setItem("AppState", previousState || defaultStateString);
            }
          };
        },
      },
    ),
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useAppStore);
}
