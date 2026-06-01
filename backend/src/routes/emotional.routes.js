import { Router } from "express";
import {
  createEmotion,
  dashboard,
  listEmotions
} from "../controllers/emotional.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { validateEmotion } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/emocao", ensureAuthenticated, validateEmotion, createEmotion);
router.get("/emocoes", ensureAuthenticated, listEmotions);
router.get("/dashboard", ensureAuthenticated, dashboard);

export default router;
