import { Schema, model } from "mongoose";

const savedEventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  event: { type: Schema.Types.ObjectId, ref: "event", required: true },
}, { timestamps: true });

savedEventSchema.index({ user: 1, event: 1 }, { unique: true });
export default model("saved_event", savedEventSchema);
