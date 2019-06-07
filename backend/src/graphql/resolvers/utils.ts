import { UserModel } from "../../models/user";
import { EventModel } from "../../models/event";
import { dateToString } from "../../utils/date";

export const transformEvent = (event: any) => {
    return {
         ...event._doc,
         _id: event._doc._id.toString(),
         date: dateToString(event._doc.date),
         creator: getUser.bind(this, event._doc.creator)
     } 
 }

export const transformBooking = (booking: any) => {
    return {
        ...booking._doc,
        _id: booking._doc._id.toString(),
        user: getUser.bind(this, booking._doc.user),
        event: getEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.createdAt)
    };
}

export const getUser = (userId: any) => {
    return UserModel.findById(userId)
        .then((user: any) => {
            return {
                ...user._doc,
                _id: user._doc._id.toString(),
                createdEvents: getEvents.bind(this, user._doc.createdEvents)
            };
        })
        .catch((err: any) => {
            throw err;
        })
}

export const getEvents = (eventIds: any) => {
    console.log('get events called' + eventIds);
    return EventModel.find({ _id: { $in: eventIds } })
        .then((events: any) => {
            return events.map((event: any) => {
                return transformEvent(event);
            });
        })
        .catch((err: any) => {
            throw err;
        })
}

export const getEvent = (eventId: any) => {
    return EventModel.findById(eventId)
        .then((event: any) => {
            return transformEvent(event);
        })
        .catch((err: any) => {
            throw err;
        })
}
