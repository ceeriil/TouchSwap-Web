import React, { useState, useEffect } from "react";
import { CrownIcon } from "../assets/CrownIcon";
import { DoubleCoinIcon } from "../assets/DoubleCoinIcon";
import { TimerIcon } from "../assets/TimerIcon";
import { StatsCard } from "../touchswap/StatsCard";
import { getStats } from "@/services/data/stats";
import { Loader } from "../Loader";
import { HeartIcon } from "../assets/Hearticon";

type StatsCardList = {
  title: string;
  icon?: React.ReactNode;
  count: number | string;
};

const initialStatsCardLists: StatsCardList[] = [
  {
    title: "Total Share Balance",
    icon: <DoubleCoinIcon width="17" height="16" />,
    count: "Loading...",
  },
  {
    title: "Total Touches",
    icon: <TimerIcon />,
    count: "Loading...",
  },
  {
    title: "Total Players",
    icon: <CrownIcon />,
    count: "Loading...",
  },
  {
    title: "Daily Users",
    icon: <HeartIcon />,
    count: "Loading...",
  },
  {
    title: "Online Players",
    icon: <HeartIcon />,
    count: "Loading...",
  },
];

const updateData = async ()=> {
  try {
    const stats = await getStats();
    const data = [
      {
        title: "Total Share Balance",
        icon: <DoubleCoinIcon width="17" height="16" />,
        count: stats.totalTokens,
      },
      {
        title: "Total Touches",
        icon: <TimerIcon />,
        count: stats.totalTouches,
      },
      {
        title: "Total Players",
        icon: <CrownIcon />,
        count: stats.totalUsers,
      },
      {
        title: "Daily Users",
        icon: <HeartIcon />,
        count: stats.totalDailyUsers,
      },
      {
        title: "Online Players",
        icon: <HeartIcon />,
        count: stats.online,
      },
    ];
  }
  catch {
    return initialStatsCardLists
  }
}

export const StatsScreen = () => {
  const [statsCardLists, setStatsCardLists] = useState<StatsCardList[]>(initialStatsCardLists);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false)
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col h-screen justify-center items-center">
        <Loader />
      </section>
    );
  }

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <div className="container mx-auto px-4 my-5">
        <h2 className="text-2xl font-bold mb-3 tracking-tight">Statistics</h2>
        <p className="text-sm text-white my-3 font-medium">
          You are among the top <span className="bg-purple-700 rounded-full px-2 py-1 text-xs">20%</span> players!
        </p>
        <div className="text-sm font-medium">
          23,049/<span className="text-gray-400">3,382,538</span>
        </div>

        <div className="bg-gray-800 h-px w-full my-5" />
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-2">
            {statsCardLists.map(({ title, icon, count }, index) => (
              <StatsCard title={title} key={index} icon={icon} count={count} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
