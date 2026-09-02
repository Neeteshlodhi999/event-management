import savedEventModel from "../models/savedEventModel.js";
import eventModel from "../models/eventModel.js";
import { ApiResponse } from "../utils/responsePattern.js";

export async function getSavedEvents(req, res) {
  try {
    const saved = await savedEventModel.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("event");
    return res.status(200).json(new ApiResponse(true, saved, "success"));
  } catch (error) { return res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error")); }
}
export async function saveEvent(req, res) {
  try {
    const event = await eventModel.findOne({ _id: req.body.event, isCancel: false });
    if (!event) return res.status(404).json(new ApiResponse(false, null, "Event Not Found"));
    const saved = await savedEventModel.findOneAndUpdate({ user: req.user._id, event: event._id }, {}, { new: true, upsert: true, setDefaultsOnInsert: true }).populate("event");
    return res.status(201).json(new ApiResponse(true, saved, "Event saved"));
  } catch (error) { return res.status(500).json(new ApiResponse(false, null, error.message || "Unable to save event")); }
}
export async function removeSavedEvent(req, res) {
  try {
    const saved = await savedEventModel.findOneAndDelete({ user: req.user._id, event: req.params.eventId });
    if (!saved) return res.status(404).json(new ApiResponse(false, null, "Saved event not found"));
    return res.status(200).json(new ApiResponse(true, saved, "Event removed from saved list"));
  } catch (error) { return res.status(500).json(new ApiResponse(false, null, error.message || "Unable to remove event")); }
}
