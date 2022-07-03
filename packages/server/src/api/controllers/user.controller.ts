import { Request, Response } from "express";

export const getUsers = (_req: Request, res: Response) => {
  res.json({
    Hello: "Wordld",
  });
};
