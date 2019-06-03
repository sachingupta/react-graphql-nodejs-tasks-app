import { buildSchema } from "graphql";
import { EventModel } from "../models/event";
import { UserModel } from "../models/user";
import * as bcrypt from "bcryptjs";

export const RootSchema = buildSchema(`
  type Event {
      _id: ID!
      title: String!
      description: String
      price: Float
      date: String
  }

  type User {
      _id: ID!
      email: String!
      password: String
  }

  input UserInput {
      email: String!
      password: String!
  }

  input EventInput {
      title: String!
      description: String
      price: Float
  }

  type Query {
    events: [Event]
  }

  type Mutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
  }
`);


export const RootValue = {
    events: function () {
        return EventModel.find()
            .then((events: any) => {
                console.log(events);
                return events.map((event: any) => {
                    return { ...event._doc, _id: event._doc._id.toString() };
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
            creator: '5cf4c3e41321f9489cb223a0'
        });

        let createdEvent: any;
        return event.save()
            .then((result: any) => {
                createdEvent = { ...result._doc };
                return UserModel.findById('5cf4c3e41321f9489cb223a0')
            })
            .then((user: any) => {
                if (!user) {
                    throw new Error("User doesn't exists");
                }
                user.createdEvents.push(event);
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
