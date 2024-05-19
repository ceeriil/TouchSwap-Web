import { db, toResult } from "@/services/db";
import { Typesaurus } from "typesaurus";

export type BoostType = "free" | "paid";

export interface Boost {
  type: BoostType;
  boastId: number;
  totalPerDay?: number; 
  lastUsed ?:Date
  level?: number;
  maximumLevel?:number 
  cost?: number; 
  userId: number;
}

export async function createUserBoast(userId: number): Promise<void> {
  const boosts: Boost[] = [
    { type: "free", boastId: 1, totalPerDay: 3, userId },
    { type: "free", boastId: 2, totalPerDay: 3, userId },
    { type: "paid", boastId: 3, level: 0, cost: 500, maximumLevel:10, userId },
    { type: "paid", boastId: 4, level: 0, cost: 500, maximumLevel:10, userId },
    { type: "paid", boastId: 5, level: 0, cost: 500, maximumLevel:5, userId },
    { type: "paid", boastId: 6, level: 0, cost: 500, maximumLevel:5, userId },
  ];

  await Promise.all(boosts.map(boost => db.boast.add(()=> boost)));
}

export async function useFreeBoost(userId: number, boastId: number): Promise<void> {
  const boostSnapshot = await db.boast.query(
    ($) => [$.field("userId").eq(userId), $.field("boastId").eq(boastId)]
  );
  const boostDoc = boostSnapshot[0];

  if (!boostDoc) {
    throw new Error("Free boost not found for the user");
  }

  const boostData = toResult<Boost>(boostDoc)

  if (boostData.totalPerDay === 0) {
    // User has already used all available boosts for the day
    throw new Error("No available boosts remaining for the day");
  }

  if(boostData.totalPerDay ){
    const updatedTotalPerDay =  boostData.totalPerDay - 1 || 0
    await db.boast.update(boostDoc.ref.id, { totalPerDay: updatedTotalPerDay });
    // Update the last use date
    const now = new Date();
    await db.boast.update(boostDoc.ref.id, { lastUsed: now });
  }
}

export async function usePaidBoost(userId: number, boastId: number): Promise<void> {
  const boostSnapshot = await db.boast.query(
    ($) => [$.field("userId").eq(userId), $.field("boastId").eq(boastId)]
  );
  const boostDoc = boostSnapshot[0];

  if (!boostDoc) {
    throw new Error("Paid boost not found for the user");
  }

  const boostData = toResult<Boost>(boostDoc);

  if (!boostData.level) {
    throw new Error("Paid boost level not specified");
  }

  if(boostData.level && boostData.cost && boostData.maximumLevel && boostData.level < boostData.maximumLevel ){
    await db.boast.update(boostDoc.ref.id, { level: boostData.level + 1, cost: boostData.cost * 2  });
  }
}


export async function getAllUserFreeBoosts(userId: number): Promise<Boost[]> {
  // Query the database for all free boosts associated with the user ID
  const boostSnapshot = await db.boast.query(
    ($) => [$.field("userId").eq(userId), $.field("type").eq("free")]
  );
  const boosts: Boost[] = boostSnapshot.map((boostDoc) => toResult<Boost>(boostDoc));

  return boosts;
}

export async function getAllUserPaidBoosts(userId: number): Promise<Boost[]> {
  // Query the database for all free boosts associated with the user ID
  const boostSnapshot = await db.boast.query(
    ($) => [$.field("userId").eq(userId), $.field("type").eq("paid")]
  );
  const boosts: Boost[] = boostSnapshot.map((boostDoc) => toResult<Boost>(boostDoc));
  return boosts;
}
