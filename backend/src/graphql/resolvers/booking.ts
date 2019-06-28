import { BookingModel } from "../../models/booking";
import { transformBooking, transformEvent } from "./utils";
import { EventModel } from "../../models/event";


export const bookingResolver = {
    bookings: function (req: any) {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
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

    bookEvent: function ({ eventId }: any, req: any) {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        return EventModel.findOne({ _id: eventId })
            .then((event: any) => {
                const booking = new BookingModel({
                    user: req.userId,
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

    cancelBooking: async function ({ bookingId }: any, req: any) {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
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