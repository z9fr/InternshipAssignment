import { Request, Response, NextFunction } from "express";

export const errorHandler = (res: Response, err: any, next: NextFunction) => {
  let code = 400;
  if (err?.status) {
    code = err?.status;
  }

  res.status(code);
  res.json({
    error: err?.name,
    message: err?.message,
    details: err?.errors,
    code: code,
  });

  next(err);
};
