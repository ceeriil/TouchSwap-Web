import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import { QuestList } from "@/types";

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
    },
  ],
  claimed: false,
};

const handleCliam = () => {};

const handleTaskOpen = (index: number) => {};

export const ConnectQuestScreen = () => {
  return <OpenQuestDetailScreen quest={connectQuestsLists} handleClaim={handleCliam} handleTaskOpen={handleTaskOpen} />;
};
