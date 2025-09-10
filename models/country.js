const {Model}=require('objection');

module.exports=class Country extends Model{

        static get tableName(){
            return "countries";
        }

        static get relationMappings(){
            return {
                zones:{
                    relation: Model.HasManyRelation,
                    modelClass: require('./zone'),
                    join:{
                        from: "countries.id",
                        to: "zones.country_id"
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