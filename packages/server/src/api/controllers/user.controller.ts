import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/data-source";
import User from "../../models/user";
import { errorHandler } from "./error.handler";

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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    // next(User.checkDuplicateEmail(error));
    errorHandler(res, User.checkDuplicateEmail(err), next);
  }
};

export const testRoute = (req: Request, res: Response) => {
  res.json({
    hi: "wordl",
  });
};
