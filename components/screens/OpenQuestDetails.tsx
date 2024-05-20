import React from "react";
import {ChevronLeftIcon} from "@heroicons/react/24/solid"
import { useAppStore } from "@/services/store/store";

type Task = {
  title: string;
  completed: boolean;
};

type QuestList = {
  title: string;
  desc: string;
  tasks: Task[];
};

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      <div className="grid gap-2 pb-12">
        {tasks.map(({ title }, index) => {
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

export const OpenQuestDetailScreen: React.FC<QuestList> = QuestList => {
  const setScreen  = useAppStore(store=>store.setScreen)

  const goBack = ()=>{
    setScreen("quests");
  }
  
  return (
    <section className="pb-32 overflow-y-auto"> 
      <div className="container mx-auto px-5 my-8">
        <div className="flex container h-10  mb-10">
          <button onClick={goBack} className="p-3 hover:bg-[#182027] bg-[#293641] rounded-lg ">
           <ChevronLeftIcon  width={20} />
          </button>
        </div>
        <h2 className="text-2xl font-[500] mb-3">{QuestList.title}</h2>
        <p className="text-[13px] text-white leading-[1.7]">{QuestList.desc}</p>
        <div className="mt-8">
          <Tasks tasks={QuestList.tasks} />
        </div>
      </div>
    </section>
  );
};
