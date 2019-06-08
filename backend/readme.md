https://www.djamware.com/post/5cbd1e9a80aca754f7a9d1f2/node-express-reactjs-graphql-and-mongodb-crud-web-application


https://medium.com/create-a-server-with-nodemon-express-typescript/create-a-server-with-nodemon-express-typescript-f7c88fb5ee71
@types/node : Is a plugin than help us to resolve node names

eslint eslint-plugin-import: help us to resolve import issues than we can have.

nodemon: This plugin avoid us than periodically we have reloading application.

ts-node: Allow us to run typescript files without transpile javascript to plain text.

#Steps to try:
1. yarn install
2. yarn start


## Graphql test requests

query {
 login(email: "hapysachin@gmail.com", password: "test") {
  userId,
  token,
  tokenExpiration
}
}

query {
  events {
    title
  }
}


mutation {
  createEvent(eventInput:{title: "a", description: "a", price 10}) {
    _id
  }
}

mutation {
  createUser(userInput: {email: "test@gmail.com", password: "test"}) {
    _id
    email
  }
}