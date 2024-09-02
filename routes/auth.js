import { Router } from "express";
import { login, signup, logout } from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";
const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

router.use(authenticate);
router.route("/logout").post(logout);

export default router;
