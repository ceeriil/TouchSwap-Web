import React from "react";
import { EnergyBar } from "./touchswap/EnergyBar";
import { RankHeader } from "./touchswap/RankHeader";

export const Header = () => {
  return (
    <header>
      <div className="container px-8 py-8 flex justify-between items-start text-sm ">
        <EnergyBar />
        <RankHeader />
      </div>
    </header>
  );
};
