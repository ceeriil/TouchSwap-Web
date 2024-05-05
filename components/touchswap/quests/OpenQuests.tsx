import React from "react";
import { QuestCard } from "./QuestCard";

type OpenQuestsList = {
  title: string;
  link: string;
};

export const openQuestsLists: OpenQuestsList[] = [
  {
    title: "Social Media Madness!",
    link: "/quests/social",
  },
  {
    title: "Wallet Connect Fun",
    link: "/quests/wallet",
  },
];

export const OpenQuests = () => {
  return (
    <div className="grid gap-4">
      {openQuestsLists.map(({ title, link }, index) => {
        return <QuestCard title={title} key={index} link={link} />;
      })}
    </div>
  );
};
