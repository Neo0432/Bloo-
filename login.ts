"use strict";
import express, { Express, Request, Response } from "express";
import User from "./User";
import { connectToDb, getDb } from "./db";
import { Db, MongoDBCollectionNamespace } from "mongodb";
import cors from "cors";
import passEnc from "./func/hashingPassword";

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

app.post("/login/new-account", async (req: Request, res: Response) => {
  if (req.body) {
    console.log(req.body);
    const password: String = req.body.password;

    const user: User = {
      username: req.body.username,
      hashedPassword: await passEnc(req.body.password), //create password hash
      email: req.body.email,
    };
    console.log(user.hashedPassword);

    const isUserExists = (await db
      .collection("users")
      .findOne({ username: user.username }))
      ? true
      : false; //checking if user with this data exists

    if (!isUserExists) {
      try {
        await db.collection("users").insertOne(user); //pushing data into database
        res.status(201).send("[post] User created");
      } catch (e) {
        console.log(`[error] Can't push userdata to database: ${e}`);
      }
    } else res.status(409).send("User already exists");
  } else res.status(400).send({ error: "The request has no body" });
});
