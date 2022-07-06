import User from "../models/user";
import Note from "../models/note";
import { v4 as uuidv4 } from "uuid";
import env from "../config/env";
import { faker } from "@faker-js/faker";

import { connect } from "../config/db";
connect();

describe("create a user and write a post as him ", () => {
  test("create user and write post ", async () => {
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

    const note = new Note({
      title: faker.lorem.sentence(5),
      description: faker.lorem.sentence(),
      ownedBy: savedUser._id,
    });

    await note.save();
  });
});
