import React, { useState } from "react";
import { MouseEvent } from "react";
import Image from "next/image";
import { Balance } from "../Balance";
import { Modal } from "../ModalBase";
import { BgGlow } from "../assets/BgGlow";
import { BgGlowGreen } from "../assets/BgGlowGreen";
import { BgGlowPurple } from "../assets/BgGlowPurple";
import { BottleIcon } from "../assets/BottleIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Refill } from "../touchswap/Refill";
import { useAppStore } from "@/services/store/store";

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [coinTapPosition, setCoinTapPosition] = useState({ x: 0, y: 0 });
  const [showCoinTapAnimation, setShowCoinTapAnimation] = useState(false);
  const { balance, updateBalance } = useAppStore();
  const [extraTap, setExtraTap] = useState(false);
  const [refill, setRefill] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCoinTap = (e: MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    setCoinTapPosition({ x: offsetX, y: offsetY });
    setShowCoinTapAnimation(true);
    const currentTap = 1;
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    }
    updateBalance(balance + currentTap);
  };

  const handleCoinTapAnimationEnd = () => {
    setShowCoinTapAnimation(false);
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
    <section className="h-[65%]">
      <div className="h-full flex flex-col items-center justify-center">
        <Balance count={balance} />
        <div className="relative mt-6 flex items-center justify-center">
          <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} className="" onClick={handleCoinTap} />
          {showCoinTapAnimation && (
            <span
              className="absolute silver-text text-[1.1rem] z-10 font-semibold"
              style={{
                top: coinTapPosition.y,
                left: coinTapPosition.x,
                animation: "numberAnimation 0.5s forwards",
              }}
              onAnimationEnd={handleCoinTapAnimationEnd}
            >
              +1
            </span>
          )}
          <BgGlow
            className={` ${
              extraTap || refill ? "opacity-0" : "opacity-100"
            } absolute w-full top-[-30%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.3] transition-opacity duration-500 ease-in-out`}
          />
          <BgGlowGreen
            className={` ${
              extraTap ? "opacity-100" : "opacity-0"
            } absolute w-full top-[-70%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.5] transition-opacity duration-500 ease-in-out`}
          />
          <BgGlowPurple
            className={`${
              refill ? "opacity-100" : "opacity-0"
            } absolute w-full top-[-70%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.5] transition-opacity duration-500 ease-in-out`}
          />
        </div>

        <div className="w-full flex justify-between mt-10">
          <button onClick={handleOpenModal}>
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
        text={"   Increases the amount of coins gained by 5x for 30 seconds. Does not consume energy while in effect."}
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
  );
};
