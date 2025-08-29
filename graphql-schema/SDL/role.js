const roleSDL = `
  type Role {
    id: ID!
    name: String!
  }

  input RoleInput {
    name: String!
  }

  
  extend type Query {
    getRole(id: ID!): Role
    roles: [Role]
  }

  extend type Mutation {
    createRole(input: RoleInput): Role
  }
`;

module.exports = roleSDL;