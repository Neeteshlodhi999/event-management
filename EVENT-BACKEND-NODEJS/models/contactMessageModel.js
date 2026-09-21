import { Schema, model } from "mongoose";

const contactMessageSchema = new Schema({
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default model("ContactMessage", contactMessageSchema);
