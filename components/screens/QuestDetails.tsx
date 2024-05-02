import React, { useState } from "react";
import { QuestTab } from "../touchswap/quests/QuestTab";
import { OpenQuests } from "../touchswap/quests/OpenQuests";
import { ReferralQuests } from "../touchswap/quests/ReferralQuest";

export const QuestDetails = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Social Media Madness!</h2>
        <p className="text-sm text-white leading-[1.7]">
          Our Social media accounts are amazing places! Check them out, follow
          us!
        </p>
        <div className="mt-8">
          <QuestTab activeTab={activeTab} setActiveTab={handleTabClick} />
          <ReferralQuests />
        </div>
      </div>
    </section>
  );
};
