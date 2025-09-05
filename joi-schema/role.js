const Joi=require('joi');
const Role=require('../models/role');
const Permission=require('../models/permission');
const Resource=require('../models/resource');

createRoleSchema=Joi.object({
    name: Joi.string().required(),
    permission_ids: Joi.array(),
    resource_ids: Joi.array()
}).external( async(input)=>{
    const role=await Role.query().findOne({name:input.name.trim()});
    if(role){
        throw new Error("The role already exists");
    }
    const existingPerms=await Permission.query();

    const validPermIds=input.permission_ids.filter(id=> existingPerms.map(perm=>perm.id).includes(parseInt(id)));
    if(validPermIds.length==0){
        throw new Error("No valid permission id provided");
    } 
    input.permission_ids=validPermIds;// replace all ids with only valid  ids

    const existingResources=await Resource.query();
    const validResourceIds=input.resource_ids.filter( id=> existingResources.map(res=>res.id).includes(parseInt(id)));
    if(validResourceIds.length==0){
        throw new Error("No valid resource id provided");
    }
    input.resource_ids=validResourceIds; // replace all ids with only valid  ids
});

updateRoleSchema=Joi.object({
    id:Joi.number().integer().required,
    name:Joi.string(),
    permission_ids:Joi.array(),
    resource_ids: Joi.array()
}).external( async(input)=>{
    const role=await Role.query().findOne({name:input.name.trim()});
    if(role){
        throw new Error("The role already exists");
    }
    const existingPerms=await Permission.query();
    const validPermIds=input.permisson_ids.filter(id=> existingPerms.map(perm=>perm.id).includes(parceInt(id)));
    if(validPermIds.length==0){
        throw new Error("No valid permission id provided");
    }
    const existingResources=await Resource.query();
    const validResourceIds=input.resource_ids.filter( id=> existingResources.map(res=>res.id).includes(parseInt(id)));
    if(validResourceIds.length==0){
        throw new Error("No valid resource id provided");
    }
});

deleteRoleSchema=Joi.object({
    id:Joi.number().integer().required()
}).external( async({id})=>{
    const role=await Role.query().findById(id);
    if(!role){
        throw new Error(' The role does not exist')
    }
})

module.exports={
    createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema
    
}
