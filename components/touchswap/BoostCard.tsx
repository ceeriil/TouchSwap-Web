import React, { useState } from "react";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { OpenBtnIcon } from "../assets/OpenBtnIcon";

type BoostCardProps = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  cost: number;
};

export const BoostCard: React.FC<BoostCardProps> = ({ title, icon, desc, cost }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-[0.5px] border-[#49485C] p-[4px] rounded-lg dark-blue-gradient">
      <div className="light-green-gradient py-6 px-4 rounded h-full relative" onClick={openModal}>
        <div className="mb-4">{icon}</div>

        <h3 className="text-[0.8rem] font-[500] mb-4 leading-[1.8]">{title}</h3>
        <Balance size="base" count={cost} />
        <p className="text-[0.8rem] mt-3">Level 0/10</p>
        <div className="absolute bottom-4 right-3">
          <OpenBtnIcon />
        </div>
      </div>

      <Modal title={title} text={desc} onClose={closeModal} isOpen={isModalOpen}></Modal>
    </div>
  );
};
