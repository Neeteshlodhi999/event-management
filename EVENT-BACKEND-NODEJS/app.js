import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import rateLimit from "express-rate-limit";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import eventRouter from "./routes/event.js"
import bookingRouter from "./routes/booking.js"
import savedEventsRouter from "./routes/savedEvents.js"
import notificationsRouter from "./routes/notifications.js"
import contactRouter from "./routes/contact.js"
import subscribersRouter from "./routes/subscribers.js"

const app = express();
const defaultOrigins = [
  "https://event-management-user-qfum.onrender.com",
  "https://event-management-admin-2fra.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
];
const allowedOrigins = (process.env.CLIENT_ORIGINS || defaultOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header are server-to-server checks, not browsers.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  },
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { status: false, data: null, message: "Too many login attempts. Please wait 15 minutes and try again." },
}), authRouter);
app.use('/events', eventRouter);
app.use('/bookings', bookingRouter);
app.use('/saved-events', savedEventsRouter);
app.use('/notifications', notificationsRouter);
app.use('/contact-messages', contactRouter);
app.use('/subscribers', subscribersRouter);

// for static image send
app.use("/uploads",express.static('uploads'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
