const User = require('../models/user');
const {formatJoiError}=require('../helpers');
const {createUserSchema,
    updateUserSchema,
    deleteUserSchema,}=require('../validate');
const userResolver = {
  
   Query:{ 
        getUser: async (_,{id}) => {
            return await User.query().findById(id).withGraphFetched('roles');
        },
        users: async () => {
            return await User.query().withGraphFetched('roles');
        },
    },
    Mutation:{
        
        createUser: async (_,{input}) => {
            try {
                await createUserSchema.validateAsync(input, { abortEarly: false });
            } 
            catch (err) {
                throw formatJoiError(err);
              }
            try{
                return await User.query().insert({
                firstname:input.firstname,
                lastname: input.lastname,
                email:input.email,
                username:input.username,
                password:input.password
            }).returning('*');
           
            } catch(err){
                throw new Error("Error while creating the user: " + err.message);
            }
        },
        
        updateUser: async(_,{input})=>{
            
            try{
                await updateUserSchema.validateAsync(input,{abortEarly:false});
            }
            catch(err){
                throw formatJoiError(err);        
            }
            try{
                const user=await User.query().patch(input).where({id:input.id}).returning('*').first();
                if(!user){
                    throw new Error(`User with id: ${id} not found`)
                }
                return user
            }
            catch(err){
                throw new Error("Error while updating the user: " + err.message);
            }
        },
        
        deleteUser: async(_,{id})=>{
            try{
                await deleteUserSchema.validateAsync({id},{abortEarly:false});
            }
            catch(err){
                throw formatJoiError(err)
            }
            try{
                const user=await User.query().deleteById(id);
                if(!user)
                    throw new Error(`User with id: ${id} not found`);
                return user;
            }
            catch(err){
                throw new Error("Error while deleting the user: " + err.message);
            }
        }

    }
};

module.exports = userResolver;