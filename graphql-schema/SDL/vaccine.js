const vaccineSDL=`

    type Vaccine{
        id: ID!
        name: String!
        required_doses: Int
        interval_between: String
        description: String
    }

    extend type Query{
        getVaccine(id: ID!): Vaccine
        vaccines: [Vaccine!]
    }

    input VaccineInput{
        name: String!
        required_doses: Int!
        interval_between: Int!
        description: String
    }

    input UpdVaccineInput{
        id :ID!
        name: String
        required_doses: Int
        interval_between: Int
        description: String
    }

    extend type Mutation{
        createVaccine(input: VaccineInput!): Vaccine @auth  @rbac( actions:["READ","CREATE"], resources:["vaccines"])
        updateVaccine(input: UpdVaccineInput!): Vaccine @auth  @rbac( actions:["READ","UPDATE"], resources:["vaccines"])
        deleteVaccine(id: ID!): Vaccine @auth  @rbac( actions:["READ","DELETE"], resources:["vaccines"])
    }
`

module.exports=vaccineSDL;