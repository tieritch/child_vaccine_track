const agentSDL=`
   
    scalar Date
    
    type User{
        firstname: String!
        lastname: String!
    }
    
    type Agent{
        id: ID!
        phone_number: String!
        sex_id: ID!
        user_id: ID!
        email: String!
        address: String!
        birth_date: Date!
        user: User
    }

    input  AgentInput{
        phone_number: String!
        sex_id: ID!
        email: String!
        address: String!
        birth_date: Date!  
        user_id: ID!
    }

    input UpdAgentInput{
        id: ID!
        phone_number: String
        sex_id: ID
        user_id: ID
        email: String
        address: String
        birth_date: Date 
    }

    extend type Query{
        getAgent(id:ID!): Agent
        agents: [Agent]
    }

    extend type Mutation{
        createAgent(input: AgentInput!): Agent @auth  @rbac( actions:["READ","CREATE"], resources:["health_agents"])
        updateAgent(input: UpdAgentInput): Agent @auth  @rbac( actions:["READ","UPDATE"], resources:["health_agents"])
        deleteAgent(id: ID!): Agent @auth  @rbac( actions:["READ","DELETE"], resources:["health_agents"])
    }
`

module.exports=agentSDL;