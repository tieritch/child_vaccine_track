const {Model}=require('objection');
module.exports=class Permission extends Model{

  static get tableName(){
    return 'permissions';
  }
  static get relationMappings(){
    return {
      roles:{
        relation:Model.ManyToManyRelation,
        modelClass:require('./role'),
        join:{
          from:'permissions.id',
          through:{
            from:'roles_permissions_resources.permission_id',
            to:'roles_permissions_resources.role_id',   
            extra:['permission_id','role_id'],
          },
          to:'roles.id',
        },
      },
      resources:{
        relation: Model.ManyToManyRelation,
        modelClass: require('./resource'),
        join:{
          from:"permissions.id",
          through:{
            from:"roles_permissions_resources.permission_id",
            to:"roles_permissions_resources.resource_id",
            extra:['role_id'],
          },
          to:"resources.id"
        }
      }
    };
  }
};
