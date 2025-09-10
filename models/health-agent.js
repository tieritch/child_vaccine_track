const {Model}=require('objection');

module.exports=class HealthAgent extends Model{
     
    static get tableName(){
        return "health_agents"
    }
}