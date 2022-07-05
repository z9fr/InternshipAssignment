import { Request, Response, NextFunction } from "express";
import User from "../../models/user";
import { IUser } from "@surgeintern/common/types";
const { omit } = require("lodash");

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

export const replaceUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await User.get(id);
    const newUser = new User(req.body);
    await user.updateOne(newUser, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);
    res.json(savedUser.transform());
  } catch (err) {
    next(err);
  }
};
