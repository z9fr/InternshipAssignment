import { Request, Response, NextFunction } from "express";
import User from "../../models/user";

export const getUsers = async (req: Request, res: Response) => {
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
    const { token } = await User.findAndGenerateToken({
      email: req.body?.email,
      password: req.body?.password,
    });
    res.json({
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
