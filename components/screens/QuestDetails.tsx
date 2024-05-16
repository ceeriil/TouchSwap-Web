import React, { useState } from "react";
import Image from "next/image";
import { OpenQuests } from "../touchswap/quests/OpenQuests";
import { QuestTab } from "../touchswap/quests/QuestTab";
import { ReferralQuests } from "../touchswap/quests/ReferralQuest";

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

export const socialQuestsLists: OpenQuestsList[] = [
  {
    title: "Join Our Telegram",
  },
  {
    title: "Follow us on X!",
  },
  {
    title: "Visit our website!",
  },
];

const SocialQuestDetail = () => {
  return (
    <div className="grid gap-2 pb-32">
      {socialQuestsLists.map(({ title }, index) => {
        return (
          <div className="bg-[#293641] py-3 px-4 rounded-lg h-full flex items-center justify-between" key={index}>
            <div className="">
              <h3 className="text-[0.8rem] font-[500] leading-[1.8] text-[#AFAFAF]">{title}</h3>
            </div>
            <button className="text-sm bg-[#A7A7A7] text-black py-2 px-2 rounded-lg font-medium">Claim</button>
          </div>
        );
      })}
    </div>
  );
};

export const QuestDetailScreen = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">Social Media Madness!</h2>
        <p className="text-sm text-white leading-[1.7]">
          Our Social media accounts are amazing places! Check them out, follow us!
        </p>
        <div className="mt-8">
          <QuestTab activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 ? <SocialQuestDetail /> : <ReferralQuests />}
        </div>
      </div>
    </section>
  );
};
