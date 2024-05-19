import React from "react";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { DolphinBadge } from "../assets/badges/DolphinBadge";
import { KrakenBadge } from "../assets/badges/KrakenBadge";
import { LeviathanBadge } from "../assets/badges/LeviathanBadge";
import { MegalodonBadge } from "../assets/badges/MegalodonBadge";
import { MinnowBadge } from "../assets/badges/MinnowBadge";
import { OrcaBadge } from "../assets/badges/OrcaBadge";
import { PlanktonBadge } from "../assets/badges/PlanktonBadge";
import { SharkBadge } from "../assets/badges/SharkBadge";
import { WhaleBadge } from "../assets/badges/WhaleBadge";
import { BadgeCard } from "../touchswap/BadgeCard";
import { BoostCard } from "../touchswap/BoostCard";
import { useAppStore } from "@/services/store/store";

type BadgesList = {
  title: string;
  reward: number;
  requiredCoin: number;
  icon?: React.ReactNode;
  isUnlocked: boolean;
  unlockedIcon?: React.ReactNode;
  lockedIcon?: React.ReactNode;
};

export const badgesLists: BadgesList[] = [
  {
    title: "Plankton",
    requiredCoin: 10000,
    isUnlocked: true,
    reward: 1000,
    unlockedIcon: <PlanktonBadge unlocked />,
    lockedIcon: <PlanktonBadge unlocked={false} />,
  },
  {
    title: "Minnow",
    requiredCoin: 20000,
    reward: 1000,
    isUnlocked: true,
    unlockedIcon: <MinnowBadge unlocked />,
    lockedIcon: <MinnowBadge unlocked={false} />,
  },
  {
    title: "Dolphin",
    requiredCoin: 25000,
    reward: 1000,
    isUnlocked: true,
    unlockedIcon: <DolphinBadge unlocked />,
    lockedIcon: <DolphinBadge unlocked={false} />,
  },
  {
    title: "Shark",
    requiredCoin: 30000,
    reward: 5000,
    isUnlocked: true,
    unlockedIcon: <SharkBadge unlocked />,
    lockedIcon: <SharkBadge unlocked={false} />,
  },
  {
    title: "Orca",
    reward: 10000,
    requiredCoin: 40000,
    isUnlocked: true,
    unlockedIcon: <OrcaBadge unlocked />,
    lockedIcon: <DolphinBadge unlocked={false} />,
  },
  {
    title: "Whale",
    reward: 15000,
    requiredCoin: 50000,
    isUnlocked: true,
    unlockedIcon: <WhaleBadge unlocked />,
    lockedIcon: <WhaleBadge unlocked={false} />,
  },
  {
    title: "Megalodon",
    reward: 20000,
    requiredCoin: 100000,
    isUnlocked: true,
    unlockedIcon: <MegalodonBadge unlocked />,
    lockedIcon: <MegalodonBadge unlocked={false} />,
  },
  {
    title: "Levaithan",
    reward: 50000,
    requiredCoin: 250000,
    isUnlocked: false,
    unlockedIcon: <LeviathanBadge unlocked />,
    lockedIcon: <LeviathanBadge unlocked={false} />,
  },
  {
    title: "Kraken",
    reward: 100000,
    requiredCoin: 500000,
    isUnlocked: false,
    unlockedIcon: <KrakenBadge unlocked />,
    lockedIcon: <KrakenBadge unlocked={false} />,
  },
];

export const BadgesScreen = () => {
  const { balance } = useAppStore();

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <div className="container mx-auto px-4 my-8 pb-32">
        <h2 className="text-2xl font-[500] mb-3">Ranks</h2>
        <p className="text-sm leading-[1.7] sf-pro-medium">
          Consistently show up, climb up the ladder and unlock all the ranks! Your number of coins determine the rank
          you are in.
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-x-1 gap-y-10 my-6">
            {badgesLists.map(({ title, reward, unlockedIcon, lockedIcon, isUnlocked, requiredCoin }) => {
              return (
                <BadgeCard
                  title={title}
                  unlockedIcon={unlockedIcon}
                  lockedIcon={lockedIcon}
                  isUnlocked={isUnlocked}
                  balance={balance}
                  key={title}
                  reward={reward}
                  requiredCoin={requiredCoin}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
