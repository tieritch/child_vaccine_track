const {Model}=require('objection');

module.exports=class Zone extends Model{

    static get tableName(){
        return "zones";
    } 

    static get relationMappings(){
       
        return {
            
            childEnrolls:{
                relation:  Model.ManyToManyRelation,
                modelClass: require('./child'),
                join:{
                    from:"zones.id",
                    through:{
                        from: "zone_child_enrollments.zone_id",
                        to:"zone_child_enrollments.children_id"
                    },
                    to:'children.id'
                }
            },
            
            agents:{
                relation: Model.ManyToManyRelation,
                modelClass:require('./health-agent'),
                join:{
                    from:'zones.id',
                        through:{
                            from:'zones_agents.zone_id',
                            to:'zones_agents.agent_id'
                        },
                    to:'health_agents.id',
                }
            }
        }
    }

    $beforeInsert(){
        if(this.name){
          this.name=this.name.trim().toLowerCase();
        }
      }
    
    $beforeUpdate(){
        if(this.name){
          this.name=this.name.trim().toLowerCase();
        }
      }
}