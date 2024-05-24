import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import { LinkTask, QuestList } from "@/types";

export const socialQuestsLists: QuestList = {
  id: "social",
  title: "Social Media Madness!",
  desc: "Our Social media accounts are amazing places! Check them out, follow us!",
  tasks: [
    {
      title: "Join Our Telegram",
      completed: false,
      link: "https://t.me/zaarwe_bot",
      reward: 100,
    },
    {
      title: "Follow us on X!",
      completed: false,
      link: "https://twitter.com/Touchswap",
      reward: 100,
    },
    {
      title: "Visit our website!",
      completed: false,
      link: "https://www.touchswap.xyz/",
      reward: 400,
    },
  ],
  claimed: false,
};

export const SocialQuestScreen = () => {
  const handleClaim = () => {
    console.log("ikddui");
  };

  const handleTaskOpen = (index: number) => {
    console.log(socialQuestsLists.tasks[index]);
  };

  return <OpenQuestDetailScreen quest={socialQuestsLists} handleClaim={handleClaim} handleTaskOpen={handleTaskOpen} />;
};
