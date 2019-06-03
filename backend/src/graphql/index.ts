import { buildSchema } from "graphql";
import { EventModel } from "../models/event";

export const RootSchema = buildSchema(`
  type Event {
      _id: ID!
      title: String!
      description: String
      price: Float
      date: String
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
      date: new Date()
    });

    return event.save()
      .then((result: any) => {
        console.log(result);
        return { ...result._doc };
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
};
