import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import { QuestList } from "@/types";
import { calculateTotalReward } from "@/utils";
import {TonConnectButton} from "@tonconnect/ui-react";


export const connectQuestsLists: QuestList = {
  id: "wallet",
  title: "Wallet Connect Fun",
  desc: "Connect Touchswap to your ton wallet, be careful! Once connected, any rewards would be sent to the connected wallet.",
  tasks: [
    {
      title: "Connect Wallet",
      completed: false,
      link: "",
      reward: 1000,
      button:( <TonConnectButton  className="text-sm text-black py-2 px-2 rounded-lg font-medium"   />),
    },
  ],
  claimed: false,
};


export const ConnectQuestScreen = () => {

  const totalReward = calculateTotalReward(connectQuestsLists);
  const handleClaim = () => {};

  const handleTaskOpen = (index: number) => {
      console.log(index)
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
