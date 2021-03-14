import { io } from "socket.io-client";
const socket = io("http://localhost:5500");

function subscribeToTimer(cb: (err: any, timestamp: number) => any) {
  socket.on("timer", (timestamp: number) => cb(null, timestamp));
  socket.on("chat-message", (message: any) => console.log(message));
  socket.emit("subscribeToTimer", 1000);
}

export { subscribeToTimer };
