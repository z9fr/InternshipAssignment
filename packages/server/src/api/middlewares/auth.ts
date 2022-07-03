import httpStatus from "http-status";
import APIError from "../../errors/api-error";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import env from "../../config/env";
import { IJwtToken } from "@surgeintern/common/types";

export const isAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
  role?: string
) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    next(
      new APIError({
        message: "Unauthorized",
        stack: "",
        status: httpStatus.UNAUTHORIZED,
        errors: [
          {
            messages: ["Authorization Header Missing"],
          },
        ],
      })
    );
  }

  try {
    const token = authorization?.split(" ")[1];
    const payload: IJwtToken = verify(token!, env.ACCESS_TOKEN_SECRET!);
    console.log(payload);

    if (role) {
      if (role != payload.accountType) {
        next(
          new APIError({
            message: "Not enough privilages",
            errors: [],
            status: httpStatus.UNAUTHORIZED,
          })
        );
      }
    }
  } catch (err) {
    next(
      new APIError({
        message: err.message,
        errors: [],
        stack: err.stack,
        status: httpStatus.UNAUTHORIZED,
      })
    );
  }

  next();
};
