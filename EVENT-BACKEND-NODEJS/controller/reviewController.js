import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";
import reviewModel from "../models/reviewModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import { Types } from "mongoose";

function hasEventFinished(event) {
    return Boolean(event?.date) && new Date(`${event.date}T23:59:59+05:30`).getTime() < Date.now();
}

async function eventSummary(eventId) {
    const [summary] = await reviewModel.aggregate([
        { $match: { event: new Types.ObjectId(eventId) } },
        { $group: { _id: "$event", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
    ]);
    return { averageRating: Number((summary?.averageRating || 0).toFixed(1)), reviewCount: summary?.reviewCount || 0 };
}

export async function getEventReviews(req, res) {
    try {
        const reviews = await reviewModel.find({ event: req.params.eventId })
            .populate("user", "name image")
            .sort({ createdAt: -1 })
            .select("-__v");
        return res.status(200).json(new ApiResponse(true, { reviews, ...(await eventSummary(reviews[0]?.event || req.params.eventId)) }, "Reviews loaded"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to load reviews"));
    }
}

export async function getMyReviews(req, res) {
    try {
        const reviews = await reviewModel.find({ user: req.user._id }).select("event rating comment createdAt");
        return res.status(200).json(new ApiResponse(true, reviews, "Reviews loaded"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to load reviews"));
    }
}

export async function saveReview(req, res) {
    try {
        const { eventId, rating, comment = "" } = req.body;
        const numericRating = Number(rating);
        if (!eventId || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json(new ApiResponse(false, null, "Choose a rating from 1 to 5 stars"));
        }
        if (String(comment).trim().length > 500) return res.status(400).json(new ApiResponse(false, null, "Review must be 500 characters or fewer"));

        const event = await eventModel.findById(eventId);
        if (!event || event.isCancel) return res.status(404).json(new ApiResponse(false, null, "This event is unavailable for reviews"));
        if (!hasEventFinished(event)) return res.status(400).json(new ApiResponse(false, null, "Reviews open after the event has finished"));

        const booking = await bookingModel.exists({ event: eventId, attendee: req.user._id, isCancel: false });
        if (!booking) return res.status(403).json(new ApiResponse(false, null, "Only attendees with a valid booking can review this event"));

        const review = await reviewModel.findOneAndUpdate(
            { event: eventId, user: req.user._id },
            { rating: numericRating, comment: String(comment).trim() },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        return res.status(200).json(new ApiResponse(true, { review, ...(await eventSummary(event._id)) }, "Review saved"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to save review"));
    }
}

export async function getAdminReviews(req, res) {
    try {
        const events = await eventModel.find({ adder: req.user._id }).select("_id");
        const eventIds = events.map((event) => event._id);
        const reviews = await reviewModel.find({ event: { $in: eventIds } })
            .populate("event", "title date")
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .select("-__v");
        return res.status(200).json(new ApiResponse(true, reviews, "Reviews loaded"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to load reviews"));
    }
}
