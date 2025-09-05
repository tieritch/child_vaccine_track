const Role = require("../models/role");
//const Resource = require("../models/resource");
//const Permission=require('../models/permission');
const {formatJoiError,isAuthenticated}=require('../helpers');
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
          
            isAuthenticated(context);
            let validInput={};
            try {
                validInput=await createRoleSchema.validateAsync(input, { abortEarly: false });
            } 
            catch (err) {
                throw formatJoiError(err);
            }
            const trx=await Role.startTransaction();
            try{
                const role= await Role.query(trx).insert({
                name:input.name }).returning('*');
                const rows=[];
                for (const permission_id of validInput.permission_ids) {
                    for (const resource_id of validInput.resource_ids) {
                        rows.push({
                            role_id: role.id,
                            permission_id,
                            resource_id,
                        })
                    }
                }
                await trx('roles_permissions_resources').insert(rows);
                await trx.commit();
                
                return role;
           
            } catch(err){
                await trx.rollback();
                throw new Error("Error while creating the role: " + err.message);
            }
        },

    deleteRole: async(_,{id},context)=>{

        isAuthenticated(context);
        try{
            await deleteRoleSchema.validateAsync({id},{abortEarly:false})
        }
        catch(err){
            throw formatJoiError(err);
        }
        console.log('input del')
        const role=await Role.query().findById(id);
        await role.$relatedQuery('permissions').unrelate();
        return await Role.query().deleteById(id).returning('*'); 
    }}
}

module.exports=roleResolver;