import { createServer } from "http";
import { Server } from "socket.io";
import { radios } from "./radios.js";

const port = 3030;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

radios(io);

httpServer.listen(port, () => {
  console.log("Socket.io server has started on port", port);
});
