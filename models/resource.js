const {Model}=require('objection');
module.exports=class Resource extends Model{

  static get tableName(){
    return 'resources';
  }

  static get relationMappings(){
    return {
      permissions:{
        relation:Model.ManyToManyRelation,
        modelClass:require('./permission'),
        join:{
          from :'resources.id',
          through:{
            from:'roles_permissions_resources.resource_id',
            to:'roles_permissions_resources.permission_id',
          },
          to:'permissions.id',
        },
      },
    };
  }

  $beforeInsert(){
    this.name=this.name.toLowerCase();
  }
};
