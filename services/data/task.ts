import axios from "axios";
import {  User } from "../db/user";
import {UserTask} from '@/types';

export const getUserTasks = async (
  userId:string
):Promise<UserTask[]> => {
  try {
    const tasks = (await axios.get(`/api/tasks?userId=${userId}`)).data as UserTask[];
    return tasks
  } catch (error) {
    throw new Error("Could not get user tasks ");
  }
};

