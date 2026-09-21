import { Router } from "express";
import { createContactMessage, getContactMessages, markContactMessageRead } from "../controller/contactController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/", createContactMessage);
router.get("/", authMiddleware, roleMiddleware("admin"), getContactMessages);
router.patch("/:messageId/read", authMiddleware, roleMiddleware("admin"), markContactMessageRead);

export default router;
