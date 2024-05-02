import React from "react";
import { Balance } from "../Balance";
import { BoostCard } from "../touchswap/BoostCard";
import { SpeedBoostIcon } from "../assets/SpeedBoostIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";

type BoostCardList = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export const boostCardLists: BoostCardList[] = [
  {
    title: "Recharge Speed boost",
    desc: "Increases the speed at which your energy regenerates by +1 every second.",
    icon: <SpeedBoostIcon width={"35"} height={"32"} />,
  },
  {
    title: "Multi Tap",
    desc: "Increases the amount gained +5",
    icon: <MultiTapIcon width={"48"} height={"32"} />,
  },
  {
    title: "Increase Energy Limit",
    desc: "Increases the speed at which your energy regenerates by +1 every second.",
    icon: <EnergyLimitIcon width={"31"} height={"32"} />,
  },
  {
    title: "Auto swipe",
    desc: "Perform actions on your behalf without your direct input when your energy is full. Works for 12 hours.",
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
          <div className="grid grid-cols-2 gap-4 my-6">
            {boostCardLists.map(({ title, icon, desc }) => {
              return (
                <BoostCard title={title} key={title} icon={icon} desc={desc} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
