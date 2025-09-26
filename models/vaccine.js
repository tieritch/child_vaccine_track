const {Model}=require('objection');

module.exports=class Vaccine extends Model{

    static get tableName(){
        return "vaccines";
    }

    static get relationMappings(){

        return {
            
            vaccinations: {
                relation: Model.HasManyRelation,
                modelClass: require('./vaccination'),
                join:{
                    from: "vaccines.id",
                    to: "vaccinations.vaccine_id"
                }
            }

        }
    };

    $beforeInsert(){
        if(this.name){
            this.name=this.name.trim().toLowerCase();
        }
    };

    $beforeUpdate(){
        if(this.name){
            this.name=this.name.trim().toLowerCase();
        }
    }
}