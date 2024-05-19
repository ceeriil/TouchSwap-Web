import React, { useState } from "react";
import { TouchEvent } from "react";
import Image from "next/image";
import { Balance } from "./Balance";
import { BgGlow } from "./assets/BgGlow";
import { BgGlowGreen } from "./assets/BgGlowGreen";
import { BgGlowPurple } from "./assets/BgGlowPurple";
import { socketInstance } from "@/services/socket";
import { useAppStore } from "@/services/store/store";

type TapPosition = {
  key: number;
  x: number;
  y: number;
};

const frames = ["/img/coin1.svg", "/img/coin2.svg"];

export const CoinTap = ({ extraTap, refill }: { extraTap: boolean; refill: boolean }) => {
  
  const user = useAppStore(state => state.user)
  /*   const [currentFrame, setCurrentFrame] = useState(0);
   */ const [tapPositions, setTapPositions] = useState<TapPosition[]>([]);
  const [tapCounter, setTapCounter] = useState(0);
  const balance = useAppStore(state => state.user.balance);
  const energyLeft = useAppStore(state => state.user.energy.energyLeft);
  const updateBalance = useAppStore(state => state.updateBalance);
  const useEnergy = useAppStore(state => state.useEnergy);

  const coinClick = (id: number) => {
    socketInstance.emit("coin-click", id);
  };

  const tapValue = 2;

  /**
   * @Simon
   * Okay this is a realy giant function
   * tapvalue - represent the value added on each tap. In the case of extra  tap boost value will be multipled by *5. current tap value is equal to multi tap level.
   * if theres no energy. User can't tap.
   *  New tap is an array of touch positions where the number animation (with the tap value) comes out from.
   *  The for loop is used to loop through the touches to know the position of touch.
   *  For each touch, energy is used (still don't know if the energy used should be per touch or per tapValue)
   * Then the balance is updated based on the total tap value
   **/

  const handleCoinTap = (e: TouchEvent) => {
    if (energyLeft < 1) return;
    /*  setCurrentFrame(prevFrame => (prevFrame + 1) % frames.length); */
    const touches = e.touches;
    const newTaps: TapPosition[] = [];

    for (let i = 0; i < touches.length; i++) {
      const { clientX, clientY } = touches[i];
      const targetRect = (e.target as HTMLElement).getBoundingClientRect();
      const offsetX = clientX - targetRect.left;
      const offsetY = clientY - targetRect.top;
      newTaps.push({ key: tapCounter + i, x: offsetX, y: offsetY });
    }

    setTapPositions([...tapPositions, ...newTaps]);
    setTapCounter(tapCounter + touches.length);

    const totalTapValue = tapValue * touches.length;
    updateBalance(balance + totalTapValue);
    useEnergy(touches.length);
    coinClick(1278544551);
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    }
    updateBalance(balance + currentTap);
    useEnergy(currentTap)
    coinClick(user.id);
  };

  const handleAnimationEnd = (key: number) => {
    setTapPositions(tapPositions.filter(tap => tap.key !== key));
  };

  return (
    <>
      <Balance count={balance} />
      <div className="relative mt-5 flex items-center justify-center">
        <img src="/img/coin.svg" onTouchStart={handleCoinTap} className="coin-img z-20" />

        {/*  {frames.map((frame, index) => (
          <img
            key={index}
            src={frame}
            onTouchStart={handleCoinTap}
            alt={`Frame ${index + 1}`}
            className="coin-img"
            style={{
              opacity: index === currentFrame ? 1 : 0,
              transition: "opacity 0.5s ease-in-out", // Smooth transition effect
              position: "absolute", // Position images on top of each other
            }}
          />
        ))} */}

        {tapPositions.map(({ key, x, y }) => (
          <span
            key={key}
            className="absolute silver-text text-[1.5rem] z-30 font-semibold"
            style={{
              top: y,
              left: x,
              animation: "numberAnimation 1s forwards",
            }}
            onAnimationEnd={() => handleAnimationEnd(key)}
          >
            +{tapValue}
          </span>
        ))}
        <BgGlow
          className={`${
            extraTap || refill ? "opacity-0" : "opacity-100"
          } absolute w-full top-[-30%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.3] transition-opacity duration-500 ease-in-out`}
        />
        <BgGlowGreen
          className={`${
            extraTap ? "opacity-100" : "opacity-0"
          } absolute w-full top-[-70%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.5] transition-opacity duration-500 ease-in-out`}
        />
        <BgGlowPurple
          className={`${
            refill ? "opacity-100" : "opacity-0"
          } absolute w-full top-[-70%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.5] transition-opacity duration-500 ease-in-out`}
        />
      </div>
    </>
  );
};
