import React from "react";
import Image from "next/image";
import { Amount } from "../Amount";
import { ExtraTap } from "../touchswap/ExtraTap";

export const HomeScreen = () => {
  return (
    <section className="h-[65%]">
      <div className="h-full flex flex-col items-center justify-center">
        <Amount />
        <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} />
        <div className="w-full flex justify-between mt-10">
          <ExtraTap />
        </div>
      </div>
    </section>
  );
};
