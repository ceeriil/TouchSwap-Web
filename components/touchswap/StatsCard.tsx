import React from "react";
import { Balance } from "../Balance";

type StatsCardProps = {
  title: string;
  icon?: React.ReactNode;
};

export const StatsCard: React.FC<StatsCardProps> = ({ title }) => {
  return (
    <div className="light-green-gradient py-5 px-4 rounded-lg h-full">
      <h3 className="text-[0.8rem] font-[500] mb-2 leading-[1.8] text-[#AFAFAF]">
        {title}
      </h3>
      <Balance size="base" />
    </div>
  );
};
