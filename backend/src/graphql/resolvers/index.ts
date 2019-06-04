import { UserModel } from "../../models/user";
import { EventModel } from "../../models/event";
import * as bcrypt from "bcryptjs";

const getUser = (userId: any) => {
    return UserModel.findById(userId)
    .then((user: any) => {
        return { 
            ...user._doc, 
            _id: user._doc.id, 
            createdEvents: getEvents.bind(this, user._doc.createdEvents) 
        };
    })
    .catch((err: any) => {
        throw err;
    })
}

const getEvents = (eventIds: any) => {
    console.log( 'get events called' + eventIds);
    return EventModel.find({_id: {$in: eventIds}})
    .then((events: any) => {
        return events.map((event: any) => {
            return {
                 ...event._doc, 
                 _id: event._doc._id.toString(),
                 creator: getUser.bind(this, event._doc.creator) 
                };
        });
    })
    .catch((err: any) => {
        throw err;
    })
}

export const Resolvers = {
    events: function () {
        return EventModel.find()
            .then((events: any) => {
                console.log(events);
                return events.map((event: any) => {
                    return {
                         ...event._doc, 
                         _id: event._doc._id.toString(),
                         creator: getUser.bind(this, event._doc.creator) 
                        };
                });
            })
            .catch((err: any) => {
                console.log(err);
            });
    },

    createEvent: function ({ eventInput }: any) {
        const event = new EventModel({
            title: eventInput.title,
            description: eventInput.description,
            price: eventInput.price,
            date: new Date(),
            creator: '5cf4cf2afc7b8613903150d2'
        });

        let createdEvent: any;
        return event.save()
            .then((result: any) => {
                createdEvent = { ...result._doc };
                return UserModel.findById('5cf4cf2afc7b8613903150d2');
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

    createUser: function ({ userInput }: any) {
        return UserModel.findOne({ email: userInput.email })
            .then((user: any) => {
                if (user) {
                    throw new Error("User exists already");
                }
                return bcrypt.hash(userInput.password, 12)
                    .then((hasbPassword) => {
                        const user = new UserModel({
                            email: userInput.email,
                            password: hasbPassword
                        });
                        return user.save()
                            .then((result: any) => {
                                return { ...result._doc };
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            });
    }
};