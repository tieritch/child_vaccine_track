const zoneSDL=
`
    type Zone {
        id:ID!
        name: String!
        country_id: ID!
    }

    input ZoneInput {
        name: String!
        country_id: ID!
    }
    
    input ZoneUpdateInput {
        name: String
        country_id: String
        id: ID!
    }

    extend type Query {
        getZone(id:ID!): Zone
        zones: [Zone]
    }

    extend type Mutation {
        createZone(input: ZoneInput!):Zone
        updateZone(input: ZoneUpdateInput!):Zone
        deleteZone(id:ID!): Zone
    }

`

module.exports=zoneSDL