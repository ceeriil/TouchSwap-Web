import axios from "axios";
import {  User } from "../db/user";

export const getUserTasks = async (
  userId:string
):Promise<User[]> => {
  try {
    const tasks = (await axios.get(`/api/tasks?userId=${userId}`)).data as User[];
    return tasks
  } catch (error) {
    console.error(error);
    throw new Error("Could not get user refers ");
  }
};

