import path from "path";

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
});
/*
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
        */
export default {
  mongo: {
    uri: "mongodb://127.0.0.1:27017/appdb",
  },
  isDev: true,
};
