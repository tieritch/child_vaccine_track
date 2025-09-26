// SDL for child enrollment in a health zone or district

const zoneChildSDL=`

    type ZC{
        id:ID
        zone_id: ID
        child_id: ID
    }

    input ZCInput{
        zone_id: ID!
        child_id: ID!
    }
    
    input UpdZCInput{
        id: ID!
        zone_id: ID
        child_id: ID
    }

    extend type Query{
        getZC(id:ID!): ZC
        zcs: [ZC!] 
    }

    extend type Mutation{
        createZC(input: ZCInput!): ZC  @auth @rbac( actions:["READ","CREATE"], resources:["zone_child_enrollments"])
        updateZC(input: UpdZCInput!): ZC @auth @rbac( actions:["READ","UPDATE"], resources:["zone_child_enrollments"])
        deleteZC(id: ID): ZC @auth @rbac( actions:["READ","DELETE"], resources:["zone_child_enrollments"])
    }

`
module.exports=zoneChildSDL