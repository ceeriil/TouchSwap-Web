import React from "react";
import { Balance } from "../Balance";
import { BoostCard } from "../touchswap/BoostCard";
import { SpeedBoostIcon } from "../assets/SpeedBoostIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";

type BoostCardList = {
  title: string;
  icon?: React.ReactNode;
};

export const boostCardLists: BoostCardList[] = [
  {
    title: "Recharge Speed boost",
    icon: <SpeedBoostIcon width={"35"} height={"32"} />,
  },
  {
    title: "Multi Tap",
    icon: <MultiTapIcon width={"48"} height={"32"} />,
  },
  {
    title: "Increase Energy Limit",
    icon: <EnergyLimitIcon width={"31"} height={"32"} />,
  },
  {
    title: "Auto swipe",
    icon: <AutoSwipeIcon width={"36"} height={"32"} />,
  },
];

export const BoostScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Boosters</h2>
        <p className="text-sm">
          Use these powerups to increase your ranking and the amount of coins
          you gain!
        </p>
        <div className="mt-8">
          <h3 className="text-sm mb-2 font-[500]">Balance</h3>
          <Balance />
          <div className="grid grid-cols-2 gap-4">
            {boostCardLists.map(({ title, icon }) => {
              return <BoostCard title={title} key={title} icon={icon} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
