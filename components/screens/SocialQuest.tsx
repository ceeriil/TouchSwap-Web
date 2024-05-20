import React from "react";
import { OpenQuestDetailScreen } from "./OpenQuestDetails";

type Task = {
  title: string;
  completed: boolean;
};

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
    },
    {
      title: "Follow us on X!",
      completed: false,
    },
    {
      title: "Visit our website!",
      completed: false,
    },
  ],
};

export const SocialQuestScreen = () => {
  return <OpenQuestDetailScreen {...socialQuestsLists} />;
};
