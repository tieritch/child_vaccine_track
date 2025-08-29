const Joi=require('joi');
const User=require('../models/user');

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
    username: Joi.string().min(6).required()
})
.external( async(input)=>{
    let exists=await User.query().findOne({email:input.email});
    if (exists) throw new Error("Email in use");
    exists=await User.query().findOne({username:input.username});
    if (exists) throw new Error("Username in use");
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
    createUserSchema,
    updateUserSchema,
    deleteUserSchema
  }