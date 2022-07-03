import express from "express";
import { getUsers, createUser } from "../../controllers/user.controller";

const router = express.Router();

router.route("/all").get(getUsers);
router.route("/create").post(createUser);

export default router;
