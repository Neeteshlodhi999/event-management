import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 500, default: "" },
}, { timestamps: true });

reviewSchema.index({ event: 1, user: 1 }, { unique: true });

export default model("review", reviewSchema);
