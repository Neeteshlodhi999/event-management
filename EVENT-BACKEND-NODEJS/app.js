import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import eventRouter from "./routes/event.js"
import bookingRouter from "./routes/booking.js"
import savedEventsRouter from "./routes/savedEvents.js"
import notificationsRouter from "./routes/notifications.js"

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(cors({
  origin : "*"
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/events', eventRouter);
app.use('/bookings', bookingRouter);
app.use('/saved-events', savedEventsRouter);
app.use('/notifications', notificationsRouter);

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
