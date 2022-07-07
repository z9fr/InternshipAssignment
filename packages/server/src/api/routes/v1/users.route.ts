import express, { NextFunction, Response, Request } from "express";
import { isAuth } from "../../middlewares/auth";
import {
  getUsers,
  createUser,
  resetPassword,
  replaceUser,
  userAuth,
} from "../../controllers/user.controller";
import env from "../../../config/env";

const router = express.Router();

router.route("/login").post(userAuth);

router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next, env.roles.ADMIN);
  },
  createUser
);

router.get(
  "/all",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next, env.roles.ADMIN);
  },
  getUsers
);

router.put(
  "/update/:id",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next, env.roles.ADMIN);
  },
  replaceUser
);

router.route("/reset/:id").patch(resetPassword);

export default router;
