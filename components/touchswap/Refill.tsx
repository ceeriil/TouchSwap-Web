import React from "react";
import { RefillIcon } from "../assets/Refill-Icon";

export const Refill = () => {
  return (
    <div>
      <p className="text-[0.8rem] mb-1 text-white pl-2 text-left">
        Daily
        <br />
        Refill
      </p>
      <RefillIcon />
    </div>
  );
};
