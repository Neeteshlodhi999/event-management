import { Schema, model } from "mongoose";

const subscriberSchema = new Schema({
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 120 },
}, { timestamps: true });

export default model("Subscriber", subscriberSchema);
