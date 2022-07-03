import httpStatus from "http-status";
import User from "../models/user";
import APIError from "../errors/api-error";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { errorHandler } from "../api/controllers/error.handler";
import env from "../config/env";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    errorHandler(
      res,
      new APIError({
        message: "Unauthorized",
        status: httpStatus.UNAUTHORIZED,
        errors: [
          {
            messages: ["Authorization Header Missing"],
          },
        ],
      }),
      next
    );
  }

  try {
    const token = authorization?.split(" ")[1];
    const payload = verify(token!, env.ACCESS_TOKEN_SECRET!);
    console.log(payload);
  } catch (err) {
    errorHandler(
      res,
      new APIError({
        message: err.message,
        errors: [],
        status: httpStatus.UNAUTHORIZED,
      }),
      next
    );
    console.log(err);
  }

  next();
};
