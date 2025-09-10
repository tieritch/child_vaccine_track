 const {Model}=require('objection');
 module.exports=class ZoneChildEnrollment extends Model{

        static get  tableName(){
            return "zone_child_enrollments"
        }
 }