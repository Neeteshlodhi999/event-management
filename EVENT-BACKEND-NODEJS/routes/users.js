import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { 
  deleteUser, 
  getUsers, 
  registerUser, 
  updateUser, 
  changePassword,
  getMyProfile,
  updateMyProfile,
  updateProfilePhoto,
  requestPasswordReset,
  resetPassword
} from '../controller/userController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { userImageUpload } from '../config/multer.js';

const router = Router();
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { status: false, data: null, message: "Too many password reset attempts. Please wait 15 minutes and try again." }
});

/* GET all users (admin only) */
router.get('/', authMiddleware, roleMiddleware("admin"), getUsers);

/* Current signed-in profile (admin or user) */
router.get('/profile', authMiddleware, roleMiddleware("admin", "user"), getMyProfile);
router.patch('/profile', authMiddleware, roleMiddleware("admin", "user"), updateMyProfile);
router.patch('/profile/photo', authMiddleware, roleMiddleware("admin", "user"), userImageUpload.single('image'), updateProfilePhoto);

/* REGISTER user */
router.post('/', registerUser);
router.post('/forgot-password', passwordResetLimiter, requestPasswordReset);
router.post('/reset-password/:token', passwordResetLimiter, resetPassword);

/* UPDATE user */
router.patch('/:userId', authMiddleware, roleMiddleware("admin"), updateUser);

/* DELETE user */
router.delete('/:userId', authMiddleware, roleMiddleware("admin"), deleteUser);

/* CHANGE PASSWORD (admin + user) */
router.post('/change-password', authMiddleware, roleMiddleware("admin", "user"), changePassword);

export default router;
