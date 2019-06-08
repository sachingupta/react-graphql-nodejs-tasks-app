// server.js

import express from "express";
import bodyParser from "body-parser";
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

import * as Constants from "./constants";
import { Resolvers, RootSchema } from "./graphql/index";
import { isAuth } from "./middleware/is-auth";

const app = express();

app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
})

app.use(isAuth);

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
