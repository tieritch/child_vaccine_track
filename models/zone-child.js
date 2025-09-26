const {Model}=require('objection');


// class for child enrollment in a health zone or district
module.exports=class ZoneChild extends Model{

    static get tableName(){
        return "zone_child_enrollments"
    }
}