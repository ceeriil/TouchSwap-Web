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

const frames = ["/img/coin1.svg", "/img/coin2.svg", "/img/coin1.svg"];

export const CoinTap = ({ extraTap, refill }: { extraTap: boolean; refill: boolean }) => {
  const user = useAppStore(state => state.user);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [tapPositions, setTapPositions] = useState<TapPosition[]>([]);
  const [tapCounter, setTapCounter] = useState(0);
  const balance = useAppStore(state => state.user.balance);
  const energyLeft = useAppStore(state => state.user.energy.energyLeft);
  const extraTapActive = useAppStore(state => state.extraTap);
  const tapValue = useAppStore(state => state.user.tapValue);
  const updateBalance = useAppStore(state => state.updateBalance);
  const useEnergy = useAppStore(state => state.useEnergy);

  const coinClick = (id: number) => {
    socketInstance.emit("coin-click", id);
  };

  const coinAnimation = () => {
    setCurrentFrame(1);
    setTimeout(() => {
      setCurrentFrame(0);
    }, 200);
  };

  const handleCoinTap = (e: TouchEvent) => {
    if (energyLeft < 1) return;

    coinAnimation();

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
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    }

    updateBalance(balance + totalTapValue);
    useEnergy(tapValue);
    coinClick(user.id);
  };

  const handleAnimationEnd = (key: number) => {
    setTapPositions(tapPositions.filter(tap => tap.key !== key));
  };

  return (
    <>
      <Balance count={balance} />
      <div className="relative mt-5 flex items-center justify-center w-[335px] h-[283px]">
        {/* Coin Animation: WIP */}
        {frames.map((frame, index) => (
          <img
            key={index}
            src={frame}
            onTouchStart={handleCoinTap}
            alt={`Frame ${index + 1}`}
            className={`coin-img z-20 absolute transition-opacity duration-100 ease-in-out ${
              currentFrame === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              position: "absolute",
            }}
          />
        ))}

        {tapPositions.map(({ key, x, y }) => (
          <span
            key={key}
            className="absolute silver-text text-[1.5rem] z-30 font-semibold"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              animation: "numberAnimation 1.5s forwards ease-out",
            }}
            onAnimationEnd={() => handleAnimationEnd(key)}
          >
            +{tapValue}
          </span>
        ))}
        <BgGlow
          className={`${
            extraTapActive || refill ? "opacity-0" : "opacity-100"
          } absolute w-full top-[-30%] left-0 right-0 bottom-0 z-[-1] overflow-visible scale-[1.3] transition-opacity duration-500 ease-in-out`}
        />
        <BgGlowGreen
          className={`${
            extraTapActive ? "opacity-100" : "opacity-0"
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
