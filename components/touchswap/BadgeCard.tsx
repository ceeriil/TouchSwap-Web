import React, { useState } from "react";
import { ClaimReward } from "./ClaimReward";

type BadgeCardProps = {
  title: string;
  reward: number;
  isUnlocked: boolean;
  requiredCoin: number;
  unlockedIcon?: React.ReactNode;
  lockedIcon?: React.ReactNode;
  balance: number;
};

export const BadgeCard: React.FC<BadgeCardProps> = ({
  title,
  reward,
  isUnlocked,
  lockedIcon,
  unlockedIcon,
  requiredCoin,
  balance,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatNumber = (amount: number): string => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M";
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "k";
    } else {
      return amount.toString();
    }
  };

  return (
    <div key={title} className="flex flex-col items-center justify-center">
      <div className="w-[85px] h-[85px] mb-4 flex justify-center items-center relative">
        {isUnlocked ? unlockedIcon : lockedIcon}
        <button
          className="text-[0.65rem] px-2 purple-gradient rounded-full  py-[2px] border border-black absolute bottom-0 font-[500]"
          onClick={openModal}
          style={{
            boxShadow: `0.88px 2.63px 1.32px 0px #FFFFFF47 inset
            `,
          }}
        >
          Claim
        </button>
      </div>
      <h3 className="text-[0.8rem] sf-pro-medium">{title}</h3>

      <p className="text-[0.72rem] text-center mt-1 text-[#B0AEB5] sf-pro-medium">
        {formatNumber(balance)} of {formatNumber(requiredCoin)} coins
      </p>

      <div className="w-[65px] rounded-xl h-[3px] mt-[10px] bg-white">
        <div
          className="font-medium text-white text-center h-full leading-none rounded-xl flex justify-center items-center bg-[#EAAD65] "
          style={{ width: `${(balance / requiredCoin) * 100}%` }}
        ></div>
      </div>

      <ClaimReward onClose={closeModal} isOpen={isModalOpen} reward={reward} />
    </div>
  );
};
