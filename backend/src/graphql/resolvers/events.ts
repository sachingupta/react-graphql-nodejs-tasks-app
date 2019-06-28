import { UserModel } from "../../models/user";
import { EventModel } from "../../models/event";
import { transformEvent } from "./utils";


export const eventsResolver = {
     events: function ({}, req: any) {
        return EventModel.find()
            .then((events: any) => {
                return events.map((event: any) => {
                    return transformEvent(event);
                });
            })
            .catch((err: any) => {
                console.log(err);
            });
    },

    createEvent: function ({ eventInput }: any, req: any) {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new EventModel({
            title: eventInput.title,
            description: eventInput.description,
            price: eventInput.price,
            date: new Date(eventInput.date),
            creator: req.userId
        });

        let createdEvent: any;
        return event.save()
            .then((result: any) => {
                createdEvent = transformEvent(result);
                return UserModel.findById(req.userId);
            })
            .then((user: any) => {
                if (!user) {
                    throw new Error("User doesn't exists");
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then((result: any) => {
                return createdEvent;
            })
            .catch((err: any) => {
                console.log(err);
            });
    },
};