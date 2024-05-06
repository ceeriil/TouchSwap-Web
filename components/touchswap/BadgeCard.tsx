import React from "react";

type BadgeCardProps = {
  title: string;
  isUnlocked: boolean;
  unlockedIcon?: React.ReactNode;
  lockedIcon?: React.ReactNode;
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ title, isUnlocked, lockedIcon, unlockedIcon }) => {
  return (
    <div key={title} className="flex flex-col items-center justify-center">
      <div className="w-[85px] h-[85px] mb-4 flex justify-center items-center">
        {isUnlocked ? unlockedIcon : lockedIcon}
      </div>
      <h3 className="text-[0.8rem]">{title}</h3>

      <p className="text-[0.70rem] text-center mt-1">15.6k of 25k coins</p>
      <div className="w-[65px] rounded h-[3px] mt-3">
        <div
          className="font-medium text-white text-center h-full leading-none rounded-xl flex justify-center items-center bg-[#EAAD65] "
          style={{ width: "95%" }}
        ></div>
      </div>
    </div>
  );
};
