import { Result, Schema, db, toResult } from "@/services/db";
import { Typesaurus } from "typesaurus";
import { createUserBoast } from "./boast";

export interface User {
  id:number,
  creationTimestamp:Typesaurus.ServerDate;
  username:string,
  rank:number,
  balance:number;
  touches:number;
  wallet?:string;
  social?: SocialLinks
  online:boolean;
  lastOnline:Typesaurus.ServerDate
  lang:string,
  first: string
  last:string
  referedBy?:number; 
  energy:Energy;
  connectionId?:string;
}
export interface Energy {
  maxEnergy:number,
  energyLeft :number
}

export interface SocialLinks {
  twitter: string;
  discord: string;
}

export interface AllActiveUserCount {
  count :number
}

export interface TotalTokenInCirclation {
  total :number
}

export interface TotalTouchesByAllUser {
  touches :number
}

export interface AllDailyUser {
  dailyUsers :number
}

export type UserDoc = Schema["users"]["Doc"];
export type UserResult = Result<User>;


export async function login(id:string, connectionId:string) {
  console.log("login ", id)
  const users = await db.users.query(($)=> $.field("id").eq(Number(id)));
  const userRef = await users[0].ref.id
  await db.users.update(userRef, ($)=> [
    $.field("online").set(true),
    $.field("lastOnline").set($.serverDate()),
    $.field("connectionId").set(connectionId)
  ])
}


export async function logout(id:string) {
  const users = await db.users.query(($)=> $.field("id").eq(Number(id)));
  const userRef = await users[0].ref.id
  await db.users.update(userRef, ($)=> [
    $.field("online").set(false),
    $.field("lastOnline").set($.serverDate())
  ])
}

export async function userClick(id: string) {
  const users = await db.users.query(($)=> $.field("id").eq(Number(id)));
  const userId = await users[0].ref.id ;
  //await db.users.set(userId, )
  //return referedUsers;
}


export async function getUserRefers(id: string): Promise<UserResult[]> {
  const user= await findUser(id);
  const referedUsers = (await db.users.query(($)=>$.field("referedBy").eq(user.id))).map(user =>toResult<User>(user));
  return referedUsers;
}


export async function getAllTokensInCircluation(): Promise<TotalTokenInCirclation> {
  const usersSnaphot = await db.users.all();
  const totalBalance = usersSnaphot.reduce((total,user) => total + toResult<User>(user).balance,0);
  return { total :totalBalance };
}

export async function getAllTouchesByAllUsers(): Promise<TotalTouchesByAllUser> {
  const usersSnaphot = await db.users.all();
  const totalTouches = usersSnaphot.reduce((total,user) => total + toResult<User>(user).touches, 0)
  return { touches: totalTouches };
}

export async function getOnlineUserCount(): Promise<AllActiveUserCount> {
  const usersSnaphot = await db.users.all();
  const activeUserCount = usersSnaphot.filter(user => toResult<User>(user).online == true ).length;
  return { count: activeUserCount };
}

export async function getDailyUsers(): Promise<AllDailyUser> {
  const usersSnaphot = await db.users.all();
  const todayDate = new Date().getDate()
  const totalDailyUsers = usersSnaphot.reduce((total,user) =>  total + (toResult<User>(user).lastOnline.getDate() == todayDate ? 1 : 0 ), 0)
  return { dailyUsers: totalDailyUsers };
}


export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => toResult<User>(user));
  return users; 
}

export async function findUser(id:string): Promise<UserResult> {
  const user = await db.users.query(($)=> $.field("id").eq(Number(id)));
  if(user.length > 0)  return toResult<User>(user[0])
  return  toResult<User>(null)
}

export async function createUser(id:number,referedBy:number|undefined, username:string|"", first: string|"" , last:string|"", lang:string|"en" ): Promise<UserResult> {
  const ref =    await db.users.add(($) => ({ 
    id,
    creationTimestamp: $.serverDate(),
    username,
    first, 
    last,
    touches:0,
    balance:0,
    lastOnline: $.serverDate(),
    online:true,
    lang,
    rank:0,
    referedBy,
    energy:{
      maxEnergy:500,
      energyLeft:0
    },
  }))
  const userSnapshot = await db.users.get(ref.id);
  createUserBoast(id)
  return toResult<User>(userSnapshot);
}

export async function updateUser( id: string,socialLinks: SocialLinks): Promise<UserResult> {
  const userSnapshot = await db.users.get(db.users.id(id));
  // await userSnapshot?.ref?.(() => ({
  //   status: { text: status, timestamp: Date.now() },
  //   socialLinks,
  //   skills,
  // }));
  return toResult<User>(userSnapshot);
}
