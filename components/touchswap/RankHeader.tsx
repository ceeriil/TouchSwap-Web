import React,{useEffect, useState} from "react";
import Image from "next/image";
import { useAppStore } from "@/services/store/store";
import { initHapticFeedback, isSSR, HapticFeedback } from "@tma.js/sdk-react";

export const RankHeader = () => {
  const setScreen = useAppStore(state => state.setScreen);

  const [hapticFeedback, setHapticFeedback] = useState<HapticFeedback | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isSSR()) {
      setHapticFeedback(initHapticFeedback());
    }
  }, []);

  const goToBadges = () => {
    setScreen("badges");
    hapticFeedback?.impactOccurred("soft")
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
