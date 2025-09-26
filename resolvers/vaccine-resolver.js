
const { formatError } = require('graphql');
const Vaccine=require('../models/vaccine');
const { formatJoiError } = require('../helpers');
const { createVaccineSchema,
    updateVaccineSchema,
    deleteVaccineSchema
 } = require('../joi-schema');

const mapResp=(res)=>{
    
    let unit; 

    if(Array.isArray(res)){
       return res.map(r=>{
             unit=(parseInt(r.interval_between)==0 || parseInt(r.interval_between)>1)
            ? 'days' : 'day';
            r.interval_between= `${r.interval_between } ${unit}`;
            return r
        } )
    }else{
        unit=(parseInt(res.interval_between)==0 || parseInt(res.interval_between)>1)
        ? 'days' : 'day';
        res.interval_between= `${res.interval_between } ${unit}`;
        return res
    }
}
const vaccineResolver={

    Query:{
        
        getVaccine: async(_, {id})=>{
            let vaccine=await Vaccine.query().findById(id);
            return mapResp(vaccine);

        },
        
        vaccines: async()=>{
            let vaccines= await Vaccine.query();
            return mapResp(vaccines);
        }
    },

    Mutation:{

        createVaccine: async(_, {input}, context)=>{

            try{
                await createVaccineSchema.validateAsync(input, {abortEarly: false});
                input.by=context.user.id;
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                 return await Vaccine.query().insert(input).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the vaccine: ${err.message}`)
            }
        },

        updateVaccine: async(_, {input}, context)=>{
            
            try{
                 await updateVaccineSchema.validateAsync(input, {abortEarly: false});
                 input.by=context.user.id;
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                const vaccineNoId={...input};
                delete vaccineNoId.id;
                 return await Vaccine.query().patch(vaccineNoId).where({id: input.id}).returning('*').first();
            }
            catch(err){
                throw new Error(` Error while updating the vaccine ${err.message}`)
            }
        },

        deleteVaccine: async(_, {id})=>{

            try{
                await  deleteVaccineSchema.validateAsync({id}, {abortEarly: false});
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                return await Vaccine.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the vaccine: ${err.message}`)
            }
        }
    }
}

module.exports=vaccineResolver;