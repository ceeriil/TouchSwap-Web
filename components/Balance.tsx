import React from "react";
import { DoubleCoinIcon } from "./assets/DoubleCoinIcon";

type BalanceProps = {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  count: number;
};

const coinSizeMap = {
  xs: 6,
  sm: 11,
  base: 20,
  lg: 22,
  xl: 25,
  "2xl": 30,
  "3xl": 15,
};

export const Balance: React.FC<BalanceProps> = ({ size = "2xl", count }) => {
  return (
    <div className={`text-${size} font-[700] flex items-center`}>
      <span>
        <DoubleCoinIcon width={coinSizeMap[size]} height="29" />
      </span>
      <span className="ml-1">{count.toLocaleString()}</span>
    </div>
  );
};
