import React, { useState } from "react";
import Image from "next/image";
import { Amount } from "../Amount";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Modal } from "../ModalBase";

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
        <Amount />
        <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} />
        <div className="w-full flex justify-between mt-10">
          <ExtraTap />
        </div>
      </div>
      {showModal && (
        <Modal
          title="Extra Tap"
          onClose={handleCloseModal}
          text={
            "   Increases the amount of coins gained by 5x for 30 seconds. Does not consume energy while in effect."
          }
        ></Modal>
      )}
    </section>
  );
};
