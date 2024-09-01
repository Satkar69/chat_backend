import { Router } from "express";
const router = Router();

import auth from "./auth.js";

router.use("/api/auth", auth);

export default router;
