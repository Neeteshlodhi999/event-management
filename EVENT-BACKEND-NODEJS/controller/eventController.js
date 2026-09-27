import eventModel from "../models/eventModel.js";
import bookingModel from "../models/bookingModel.js";
import notificationModel from "../models/notificationModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import fs from "fs";
import { uploadImage } from "../config/cloudinary.js";

function hasEventEnded(event) {
    const time = /^\d{2}:\d{2}$/.test(event.time || "") ? event.time : "23:59";
    const endTime = new Date(`${event.date}T${time}:00+05:30`).getTime();
    return Number.isFinite(endTime) && endTime < Date.now();
}

async function markExpiredEvents() {
    const activeEvents = await eventModel.find({ isExpire: false }).select("_id date time");
    const expiredIds = activeEvents.filter(hasEventEnded).map((event) => event._id);
    if (expiredIds.length) {
        await eventModel.updateMany({ _id: { $in: expiredIds } }, { $set: { isExpire: true } });
    }
}

export async function getEvents(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 15;
        let skip = page === 1 ? 0 : (page - 1) * limit

        await markExpiredEvents();

        let events = await eventModel.find({ isExpire: false, isCancel: false })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(new ApiResponse(true, events, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getMyEvents(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 15;
        let skip = page === 1 ? 0 : (page - 1) * limit

        await markExpiredEvents();

        let events = await eventModel.find({adder : req.user._id})
            .skip(skip)
            .limit(limit);

        return res.status(200).json(new ApiResponse(true, events, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getEventById(req, res) {
    try {
        const event = await eventModel.findOne({ _id: req.params.eventId, adder: req.user._id });
        if (!event) return res.status(404).json(new ApiResponse(false, null, "Event Not Found"));
        return res.status(200).json(new ApiResponse(true, event, "success"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"));
    }
}

export async function addEvent(req, res, next) {
    try {
        const {
            title,
            desc,
            total_general_tickets,
            total_premium_tickets,
            general_tickets_price,
            premium_tickets_price,
            date,
            time,
            venue,
            category,
            highlights,
            organizer
        } = req.body;

        if (
            !title
            || !desc
            || !total_general_tickets
            || !total_premium_tickets
            || !general_tickets_price
            || !premium_tickets_price
            || !date
            || !time
            || !venue
            || !category
            || !organizer) {
            return res.status(400).json(new ApiResponse(false, null, "All Fields Are required"));
        }

        if (!req.files?.thumbnail?.[0]) return res.status(400).json(new ApiResponse(false, null, "Event banner is required"));
        const thumbnail = await uploadImage(req.files.thumbnail[0], "eventhub/events")
            || `${req.protocol}://${req.get("host")}/uploads/event-images/${req.files.thumbnail[0].filename}`;

        const images = [];

        for (let image of (req.files?.images || [])) {
            let url = await uploadImage(image, "eventhub/events")
                || `${req.protocol}://${req.get("host")}/uploads/event-images/${image.filename}`;
            images.push(url);
        }

        const newEvent = await eventModel.create({
            title,
            desc,
            total_general_tickets,
            total_premium_tickets,
            general_tickets_price,
            premium_tickets_price,
            date,
            time,
            venue,
            category,
            highlights: JSON.parse(highlights),
            organizer,
            images,
            thumbnail,
            adder: req.user._id
        });

        return res.status(201).json(new ApiResponse(true, newEvent, "success"))

    } catch (error) {
        let files = [...(req.files?.thumbnail || []), ...(req.files?.images || [])];
        for (let image of files) {
            fs.rm(image.path, (data, err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateEvent(req, res, next) {
    try {
        const allowed = ["title", "desc", "total_general_tickets", "total_premium_tickets", "general_tickets_price", "premium_tickets_price", "date", "time", "venue", "category", "highlights", "organizer", "isCancel"];
        const changes = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => allowed.includes(key) && value !== undefined));
        if (typeof changes.highlights === "string") changes.highlights = JSON.parse(changes.highlights);

        const currentEvent = await eventModel.findOne({ _id: req.params.eventId, adder: req.user._id });
        if (!currentEvent) return res.status(404).json(new ApiResponse(false, null, "Event Not Found"));

        // Count active bookings as well as the live counters. This also keeps
        // events created before ticket counters existed safe to edit.
        const sales = await bookingModel.aggregate([
            { $match: { event: currentEvent._id, isCancel: false } },
            { $group: { _id: "$ticket_type", total: { $sum: "$booked_tickets" } } }
        ]);
        const activeSales = Object.fromEntries(sales.map((sale) => [sale._id, sale.total]));
        const generalSold = Math.max(Number(currentEvent.sold_general_tickets || 0), Number(activeSales.general || 0));
        const premiumSold = Math.max(Number(currentEvent.sold_premium_tickets || 0), Number(activeSales.premium || 0));

        if (changes.total_general_tickets !== undefined && Number(changes.total_general_tickets) < generalSold) {
            return res.status(400).json(new ApiResponse(false, null, `General ticket total cannot be lower than ${generalSold} tickets already sold`));
        }
        if (changes.total_premium_tickets !== undefined && Number(changes.total_premium_tickets) < premiumSold) {
            return res.status(400).json(new ApiResponse(false, null, `Premium ticket total cannot be lower than ${premiumSold} tickets already sold`));
        }

        changes.sold_general_tickets = generalSold;
        changes.sold_premium_tickets = premiumSold;
        if (req.files?.thumbnail?.[0]) {
            changes.thumbnail = await uploadImage(req.files.thumbnail[0], "eventhub/events")
                || `${req.protocol}://${req.get("host")}/uploads/event-images/${req.files.thumbnail[0].filename}`;
        }
        const event = await eventModel.findByIdAndUpdate(
            currentEvent._id, changes,
            { new: true, runValidators: true }
        );
        return res.status(200).json(new ApiResponse(true, event, "Event updated"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteEvent(req, res, next) {
    try {
        const { eventId } = req.params;

        const hasBookings = await bookingModel.exists({ event: eventId });
        if (hasBookings) {
            return res.status(400).json(new ApiResponse(
                false,
                null,
                "This event has booking records and cannot be deleted. Cancel the event instead so users keep their ticket history."
            ));
        }

        const delEvent = await eventModel.findOneAndDelete({ _id: eventId, adder: req.user._id });

        if (delEvent) return res.status(200).json(new ApiResponse(true, delEvent, "deleted success"))

        return res.status(404).json(new ApiResponse(true, null, "Event Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function cancelEvent(req, res, next) {
    try {
        const { eventId } = req.params;

        const cancelEvent = await eventModel.findOneAndUpdate(
            { _id: eventId, adder: req.user._id, isCancel: false },
            { isCancel: true },
            { new: true }
        );

        if (cancelEvent) {
            const bookings = await bookingModel.find({ event: eventId, isCancel: false }).select("attendee");
            if (bookings.length) {
                try {
                    await notificationModel.insertMany(bookings.map((booking) => ({
                        user: booking.attendee,
                        title: "Event cancelled",
                        message: `The event “${cancelEvent.title}” has been cancelled. Please contact the organizer for further support.`,
                        type: "booking"
                    })));
                } catch (notificationError) {
                    console.error("Event cancellation notifications failed:", notificationError.message);
                }
            }
            return res.status(200).json(new ApiResponse(true, cancelEvent, "Event cancelled and attendees notified"));
        }

        return res.status(404).json(new ApiResponse(false, null, "Event Not Found or already cancelled"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}
