import React, { useState } from "react";
import { CoinTap } from "../CoinTap";
import { Header } from "../Header";
import { Loader } from "../Loader";
import { Modal } from "../ModalBase";
import { BottleIcon } from "../assets/BottleIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Refill } from "../touchswap/Refill";

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [extraTap, setExtraTap] = useState(false);
  const [refill, setRefill] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExtraTap = () => {
    setExtraTap(true);
    setShowModal(false);
  };

  const handleRefill = () => {
    setRefill(true);
    setShowRefillModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/*     <Loader /> */}
      <Header />
      <section className="">
        <div className="h-full flex flex-col items-center justify-center">
          <CoinTap extraTap={extraTap} refill={refill} />
          <div className="w-full flex justify-between mt-10 fixed bottom-[24%]">
            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              <ExtraTap />
            </button>

            <button
              onClick={() => {
                setShowRefillModal(true);
              }}
            >
              <Refill />
            </button>
          </div>
        </div>

        {/* --Extra Tap Modal */}
        <Modal
          title="Extra Tap"
          isOpen={showModal}
          onClose={handleCloseModal}
          onClick={handleExtraTap}
          icon={<DiamondIcon />}
          cost={0}
          text={
            "   Increases the amount of coins gained by 5x for 30 seconds. Does not consume energy while in effect."
          }
        ></Modal>
        {/*  */}

        <Modal
          title="Daily Refill"
          isOpen={showRefillModal}
          onClose={() => {
            setShowRefillModal(false);
          }}
          onClick={handleRefill}
          icon={<BottleIcon />}
          cost={0}
          text={"Refill your energy bar quickly."}
        ></Modal>
      </section>
    </div>
  );
};
