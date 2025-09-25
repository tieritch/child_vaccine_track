
const Zone = require("../models/zone");
const {formatJoiError}=require('../helpers');
const {createZoneSchema,
    updateZoneSchema,
    deleteZoneSchema,}=require('../joi-schema');
const { formatError } = require("graphql");

const zoneResolver={

    Query:{
        getZone: async(_,{id})=>{
            return await Zone.query().findById(id)
        },
        
        zones: async()=>{
            return await Zone.query();
        }
    },

    Mutation:{

        createZone: async(_,{input}, context)=>{


            try{
                await createZoneSchema.validateAsync(input, {abortEarly: false});
                input.by=context.user.id;
            }
            catch(err){                
                throw formatJoiError(err)
            }

            try{
                const zone=await Zone.query().insert(input).returning('*');
                return zone;
            }
            catch(err){
                throw new Error(` Error while creating the zone:${err.message} ${err.message}`)
            }
        },

        deleteZone: async(_, {id},context)=>{
            
            try{
                await deleteZoneSchema.validateAsync({id}, {abortEarly:false});
            }
            catch(err){
                throw formatJoiError(err);
            }
            try{

                let zone=await Zone.relatedQuery('agents').for(id).first();
               // console.log(zone);
                if(zone){
                    throw new Error('can\'t delete the zone because agents are enrolled for this zone')
                }
                zone=await Zone.relatedQuery('enrollments').for(id).first();
                if(zone){
                    throw new Error('can\'t delete the zone because children are enrolled for this zone')
                }
                return await Zone.query().deleteById(id).returning('*');
                
            }
            catch(err){
                throw new Error(` Error while deleting the zone: ${err.message}`)
            }
        },

        updateZone: async(_,{input}, context)=>{

            try{
                await updateZoneSchema.validateAsync(input, {abortEarly:false});
                input.by=context.user.id;
            }
            catch(err){
                formatError(err);
            }
            try{
                const zoneNoId={...input};
                delete zoneNoId.id;
                const zone=await Zone.query().patch(zoneNoId).where({id: input.id}).returning('*').first();
                return zone;
            }
            catch(err){
                throw new Error(`Error while updating the zone: ${err.message} `)
            }
        }
    }

}

module.exports=zoneResolver;