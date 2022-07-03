import express, { Request, Response } from "express";
import userRouter from "./users.route";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/users", userRouter);

export default router;
