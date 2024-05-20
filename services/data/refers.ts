import axios from "axios";
import { SERVER_URL as serverUrl } from "../../constants";
import {  User } from "../db/user";

export const getUserRefers = async (
  userId:string
):Promise<User[]> => {
  try {
    let refers = (await axios.get(`${serverUrl}/api//user/${userId}/refers`)).data as User[];
    return refers
  } catch (error) {
    console.error(error);
    throw new Error("Could not get user refers ");
  }
};
