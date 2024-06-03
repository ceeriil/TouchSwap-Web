import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import { QuestList } from "@/types";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { calculateTotalReward } from "@/utils";


export const connectQuestsLists: QuestList = {
  id: "wallet",
  title: "Wallet Connect Fun",
  desc: "Connect Touchswap to your solana wallet, be careful! Once connected, any rewards would be sent to the connected wallet.",
  tasks: [
    {
      title: "Connect Wallet",
      completed: false,
      link: "",
      reward: 1000,
      button:( <WalletMultiButton className="text-sm bg-white text-black py-2 px-2 rounded-lg font-medium" style={{}}  />),
    },
  ],
  claimed: false,
};


export const ConnectQuestScreen = () => {

  const totalReward = calculateTotalReward(connectQuestsLists);
  const handleClaim = () => {};

  const handleTaskOpen = (index: number) => {
    
  };

  return (
    <OpenQuestDetailScreen
      quest={connectQuestsLists}
      handleClaim={handleClaim}
      handleTaskOpen={handleTaskOpen}
      reward={totalReward}
      claimed={connectQuestsLists.claimed}
    />
  );
};
