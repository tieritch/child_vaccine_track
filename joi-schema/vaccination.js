//const BaseJoi=require('joi');
//const JoiDate=require('@joi/date');
const BaseJoi=require('joi');
const JoiDate=require('@joi/date');
const Vaccination=require('../models/vaccination');
const Vaccine=require('../models/vaccine');
const Agent=require('../models/health-agent');
const Child=require('../models/child');

const Joi=BaseJoi.extend(JoiDate);

const customCheck=async(input)=>{
    
    if(input.vaccine_id){
        
        const vaccine=await Vaccine.query().findById(input.vaccine_id);
        if(!vaccine){
            throw new Error(' The vaccine ID does not exist');
        }
        
        const vaccination=await Vaccination.query().findOne({vaccine_id: input.vaccine_id});
        if(vaccination){
            throw new Error(`The child has already been vaccinated with an Anti-${vaccine.name} vaccine`);
        }
    };

    if(input.child_id){
        const child=await Child.query().findById(input.child_id);
        if(!child)
            throw new Error(' The child ID does not exist');
    }

    if(input.zone_id){
        const children=await Child.relatedQuery('zones').for(input.child_id);
        const child=children.find( ch => ch.zone_id = input.zone_id );
        if(!child){
            throw new Error(' The child is not enrolled in health zone/district')
        }
    }
    
    if(input.user_id){
        console.log('input:',input);
        let agent=await Agent.query().findOne({user_id:input.user_id});
        if(!agent){
            throw new Error(' The user is not a health agent yet');
        }
        input.health_agent_id=agent.id;
    }
}

const createVaccinationSchema=Joi.object({
    vaccine_id: Joi.number().integer(),
    child_id: Joi.number().integer(),
    zone_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    vaccination_date: Joi.date().format('YYYY-MM-DD')
})
.external(async(input)=>{    
    await customCheck(input);
})

const updateVaccinationSchema=Joi.object({
    id: Joi.number().integer().required(),
    vaccine_id: Joi.number().integer(),
    child_id: Joi.number().integer(),
    zone_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    vaccination_date: Joi.date().format('YYYY-MM-DD')
})
.external(async(input)=>{
    await customCheck(input);
});

const deleteVaccinationSchema=Joi.object({
    id: Joi.number().integer().required()
})
.external(async(input)=>{
    await customCheck(input);
})

module.exports={
    createVaccinationSchema,
    updateVaccinationSchema,
    deleteVaccinationSchema
}