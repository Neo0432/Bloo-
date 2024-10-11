import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

let privateKey = "cAtwa1kkEy";
const token = jwt.sign({ foo: "bar" }, privateKey, { algorithm: "HS256" });

console.log(token);

let readToken = jwt.verify(token, privateKey);
console.log(`output: ${readToken}`);
console.table(readToken);

export function verifyUser(req: Request, res: Response) {
  if (!req.headers["x-verification-code"]) {
    res.status(409);
    res.send("No x-verefication code");
  }

  res.status(200);
  res.send();
}
