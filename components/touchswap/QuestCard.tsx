import React from "react";
import { Balance } from "../Balance";
import { TaskIcon } from "../assets/TaskIcon";

type QuestCardProps = {
  title: string;
  icon?: React.ReactNode;
};

export const QuestCard: React.FC<QuestCardProps> = ({ title }) => {
  return (
    <div className="bg-[#293641] py-3 px-6 rounded-lg h-full flex items-center">
      <TaskIcon active />
      <div className="ml-3">
        <h3 className="text-[0.8rem] font-[500] leading-[1.8] text-[#AFAFAF]">
          {title}
        </h3>
        <Balance size="sm" />
      </div>
    </div>
  );
};
