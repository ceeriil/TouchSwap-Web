import React from "react";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
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

type BadgesList = {
  title: string;
  icon?: React.ReactNode;
  isUnlocked: boolean;
  unlockedIcon?: React.ReactNode;
  lockedIcon?: React.ReactNode;
};

export const badgesLists: BadgesList[] = [
  {
    title: "Plankton",
    isUnlocked: true,
    unlockedIcon: <PlanktonBadge unlocked />,
    lockedIcon: <PlanktonBadge unlocked={false} />,
  },
  {
    title: "Minnow",
    isUnlocked: true,
    unlockedIcon: <MinnowBadge unlocked />,
    lockedIcon: <PlanktonBadge unlocked={false} />,
  },
  {
    title: "Dolphin",
    isUnlocked: true,
    unlockedIcon: <DolphinBadge unlocked />,
  },
  {
    title: "Shark",
    isUnlocked: true,
    unlockedIcon: <SharkBadge unlocked />,
  },
  {
    title: "Orca",
    isUnlocked: true,
    unlockedIcon: <OrcaBadge unlocked />,
  },
  {
    title: "Whale",
    isUnlocked: true,
    unlockedIcon: <WhaleBadge unlocked />,
  },
  {
    title: "Megalodon",
    isUnlocked: true,
    unlockedIcon: <MegalodonBadge unlocked />,
  },
  {
    title: "Levaithan",
    isUnlocked: true,
    unlockedIcon: <LeviathanBadge unlocked />,
  },
  {
    title: "Kraken",
    isUnlocked: true,
    unlockedIcon: <KrakenBadge unlocked />,
  },
];

export const BadgesScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-3 my-8 pb-32">
        <h2 className="text-2xl font-[500] mb-3">Ranks</h2>
        <p className="text-sm leading-[1.7]">
          Consistently show up, climb up the ladder and unlock all the ranks! Your number of coins determine the rank
          you are in.
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-x-1 gap-y-6 my-6">
            {badgesLists.map(({ title, unlockedIcon, lockedIcon, isUnlocked }) => {
              return (
                <BadgeCard title={title} unlockedIcon={unlockedIcon} lockedIcon={lockedIcon} isUnlocked={isUnlocked} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
