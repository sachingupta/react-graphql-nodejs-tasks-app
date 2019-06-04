// server.js

import express from "express";
import bodyParser from "body-parser";
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

import * as Constants from "./constants";
import { Resolvers, RootSchema } from "./graphql/index";

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: RootSchema,
  rootValue: Resolvers,
  graphiql: true,
}));

app.get("/", (req: any, res: any) => {
  res.send("Hello world  graphql 0");
});

mongoose.connect(Constants.mongoDbUri, { useNewUrlParser: true })
  .then(() => {
    app.listen(Constants.port, () => {
      console.log(`Listening on port ${Constants.port}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
});
