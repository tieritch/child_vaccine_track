const BaseJoi=require('joi');
const JoiDate=require('@joi/date');
const Child=require('../models/child');
const Parent=require('../models/parent');
const Sex=require('../models/sex');

const Joi=BaseJoi.extend(JoiDate);

const createChildSchema=Joi.object({
    
    firstname: Joi.string(),
    lastname: Joi.string(),
    address: Joi.string(),
    sex_id: Joi.string(),
    birth_year: Joi.date().format('YYYY-MM-DD'),
    parent_id: Joi.number().integer(),

}).external( async(input)=>{
    
    const sex=await Sex.query().findById(input.id);
    if(!sex){
        throw new Error('The sex ID does not exist');
    }

} )

const updateChildSchema=Joi.object({

    id:Joi.number().integer(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    address: Joi.string(),
    sex: Joi.string(),
    birth_year: Joi.date().format('YYYY-MM-DD'),
    parent_id: Joi.number().integer(),
})
.external( async(input)=>{
    
    let child=await Child.query().findById(input.id);
    if(!child){
        throw new Error('The child ID does not exist');
    } 

    let parent=await Parent.query().findById(input.parent_id);
    if(!parent){
        throw new Error(" The parent ID does not exist");
        
    }

})

const deleteChildSchema=Joi.object({
    id:Joi.number().integer()
})
.external(async({id})=>{
    
    const child=await Child.query().findById(id);
    if(!child){
       throw new Error('The child ID does not exist');
    }

})

moodule.exports={
    createChildSchema,
    updateChildSchema,
    deleteChildSchema
}