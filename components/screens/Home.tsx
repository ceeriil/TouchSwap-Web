import React, { useState } from "react";
import Image from "next/image";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Refill } from "../touchswap/Refill";

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <section className="h-[65%]">
      <div className="h-full flex flex-col items-center justify-center">
        <Balance count={12394} />
        <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} className="coin-glow mt-6" />
        <div className="w-full flex justify-between mt-10">
          <ExtraTap />
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
