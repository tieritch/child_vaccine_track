const {createUserSchema,updateUserSchema,deleteUserSchema,loginSchema}=require('./user');

const {createRoleSchema,updateRoleSchema,deleteRoleSchema}=require('./role');

const {createZoneSchema,updateZoneSchema,deleteZoneSchema}=require('./zone');

const {createCountrySchema,updateCountrySchema,deleteCountrySchema}=require('./country');

const { createParentSchema,updateParentSchema,deleteParentSchema}=require('./parent');

module.exports={
    createUserSchema,    updateUserSchema,    deleteUserSchema, loginSchema,
    createRoleSchema,    updateRoleSchema,    deleteRoleSchema,
    createZoneSchema,    updateZoneSchema,    deleteZoneSchema,
    createCountrySchema, updateCountrySchema, deleteCountrySchema,
    createParentSchema,  updateParentSchema,  deleteParentSchema  
}