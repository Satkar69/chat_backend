import { Router } from "express";
import { getUser, getChatUsers } from "../controllers/users.js";

const router = Router();

router.route("/get-user/:id").get(getUser);
router.route("/").get(getChatUsers);

export default router;
