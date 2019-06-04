export const typesDef = `
type Event {
    _id: ID!
    title: String!
    description: String
    price: Float
    date: String
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
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
`;