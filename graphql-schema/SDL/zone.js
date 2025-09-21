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
        createZone(input: ZoneInput!):Zone @auth  @rbac( actions:["READ","CREATE"], resources:["zones"])
        updateZone(input: ZoneUpdateInput!):Zone @auth @rbac( actions:["READ","UPDATE"], resources:["zones"])
        deleteZone(id:ID!): Zone @auth  @rbac( actions:["READ","DELETE"], resources:["zones"])
    }

`

module.exports=zoneSDL