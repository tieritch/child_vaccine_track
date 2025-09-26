const {formatJoiError}=require('../helpers');
const {createZoneChildSchema,
    updateZoneChildSchema,
    deleteZoneChildSchema,
    }=require('../joi-schema');
const Child=require('../models/child');
const ZoneChild = require('../models/zone-child');

// resolver for child enrollment in a health zone or district
const zoneChildResolver={

    Query:{
        getZC: async(_, {id})=>{
            return await ZoneChild.query().findById(id);
        },
        zcs: async()=>{
            return  await ZoneChild.query();
        }

    },
  
    Mutation:{

        createZC: async(_, {input}, context)=>{

            try{
                await createZoneChildSchema.validateAsync(input, {abortEarly: false});
                input.by= context.user.id;
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                 return await ZoneChild.query().insert(input).returning('*');
            }
            catch(err){
                throw new Error(`Error while enrolling the child: ${err.message}`)
            }
        },

        updateZC: async(_, {input}, context)=>{

            try{
                 await updateZoneChildSchema.validateAsync(input, {abortEarly:false});
                 input.by=context.user.id;
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                
                let enrollNoId={...input};
                 delete enrollNoId.id;
               return await ZoneChild.query().patch(enrollNoId).where({id: input.id}).returning('*').first();
           
            }
            catch(err){
                throw new Error(` Error while updating the child enrollment: ${err.message}`)
            }
        },

        deleteZC: async(_,{id})=>{

            try{
                 await deleteZoneChildSchema.validateAsync({id}, {abortEarly: false});
            }
           
            catch(err){
                return formatJoiError(err);
            }

            try{
                return await ZoneChild.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the enrollment: ${err.message}`)
            }
        }
    }
}

module.exports=zoneChildResolver;