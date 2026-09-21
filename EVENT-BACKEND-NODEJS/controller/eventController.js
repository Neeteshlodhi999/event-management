import eventModel from "../models/eventModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import fs from "fs";
import { uploadImage } from "../config/cloudinary.js";

export async function getEvents(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 15;
        let skip = page === 1 ? 0 : (page - 1) * limit

        let events = await eventModel.find()
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
        if (req.files?.thumbnail?.[0]) {
            changes.thumbnail = await uploadImage(req.files.thumbnail[0], "eventhub/events")
                || `${req.protocol}://${req.get("host")}/uploads/event-images/${req.files.thumbnail[0].filename}`;
        }
        const event = await eventModel.findOneAndUpdate(
            { _id: req.params.eventId, adder: req.user._id }, changes,
            { new: true, runValidators: true }
        );
        if (event) return res.status(200).json(new ApiResponse(true, event, "Event updated"));
        return res.status(404).json(new ApiResponse(false, null, "Event Not Found"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteEvent(req, res, next) {
    try {
        const { eventId } = req.params;

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

        const cancelEvent = await eventModel.findByIdAndUpdate(eventId, { isCancel: true }, { returnDocument: "after" });

        if (cancelEvent) return res.status(200).json(new ApiResponse(true, cancelEvent, "cencel success"))

        return res.status(404).json(new ApiResponse(true, null, "Event Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}
