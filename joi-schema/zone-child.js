
// joi schema for child enrollment in a health zone or district

const Joi=require('joi');
const Zone=require('../models/zone');
const Child=require('../models/child');
const ZoneChild=require('../models/zone-child')

const customCheck=async(input)=>{
    
    if(input.zone_id){
        const zone = await Zone.query().findById(input.zone_id);
        if(!zone){
            throw new Error("The zone ID does not exist");
        }
    }

    if(input.child_id){
        const child=await Child.query().findById(input.child_id);
        if(!child){
            throw new Error("The child ID does not exist");
        }
    }

    if(input.id){
        const enroll=await ZoneChild.query().findById(input.id)
        if(!enroll){
            throw new Error('wrong enrollment ID for this child')
        }
    }
}

const createZoneChildSchema=Joi.object({
    zone_id:Joi.number().integer(),
    child_id: Joi.number().integer(),
})
.external( async(input)=>{
    const zc= await ZoneChild.query().where({zone_id: input.zone_id, child_id: input.child_id }).first() ;
    if(zc){
        throw new Error(" The child is already enrolled in the same health district/zone")
    }
    await customCheck(input);
})

const updateZoneChildSchema=Joi.object({
    
    id:Joi.number().integer(),
    zone_id:Joi.number().integer(),
    child_id: Joi.number().integer(),
})
.external(async(input)=>{
    await customCheck(input);
})

const deleteZoneChildSchema=Joi.object({
    id:Joi.number().integer()
})
.external(async({id})=>{
    await customCheck({id});
})

module.exports={
    createZoneChildSchema,
    updateZoneChildSchema,
    deleteZoneChildSchema
}