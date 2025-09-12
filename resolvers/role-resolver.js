const Role = require("../models/role");
//const Resource = require("../models/resource");
//const Permission=require('../models/permission');
const {formatJoiError,withTransaction}=require('../helpers');
const {createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema,}=require('../joi-schema');
//const Permission = require("../models/permission");

const roleResolver={
    
    Query:{
        
        getRole: async(_, {id} )=>{
            return await Role.query().findById(id);
        },
        
        roles: async()=>{
            return await Role.query();
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
                    if(validInput.permission_id?.length>0 && validInput.resource_id_id?.length)
                    for (const permission_id of validInput?.permission_ids) {
                        for (const resource_id of validInput?.resource_ids) {
                            rows.push({
                                role_id: role.id,
                                permission_id,
                                resource_id,
                            })
                        }
                    }
                    trx('roles_permissions_resources').insert(rows);        
                    
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
            await role.$relatedQuery('permissions').unrelate();
            return await Role.query().deleteById(id).returning('*'); 
        }, "Error while deleting the role")
        
    },

    updateRole: async(_,{input},context)=>{
  
        try{
        
            await updateRoleSchema.validateAsync(input,{abortEarly:false})
        }
        catch(err){
            throw formatJoiError(err);
        }

        try{
            console.log(input)
            let roleNoId={...input};
            delete roleNoId.id;
            console.log(roleNoId)
             const role=await Role.query().patch(roleNoId).where({id:input.id}).returning('*').first();
             return role;
        }
        catch(err){
            throw new Error(' Error while updating the role!! ')
        }
    }
},

}

module.exports=roleResolver;