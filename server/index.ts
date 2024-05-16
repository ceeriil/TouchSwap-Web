import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { login, logout } from "@/services/db/user";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  io.on("connection",  async (socket) => {
    await login("1278544551");

    socket.on('coin-click', (message) => {
      console.log(message, socket.id)
     // io.emit('coin-click', message);
    });

    // Clean up the socket on disconnect
    socket.on('disconnect', async() => {
      await logout("1278544551");
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