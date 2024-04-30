import React from "react";
import { EnergyBarHead } from "../assets/EnergyBarHead";

export const EnergyBar = () => {
  return (
    <div className="w-32 relative">
      <div className="w-full rounded bg-[#8C7EAD66] h-6">
        <div
          className="green-gradient font-medium text-white text-center h-full leading-none rounded flex justify-center items-center text-[0.9rem]"
          style={{ width: "95%" }}
        >
          95/100
        </div>
      </div>
      <EnergyBarHead
        width={"40"}
        height={"40"}
        className="absolute left-[-45%] top-[50%] translate-y-[-50%]  translate-x-[100%]"
      />
    </div>
  );
};
