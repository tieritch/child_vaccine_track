const contrySDL=
`
    type Contry {
        id:ID!
        name: String!
    }

    input ContryInput {
        name: String!
    }
    
    input ContryUpdateInput {
        name: String
        id: ID!
    }

    extend type Query {
        getContry(id:ID!): Contry
        Contries: [Contry]
    }

    extend type Mutation {
        createContry(input: ContryInput!):Contry
        updateContry(input: ContryUpdateInput!):Contry
        deleteContry(id:ID!): Contry
    }

`

module.exports=contrySDL