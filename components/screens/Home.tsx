import React, { useState } from "react";
import Image from "next/image";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { BgGlow } from "../assets/BgGlow";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Refill } from "../touchswap/Refill";
import { useUserBalance } from "@/context/userContext";

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const { balance, updateBalance } = useUserBalance();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCoinTap = () => {
    const currentTap: number = 1;
    updateBalance(balance + currentTap);
  };

  return (
    <section className="h-[65%]">
      <div className="h-full flex flex-col items-center justify-center">
        <Balance count={balance} />
        <div className="relative mt-6 flex items-center justify-center">
          <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} className="" onClick={handleCoinTap} />
          <BgGlow className="absolute w-full top-0 left-0 right-0 bottom-0 z-[-1]" />
        </div>

        <div className="w-full flex justify-between mt-10">
          <button onClick={handleOpenModal}>
            <ExtraTap />
          </button>

          <Refill />
        </div>
      </div>

      {/* --Extra Tap Modal */}
      <Modal
        title="Extra Tap"
        isOpen={showModal}
        onClose={handleCloseModal}
        text={"   Increases the amount of coins gained by 5x for 30 seconds. Does not consume energy while in effect."}
      ></Modal>
      {/*  */}

      <Modal
        title="Daily Refill"
        onClose={handleCloseModal}
        text={"Refill your energy bar quickly."}
        isOpen={showModal}
      ></Modal>
    </section>
  );
};
