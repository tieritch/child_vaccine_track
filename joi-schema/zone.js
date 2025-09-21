const Joi=require('joi');
const Zone=require('../models/zone');
const Country=require('../models/country');

const createZoneSchema=Joi.object({
    name: Joi.string().required(),
    country_id:Joi.number().integer()
}).external( async(input)=>{
    const zone=await Zone.query().findOne({name:input.name.trim().toLowerCase()});
    if(zone){
        throw new Error(' The zone already exists')
    }

    const country=await Country.query().findById(input.country_id);
    if(!country){
        throw new Error('This country ID does not exist')
    }
})

const updateZoneSchema=Joi.object({
    name:Joi.string(),
    country_id:Joi.number().integer(),
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
    const country=await Country.query().findById(input.country_id);
    if(!country){
        throw new Error('This country ID does not exist')
    }
});

const deleteZoneSchema=Joi.object({
   id:Joi.number().integer().required()
}).external( async({id})=>{

    let zone=await Zone.query().findById(id);
    if(!zone){
        throw new Error(' The zone ID does not exist')
    }
    
    const childEnroll=await Zone.relatedQuery('childEnrolls').for(id).first();
    if( childEnroll){
        throw new Error('Cannot delete zone: children enrolled associated with this zone exist'); 
    }
    const agent = await Zone.relatedQuery('agents').for(id).first();
    if(agent){
        throw new Error('Cannot delete zone: Health agents associated with this zone exist'); 
    }
} )

module.exports={
    createZoneSchema,
    updateZoneSchema,
    deleteZoneSchema
}