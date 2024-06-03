import React, { useState } from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";
import { LinkTask, QuestList } from "@/types";
import { calculateTotalReward } from "@/utils";


export const socialQuestsLists: QuestList = {
  id: "social",
  title: "Social Media Madness!",
  desc: "Our Social media accounts are amazing places! Check them out, follow us!",
  tasks: [
    {
      title: "Join Our Telegram",
      completed: true,
      link: "https://t.me/zaarwe_bot",
      reward: 40000,
    },
    {
      title: "Follow us on X!",
      completed: true,
      link: "https://twitter.com/Touchswap",
      reward: 40000,
    },
    {
      title: "Visit our website!",
      completed: true,
      link: "https://www.touchswap.xyz/",
      reward: 40000,
    },
  ],
  claimed: false,
};


export const SocialQuestScreen = () => {
  const [claimed, setClaimed] = useState(socialQuestsLists.claimed);

  const handleClaim = () => {
    const tasksCompleted = socialQuestsLists.tasks.every(task => task.completed);
    if (tasksCompleted) {
      setClaimed(true);
    }
  };

  const totalReward = calculateTotalReward(socialQuestsLists);

  const handleTaskOpen = (index: number) => {
    console.log(socialQuestsLists.tasks[index]);
  };

  return (
    <OpenQuestDetailScreen
      quest={socialQuestsLists}
      handleClaim={handleClaim}
      handleTaskOpen={handleTaskOpen}
      claimed={claimed}
      reward={totalReward}
    />
  );
};
