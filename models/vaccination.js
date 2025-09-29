const {Model}=require('objection');

module.exports=class Vaccination extends Model{

    static get tableName(){
        return "vaccinations"
    }

    static get relationMappings(){

        return {
            
            agent:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./health-agent'),
                join:{
                    from: "vaccinations.agent_id",
                    to: "health_agents.id"
                }
            },

            vaccine:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./vaccine'),
                join:{
                    from: "vaccinations.vaccine_id",
                    to: "vaccines.id"
                }
            },

            child:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./child'),
                join:{
                    from: "vaccinations.child_id",
                    to: "children.id"
                }
            },

            zone:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./zone'),
                join:{
                    from: "vaccinations.zone_id",
                    to: "zones.id"
                }
            }
        }
    }
}