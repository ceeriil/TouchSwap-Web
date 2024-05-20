import React, { useEffect, useState } from "react";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { OpenBtnIcon } from "../assets/OpenBtnIcon";
import { TBoost, useAppStore } from "@/services/store/store";

type BoostCardProps = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  initialCost: number;
  id: number;
  noLevel : boolean
};

export const BoostCard: React.FC<BoostCardProps> = ({ title, icon, desc, initialCost, id, noLevel= false }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBoost, setCurrentBoost] = useState<TBoost | null>(null);

  const balance = useAppStore((state) => state.user.balance);
  const boosts = useAppStore((state) => state.paidBoosts);
  const updateBalance = useAppStore((state) => state.updateBalance);
  const updateBoostLevel = useAppStore((state) => state.updatePaidBoostLevel);

  useEffect(() => {
    const foundBoost = boosts.find((boost) => boost.boostId === id);
    setCurrentBoost(foundBoost || null);
  }, [boosts, id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyBoost = () => {
    if (currentBoost) {
      const { cost, level, maximumLevel, boostId } = currentBoost;
      if (cost !== undefined && level !== undefined && maximumLevel !== undefined) {
        const totalCost = calculateTotalCost(cost, level);
        if (balance >= totalCost && level < maximumLevel) {
          updateBalance(balance - totalCost);
          updateBoostLevel(boostId, level + 1);
          closeModal();
        }
      }
    }
  };

  const calculateTotalCost = (baseCost: number, currentLevel: number) => {
    return baseCost * Math.pow(2, currentLevel);
  };

  if (!currentBoost) {
    return null;
  }

  const { cost, level, maximumLevel } = currentBoost;

  return (
    <div className="border-[0.5px] border-[#49485C] p-[4px] rounded-lg dark-blue-gradient">
      <div className="light-green-gradient py-7 px-4 rounded h-full relative" onClick={openModal}>
        <div className="mb-3">{icon}</div>
        <h3 className="text-[0.8rem] font-[500] mb-4 leading-[1.8]">{title}</h3>
        <Balance size="base" count={(cost || initialCost) * (Math.pow(2, level || 0))} />
        <p className="text-[0.8rem] mt-3">Level {level} / {maximumLevel}</p>
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
        cost={cost!}
        onClick={handleBuyBoost}
        maxLevel={maximumLevel}
        level={level}
      />
    </div>
  );
};
