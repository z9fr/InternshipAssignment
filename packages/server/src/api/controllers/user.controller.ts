import { Request, Response, NextFunction } from "express";
import User from "../../models/user";
import { IUser } from "@surgeintern/common/types";
import { hash } from "bcrypt";
import env from "../../config/env";
import { sendMail } from "../../utils/sendMail";
import { v4 as uuidv4 } from "uuid";

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
    user.status = false; // when user register his verification status is false
    const token = uuidv4();
    user.password = token; // set a uuid as the password when register
    const savedUser = await user.save();
    const urlBuilder = `${env.host}verify/?id=${savedUser._id}&token=${token}`;

    sendMail(
      "Email verification",
      `please verify your email by clicking on the below url <br> <a href="${urlBuilder}"> click here </a> <br> <br> if the link is not clickable copy the below url ${urlBuilder}`,
      user.email
    );

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

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await User.get(id);
    const { newPassword, oldPassword } = req.body;
    const newUser = user;

    if (await User.resetPasswordCheck(id, oldPassword)) {
      const pwhash = await hash(newPassword, env.bcryptRounds);
      newUser.password = pwhash;
      if (!newUser.status) {
        newUser.status = true;
      }
      await user.updateOne(newUser, { override: true, upsert: true });
    }
    const savedUser = await User.findById(user._id);
    res.json(savedUser.transform());
  } catch (err) {
    next(err);
  }
};
