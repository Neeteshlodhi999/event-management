import { Router } from 'express';
import { 
  deleteUser, 
  getUsers, 
  registerUser, 
  updateUser, 
  changePassword,
  getMyProfile,
  updateMyProfile,
  updateProfilePhoto
} from '../controller/userController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { userImageUpload } from '../config/multer.js';

const router = Router();

/* GET all users (admin only) */
router.get('/', authMiddleware, roleMiddleware("admin"), getUsers);

/* Current signed-in profile (admin or user) */
router.get('/profile', authMiddleware, roleMiddleware("admin", "user"), getMyProfile);
router.patch('/profile', authMiddleware, roleMiddleware("admin", "user"), updateMyProfile);
router.patch('/profile/photo', authMiddleware, roleMiddleware("admin", "user"), userImageUpload.single('image'), updateProfilePhoto);

/* REGISTER user */
router.post('/', registerUser);

/* UPDATE user */
router.patch('/:userId', updateUser);

/* DELETE user */
router.delete('/:userId', deleteUser);

/* CHANGE PASSWORD (admin + user) */
router.post('/change-password', authMiddleware, roleMiddleware("admin", "user"), changePassword);

export default router;
