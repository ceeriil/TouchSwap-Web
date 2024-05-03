import React from "react";
import { Balance } from "../../Balance";
import { TaskIcon } from "../../assets/TaskIcon";
import Link from "next/link";
import { ArrowRight } from "@/components/assets/ArrowRight";

type QuestCardProps = {
  title: string;
  icon?: React.ReactNode;
  link: string;
};

export const QuestCard: React.FC<QuestCardProps> = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="bg-[#293641] py-3 px-4 rounded-lg h-full flex items-center justify-between"
    >
      <div className="flex items-center">
        <TaskIcon active />
        <div className="ml-3">
          <h3 className="text-[0.8rem] font-[500] leading-[1.8] text-[#AFAFAF]">
            {title}
          </h3>
          <Balance size="sm" />
        </div>
      </div>

      <div>
        <ArrowRight />
      </div>
    </Link>
  );
};
