import path from "path";

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
});

export default {
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
};
