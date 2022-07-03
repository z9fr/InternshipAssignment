import express, { NextFunction, Response, Request } from "express";
import { isAuth } from "../../middlewares/auth";
import {
  getUsers,
  createUser,
  testRoute,
  userAuth,
} from "../../controllers/user.controller";
import env from "../../../config/env";

const router = express.Router();

router.route("/all").get(getUsers);
router.route("/create").post(createUser);
router.route("/login").post(userAuth);

router.get(
  "/test",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next, env.roles.USER);
  },
  testRoute
);

export default router;
