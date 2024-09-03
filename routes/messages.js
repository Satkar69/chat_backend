import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messages.js";

const router = Router();

router.route("/send-message/:id").post(sendMessage);
router.route("/get-messages/:id").get(getMessages);

export default router;
