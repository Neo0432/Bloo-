"use strict";
import express, { Express, json, Request, Response } from "express";
import User from "./User";
import { connectToDb, getDb } from "./db";
import { Db, MongoDBCollectionNamespace } from "mongodb";
import cors from "cors";
import passEnc from "./func/hashingPassword";
import { responseFormat } from "./resJsonFormatMiddleware";

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

app.use(express.json()); // For parsing JSON
// app.use(responseFormat as any);
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

app.post(
  "/login/new-account/create-account",
  async (req: Request, res: Response) => {
    if (req.body) {
      console.log(req.body);
      const user: User = {
        username: req.body.username,
        hashedPassword: await passEnc(req.body.password), //create password hash
        email: req.body.email,
      };

      const isUserExists = (await db
        .collection("users")
        .findOne({ username: user.username }))
        ? true
        : false; //checking if user with this data exists

      if (!isUserExists) {
        try {
          await db.collection("users").insertOne(user); //pushing data into database
          res.statusMessage = "[post] User created";
          res.status(201).send({ message: "User created" });
        } catch (e) {
          console.log(`[error] Can't push userdata to database: ${e}`);
        }
      } else {
        res.statusMessage = "[error] User already exists";
        res.status(409).send({ message: "User already exists" });
      }
    } else {
      res.statusMessage = "[error] The request has no body";
      res.status(400).send({ message: "The request has no body" });
    }
  }
);

app.post(
  "/login/new-account/is-username-empty",
  async (req: Request, res: Response) => {
    const username: String = req.body.username;
    let isUsernameEmpty: Boolean = true;
    if (username) {
      try {
        isUsernameEmpty = (await db
          .collection("users")
          .findOne({ username: username }))
          ? false
          : true;
        console.log(username);
      } catch (e) {
        console.log(`[error] Can't check username for empty: ${e}`);
        return;
      }
    }
    const data = { isUsernameEmpty: isUsernameEmpty };
    console.log(data);
    // res.body.data = jsonformat;
    res.status(200).send({ data });
  }
);
