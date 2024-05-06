import fs from "fs";
import { db } from "@/services/db";
import { createUser, User } from "@/services/db/user";
import "@/services/firebase";


export async function seedDatabase() {
  const existingUsers = await db.users.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  const USER_SEED_DATA = "./local_database/users.json";
  const seedUsers = JSON.parse(fs.readFileSync(USER_SEED_DATA, "utf8")) as User[];
  
   seedUsers.forEach(async (userData)=> {
        const { username,id, first,last, lang } = userData as User;
         await createUser(id,username,first,last,lang);
   })

}