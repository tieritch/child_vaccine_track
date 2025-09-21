const {Model}=require('objection');

module.exports=class Sex extends Model{
    
    static get tableName(){
        return 'sexes'
    }
}