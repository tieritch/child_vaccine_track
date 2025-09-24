const {Model}=require('objection');

module.exports=class HealthAgent extends Model{
     
    static get tableName(){
        return "health_agents"
    }

    static get relationMappings(){

        return{
            
            zones:{
                relation: Model.ManyToManyRelation,
                modelClass: require('./zone'),
                join:{
                    from:"health_agents.id",
                        through:{
                            from:" zones_agents.agent_id",
                            to:"zones_agents.zone_id"
                        },
                    to: "zones.id"
                }
            },

            children:{
                relation: Model.ManyToManyRelation,
                modelClass: require('./child'),
                join:{
                    from: "health_agents.id",
                        through:{
                            from: "children_agents.agent_id",
                            to: "children_agents.child_id"
                        },
                    to: "children.id"
                }
            },

            user:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user'),
                join:{
                    from: "health_agents.user_id",
                    to: "users.id"
                }
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