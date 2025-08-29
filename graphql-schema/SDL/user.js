

const userSDL = `
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  input UserInput {
    firstname: String!
    lastname:String!
    email: String!
    password: String!
    username: String!
  }

  input UpdateUserInput{
    firstname: String
    lastname:String
    email: String
    password: String
    username: String
    id:ID!
  }

  
  extend type Query {
    getUser(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UpdateUserInput!):User
    deleteUser(id: ID!): User
  }
`;

module.exports = userSDL;