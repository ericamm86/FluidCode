import { Router } from "express";
import { login, profile, register } from "../controllers/auth.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { validateAuth } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validateAuth, register);
router.post("/login", validateAuth, login);
router.get("/profile", ensureAuthenticated, profile);

export default router;
