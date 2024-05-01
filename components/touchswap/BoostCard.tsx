import React from "react";
import { Balance } from "../Balance";
import { OpenBtnIcon } from "../assets/OpenBtnIcon";

type BoostCardProps = {
  title: string;
  icon?: React.ReactNode;
};

export const BoostCard: React.FC<BoostCardProps> = ({ title, icon }) => {
  return (
    <div className="border-[0.5px] border-[#49485C] p-2 rounded-lg">
      <div className="light-green-gradient py-6 px-4 rounded h-full relative">
        <div className="mb-4">{icon}</div>

        <h3 className="text-[0.8rem] font-[500] mb-6 leading-[1.8]">{title}</h3>
        <Balance size="base" />
        <p className="text-[0.8rem]">Level 0/10</p>
        <div className="absolute bottom-4 right-3">
          <OpenBtnIcon />
        </div>
      </div>
    </div>
  );
};
