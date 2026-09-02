import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is Required"],
        trim: true,
        maxLength: [32, "title Is Too Long"],
        minLength: [8, "title is Too Short"],
        unique : true
    },
    desc: {
        type: String,
        required: [true, "description is Required"],
        trim: true,
    },
    total_general_tickets: {
        type: Number,
        required: [true, "total tickets count is Required"],
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    total_premium_tickets: {
        type: Number,
        required: [true, "total tickets count is Required"],
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    general_tickets_price: {
        type: Number,
        required: [true, "general tickets price is Required"],
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    premium_tickets_price: {
        type: Number,
        required: [true, "premium tickets price is Required"],
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid Number!`
        }
    },
    images: [{ type: String }],
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"]
    },
    date: {
        type: String,
        trim: true,
        required: [true, "date is required"]
    },
    time: {
        type: String,
        trim: true,
        required: [true, "time is required"]
    },
    venue: {
        type: String,
        trim: true,
        required: [true, "venue is required"],
    },
    category: {
        type: String,
        trim: true,
        required: [true, "category is required"]
    },
    highlights: [{ type: String }],
    organizer: {
        type: String,
        required: [true, "name is Required"],
        trim: true,
        maxLength: [32, "name Is Too Long"],
        minLength: [3, "name is Too Short"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+ [a-zA-Z]+$/.test(v)
            },
            message: props => `${props.value} is Not A valid Name`
        }
    },
    adder: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    isExpire: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const eventModel = model("event", eventSchema);

export default eventModel;