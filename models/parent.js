const {Model}=require('objection');

module.exports=class Parent extends Model {

    static get tableName(){
        return 'parents'
    }

    static relationMappings(){

        return {
            
            children:{
                relation: Model.HasManyRelation,
                modelClass: require('./child'),
                join:{
                    from:"parents.id",
                    to:"children.parent_id"
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