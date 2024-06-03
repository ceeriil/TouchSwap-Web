import React from "react";

export type LinkTask = {
  title: string;
  completed: boolean;
  reward: number;
  link: string;
  button?:React.ReactNode;
};

export type QuestList = {
  title: string;
  desc: string;
  tasks: LinkTask[];
  id: string;
  claimed: boolean;
};
