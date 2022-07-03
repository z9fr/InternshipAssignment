import express from "express";
import { getUsers } from "../../controllers/user.controller";

const router = express.Router();

router.route("/all").get(getUsers);

export default router;
