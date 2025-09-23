const {Model}=require('objection');

module.exports=class HealthAgent extends Model{
     
    static get tableName(){
        return "health_agents"
    }

    static get relationMappings(){

        return{
            
            zone:{
                relation: Model.ManyToManyRelation,
                modelClass: require('./zone'),
                from:"health_agents.id",
                    through:{
                        from:" zones_agents.agent_id",
                        to:"zones_agents.zone_id"
                    },
                to: "zones.id"
            },

            children:{
                relation: Model.ManyToManyRelation,
                modelClass: require('./child'),
                from:"health_agents".id,
                    through:{
                        from: "children_agent.agent_id",
                        to: "children_agent.child_id"
                    },
                to:"children.id"
            },

            user:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./users'),
                from:" health_agents.user_id",
                to:" users.id"
            }

        }
    }

    $beforeInsert(){
        
        if(this.email){
            this.email=this.email.trim().toLowerCase();
        }
    }

    
    $beforeUpdate(){
        
        if(this.email){
            this.email=this.email.trim().toLowerCase();
        }
    }
}