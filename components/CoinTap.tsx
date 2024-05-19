import React, { useState } from "react";
import { MouseEvent } from "react";
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

export const CoinTap = ({ extraTap, refill }: { extraTap: boolean; refill: boolean }) => {
  const [tapPositions, setTapPositions] = useState<TapPosition[]>([]);
  const [tapCounter, setTapCounter] = useState(0);

  const balance = useAppStore(state => state.user.balance);
  const energyLeft = useAppStore(state => state.user.energy.energyLeft);
  const updateBalance = useAppStore(state => state.updateBalance);
  const useEnergy = useAppStore(state => state.useEnergy);

  const coinClick = (id: number) => {
    socketInstance.emit("coin-click", id);
  };

  const handleCoinTap = (e: MouseEvent) => {
    if (energyLeft < 1) return;
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    const newTap = { key: tapCounter, x: offsetX, y: offsetY };
    setTapPositions([...tapPositions, newTap]);
    setTapCounter(tapCounter + 1);
    const currentTap = 1;
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    }
    updateBalance(balance + currentTap);
    useEnergy(currentTap);
    coinClick(1278544551);
  };

  const handleAnimationEnd = (key: number) => {
    setTapPositions(tapPositions.filter(tap => tap.key !== key));
  };

  return (
    <>
      <Balance count={balance} />
      <div className="relative mt-5 flex items-center justify-center">
        <img src="/img/coin.svg" onClick={handleCoinTap} className="coin-img" />
        {tapPositions.map(({ key, x, y }) => (
          <span
            key={key}
            className="absolute silver-text text-[1.5rem] z-10 font-semibold"
            style={{
              top: y,
              left: x,
              animation: "numberAnimation 1s forwards",
            }}
            onAnimationEnd={() => handleAnimationEnd(key)}
          >
            +1
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
