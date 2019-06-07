import { BookingModel } from "../../models/booking";
import { transformBooking, transformEvent } from "./utils";
import { EventModel } from "../../models/event";


export const bookingResolver = {
    bookings: function () {
        return BookingModel.find()
            .then((bookings: any) => {
                return bookings.map((booking: any) => {
                    return transformBooking(booking);
                });
            })
            .catch((err: any) => {
                console.log(err);
            });
    },

    bookEvent: function ({ eventId }: any) {
        return EventModel.findOne({ _id: eventId })
            .then((event: any) => {
                const booking = new BookingModel({
                    user: '5cf4cf2afc7b8613903150d2',
                    event: event
                });
                return booking.save()
            })
            .then((booking: any) => {
                return transformBooking(booking);
            })
            .catch((err: any) => {
                console.log(err);
            });
    },

    cancelBooking: async function ({ bookingId }: any) {
        try {
            const booking: any = await BookingModel.findById(bookingId).populate('event');
            const event = transformEvent(booking.event);
            await BookingModel.deleteOne({ _id: bookingId });
            return event;
        }

        catch (err) {
            console.log(err);
        }
    }
};