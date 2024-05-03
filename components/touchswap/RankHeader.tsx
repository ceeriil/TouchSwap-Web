import React from "react";
import { CoinIcon } from "../assets/CoinIcon";

export const RankHeader = () => {
  return (
    <div className="text-left flex flex-col items-end">
      <p className="text-left">Rank</p>
      <CoinIcon />
      <p className="text-left">Plankton {">"}</p>
    </div>
  );
};
