const {createUserSchema,updateUserSchema,deleteUserSchema}=require('./user');

const {createRoleSchema,updateRoleSchema,deleteRoleSchema}=require('./role')
module.exports={
    createUserSchema,updateUserSchema,deleteUserSchema,
    createRoleSchema,updateRoleSchema,deleteRoleSchema
}