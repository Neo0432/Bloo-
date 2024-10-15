import express, { Express, Request, Response } from "express";
import User from "./User";
import { accept } from "./webSocetApplication";
import { WebSocket, WebSocketServer } from "ws";
import { connectToDb, getDb } from "./db";

const app = express();
const port = 5173;

// const user: User = new User(1, "Jack", "12345678", "Jack@gmail.com");

// app.get("/chat", (req: Request, res: Response) => {
//   console.log("Connection 1: " + req.headers.connection);
//   // accept(req, res);
//   res.json({ user });
// });

const server = app.listen(port, () => {
  console.log(`Listening port ${port}/chat`);
  let socket = new WebSocket(`ws://localhost:${port}/chat`, ["soap", "wamp"]);
  socket.onopen = function (e) {
    console.log("[open] Connection open");
    console.log("Connection url: " + socket.url);
    console.log("Sending data to server");
    // socket.send([{ user }]);
  };
  socket.onmessage = function (e) {
    console.log(`[message] Geting data from server: ${e.data}`);
  };

  socket.onclose = function (e) {
    if (e.wasClean) {
      console.log(
        `[close] Connection was closed clear. Code = ${e.code}. Reason = ${e.reason}`
      );
    } else {
      console.log(
        `[close] Connection terminated. Code = ${e.code}. Reason = ${e.reason};`
      );
    }
  };
  socket.onerror = function (e) {
    console.log(`[error] ${e.error}`);
  };
});

server.on("connect", (req, socket, head) => {
  accept(req, socket, head);
});

server.on("upgrade", (req, socket, head) => {
  accept(req, socket, head);
});
