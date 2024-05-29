import 'dotenv/config'
import "@/services/firebase";
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { login, logout, userClick } from "@/services/db/user";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port =  dev ? 3001 : 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  io.on("connection",  async (socket) => {

    socket.on("login", async(userId)=>{
     if(userId == -1) return 
      // console.log(userId, "Login")
       await login(userId, socket.id);
    })

    socket.on("coin-click", async (message) => {
     // await userClick(message)
    }); 

    socket.on('disconnect', async() => {
      await logout(socket.id);
      console.log(`Socket ${socket.id} disconnected.`);
    });

  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});