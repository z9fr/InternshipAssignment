import path from "path";
import { v4 } from "uuid";

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
});

const SECRET = v4();

export default {
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? `${process.env.MONGODB_URL}/tests`
        : `${process.env.MONGODB_URL}/appdb`,
  },
  isDev: process.env.NODE_ENV === "dev",
  host: "http://localhost:3000/",
  ACCESS_TOKEN_SECRET: process.env.SECRET ? process.env.SECRET : SECRET,
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
  bcryptRounds: 10,
};
