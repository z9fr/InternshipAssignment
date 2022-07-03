import httpStatus from "http-status";
import APIError from "../../errors/api-error";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import env from "../../config/env";

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
    const payload = verify(token!, env.ACCESS_TOKEN_SECRET!);
    console.log(payload);
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

  console.log("trying to get =>", role);

  next();
};
/*
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o
 * */
