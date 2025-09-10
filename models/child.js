const {Model}=require('objection');

module.exports=class Child extends Model{

     static get tableName(){
        return "children"
     }
}