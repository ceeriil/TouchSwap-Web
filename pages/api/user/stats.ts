import { NextApiRequest, NextApiResponse } from "next";
import {  findAllUsers, getOnlineUserCount, getAllTokensInCircluation, getAllTouchesByAllUsers, getDailyUsers } from "@/services/db/user";
import "@/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    const onlineUsers = await getOnlineUserCount();
    const allUsers = await findAllUsers();
    const allTokensInCircluation = await getAllTokensInCircluation();
    const allTouchesByAllUsers  = await getAllTouchesByAllUsers();
    const allDailyUsers = await getDailyUsers();
    return res.status(200).json({
      online:onlineUsers.count, 
      totalUsers: allUsers.length,
      totalTokens: allTokensInCircluation.total,
      totalTouches:allTouchesByAllUsers.touches,
      totalDailyUsers: allDailyUsers.dailyUsers
    });
  } catch (error) {
    console.error("Error creating  new  user:", error);
    res.status(500).json({ message: "An unexpected error occurred while getting user stats." });
  }
}