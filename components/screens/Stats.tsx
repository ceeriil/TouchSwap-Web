import React from "react";
import { SpeedBoostIcon } from "../assets/SpeedBoostIcon";
import { MultiTapIcon } from "../assets/MultiTapIcon";
import { EnergyLimitIcon } from "../assets/EnergyLimitIcon";
import { AutoSwipeIcon } from "../assets/AutoSwipeIcon";
import { StatsCard } from "../touchswap/StatsCard";

type StatsCardList = {
  title: string;
  icon?: React.ReactNode;
};

export const statsCardLists: StatsCardList[] = [
  {
    title: "Total Share Balance",
    icon: <SpeedBoostIcon width={"35"} height={"32"} />,
  },
  {
    title: "Total Touches",
    icon: <MultiTapIcon width={"48"} height={"32"} />,
  },
  {
    title: "Total Players",
    icon: <EnergyLimitIcon width={"31"} height={"32"} />,
  },
  {
    title: "Daily Users",
    icon: <AutoSwipeIcon width={"36"} height={"32"} />,
  },
  {
    title: "Online Players",
    icon: <AutoSwipeIcon width={"36"} height={"32"} />,
  },
];

export const StatsScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Statistics</h2>
        <p className="text-sm text-white">
          You are among the top{" "}
          <span className="bg-[#6200DE] rounded-full px-2 py-1 text-[0.75rem]">
            20%
          </span>{" "}
          players!
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            {statsCardLists.map(({ title, icon }) => {
              return <StatsCard title={title} key={title} icon={icon} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
