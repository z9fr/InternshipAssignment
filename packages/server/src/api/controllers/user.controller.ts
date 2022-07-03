import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import User from "../../models/user";

export const getUsers = async (req: Request, res: Response) => {
  /*
  const users = await AppDataSource.manager.find(User);
  users.forEach((u) => {
    delete u.lastName;
  });
  */
  const users = await User.list(req.query);
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.json(savedUser);
};
