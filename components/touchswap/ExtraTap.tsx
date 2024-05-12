import React from "react";
import { ExtraTapIcon } from "../assets/ExtraTapIcon";

export const ExtraTap = () => {
  return (
    <div>
      <p className="text-[0.8rem] mb-1 text-white text-left pl-2 font-medium">
        Extra <br /> Taps
      </p>
      <div className="relative">
        <div
          className="absolute purple-gradient bottom-0 left-[50%] px-2 rounded-2xl transform translate-x-[-60%] text-[0.8rem] translate-y-[50%]"
          style={{
            boxShadow: `0.88px 2.63px 1.32px 0px #FFFFFF47 inset
            `,
          }}
        >
          <span>3/3</span>
        </div>
        <ExtraTapIcon />
      </div>
    </div>
  );
};
