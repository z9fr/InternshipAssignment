import express from "express";
import { isAuth } from "../../../middlewares/auth";
import {
  getUsers,
  createUser,
  testRoute,
} from "../../controllers/user.controller";

const router = express.Router();

router.route("/all").get(getUsers);
router.route("/create").post(createUser);
router.route("/test").get(isAuth, testRoute);

export default router;
