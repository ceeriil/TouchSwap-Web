import React, { createContext, useContext, useState } from "react";

type UserBalanceContextType = {
  balance: number;
  updateBalance: (newBalance: number) => void;
};

const UserBalanceContext = createContext<UserBalanceContextType | undefined>(undefined);

export const UserBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(12394);

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return <UserBalanceContext.Provider value={{ balance, updateBalance }}>{children}</UserBalanceContext.Provider>;
};

export const useUserBalance = (): UserBalanceContextType => {
  const context = useContext(UserBalanceContext);
  if (!context) {
    throw new Error("useUserBalance must be used within a UserBalanceProvider");
  }
  return context;
};
