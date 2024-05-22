import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import {Task} from "@/types"


type QuestList = {
  title: string;
  desc: string;
  tasks: Task[];
};

export const socialQuestsLists: QuestList = {
  title: "Social Media Madness!",
  desc: "  Our Social media accounts are amazing places! Check them out, follow us!",
  tasks: [
    {
      title: "Join Our Telegram",
      completed: false,
      link:"https://t.me/zaarwe_bot",
      reward:100,
      confimationLink:""
    },
    {
      title: "Follow us on X!",
      completed: false,
      link:"https://twitter.com/Touchswap",
      reward:100,
      confimationLink:""
    },
    {
      title: "Visit our website!",
      completed: false,
      link:"https://www.touchswap.xyz/",
      reward:400,
      confimationLink:""
    },
  ],
};

export const SocialQuestScreen = () => {
  return <OpenQuestDetailScreen {...socialQuestsLists} />;
};
