import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    attendee: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    event: {
        type: Schema.Types.ObjectId,
        required: [true, "event Id is Required"],
        ref: "event"
    },
    booked_tickets: {
        type: Number,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        },
        enum: [1, 2, 3, 4],
        default: 1
    },
    ticket_type: {
        type: String,
        required: [true, "ticket type is Required"],
        enum: ["general", "premium"],
        default: "general"
    },
    total_ticket_amount: {
        type: Number,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    isRefunded: {
        type: Boolean,
        default: false
    },
    Refunded_amount: {
        type: Number,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    isBooked: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const bookingModel = model("booking", bookingSchema);

export default bookingModel;