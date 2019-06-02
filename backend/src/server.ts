// server.js

import express from "express";
const { MongoClient } = require("mongodb");
import bodyParser from "body-parser";
const { check } = require("express-validator/check");
const graphqlHTTP = require("express-graphql");
import  {  buildSchema } from "graphql";

const port = 8000;
const app = express();
const dbUrl = "mongodb://localhost:27017";
const dbName = "star_wards_db";

// Maps id to User object
let fakeDatabase: any = [];

app.use(bodyParser.json());

var schema = buildSchema(`
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

  
  var root = {
    events: function () {
      return fakeDatabase;
    },

    createEvent: function({ eventInput }: any) {
        const event = {
            _id: Math.random().toString(),
            title: eventInput.title,
            description: eventInput.description,
            price: eventInput.price,
            date: new Date().toISOString()
        }
        fakeDatabase.push(event);
        return event;
    }
  };
  

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then((client: any) => {
        const db = client.db(dbName);
    })
    .catch((err: any) => {
        console.log("Error getting db connection" + err);
    });

app.get("/", (req: any, res: any) => {
    res.send("Hello world  graphql 0");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
