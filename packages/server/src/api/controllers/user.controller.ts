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
