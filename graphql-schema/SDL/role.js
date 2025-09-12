const roleSDL = `
  type Role {
    id: ID!
    name: String!
  }
  
  input RoleInput {
    name: String!
    permission_ids: [ID!]
    resource_ids:[ID!]
  }
 
  input UpdateRoleInput {
    name: String
    permission_ids:[ID!]
    resources_ids:[ID!]
    id:ID!
  }
  
  extend type Query {
    getRole(id: ID!): Role
    roles: [Role]
  }

  extend type Mutation {
    createRole(input: RoleInput): Role @auth
    deleteRole(id:ID!): Role @auth
    updateRole(input: UpdateRoleInput): Role @auth
  }
`;

module.exports = roleSDL;