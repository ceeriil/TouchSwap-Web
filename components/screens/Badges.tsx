import React from "react";
import { BoostCard } from "../touchswap/BoostCard";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { PlanktonBadge } from "../assets/badges/PlanktonBadge";

type BadgesList = {
  title: string;
  icon?: React.ReactNode;
};

export const badgesLists: BadgesList[] = [
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
  {
    title: "Recharge Speed boost",
    icon: <PlanktonBadge completed />,
  },
];

export const BadgesScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Ranks</h2>
        <p className="text-sm leading-[1.7]">
          Consistently show up, climb up the ladder and unlock all the ranks!
          Your number of coins determine the rank you are in.
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4 gap-y-8 my-6">
            {badgesLists.map(({ title, icon }) => {
              return <div key={title}>{icon} </div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
