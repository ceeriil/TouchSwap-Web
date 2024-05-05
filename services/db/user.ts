import { Result, Schema, db, toResult } from "@/services/db";
import { Typesaurus } from "typesaurus";

export interface User {
  creationTimestamp:Typesaurus.ServerDate;
  username:string,
  rank:string,
  balance:number;
  touches:number;
  wallet?:string;
  social?: SocialLinks
  online:boolean;
  lastOnline:Typesaurus.ServerDate
  lang:string,
  first?: string
  last?:string
}

export interface SocialLinks {
  twitter: string;
  discord: string;
}

export type UserDoc = Schema["users"]["Doc"];
export type UserResult = Result<User>;

export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => toResult<User>(user));
  return users; 
}

export async function createUser(username:string, id:number, first:string , last:string ): Promise<UserResult> {
  let userId = db.users.id(`${id}`);
   await db.users.set(userId,($) => ({ 
    creationTimestamp: $.serverDate()
    username,
    first, 
    last
  }))

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



// export async function findAllUsers(): Promise<UserResult[]> {
//   const usersSnaphot = await db.users.all();
//   const users = usersSnaphot.map(user => toResult<User>(user));
//   return users;
// }


// export async function createUser(
// ): Promise<UserResult> {

// }

// export async function updateUser(
//   address: string,
//   status: string,
//   socialLinks: SocialLinks,
//   skills: string[],
// ): Promise<UserResult> {
//   const userSnapshot = await db.users.get(db.users.id(address));
//   await userSnapshot?.ref?.update(() => ({
//     status: { text: status, timestamp: Date.now() },
//     socialLinks,
//     skills,
//   }));
//   return toResult<User>(userSnapshot);
// }