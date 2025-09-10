const zoneSDL=
`
    type Zone {
        id:ID!
        name: String!
    }

    input ZoneInput {
        name: String!
    }
    
    input ZoneUpdateInput {
        name: String
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