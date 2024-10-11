"use strict";
import express, { Express, Request, Response } from "express";
import User from "./User";
import { connectToDb, getDb } from "./db";
import { Db, MongoDBCollectionNamespace } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5137;
let db: Db;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//connect to DB
const startServer = async () => {
  try {
    await connectToDb();

    app.listen(port, () => {
      console.log(`Listening port ${port}`);
    });

    db = getDb();
  } catch (err) {
    console.log("Ошибка при запуске сервера: " + err);
  }
};

startServer();

app.post("/users", (req: Request, res: Response) => {
  let usersArr: Object[] = [];
  db.collection("users")
    .find()
    .sort({ username: -1 })
    .toArray()
    .then((users) => {
      res.status(200).json(users);
    });
});

app.use(express.json()); // For parsing JSON

app.post("/login", async (req: Request, res: Response) => {
  if (req.body) {
    console.log(req.body);
    const user: User = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const userData = await db
      .collection("users")
      .findOne({ username: user.username, password: user.password });
    if (userData) res.status(200).send(userData);
    else res.status(401).send("User not found");
  } else res.status(400).send({ error: "The request has no body" });
});
