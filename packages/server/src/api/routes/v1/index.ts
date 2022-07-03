import express, { Request, Response } from "express";
import userRouter from "./users.route";
import notesRoute from "./notes.routes";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/users", userRouter);
router.use("/notes", notesRoute);

export default router;
