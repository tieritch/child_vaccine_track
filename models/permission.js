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
            to:'roles_permissions_recources.role_id',
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
            to:"roles_permissions_resources.resource_id"
          },
          to:"resources.id"
        }
      }
    };
  }
};
