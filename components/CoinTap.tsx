import React, { useState } from "react";
import { MouseEvent } from "react";
import Image from "next/image";
import { Balance } from "./Balance";
import { BgGlow } from "./assets/BgGlow";
import { BgGlowGreen } from "./assets/BgGlowGreen";
import { BgGlowPurple } from "./assets/BgGlowPurple";
import { socketInstance } from "@/services/socket";
import { useAppStore } from "@/services/store/store";

export const CoinTap = ({ extraTap, refill }: { extraTap: boolean; refill: boolean }) => {
  const [coinTapPosition, setCoinTapPosition] = useState({ x: 0, y: 0 });
  const [showCoinTapAnimation, setShowCoinTapAnimation] = useState(false);
  
  const user = useAppStore(state => state.user)
  const balance = useAppStore(state => state.user.balance );
  const energyLeft = useAppStore(state => state.user.energy.energyLeft );
  const updateBalance = useAppStore(state=> state.updateBalance)
  const useEnergy = useAppStore(state=> state.useEnergy)

  const coinClick = (id: number) => {
    socketInstance.emit("coin-click", id);
  };

  const handleCoinTap = (e: MouseEvent) => {
    if(energyLeft < 1 ) return
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    setCoinTapPosition({ x: offsetX, y: offsetY });
    setShowCoinTapAnimation(true);
    const currentTap = 1;
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    }
    updateBalance(balance + currentTap);
    useEnergy(currentTap)
    coinClick(user.id);
  };

  const handleCoinTapAnimationEnd = () => {
    setShowCoinTapAnimation(false);
  };

  return (
    <>
      <Balance count={balance} />
      <div className="relative mt-5 flex items-center justify-center">
        <Image
          src={"/img/coin.svg"}
          alt="Coin"
          width={335}
          height={300}
          className=""
          onClick={handleCoinTap}
          quality={100}
        />
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
    </>
  );
};
