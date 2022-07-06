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
    uri:
      process.env.NODE_ENV === "test"
        ? `${process.env.MONGODB_URL}/tests`
        : `${process.env.MONGODB_URL}/appdb`,
  },
  isDev: true,
  host: "http://localhost:3000/",
  ACCESS_TOKEN_SECRET: "secret",
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
  bcryptRounds: 10,
};
