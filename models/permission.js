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
            from:'roles_permissions.permission_id',
            to:'roles_permissions.role_id',
          },
          to:'roles.id',
        },
      },
    };
  }
};
