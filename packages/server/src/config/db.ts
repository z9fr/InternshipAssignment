import mongoose, { Connection } from "mongoose";
import config from "./env";

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection failed ${err}`);
  process.exit(-1);
});

if (config.isDev) {
  mongoose.set("debug", true);
}

/*
 * create connection to mongodb
 *
 * @returns {object} Mongoose connection
 */

const connect = (): Connection => {
  mongoose
    .connect(config.mongo.uri!, {
      keepAlive: true,
    })
    .then(() => {
      console.log("Db connection success");
    });
  return mongoose.connection;
};

export { connect };
