import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import {Task} from "@/types"

type QuestList = {
  title: string;
  desc: string;
  tasks: Task[];
};

export const connectQuestsLists: QuestList = {
  title: "Wallet Connect Fun",
  desc: "Connect Touchswap to your solana wallet, be careful! Once connected, any rewards would be sent to the connected wallet.",
  tasks: [
    {
      title: "Connect Wallet",
      completed: false,
      link:"",
      reward:1000,
      confimationLink:""
    },
  ],
};

export const ConnectQuestScreen = () => {
  return <OpenQuestDetailScreen {...connectQuestsLists} />;
};
