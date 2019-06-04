import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }
);

export const BookingModel = mongoose.model('Booking', bookingSchema);