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
        createCountry(input: CountryInput!):Country
        updateCountry(input: CountryUpdateInput!):Country
        deleteCountry(id:ID!): Country
    }

`

module.exports=countrySDL