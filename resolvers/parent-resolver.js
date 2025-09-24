const { formatJoiError } = require("../helpers");
const Parent = require("../models/parent");
const {
    createParentSchema,
    updateParentSchema,
    deleteParentSchema
}=require('../joi-schema');

const parentResolver={

    Query:{

        getParent: async(_, {id} )=>{
            return await Parent.query().findById(id).withGraphFetched('children');
        },

        parents: async()=>{
            return await Parent.query().withGraphFetched('children');
        }
    },

    Mutation:{

        createParent: async(_, {input}, context)=>{

            let validInput={};

            try{
                validInput=await createParentSchema.validateAsync(input, {abortEarly: false});
                validInput.by=context.user.id;
            }
            catch(err){
                return formatJoiError(err)
            }

            console.log( 'After Schema')

            try{
                return await Parent.query().insert(validInput);
            }
            catch(err){
                throw new Error(` Error while creating the parent: ${err.message}`)
            }

        },

        updateParent: async(_, {input}, context)=>{
            
            let validInput={}; 

            try{
                validInput=await updateParentSchema.validateAsync(input, {abortEarly: false});
                validInput.by=context.user.id
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                const parentNoId={...validInput};
                delete parentNoId.id;
                return await Parent.query().patch(parentNoId).where({id:validInput.id}).returning('*').first();
            }
            catch(err){
                throw new Error(` Error while creating the parent: ${err.message}`)
            }

        },

        deleteParent: async(_,{id} )=>{
            
            try{
                await deleteParentSchema.validateAsync({id}, {abortEarly: false})
            }
            catch(err){
                return formatJoiError(err)
            }

            try{       
                 
                return await Parent.query().deleteById(id).returning('*');
              
            }
            catch(err){
                throw new Error(` Error while creating the parent: ${err.message}`)
            }


        }
    }
}

module.exports=parentResolver;