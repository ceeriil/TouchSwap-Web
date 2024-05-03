import React from "react";
import { Balance } from "../Balance";

type StatsCardProps = {
  title: string;
  count: string;
  icon?: React.ReactNode;
};

export const StatsCard: React.FC<StatsCardProps> = ({ title, icon, count }) => {
  return (
    <div className="light-green-gradient py-3 px-3 rounded-lg h-full">
      <h3 className="text-[0.8rem] font-[500] mb-1 leading-[1.8] text-[#AFAFAF]">
        {title}
      </h3>
      <div className={`text-base font-bold flex items-center`}>
        <span className="mr-2">{icon}</span> {count}
      </div>
    </div>
  );
};
