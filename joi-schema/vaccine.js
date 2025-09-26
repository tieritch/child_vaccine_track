const Vaccine=require('../models/vaccine');
const Joi=require('joi');

const customCheck= async(input)=>{
    
    let vax={};

    if(input.id){
        vax=await Vaccine.query().findById(input.id);
        if(!vax){
            throw new Error(' the vaccine  ID  does not exist'); 
        }
    }
    
    if(input.name){
         vax = await Vaccine.query().findOne({name: input.name.trim().toLowerCase()});
        if(vax){
            throw new Error(' the vaccine already exists');
        }
    }
}

const createVaccineSchema=Joi.object({
    name: Joi.string(),
    required_doses: Joi.number().integer(),
    interval_between: Joi.number().integer(),
    description: Joi.string()
})
.external( async(input)=>{
   await customCheck(input);
} )

const updateVaccineSchema=Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string(),
    required_doses: Joi.number().integer(),
    interval_between: Joi.number().integer(),
    description: Joi.string()
})
.external( async(input)=>{   
   await customCheck(input);
})

const  deleteVaccineSchema=Joi.object({
    id: Joi.number().integer().required()
})
.external(async({id})=>{
   await customCheck({id})
})

module.exports={
    createVaccineSchema,
    updateVaccineSchema,
    deleteVaccineSchema
}