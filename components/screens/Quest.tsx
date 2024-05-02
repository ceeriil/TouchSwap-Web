import React, { useState } from "react";
import { QuestCard } from "../touchswap/QuestCard";
import { QuestTab } from "../touchswap/QuestTab";

type OpenQuestsList = {
  title: string;
};

export const openQuestsLists: OpenQuestsList[] = [
  {
    title: "Social Media Madness!",
  },
  {
    title: "Wallet Connect Fun",
  },
];

export const referralQuestsLists: OpenQuestsList[] = [
  {
    title: "Refer a Friend Quest",
  },
  {
    title: "Share on Social Media Quest",
  },
];

export const QuestScreen = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  const filteredQuests = activeTab === 0 ? openQuestsLists : [];

  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Quests</h2>
        <p className="text-sm text-white leading-[1.7]">
          Participate in quests and earn rewards for your efforts.
        </p>
        <div className="mt-8">
          <QuestTab activeTab={activeTab} setActiveTab={handleTabClick} />
          <div className="grid gap-4">
            {filteredQuests.map(({ title }, index) => {
              return <QuestCard title={title} key={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
