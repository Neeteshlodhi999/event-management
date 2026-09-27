import { Router } from 'express';
import { getMyBookings, bookTicket, cancelBooking, getAllBookings, checkInBooking } from '../controller/bookingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

router.use("/", authMiddleware);

router.get('/', roleMiddleware("user"), getMyBookings);

router.post('/', roleMiddleware("user"), bookTicket);

router.patch('/:bookingId', roleMiddleware("user"), cancelBooking);

router.get('/get-all-bookings', roleMiddleware("admin"),  getAllBookings);

router.patch('/check-in/:bookingId', roleMiddleware("admin"), checkInBooking);


export default router;
