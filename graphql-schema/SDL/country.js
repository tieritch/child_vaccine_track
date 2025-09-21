const countrySDL=
`
    type Country {
        id:ID!
        name: String!
    }

    input CountryInput {
        name: String!
    }
    
    input UpdCountryInput {
        name: String
        id: ID!
    }

    extend type Query {
        getCountry(id:ID!): Country
        countries: [Country]
    }

    extend type Mutation {
        createCountry(input: CountryInput!):Country @auth  @rbac( actions:["READ","CREATE"], resources:["countries"])
        updateCountry(input: UpdCountryInput!):Country @auth  @rbac( actions:["READ","UPDATE"], resources:["countries"])
        deleteCountry(id:ID!): Country @auth  @rbac( actions:["READ","DELETE"], resources:["countries"])
    }

`

module.exports=countrySDL