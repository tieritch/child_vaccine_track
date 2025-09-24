const childSDL=`
    
    type User{
        id: ID
        firstname: String
        lastname: String
    }
    
    type Agent{
        agent_id: ID
        user: User
    }
    type Child{
        id: ID!
        firstname: String!
        lastname: String
        address: String!
        sex_id: ID!
        birth_date: String!
        parent_id: ID!
        agents: [Agent!]
    }
    
    input ChildInput{
        firstname: String!
        lastname: String
        address: String!
        sex_id: ID!
        birth_date: String! 
        parent_id: ID!

    }
    
    input UpdChildInput{
        id: ID!
        firstname: String
        lastname: String
        address: String
        sex_id: ID
        birth_date: String      
        parent_id: ID

    }

    extend type Query{
        getChild(id:ID!): Child
        children: [Child!]
    }
    extend type Mutation{
        createChild( input: ChildInput!): Child @auth @rbac( actions:["READ","CREATE"], resources:["children"])
        updateChild( input: UpdChildInput!): Child @auth @rbac( actions:["READ","UPDATE"], resources:["children"])
        deleteChild(id:ID!): Child @auth @rbac( actions:["READ","DELETE"], resources:["children"])
    }
`
module.exports=childSDL;