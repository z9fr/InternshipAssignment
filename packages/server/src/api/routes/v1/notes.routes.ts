import express, { NextFunction, Response, Request } from "express";
import { isAuth } from "../../middlewares/auth";
import { getNotes, createNote } from "../../controllers/notes.controller";
import env from "../../../config/env";

const router = express.Router();

router.route("/all").get(getNotes);

router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next);
  },
  createNote
);

export default router;
