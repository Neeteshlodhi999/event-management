import express from "express";
import { authController, completeGoogleLogin, exchangeGoogleLoginCode, startGoogleLogin } from "../controller/authController.js";

const router = express.Router();

router.post("/", authController);
router.get("/google", startGoogleLogin);
router.get("/google/callback", completeGoogleLogin);
router.post("/google/exchange", exchangeGoogleLoginCode);

export default router;
