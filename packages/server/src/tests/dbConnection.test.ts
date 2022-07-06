import config from "../config/env";
import mongoose, { Connection } from "mongoose";

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection failed ${err}`);
  process.exit(-1);
});

if (config.isDev) {
  mongoose.set("debug", true);
}

const connect = (): Connection => {
  mongoose.connect(config.mongo.uri!, {
    keepAlive: true,
  });
  return mongoose.connection;
};

describe("test database connection", () => {
  test("connect to database", () => {
    connect();
    console.log(config.mongo);
  });
});
