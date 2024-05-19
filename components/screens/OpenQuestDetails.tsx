import React, { useState } from "react";
import { QuestTab } from "../touchswap/quests/QuestTab";
import { ReferralQuests } from "../touchswap/quests/ReferralQuest";

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

export const connectQuestsLists: QuestList = {
  title: "Wallet Connect Fun",
  desc: "Connect Touchswap to your solana wallet, be careful! Once connected, any rewards would be sent to the connected wallet.",
  tasks: [
    {
      title: "Connect Wallet",
      completed: false,
    },
  ],
};

const Tasks = () => {
  return (
    <div>
      <div className="grid gap-2 pb-32">
        {socialQuestsLists.tasks.map(({ title }, index) => {
          return (
            <div className="bg-[#293641] py-3 px-4 rounded-lg h-full flex items-center justify-between" key={index}>
              <div className="">
                <h3 className="text-[0.8rem] font-[500] leading-[1.8] text-[#AFAFAF]">{title}</h3>
              </div>
              <button className="text-sm bg-[#A7A7A7] text-black py-2 px-2 rounded-lg font-medium">Start</button>
            </div>
          );
        })}
        <p className="mt-3 text-[0.81rem]">Starts in 15h:40m:3sec</p>
      </div>
      <button className="btn bg-white w-full text-black py-4 font-[500] rounded-lg align-baseline">Claim Reward</button>
    </div>
  );
};

export const OpenQuestDetailScreen = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section>
      <div className="container mx-auto px-5 my-8">
        <h2 className="text-2xl font-[500] mb-3">{socialQuestsLists.title}</h2>
        <p className="text-[13px] text-white leading-[1.7]">{socialQuestsLists.desc}</p>
        <div className="mt-8">
          <QuestTab activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 ? <Tasks /> : <ReferralQuests />}
        </div>
      </div>
    </section>
  );
};
