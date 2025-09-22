
const BaseJoi=require('joi');
const JoiPhone=require('joi-phone-number');
const Parent=require('../models/parent');

const Joi=BaseJoi.extend(JoiPhone);

const customCheck=async(input)=>{
    
    let parent={};
    
    if(input.id){
        const parent=await Parent.query().findById(input.id);
        if(!parent){
            throw new Error('The parent ID does not exist');
        } 
    }

    if(input.email){
        parent=await Parent.query().findOne({email: input.email.trim().toLowerCase()});
        if(parent){
            throw new Error("The email already in use");
        }
    }
    
    if(input.phone_number){
        parent=await Parent.query().findOne({phone_number: input.phone_number.trim().toLowerCase()}); 
        if(parent){
            throw new Error("The phone number already in use");
        }
    }
   
}

const createParentSchema=Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    sex_id: Joi.number().integer(),
    phone_number: Joi.string()
        .phoneNumber({defaultCountry: 'BI', format: 'international'})
})
.external(async(input)=>{

   await customCheck(input);
})

const updateParentSchema=Joi.object({
    id: Joi.number().integer().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    phone_number: Joi.string()
        .phoneNumber({defaultCountry: 'BI', format: 'international'})
})
.external(async(input)=>{
    
    await customCheck(input);
} )

const deleteParentSchema=Joi.object({
    id: Joi.number().integer()
})
.external(async(input)=>{

    const children=await Parent.relatedQuery('children').for(input.id);
    if(children.length>0){
        throw new Error('Cannot delete: Children associated with this parent exist'); 
    }
    
    await customCheck(input);
    
})

module.exports={
    createParentSchema,
    updateParentSchema,
    deleteParentSchema
}

