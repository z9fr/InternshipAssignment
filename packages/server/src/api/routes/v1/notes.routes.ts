import express, { NextFunction, Response, Request } from "express";
import { isAuth } from "../../middlewares/auth";
import {
  getNotes,
  updateNotes,
  deleteNote,
  createNote,
  getUserNotes,
} from "../../controllers/notes.controller";

const router = express.Router();

router.route("/all").get(getNotes);

router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next);
  },
  createNote
);

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next);
  },
  getUserNotes
);

router.put(
  "/update/:id",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next);
  },
  updateNotes
);

router.delete(
  "/rm/:id",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next);
  },
  deleteNote
);

export default router;
