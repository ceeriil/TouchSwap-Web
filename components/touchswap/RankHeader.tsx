import React from "react";
import Image from "next/image";
import { useAppStore } from "@/services/store/store";

export const RankHeader = () => {
  const setScreen = useAppStore(state => state.setScreen);

  const goToBadges = () => {
    setScreen("badges");
  };

  return (
    <div onClick={goToBadges}>
      <div className="text-right flex flex-col items-end text-[0.8rem]">
        <p className="text-left  mb-[2px] text-white">Rank</p>
        <Image src="/img/plankton.svg" alt="Plankton" width={24} height={24} />
        <p className="text-left mt-[2px] text-white">Plankton {">"}</p>
      </div>
    </div>
  );
};
