import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import env from "../config/env";
import { faker } from "@faker-js/faker";

import { connect } from "../config/db";
connect();

describe("create a user", () => {
  test("create user", async () => {
    const password = uuidv4();

    const user = new User({
      email: faker.internet.email(),
      password: password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: Date.now(),
      status: true,
      accountType: env.roles.ADMIN,
      mobile: 1234,
    });

    const savedUser = await user.save();
    savedUser.password = password; // just so it only log the unhashed password
    console.log(savedUser);
    console.log("✨  Created a ADMIN user.");
  });
});
