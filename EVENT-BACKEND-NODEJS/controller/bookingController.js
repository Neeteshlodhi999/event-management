import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import notificationModel from "../models/notificationModel.js";

export async function getAllBookings(req, res, next) {
    try {
        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25;
        let skip = page === 1 ? 0 : (page - 1) * limit

        const events = await eventModel.find({ adder: req.user._id }).select("_id");
        const eventIds = events.map((event) => event._id);
        let bookings = await bookingModel.find({ event: { $in: eventIds } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("attendee", "name email phone image")
            .populate("event", "title date time venue");

        return res.status(200).json(new ApiResponse(true, bookings, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getMyBookings(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 15;
        let skip = page === 1 ? 0 : (page - 1) * limit

        let booking = await bookingModel.find({ attendee: req.user._id })
            .skip(skip)
            .limit(limit)
            .populate("attendee")
            .populate("event");

        return res.status(200).json(new ApiResponse(true, booking, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function bookTicket(req, res, next) {
    try {
        const { event, booked_tickets, ticket_type } = req.body;

        if (!event || !ticket_type) {
            return res.status(400).json(new ApiResponse(false, null, "Event And ticket_type (general or premium)  is required"));
        }

        const eventDetail = await eventModel.findOne({ _id: event, isCancel: false, isExpire: false });

        if (!eventDetail) {
            return res.status(400).json(new ApiResponse(false, null, "Event Not Found or cancelled"));
        }

        let eventDate = new Date(eventDetail.date);
        let today = Date.now();

        console.log(eventDate);


        // book before one days ago
        if (!(eventDate.getTime() - (1000 * 60 * 60 * 24) > today)) {
            return res.status(400).json(new ApiResponse(false, null, "you are too late to book tickets"));
        }

        let total_ticket_amount = ticket_type === "general"
            ? eventDetail.general_tickets_price * (booked_tickets || 1)
            : eventDetail.premium_tickets_price * (booked_tickets || 1)

        const ticket = await bookingModel.create({
            attendee : req.user._id,
            event,
            booked_tickets: booked_tickets || 1,
            ticket_type,
            total_ticket_amount
        });
        await notificationModel.create([
            { user: req.user._id, title: "Ticket booked", message: `Your ${ticket_type} ticket for ${eventDetail.title} is booked.`, type: "booking" },
            { user: eventDetail.adder, title: "New ticket booking", message: `${req.user.name} booked ${booked_tickets || 1} ${ticket_type} ticket(s) for ${eventDetail.title}.`, type: "sales" }
        ]);

        return res.status(201).json(new ApiResponse(true, ticket, "ticket booked success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function cancelBooking(req, res, next) {
    try {
        const { bookingId } = req.params;

        const cancelBooking = await bookingModel.findOneAndUpdate({ _id: bookingId, attendee: req.user._id }, { isCancel: true }, { new: true }).populate("event");

        if (cancelBooking) { await notificationModel.create([{ user:req.user._id,title:"Booking cancelled",message:`Your booking for ${cancelBooking.event?.title || "event"} was cancelled.`,type:"booking" },{user:cancelBooking.event.adder,title:"Booking cancelled",message:`${req.user.name} cancelled a booking for ${cancelBooking.event.title}.`,type:"sales"}]); return res.status(200).json(new ApiResponse(true, cancelBooking, "cancel success")); }

        return res.status(404).json(new ApiResponse(true, null, "Event Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}
