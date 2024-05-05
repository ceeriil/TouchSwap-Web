import React from "react";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { MinnowBadge } from "../assets/badges/MinnowBadge";
import { PlanktonBadge } from "../assets/badges/PlanktonBadge";
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
    title: "Recharge Speed boost",
    isUnlocked: true,
    unlockedIcon: <PlanktonBadge unlocked />,
    lockedIcon: <PlanktonBadge unlocked={false} />,
  },
  {
    title: "Recharge Speed boost",
    isUnlocked: true,
    unlockedIcon: <MinnowBadge unlocked />,
    lockedIcon: <PlanktonBadge unlocked={false} />,
  },
  {
    title: "Recharge Speed boost",
    isUnlocked: false,
    icon: <PlanktonBadge unlocked />,
  },
  {
    title: "Recharge Speed boost",
    isUnlocked: false,
    icon: <PlanktonBadge unlocked />,
  },
  {
    title: "Recharge Speed boost",
    isUnlocked: false,
    icon: <PlanktonBadge unlocked />,
  },
  {
    title: "Recharge Speed boost",
    isUnlocked: false,
    icon: <PlanktonBadge unlocked />,
  },
];

export const BadgesScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-3 my-8">
        <h2 className="text-2xl font-[500] mb-3">Ranks</h2>
        <p className="text-sm leading-[1.7]">
          Consistently show up, climb up the ladder and unlock all the ranks! Your number of coins determine the rank
          you are in.
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4 gap-y-8 my-6">
            {badgesLists.map(({ title, unlockedIcon, lockedIcon, isUnlocked }) => {
              return <div key={title}>{isUnlocked ? unlockedIcon : lockedIcon} </div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
