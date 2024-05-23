export type LinkTask = {
  title: string;
  completed: boolean;
  reward: number;
  link: string;
};

export type QuestList = {
  title: string;
  desc: string;
  tasks: LinkTask[];
  id: string;
  claimed: boolean;
};
