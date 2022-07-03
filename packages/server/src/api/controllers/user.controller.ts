import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { User } from "../../entity/user";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(User);
  users.forEach((u) => {
    delete u.lastName;
  });

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.mobile = mobile;
  user.status = false;
  user.accountType = "user";

  await AppDataSource.manager.save(user);

  res.json(user);
};
