const {Model}=require('objection');

module.exports=class HealthAgent extends Model{
     
    static get tableName(){
        return "health_agents"
    }

    static get relationMappings(){

        return{
            zone:{
                relation: Model.ManyToManyRelation,
                modelClass: require('./health-agent'),
                from:"health_agents.id",
                through:{
                    from:" zones_agents.agent_id",
                    to:"zones_agents.zone_id"
                },
                to: "zones.id"
            }
        }
    }
}