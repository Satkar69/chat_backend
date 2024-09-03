import { Router } from "express";
import { getChatUsers } from "../controllers/users.js";

const router = Router();

router.route("/").get(getChatUsers);

export default router;
