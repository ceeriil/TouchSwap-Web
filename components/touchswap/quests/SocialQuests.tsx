import React from "react";
import { QuestCard } from "./QuestCard";

type SocialQuestsList = {
  title: string;
  link: string;
};

export const socialQuestsLists: SocialQuestsList[] = [
  {
    title: "Social Media Madness!",
    link: "/",
  },
  {
    title: "Wallet Connect Fun",
    link: "/",
  },
];

export const SocialQuests = () => {
  return (
    <div className="grid gap-4">
      {socialQuestsLists.map(({ title, link }, index) => {
        return <QuestCard title={title} key={index} link={link} />;
      })}
    </div>
  );
};
