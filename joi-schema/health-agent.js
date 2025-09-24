const BaseJoi=require('joi');
const JoiPhone=require('joi-phone-number');
const JoiDate=require('@joi/date');
//const JoiPhone=require('joi-phone-number');
const HealthAgent=require('../models/health-agent');
const Sex=require('../models/sex');
const User=require('../models/user');

const Joi=BaseJoi.extend(JoiPhone).extend(JoiDate);

const customCheck= async(input)=>{
    
    let agent={};
    console.log(input);
    if(input.sex_id){
        const sex=await Sex.query().findById(input.sex_id);
        if(!sex){
            throw new Error(' The sex ID does not exist')
        }
    }

    if(input.user_id){
        const user=await User.query().findById(input.user_id);
        if(!user){
            throw new Error(' The user ID does not exist')
        }
    }

    if(input.email){
        agent=await HealthAgent.query().findOne({email: input.email});
        if(agent){
            throw new Error(' The email already in use');
        } 
    }

    if(input.id){
        agent=await HealthAgent.query().findById(input.id);
        if(!agent){
            throw new Error(' The health agent ID does not exist')
        }
    }
    
     if(input.phone_number){
        agent=await HealthAgent.query().findOne({phone_number: input.phone_number.trim().toLowerCase().replace(/\s+/g, "")}); 
            if(agent){
                throw new Error("The phone number already in use");
            }
        input.phone_number=input.phone_number.replace(/\s+/g, "");
    }

}

const createAgentSchema=Joi.object({
    
    address: Joi.string(),
    sex_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    birth_date: Joi.date().format('YYYY-MM-DD'),
    email: Joi.string().email(),
    phone_number: Joi.string()
    .phoneNumber({defaultCountry: "BI", format: 'international'})
        //.phoneNumber({defaultCountry: 'BI', format: 'international'})

})
.external( async(input)=>{

    await customCheck(input);

} );

const updateAgentSchema=Joi.object({
    
    id:Joi.number().integer(),
    address: Joi.string(),
    sex_id: Joi.number().integer(),
    birth_date: Joi.date(),//.format('YYYY-MM-DD'),
    email: Joi.string().email(),
    phone_number: Joi.string()
    .phoneNumber({defaultCountry: 'BI', format: 'international'})

})
.external( async(input)=>{

    await customCheck(input);
   
})

const deleteAgentSchema=Joi.object({

    id:Joi.number().integer()
})
.external(async(input)=>{
    
    await customCheck(input);
    
    const zone=await HealthAgent.relatedQuery('zones').for(input.id).first();
    if(zone){
        throw new Error(' Cannot delete the health agent: zones are associated with him')
    } 

    const child= await HealthAgent.relatedQuery('children').for(input.id).first();
    if(child){
        throw new Error(' Cannot delete the health agent: children are associated with him')
    }

})

module.exports={
    createAgentSchema,
    updateAgentSchema,
    deleteAgentSchema
}