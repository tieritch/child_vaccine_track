

const userSDL = `
  type Role {
    id: ID!
    name: String!
  }
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    username: String!
    roles:[Role!]!
    
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
    role_ids: [ID!]!
  }

  input UpdUserInput{
    firstname: String
    lastname:String
    email: String
    password: String
    username: String
    id:ID!
    role_id: String
  }

  
  extend type Query {
    getUser(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    createUser(input: UserInput!): User @auth @rbac(actions: ["READ","CREATE"],resources: ["users"])
    login(username: String!, password: String!): AuthPayload!
    updateUser(input: UpdUserInput!):User @auth  @rbac(actions: ["READ","UPDATE"],resources: ["users"])
    deleteUser(id: ID!): User @auth @rbac(actions: ["READ","DELETE"],resources: ["users"])
  }
`;

module.exports = userSDL;