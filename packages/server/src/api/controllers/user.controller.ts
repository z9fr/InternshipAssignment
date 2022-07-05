import { Request, Response, NextFunction } from "express";
import User from "../../models/user";
import { IUser } from "@surgeintern/common/types";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.list(req.query);
  const transformedUsers = users.map((user: IUser) => user.transform());
  res.json(transformedUsers);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.json(savedUser.transform());
  } catch (err) {
    next(User.checkDuplicateEmail(err));
  }
};

export const testRoute = (_req: Request, res: Response) => {
  res.json({
    hi: "wordl",
  });
};

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, accountType } = await User.findAndGenerateToken({
      email: req.body?.email,
      password: req.body?.password,
    });
    res.json({
      token: token,
      accountType: accountType,
      email: req.body.email,
    });
  } catch (err) {
    next(err);
  }
};
