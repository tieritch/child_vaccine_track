const parentSDL=`
  
    type Parent{
        id: ID!
        firstname: String!
        lastname: String
        email: String
        phone_number: String
        sex_id: ID!
    }
    
    input ParInput{
        firstname: String!
        lastname: String
        email: String
        phone_number: String
        sex_id: ID!
    }

    input UpdParInput{
        id: ID!
        firstname: String
        lastname: String
        email: String
        phone_number: String
        sex_id: ID
    }
    
    extend type Query{
        getParent(id:ID!): Parent
        parents:[Parent!]
    } 
    
    extend type Mutation{
        createParent(input: ParInput): Parent @auth  @rbac( actions:["READ","CREATE"], resources:["parents"])
        updateParent(input: UpdParInput): Parent  @auth @rbac( actions:["READ","UPDATE"], resources:["parents"])
        deleteParent(id:ID): Parent  @auth @rbac( actions:["READ","DELETE"], resources:["parents"])
    }
`
module.exports=parentSDL;