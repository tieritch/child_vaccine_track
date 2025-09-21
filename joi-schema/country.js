const Joi=require('joi');
const Country=require('../models/country');

const createCountrySchema=Joi.object({
    name: Joi.string().required(),
}).external( async(input)=>{
    const country=await Country.query().findOne({name:input.name.trim().toLowerCase()});
    if(country){
        throw new Error(' The country already exists')
    }
});

const deleteCountrySchema=Joi.object({
    id:Joi.number().integer().required(),
}).external( async({id})=>{
    const country=await Country.query().findById(id);
    if(!country){
        throw new Error(' The country ID does not exist')
    }
    const zone=await Country.relatedQuery('zones').for(id).first();
    if(zone){
        throw new Error('Cannot delete country: zones exist for this country'); 
    }

})

const updateCountrySchema=Joi.object({
    id:Joi.number().integer().required(),
    name:Joi.string().required(),
}).external(async(input)=>{
   let country=await Country.query().findOne({name: input.name.trim().toLowerCase()});
   if(country){
        throw new Error('The country already exists');
    }
    country=await Country.query().findById(input.id);
    if(!country){
        throw new Error('The country already ID does not exists');
    }
    
});

module.exports={
    createCountrySchema,
    updateCountrySchema,
    deleteCountrySchema
}
