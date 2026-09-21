import subscriberModel from "../models/subscriberModel.js";
import { ApiResponse } from "../utils/responsePattern.js";

export async function subscribe(req, res) {
    try {
        const email = req.body.email?.trim().toLowerCase();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json(new ApiResponse(false, null, "Enter a valid email address."));
        }
        const existing = await subscriberModel.findOne({ email });
        if (existing) return res.status(200).json(new ApiResponse(true, existing, "You are already subscribed."));
        const subscriber = await subscriberModel.create({ email });
        return res.status(201).json(new ApiResponse(true, subscriber, "Subscription successful."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to subscribe right now."));
    }
}

export async function getSubscribers(req, res) {
    try {
        const subscribers = await subscriberModel.find().sort({ createdAt: -1 }).limit(500);
        return res.status(200).json(new ApiResponse(true, subscribers, "Subscribers loaded."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to load subscribers."));
    }
}
