import { buildSchema } from "graphql";
import { typesDef } from "./types";

export const RootSchema = buildSchema(typesDef);
export  { Resolvers  } from "./resolvers/index";


