"use strict";

import { Server, WebSocket as ws } from "ws";
import * as http from "http";

const wss = new ws.Server({ noServer: true });

function accept(req: any, socket: any, head: any) {
  if (
    !req.headers.upgrade ||
    req.headers.upgrade.toLowerCase() != "websocket"
  ) {
    console.log("[error] Responce has not header Websocket");
    socket.destroy();
    return;
  }
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    socket.destroy();
    console.log("[error] Responce has not header Upgrade");
    return;
  }

  console.log("[upgrade] Handle upgrading");
  wss.handleUpgrade(req, socket, head, onConnect);
  console.log("[upgrade] End of upgrading ");
}

function onConnect(ws: ws) {
  ws.on("message", function (message: String) {
    let name =
      String(message).match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) ||
      "Guest";
    ws.send(`Hello from server, ${name}`);
    console.log(`ws url: ${ws.url}`);

    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

// if (!module.parent) {
//   http.createServer(accept).listen(3000);
// }

export { accept };
