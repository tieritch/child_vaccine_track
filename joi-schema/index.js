const {createUserSchema,updateUserSchema,deleteUserSchema,loginSchema}=require('./user');

const {createRoleSchema,updateRoleSchema,deleteRoleSchema}=require('./role');

const {createZoneSchema,updateZoneSchema,deleteZoneSchema}=require('./zone');
module.exports={
    createUserSchema, updateUserSchema, deleteUserSchema, loginSchema,
    createRoleSchema, updateRoleSchema, deleteRoleSchema,
    createZoneSchema, updateZoneSchema, deleteZoneSchema,
}