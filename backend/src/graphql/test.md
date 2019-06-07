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