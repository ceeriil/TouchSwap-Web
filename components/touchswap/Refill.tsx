import React from "react";
import { RefillIcon } from "../assets/Refill-Icon";

export const Refill = () => {
  return (
    <div>
      <p className="text-[0.8rem] mb-1 text-white pr-2 text-right font-medium">
        Daily
        <br />
        Refill
      </p>
      <div className="relative">
        <div
          className="absolute purple-gradient bottom-0 left-[50%] px-2 rounded-2xl transform translate-x-[-50%] text-[0.8rem] translate-y-[50%]"
          style={{
            boxShadow: `0.88px 2.63px 1.32px 0px #FFFFFF47 inset
            `,
          }}
        >
          <span>3/3</span>
        </div>
        <RefillIcon />
      </div>
    </div>
  );
};
