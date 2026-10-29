import { Router } from "express";
import { getAdminReviews, getEventReviews, getMyReviews, saveReview } from "../controller/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/event/:eventId", getEventReviews);
router.use(authMiddleware);
router.get("/mine", roleMiddleware("user"), getMyReviews);
router.post("/", roleMiddleware("user"), saveReview);
router.get("/admin", roleMiddleware("admin"), getAdminReviews);

export default router;
