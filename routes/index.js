import { Router } from "express";
const router = Router();

import auth from "./auth.js";
import messages from "./messages.js";
import authenticate from "../middlewares/authenticate.js";
import users from "../routes/users.js";

router.use("/api/auth", auth);

router.use(authenticate);
router.use("/api/messages", messages);
router.use("/api/users", users);

export default router;
