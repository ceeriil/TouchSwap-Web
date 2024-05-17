import React from "react";
import Image from "next/image";
import Link from "next/link";

export const RankHeader = () => {
  return (
    <Link href={"/badges"}>
      <div className="text-left flex flex-col items-end text-[0.8rem]">
        <p className="text-left  mb-[2px]">Rank</p>
        <Image src="/img/plankton.svg" alt="Plankton" width={24} height={24} />
        <p className="text-left mt-[2px]">Plankton {">"}</p>
      </div>
    </Link>
  );
};
