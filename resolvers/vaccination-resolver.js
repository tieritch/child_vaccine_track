
const Vaccination=require('../models/vaccination');
const {formatJoiError}=require('../helpers');
const { createVaccinationSchema, updateVaccinationSchema, deleteVaccinationSchema } = require('../joi-schema');

const vaccinationResolver={

    Query:{

        getVaccination: async(_,{id})=>{
            return await Vaccination.query()
            .findById(id)
            .withGraphFetched('child')
            .modifyGraph('child', builder=>{
                return builder.select('firstname','lastname','birth_date')
            })
        },

        vaccinations: async()=>{
            return await Vaccination.query()
            .withGraphFetched('child')
            .modifyGraph('child', builder=>{
                return builder.select('firstname','lastname','birth_date')
            })
        }

    },

    Mutation:{

        createVaccination: async(_, {input}, context)=>{
            
            let validInput={};

            try{

                input.user_id=context.user.id;
                validInput=await createVaccinationSchema.validateAsync(input, {abortEarly: false});
                validInput.by=context.user.id;
               
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                delete validInput.user_id;
                return await Vaccination.query().insert(validInput).returning('*');
            }
            catch(err){
                throw new Error(` Error while registering the vaccinatio: ${err.message}`);
            }
        },

        updateVaccination: async(_, {input}, context)=>{

            let validInput={};

            try{

                input.user_id=context.user.id;
                validInput=await updateVaccinationSchema.validateAsync(input, {abortEarly: false});
                validInput.by=context.user.id;
            }
            catch(err){
                return formatJoiError(err);
            }

            try{
                const validNoId={...validInput};
                delete validNoId.user_id;
                delete validNoId.id;
                return await Vaccination.query().patch(validNoId).where({id: validInput.id}).returning('*').first();
            }
            catch(err){
                throw new Error(` Error while registering the vaccination: ${err.message}`)
            }
        },

        deleteVaccination: async(_, {id})=>{

            try{
                await deleteVaccinationSchema.validateAsync({id}, {abortEarly: false})
            }
            catch(err){
                return formatJoiError(err)
            }

            try{
                return await Vaccination.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the vaccination: ${err.message}`)
            }
        }

    }
}

module.exports=vaccinationResolver;