import React from "react";
import { CrownIcon } from "../assets/CrownIcon";
import { DoubleCoinIcon } from "../assets/DoubleCoinIcon";
import { Hearticon } from "../assets/Hearticon";
import { TimerIcon } from "../assets/TimerIcon";
import { StatsCard } from "../touchswap/StatsCard";

type StatsCardList = {
  title: string;
  icon?: React.ReactNode;
  count: string;
};

export const statsCardLists: StatsCardList[] = [
  {
    title: "Total Share Balance",
    icon: <DoubleCoinIcon width="17" height="16" />,
    count: "2.490T",
  },
  {
    title: "Total Touches",
    icon: <TimerIcon />,
    count: "5,642,282",
  },
  {
    title: "Total Players",
    icon: <CrownIcon />,
    count: "3,382,538",
  },
  {
    title: "Daily Users",
    icon: <Hearticon />,
    count: "952,525",
  },
  {
    title: "Online Players",
    icon: <Hearticon />,
    count: "50,000",
  },
];

export const StatsScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-3 my-8">
        <h2 className="text-2xl font-[500] ">Statistics</h2>
        <p className="text-sm text-white my-3">
          You are among the top <span className="bg-[#6200DE] rounded-full px-2 py-1 text-[0.75rem]">20%</span> players!
        </p>
        <div className="text-[0.8rem] font-[500]">
          23,049/<span className="text-[#AFAFAF]">3,382,538</span>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-2">
            {statsCardLists.map(({ title, icon, count }, index) => {
              return <StatsCard title={title} key={index} icon={icon} count={count} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
