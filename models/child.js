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
                  to:" parents.id"
               }
            }
         } 
     }

     $beforeInsert(){
      if(this.firstname){
        this.firstname=this.firstname.trim().toLowerCase();
      }
      if(lastname){
         this.lastname=this.lastname.trim().toLowerCase();
      }
      if(sex){
         this.sex=this.sex.trim().toLowerCase();
      }
    }
    $beforeUpdate(){
      if(this.firstname){
         this.firstname=this.firstname.trim().toLowerCase();
       }
       if(lastname){
          this.lastname=this.lastname.trim().toLowerCase();
       }
    }
}