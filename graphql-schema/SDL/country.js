const countrySDL=
`
    type Country {
        id:ID!
        name: String!
    }

    input CountryInput {
        name: String!
    }
    
    input CountryUpdateInput {
        name: String
        id: ID!
    }

    extend type Query {
        getCountry(id:ID!): Country
        countries: [Country]
    }

    extend type Mutation {
        createCountry(input: CountryInput!):Country @auth
        updateCountry(input: CountryUpdateInput!):Country @auth
        deleteCountry(id:ID!): Country @auth
    }

`

module.exports=countrySDL