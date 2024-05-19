import React, { useState } from "react";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { OpenBtnIcon } from "../assets/OpenBtnIcon";
import { useAppStore } from "@/services/store/store";

type BoostCardProps = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  cost: number;
  maxLevel: number;
};

export const BoostCard: React.FC<BoostCardProps> = ({ title, icon, desc, cost, maxLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const balance = useAppStore(state=> state.user.balance)
  const {  updateBalance, boosts, updateBoostLevel } = useAppStore();
  const level = boosts[title] || 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyBoost = () => {
    const totalCost = calculateTotalCost(cost, level);
    if (balance >= totalCost && level < maxLevel) {
      updateBalance(balance - totalCost);
      updateBoostLevel(title, level + 1);
      closeModal();
    } else {
      console.log("Insufficient balance or maximum level reached.");
    }
  };

  const calculateTotalCost = (baseCost: number, currentLevel: number) => {
    return baseCost * Math.pow(2, currentLevel);
  };

  return (
    <div className="border-[0.5px] border-[#49485C] p-[4px] rounded-lg dark-blue-gradient">
      <div className="light-green-gradient py-7 px-4 rounded h-full relative" onClick={openModal}>
        <div className="mb-3">{icon}</div>

        <h3 className="text-[0.8rem] font-[500] mb-4 leading-[1.8]">{title}</h3>
        <Balance size="base" count={cost * 2 ** level} />
        <p className="text-[0.8rem] mt-3">Level {level} /10</p>
        <div className="absolute bottom-4 right-3">
          <OpenBtnIcon />
        </div>
      </div>

      <Modal
        title={title}
        text={desc}
        onClose={closeModal}
        isOpen={isModalOpen}
        icon={icon}
        cost={cost}
        onClick={handleBuyBoost}
        maxLevel={10}
        level={level}
      ></Modal>
    </div>
  );
};
