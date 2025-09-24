
const Child=require('../models/child');
const Parent=require('../models/parent');
const {formatJoiError}=require('../helpers');
const {
    createChildSchema,
    updateChildSchema,
    deleteChildSchema
}
=require('../joi-schema');
const { ErrorReply } = require('redis');

const childResolver={

    Query:{

        getChild: async(_, {id})=>{
            return await Child.query().findById(id).withGraphFetched('agents.user');
        },

        children: async()=>{
            return await Child.query().withGraphFetched('agents.user');
        }

    },

    Mutation:{

        createChild: async(_, {input}, context)=>{

            input.by=context.user.id;

            try{
                await createChildSchema.validateAsync(input, { abortEarly: false });
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                 return await Child.query().insert(input).returning('*');
            }
            catch(err){
                throw new Error(` Error while creating the child: ${err.message}`)
            }
        },

        updateChild: async(_, {input})=>{
            
            input.by=context.user.id;
            
            try{
                await updateChildSchema.validateAsync(input, {abortEarly: false});
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                const childNoId={...input};
                delete childNoId.id
               return await Child.query().patch(childNoId).where({id:input.id}).returning('*').first()
            }
            catch(err){
                throw new Error(` Error while updating the child: ${err.message}`)
            }
        },

        deleteChild: async(_,{id})=>{
        
            try{
                await deleteChildSchema.validateAsync({id}, {abortEarly:false});
            }
            catch(err){
                return formatJoiError(err);
            }
    
            try{
                return await Child.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(`Error while deleting the child: ${err.message} `)
            }
    
        }

    }

    
}

module.exports=childResolver;