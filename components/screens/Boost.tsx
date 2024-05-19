import React from "react";
import { Balance } from "../Balance";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { SpeedBoostIcon } from "../assets/SpeedBoostIcon";
import { BoostCard } from "../touchswap/BoostCard";
import { useAppStore } from "@/services/store/store";

type BoostCardList = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  cost: number;
};

export const boostCardLists: BoostCardList[] = [
  {
    title: "Recharge Speed boost",
    desc: "Increases the speed at which your energy regenerates by +1 every second.",
    icon: <SpeedBoostIcon width={"35"} height={"32"} />,
    cost: 250,
  },
  {
    title: "Multi Tap",
    desc: "Increases the amount gained +5",
    icon: <MultiTapIcon width={"48"} height={"32"} />,
    cost: 500,
  },
  {
    title: "Increase Energy Limit",
    desc: "Increases the speed at which your energy regenerates by +1 every second.",
    icon: <EnergyLimitIcon width={"31"} height={"32"} />,
    cost: 250,
  },
  {
    title: "Auto swipe",
    desc: "Perform actions on your behalf without your direct input when your energy is full. Works for 12 hours.",
    icon: <AutoSwipeIcon width={"36"} height={"32"} />,
    cost: 200000,
  },
];

export const BoostScreen = () => {
  const { balance } = useAppStore();

  return (
    <section className="flex flex-col h-screen">
      <div className="container mx-auto px-4 my-4 pb-32">
        <h2 className="text-2xl font-[500] mb-3">Boosters</h2>
        <p className="text-sm sf-pro-medium">
          Use these powerups to increase your ranking and the amount of coins you gain!
        </p>
        <div className="bg-[#182334] h-[1px] w-full my-4" />
        <div className="mt-1">
          <h3 className="text-sm mb-2 font-[500]">Balance</h3>
          <Balance count={balance} />
          <div className="grid grid-cols-2 gap-4 gap-x-[10px] my-6 overflow-y-scroll pb-32 max-h-full h-[100%]">
            {boostCardLists.map(({ title, icon, desc, cost }) => {
              return <BoostCard cost={cost} title={title} key={title} icon={icon} desc={desc} maxLevel={10} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
