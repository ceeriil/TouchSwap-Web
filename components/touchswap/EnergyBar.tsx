import React from "react";
import { EnergyBarHead } from "../assets/EnergyBarHead";

export const EnergyBar = () => {
  return (
    <div className="w-[124px] relative">
      <div className="w-full rounded bg-[#8C7EAD66] h-[18px] relative">
        <div className="dark-green-gradient top-[-3px] left-0 bottom-[-3px] w-full absolute rounded"></div>
        <div
          className="green-gradient  text-white text-center h-full leading-none rounded flex justify-center items-center text-[0.82rem] energy-text"
          style={{ width: "95%" }}
        >
          <p className="text-white font-semibold">95/100</p>
        </div>
      </div>

      <EnergyBarHead
        width={"35"}
        height={"35"}
        className="absolute left-[-35%] top-[50%] translate-y-[-50%]  translate-x-[100%]"
      />
    </div>
  );
};
