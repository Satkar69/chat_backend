import { Router } from "express";
const router = Router();

import auth from "./auth.js";
import messages from "./messages.js";
import authenticate from "../middlewares/authenticate.js";

router.use("/api/auth", auth);

router.use(authenticate);
router.use("/api/messages", messages);

export default router;
