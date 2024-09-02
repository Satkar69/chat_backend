import { Router } from "express";
import { sendMessage } from "../controllers/messages.js";

const router = Router();

router.route("/send/:id").post(sendMessage);

export default router;
