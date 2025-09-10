const Joi=require('joi');
const Zone=require('../models/zone');

const createZoneSchema=Joi.object({
    name: Joi.string().required()
}).external( async(input)=>{
    const zone=await Zone.query().findOne({name:input.name.trim().toLowerCase()});
    console.log('__________________________________________________________')
    console.log(zone)
    if(zone){
        throw new Error(' The zone already exists')
    }
})

const updateZoneSchema=Joi.object({
    name:Joi.string(),
    id:Joi.number().integer()
}).external(async(input)=>{
    let zone=await Zone.query().findOne({name:input.name.trim().toLowerCase()});
    if(zone){
        throw new Error(' The zone already exists')
    }
    zone=await Zone.query().findById(input.id);
    if(!zone){
        throw new Error("the zone ID does not exist")
    }
});

const deleteZoneSchema=Joi.object();

module.exports={
    createZoneSchema,
    updateZoneSchema,
    deleteZoneSchema
}