import React from "react";

type BalanceProps = {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
};

export const Balance: React.FC<BalanceProps> = ({ size = "2xl" }) => {
  return <div className={`text-${size} font-bold`}>12,394</div>;
};
