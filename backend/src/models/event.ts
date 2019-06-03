import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    }
});

export const EventModel = mongoose.model('Event', eventSchema);