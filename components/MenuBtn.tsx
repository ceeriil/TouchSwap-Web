import React from "react";
import { Bubble } from "./assets/Bubble";

type MenuLink = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive: boolean;
};

export const MenuBtn: React.FC<MenuLink> = ({ label, icon, isActive }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="relative">
        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          {icon}
        </div>
        <Bubble isActive={isActive} />
      </div>

      <div
        className={`  ${
          isActive
            ? "text-white purple-gradient"
            : "text-[#AFAFAF] bg-[#262433]"
        }     " py-[3px] px-3 rounded-full mt-[-0.8rem] text-[0.8rem] border border-black font-[500] z-10 relative"`}
        style={{
          boxShadow: `0.88px 2.63px 1.32px 0px #FFFFFF47 inset;
            `,
        }}
      >
        {label}
      </div>
    </div>
  );
};
