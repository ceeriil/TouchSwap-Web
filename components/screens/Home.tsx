import React from "react";
import Image from "next/image";
import { Amount } from "../Amount";

export const HomeScreen = () => {
  return (
    <section className="h-[65%]">
      <div className="container h-full flex flex-col items-center justify-center">
        <Amount />
        <Image src={"/img/coin.png"} alt="Coin" width={335} height={300} />
      </div>
    </section>
  );
};
