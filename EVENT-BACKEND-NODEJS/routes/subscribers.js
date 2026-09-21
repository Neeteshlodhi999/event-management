import { Router } from "express";
import { getSubscribers, subscribe } from "../controller/subscriberController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();
router.post("/", subscribe);
router.get("/", authMiddleware, roleMiddleware("admin"), getSubscribers);
export default router;
