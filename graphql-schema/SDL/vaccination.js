const vaccinationSDL=`
   
    scalar Date

    type Child{
        lastname: String!
        firstname: String!
        birth_date: Date!
    }

    type Vaccination{
        id: ID!
        vaccine_id: ID!
        child_id: ID!
        zone_id: ID!
        health_agent_id: ID!
        vaccination_date: Date!
        child: Child
    }

    input VaxnationInput{
        vaccine_id: ID!
        child_id: ID!
        zone_id: ID!
        user_id: ID
        health_agent_id: ID
        vaccination_date: Date!
    }

    input UpdVaxnationInput{
        id: ID!
        vaccine_id: ID
        child_id: ID
        zone_id: ID
        health_agent_id: ID
        vaccination_date: Date
    }

    extend type Query{
        getVaccination(id:ID!): Vaccination
        vaccinations: [Vaccination!]
    }

    extend type Mutation{
        createVaccination(input: VaxnationInput!): Vaccination @auth  @rbac( actions:["READ","CREATE"], resources:["vaccinations"])
        updateVaccination(input: UpdVaxnationInput!): Vaccination @auth  @rbac( actions:["READ","UPDATE"], resources:["vaccinations"])
        deleteVaccination(id: ID!): Vaccination  @auth  @rbac( actions:["READ","DELETE"], resources:["vaccinations"])

    }  

`

module.exports=vaccinationSDL;