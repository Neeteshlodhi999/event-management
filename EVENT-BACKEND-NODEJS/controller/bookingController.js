import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import notificationModel from "../models/notificationModel.js";

const ticketFields = {
    general: { total: "total_general_tickets", sold: "sold_general_tickets" },
    premium: { total: "total_premium_tickets", sold: "sold_premium_tickets" }
};

// Old events created before sold-ticket counters existed are initialized from
// their active bookings once, so current sales are never ignored.
async function initializeSoldCounter(eventDetail, ticketType) {
    const field = ticketFields[ticketType].sold;
    if (typeof eventDetail[field] === "number") return;

    const sales = await bookingModel.aggregate([
        { $match: { event: eventDetail._id, ticket_type: ticketType, isCancel: false } },
        { $group: { _id: null, total: { $sum: "$booked_tickets" } } }
    ]);
    await eventModel.updateOne(
        { _id: eventDetail._id, [field]: { $exists: false } },
        { $set: { [field]: sales[0]?.total || 0 } }
    );
}

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
    let reservedField;
    let reservedTickets = 0;
    let ticketCreated = false;
    try {
        const { event, booked_tickets, ticket_type } = req.body;

        if (!event || !ticket_type) {
            return res.status(400).json(new ApiResponse(false, null, "Event And ticket_type (general or premium)  is required"));
        }
        if (!ticketFields[ticket_type]) {
            return res.status(400).json(new ApiResponse(false, null, "Ticket type must be general or premium"));
        }
        const ticketCount = Number(booked_tickets || 1);
        if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 4) {
            return res.status(400).json(new ApiResponse(false, null, "You can book between 1 and 4 tickets"));
        }

        const eventDetail = await eventModel.findOne({ _id: event, isCancel: false, isExpire: false });

        if (!eventDetail) {
            return res.status(400).json(new ApiResponse(false, null, "Event Not Found or cancelled"));
        }

        let eventDate = new Date(eventDetail.date);
        let today = Date.now();

        // book before one days ago
        if (!(eventDate.getTime() - (1000 * 60 * 60 * 24) > today)) {
            return res.status(400).json(new ApiResponse(false, null, "you are too late to book tickets"));
        }

        const fields = ticketFields[ticket_type];
        await initializeSoldCounter(eventDetail, ticket_type);

        // Reserve inventory before making the booking. The database condition
        // means two people cannot take the same final ticket at the same time.
        const reservedEvent = await eventModel.findOneAndUpdate(
            {
                _id: event,
                isCancel: false,
                isExpire: false,
                $expr: {
                    $lte: [
                        { $add: [{ $ifNull: [`$${fields.sold}`, 0] }, ticketCount] },
                        `$${fields.total}`
                    ]
                }
            },
            { $inc: { [fields.sold]: ticketCount } },
            { new: true }
        );
        if (!reservedEvent) {
            return res.status(400).json(new ApiResponse(false, null, "Not enough tickets are available for this event"));
        }
        reservedField = fields.sold;
        reservedTickets = ticketCount;

        const total_ticket_amount = (ticket_type === "general"
            ? eventDetail.general_tickets_price
            : eventDetail.premium_tickets_price) * ticketCount;

        const ticket = await bookingModel.create({
            attendee : req.user._id,
            event,
            booked_tickets: ticketCount,
            ticket_type,
            total_ticket_amount
        });
        ticketCreated = true;
        try {
            await notificationModel.create([
                { user: req.user._id, title: "Ticket booked", message: `Your ${ticket_type} ticket for ${eventDetail.title} is booked.`, type: "booking" },
                { user: eventDetail.adder, title: "New ticket booking", message: `${req.user.name} booked ${ticketCount} ${ticket_type} ticket(s) for ${eventDetail.title}.`, type: "sales" }
            ]);
        } catch (notificationError) {
            console.error("Booking notification failed:", notificationError.message);
        }

        return res.status(201).json(new ApiResponse(true, ticket, "ticket booked success"))

    } catch (error) {
        if (reservedField && reservedTickets && !ticketCreated) {
            await eventModel.updateOne({ _id: req.body.event }, { $inc: { [reservedField]: -reservedTickets } });
        }
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function cancelBooking(req, res, next) {
    try {
        const { bookingId } = req.params;

        const cancelBooking = await bookingModel.findOneAndUpdate(
            { _id: bookingId, attendee: req.user._id, isCancel: false },
            { isCancel: true },
            { new: true }
        ).populate("event");

        if (cancelBooking) {
            const soldField = ticketFields[cancelBooking.ticket_type].sold;
            await eventModel.updateOne(
                { _id: cancelBooking.event._id, [soldField]: { $gte: cancelBooking.booked_tickets } },
                { $inc: { [soldField]: -cancelBooking.booked_tickets } }
            );
            try {
                await notificationModel.create([{ user:req.user._id,title:"Booking cancelled",message:`Your booking for ${cancelBooking.event?.title || "event"} was cancelled.`,type:"booking" },{user:cancelBooking.event.adder,title:"Booking cancelled",message:`${req.user.name} cancelled a booking for ${cancelBooking.event.title}.`,type:"sales"}]);
            } catch (notificationError) {
                console.error("Cancellation notification failed:", notificationError.message);
            }
            return res.status(200).json(new ApiResponse(true, cancelBooking, "cancel success"));
        }

        return res.status(404).json(new ApiResponse(true, null, "Event Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function checkInBooking(req, res) {
    try {
        const scannedValue = decodeURIComponent(req.params.bookingId || "");
        const bookingId = scannedValue.match(/(?:^|\|)BOOKING:([^|]+)/)?.[1] || scannedValue;
        const booking = await bookingModel.findById(bookingId).populate("event", "title adder isCancel isExpire date time");

        if (!booking || !booking.event || String(booking.event.adder) !== String(req.user._id)) {
            return res.status(404).json(new ApiResponse(false, null, "Booking not found for your events"));
        }
        if (booking.isCancel || booking.event.isCancel || booking.event.isExpire) {
            return res.status(400).json(new ApiResponse(false, null, "This ticket is cancelled or the event is no longer active"));
        }
        if (booking.isCheckedIn) {
            return res.status(409).json(new ApiResponse(false, booking, "This ticket was already checked in"));
        }

        const checkedInBooking = await bookingModel.findOneAndUpdate(
            { _id: bookingId, event: booking.event._id, isCancel: false, isCheckedIn: false },
            { $set: { isCheckedIn: true, checkedInAt: new Date() } },
            { new: true }
        ).populate("attendee", "name email phone image").populate("event", "title date time venue");

        if (!checkedInBooking) {
            return res.status(409).json(new ApiResponse(false, null, "This ticket was already checked in"));
        }
        return res.status(200).json(new ApiResponse(true, checkedInBooking, "Ticket checked in successfully"));
    } catch (error) {
        return res.status(400).json(new ApiResponse(false, null, "Enter a valid booking ID"));
    }
}
