import React from "react";
import Image from "next/image";
import { SpeakerIcon } from "../../assets/SpeakerIcon";
import { DoubleCoinIcon } from "@/components/assets/DoubleCoinIcon";

type ReferralQuestsList = {
  count: number;
  reward: number;
  claimed?: boolean;
  completed?: boolean;
};

export const referralQuestsLists: ReferralQuestsList[] = [
  {
    count: 1,
    reward: 1200,
    claimed: true,
    completed: true,
  },
  {
    count: 5,
    reward: 5000,
    claimed: true,
    completed: true,
  },
  {
    count: 10,
    reward: 15000,
    claimed: true,
    completed: true,
  },
  {
    count: 25,
    reward: 50000,
    claimed: false,
    completed: true,
  },
  {
    count: 100,
    reward: 100000,
    claimed: false,
    completed: false,
  },
  {
    count: 200,
    reward: 150000,
    claimed: false,
    completed: false,
  },
];

export const ReferralQuests = () => {
  return (
    <div className="grid gap-2">
      {referralQuestsLists.map(({ count, reward, claimed, completed }, index) => {
        return (
          <div className="bg-[#293641] py-3 px-4 rounded h-full flex items-center justify-between" key={index}>
            <div className="flex items-center">
              <Image src={"/img/ref.svg"} width={40} height={40} alt="Referal Icon" />
              <div className="ml-3">
                <h3 className="text-[0.8rem] font-[500] leading-[1.8] text-[#AFAFAF]">{count} Invite</h3>
                <div className="text-[0.75rem] font-medium flex items-center">
                  <DoubleCoinIcon width="14" height="14" />
                  <span className="ml-1">{reward}</span>
                </div>
              </div>
            </div>
            <button
              className={`${
                !completed ? "bg-[#A7A7A7]" : "bg-[#FCFCFC]"
              } text-sm  text-black py-2 px-2 rounded-lg font-medium `}
            >
              {claimed ? "claimed" : "claim"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
