import { Callback, Db, MongoClient, Timestamp } from "mongodb";

let dbConnection: Db;

const connectToDb = async (): Promise<void> => {
  console.log("connection start");
  try {
    await MongoClient.connect("mongodb://localhost:27017/ping").then(
      (client) => {
        dbConnection = client.db();
        console.log("connectiong success");
      }
    );
  } catch (err) {
    console.error("Ошибка при подключении к базе данных" + err);
    throw err;
  }
};

const getDb = () => dbConnection;

export { connectToDb, getDb };
