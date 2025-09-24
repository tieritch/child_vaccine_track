
const Agent=require('../models/health-agent');
const {createAgentSchema,
    updateAgentSchema,
    deleteAgentSchema,}=require('../joi-schema');
const {formatJoiError}=require('../helpers');
const HealthAgent = require('../models/health-agent');

const healthAgentResolver={

    Query:{
        
        getAgent: async(_, {id})=>{
            return await Agent.query().findById(id).withGraphFetched('user'); 
            
        },

        agents: async()=>{
           return await Agent.query().withGraphFetched('user');
          
        }
    },

    Mutation:{
        
        createAgent: async(_, {input}, context)=>{
            
            let validInput={}
            validInput.by=context.user.id;

            try{
                validInput=await createAgentSchema.validateAsync(input, { abortEarly: false });
            }
            catch(err){
                return formatJoiError(err)
            }
      
            try{
                return await Agent.query().insert(validInput).returning('*');
            }
            catch(err){
                throw new Error(` Error while creating the health agent: ${err.message}`);
            }
        },

        updateAgent: async(_, {input}, context)=>{

            let validInput={};
            validInput.by=context.user.id;
          console.log(' before schema');
            try{
                validInput=await updateAgentSchema.validateAsync(input, {abortEarly: false});
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                let agentNoId={...validInput};
                delete agentNoId.id;
                return await Agent.query().patch(agentNoId).where({id:validInput.id}).returning('*').first();
            }
            catch(err){
                throw new Error(` Error while updating the health agent: ${err.message}`)
            }
        },

        deleteAgent: async(_, {id})=>{

            try{
                await deleteAgentSchema.validateAsync({id}, {abortEarly: false});
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                return await HealthAgent.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the health agent :${err.message}`)
            }
        }
     }
}

module.exports=healthAgentResolver;