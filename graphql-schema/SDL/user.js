

const userSDL = `
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }
 
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    message: String!
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    username: String!
    role_id: String!
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
    login(username: String!, password: String!): AuthPayload!
    updateUser(input: UpdateUserInput!):User
    deleteUser(id: ID!): User
  }
`;

module.exports = userSDL;