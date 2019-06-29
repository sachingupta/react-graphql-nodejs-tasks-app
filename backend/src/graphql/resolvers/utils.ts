import { UserModel } from "../../models/user";
import { EventModel } from "../../models/event";
import { dateToString } from "../../utils/date";

var DataLoader = require('dataloader')

const eventLoader = new DataLoader((eventIds: any) => {
    return getEvents(eventIds);
});

const userLoader = new DataLoader((userIds: any) => {
    return UserModel.find({ _id: { $in: userIds }});
});

export const getUser = (userId: any) => {
    return userLoader.load(userId.toString())
        .then((user: any) => {
            return {
                ...user._doc,
                _id: user._doc._id.toString(),
                createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
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
            console.log(events.length);
            return events.map((event: any) => {
                return transformEvent(event);
            });
        })
        .catch((err: any) => {
            throw err;
        })
}

export const getEvent = (eventId: any) => {
    return eventLoader.load(eventId.toString());
}

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
