import React from "react";
import Link from "next/link";
import { CoinIcon } from "../assets/CoinIcon";

export const RankHeader = () => {
  return (
    <Link href={"/badges"}>
      <div className="text-left flex flex-col items-end text-[0.8rem]">
        <p className="text-left">Rank</p>
        <CoinIcon active />
        <p className="text-left">Plankton {">"}</p>
      </div>
    </Link>
  );
};
