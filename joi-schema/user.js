const Joi=require('joi');
const User=require('../models/user');
const Role=require('../models/role')
const bcrypt=require('bcrypt');

const loginSchema=Joi.object({
  username:Joi.string().required(),
  password:Joi.string().required()
}).external(async(input)=>{
  let user=await User.query().findOne({username:input.username});
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const passwordIsTrue=await bcrypt.compare(input.password,user.password)
  if(!passwordIsTrue){
    throw new Error("Wrong user password");
  }
 
})

const createUserSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
      .required()
      .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      }),
    username: Joi.string().min(6).required(),
    role_ids:Joi.array()
})
.external( async(input)=>{
    let exists=await User.query().findOne({email:input.email});
    if (exists) throw new Error("Email in use");
    exists=await User.query().findOne({username:input.username});
    if (exists) throw new Error("Username in use");
    const roles=await Role.query();
    if(input.role_ids && input.role_ids.length>0){
    const validRoleIds=input.role_ids.filter(roleId=>roles.map(role=>role.id).includes(parseInt(roleId)));
    input.role_ids=validRoleIds
    }
})

const updateUserSchema=Joi.object({
  firstname:Joi.string().optional(),
  lastname:Joi.string().optional(),
  email:Joi.string().email().optional(),
  id:Joi.number().integer().required(),
  password:Joi.string().min(6)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  .optional()
  .messages({
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number."
  }),
})

const deleteUserSchema=Joi.object({
  id:Joi.number().integer()
})
  module.exports={
    loginSchema,
    createUserSchema,
    updateUserSchema,
    deleteUserSchema
  }