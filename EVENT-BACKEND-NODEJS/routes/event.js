import { Router } from 'express';
import { getEvents, addEvent, updateEvent, deleteEvent ,cancelEvent, getMyEvents, getEventById} from '../controller/eventController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { eventImageUpload } from '../config/multer.js';

const router = Router();

/* GET users listing. */
router.get('/', getEvents);

router.use("/", authMiddleware, roleMiddleware("admin"));

// my events
router.get('/my', getMyEvents);
router.get('/:eventId', getEventById);

/* POST users */
router.post('/', eventImageUpload.fields([{name : "thumbnail",maxCount : 1},{name : "images",maxCount : 6}]) ,addEvent);

/* PATCH users */
router.patch('/:eventId', eventImageUpload.fields([{name : "thumbnail", maxCount : 1}, {name : "images", maxCount : 6}]), updateEvent);

/* DELETE users */
router.delete('/:eventId', deleteEvent);

/* CANCEL users */
router.patch('/cancel/:eventId', cancelEvent);

export default router;
