const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/user');
const {formatJoiError,isAuthenticated}=require('../helpers');
const client=require('../redis-client');
const {createUserSchema,
    updateUserSchema,
    deleteUserSchema,}=require('../joi-schema');
const { exist } = require('joi');
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

        login:async(_,input,context)=>{
            const res=context.res;
            const user=await User.query().findOne({username:input.username});
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3600s'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
 
            const existingToken=await client.get(`refresh_token:${user.id}`);
            if(existingToken){
                await client.del(`refresh_token:${user.id}`)
            }
            const hashedToken=await bcrypt.hash(refreshToken,10);
            await client.set(`refresh_token:${user.id}`, hashedToken, { EX: 7 * 24 * 60 * 60 });
            
            res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                secure: false,
                sameSite: "Lax",
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: "Lax",
            });
            return { accessToken, refreshToken, message: "Successful connexion!!" };
        },
        
        createUser: async (_,{input},context) => {
        
            isAuthenticated(context);           
            try {
                await createUserSchema.validateAsync(input, { abortEarly: false });
            } 
            catch (err) {
                throw formatJoiError(err);
              }
            try{
                console.log(input.operationName)
                return await User.query().insert({
                firstname:input.firstname,
                lastname: input.lastname,
                email:input.email,
                username:input.username,
                password:await bcrypt.hash(input.password,10)
            }).returning('*');
           
            } catch(err){
                throw new Error("Error while creating the user: " + err.message);
            }
        },
        
        updateUser: async(_,{input},context)=>{
            isAuthenticated(context);
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
        },

    }
};

module.exports = userResolver;