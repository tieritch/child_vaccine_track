const {Model}=require('objection');

module.exports=class Child extends Model{

     static get tableName(){
        return "children"
     }

     static get relationMappings(){
       
         return {
            
            zones:{
               relation: Model.ManyToManyRelation,
               modelClass: require('./zone'),
               join:{
                  from:" children.id",
                  through:{
                     from:"zone_child_enrollments.children_id",
                     to:"zone_child_enrollments.zone_id",
                  },
                  to:"zones.id"
               }
            },

            parent:{
               relation: Model.BelongsToOneRelation,
               modelClass: require('./parent'),
               join:{
                  from: "children.parent_id",
                  to: "parents.id"
               }
            },

            agents:{
               relation: Model.ManyToManyRelation,
               modelClass: require('./health-agent'),
               join:{
                  from: "children.id",
                  through:{
                     from: "children_agents.child_id",
                     to: "children_agents.agent_id"
                  },
                  to: "health_agents.id"
               }
            },

            zone:{
               relation: Model.ManyToManyRelation,
               modelClass: require('./zone'),
               join:{
                  from: "children.id",
                  through:{
                     from: "zones_agents.child_id",
                     to: "zones_agents.zone_id"
                  },
                  to: "zones.id"
               }
            }
         } 
     }

    
}