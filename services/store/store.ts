import { Energy } from "../db/user";
import { create } from "zustand";
import { Boost } from "../db/boost";

export type TScreens = "badges" | "boost" | "home" | "refs" | "stats" | "quests";

export type TBoost = Boost

export type TScreenPayload = {
  data?: string;
};

export type TUser = {
  id: number;
  username: string;
  first: string;
  last: string;
  touches: number;
  tapValue:number,
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
  tapValue:1,
  energy: {
    maxEnergy: 500,
    energyLeft: 400,
  },
  connectionId: "",
};

type TAppStore = {
  extraTap:boolean,
  freeBoost:TBoost[];
  paidBoosts: TBoost[];
  screen: TScreens;
  user: TUser;
  setScreen: (newValue: TScreens, payload?: TScreenPayload | null) => void;
  updateBalance: (newBalance: number) => void;
  updatePaidBoostLevel: (boostId:number, newLevel: number) => void;
  useEnergy: (amount: number) => void,
  updateUser: (updatedFields: Partial<TUser>) => void,
  setExtraTap : (isTrue: boolean) => void,
};

export const useAppStore = create<TAppStore>((set, get) => ({
  extraTap:false,
  freeBoost:[],
  paidBoosts:[],
  screen: "home",
  user: emptyUser,
  setScreen: (newValue: TScreens, payload: TScreenPayload | null | undefined): void =>
    set(() => ({ screen: newValue, screenPayload: payload })),
  setExtraTap:(isTrue) :void  => {
    console.log(isTrue , "User EXtra tap")
    const {user} = get();
    set(()=> ({extraTap:isTrue, user :{
     ...user,
     tapValue: isTrue ? user.tapValue * 5 : user.tapValue / 5
    }}));
  },
  updateBalance: (newBalance: number): void => { 
    const {user} = get()
    set(() => ({user: {
      ...user,
      balance:newBalance
    }}))
  },
  updatePaidBoostLevel: (boostId:number , newLevel: number): void => {
    const { paidBoosts } = get();
    let boostWithId = paidBoosts.filter(data=> data.boostId == boostId)
    // const updatedBoosts = { ...boosts, [title]: newLevel };
    // set(() => ({
    //   boosts: updatedBoosts,
    // }));
  },
  useEnergy: (amount: number): void => {
    const { user } = get();
    const newCurrentEnergy = Math.max(user.energy.energyLeft - amount, 0); // Ensure energy doesn't go below 0
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
}));