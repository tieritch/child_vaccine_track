const Role = require("../models/role");
//const Resource = require("../models/resource");
//const Permission=require('../models/permission');
const {formatJoiError,withTransaction}=require('../helpers');
const {createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema,}=require('../joi-schema');
const { valid } = require("joi");
//const Permission = require("../models/permission");

const roleResolver={
    
    Query:{
        
        getRole: async(_, {id} )=>{
            return await Role.query()
            .findById(id)
            .withGraphJoined('permissions.resources')           
        },
        
        roles: async()=>{
            return await Role.query().withGraphJoined('permissions.resources');
        }
    },

    Mutation:{
        
        createRole: async(_,{input},context)=>{
          
            let validInput={};
            try {
                validInput=await createRoleSchema.validateAsync(input, { abortEarly: false });
            } 
            catch (err) {
                throw formatJoiError(err);
            }
           return await withTransaction(Role, async(trx)=>{
                const role= await Role.query(trx).insert({
                    name:input.name }).returning('*');
                    const rows=[];
                    if(validInput.permission_ids?.length>0 && validInput.resource_ids?.length>0)
                    for (const permission_id of validInput?.permission_ids) {
                        for (const resource_id of validInput?.resource_ids) {
                            rows.push({
                                role_id: role.id,
                                permission_id,
                                resource_id,
                            })
                        }
                    }
                    console.log("created role:",role)
                    if(rows.length>0)
                     await trx('roles_permissions_resources').insert(rows);        
                    
                    return role;
               
            }, "Error while creating the role" )
                
        },

    deleteRole: async(_,{id},context)=>{

        try{
            await deleteRoleSchema.validateAsync({id},{abortEarly:false})
        }
        catch(err){
            throw formatJoiError(err);
        }
        
        return await withTransaction(Role, async(trx)=>{
        
            const role=await Role.query().findById(id);
            await role.$relatedQuery('permissions',trx).unrelate();
            return await Role.query(trx).deleteById(id).returning('*'); 
        }, "Error while deleting the role")
        
    },

    updateRole: async(_,{input},context)=>{
  
        try{
        
            validInput=await updateRoleSchema.validateAsync(input,{abortEarly:false})
        }
        catch(err){
            throw formatJoiError(err);
        }

      
            return withTransaction(Role, async(trx)=>{
                let roleNoId={...validInput};
                delete roleNoId.id;
                if(validInput.permission_ids && validInput.permission_ids.length>0)
                    delete roleNoId.permission_ids;
                if(validInput.resource_ids && validInput.resource_ids.length>0)
                    delete roleNoId.resource_ids
                 const role=await Role.query(trx).patch(roleNoId).where({id:input.id}).returning('*').first()// here the user update the role its self 
                                        // and we get the updated role           
                                    ||
                            await Role.query().findById(validInput.id) // Here the user does not update the role itself, he prefers to replace only the  permissions 
                            // and resources associated to the role with the new ones. This task is performed below, 
                 const rows=[];
                if(validInput.permission_ids?.length>0 && validInput.resource_ids?.length>0){
                        for (const permission_id of validInput?.permission_ids) {
                            for (const resource_id of validInput?.resource_ids) {
                                rows.push({
                                    role_id: validInput.id,
                                    permission_id,
                                    resource_id,
                                })
                            }
                        }
                    }
                    if(rows.length>0){
                     await trx('roles_permissions_resources').where({role_id:validInput.id}).delete(); 
            
                     await trx('roles_permissions_resources').insert(rows); 
                    }     
                
                 return role;
            },"Error while updating the role");
           
      
    }
},

}

module.exports=roleResolver;