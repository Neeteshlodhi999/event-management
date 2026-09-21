import contactMessageModel from "../models/contactMessageModel.js";
import { ApiResponse } from "../utils/responsePattern.js";

export async function createContactMessage(req, res) {
    try {
        const { name, email, subject, message } = req.body;
        if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
            return res.status(400).json(new ApiResponse(false, null, "Name, email, subject, and message are required."));
        }
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) return res.status(400).json(new ApiResponse(false, null, "Enter a valid email address."));

        const contactMessage = await contactMessageModel.create({ name, email, subject, message });
        return res.status(201).json(new ApiResponse(true, contactMessage, "Message sent successfully."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to send message."));
    }
}

export async function getContactMessages(req, res) {
    try {
        const messages = await contactMessageModel.find().sort({ createdAt: -1 }).limit(200);
        return res.status(200).json(new ApiResponse(true, messages, "Contact messages loaded."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to load contact messages."));
    }
}

export async function markContactMessageRead(req, res) {
    try {
        const message = await contactMessageModel.findByIdAndUpdate(req.params.messageId, { isRead: true }, { new: true });
        if (!message) return res.status(404).json(new ApiResponse(false, null, "Message not found."));
        return res.status(200).json(new ApiResponse(true, message, "Message marked as read."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to update message."));
    }
}
