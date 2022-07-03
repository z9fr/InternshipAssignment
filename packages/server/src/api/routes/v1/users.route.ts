import express, { NextFunction, Response, Request } from "express";
import { isAuth } from "../../middlewares/auth";
import {
  getUsers,
  createUser,
  testRoute,
} from "../../controllers/user.controller";

const router = express.Router();

router.route("/all").get(getUsers);
router.route("/create").post(createUser);

router.get(
  "/test",
  (req: Request, res: Response, next: NextFunction) => {
    isAuth(req, res, next, "admin");
  },
  testRoute
);

export default router;
