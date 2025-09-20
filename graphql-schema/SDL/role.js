const roleSDL = `
 
  type Resource{
    name: String!
    id: ID!
  }
  type Permission {
    name: String!
    id: ID!
    resources:[Resource!]
  }

  type Role {
    id: ID!
    name: String!
    permissions:[Permission!]!
  }
  
  input RoleInput {
    name: String!
    permission_ids: [ID!]
    resource_ids:[ID!]
  }
 
  input UpdateRoleInput {
    name: String
    permission_ids:[ID!]
    resource_ids:[ID!]
    id:ID!
  }
  
  extend type Query {
    getRole(id: ID!): Role
    roles: [Role]
  }

  extend type Mutation {
    createRole(input: RoleInput): Role @auth @rbac( actions:["READ","CREATE"], resources:["roles"])
    deleteRole(id:ID!): Role @auth @rbac( actions:["READ","DELETE"], resources:["roles"])
    updateRole(input: UpdateRoleInput): Role @auth  @rbac(actions:["READ","UPDATE"], resources:["roles"])
  }
`;

module.exports = roleSDL;