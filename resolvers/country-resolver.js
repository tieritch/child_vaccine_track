const Country=require('../models/country');
const {formatJoiError,isAuthenticated}=require('../helpers');
const {createCountrySchema,
    updateCountrySchema,
    deleteCountrySchema,}=require('../joi-schema');

const countryResolver={

    Query:{
        
        getCountry: async(_, {id} )=>{
            return await Country.query().findById(id);
        },

        countries: async()=>{
            return await Country.query();
        }
    },

    Mutation:{

        createCountry: async(_,{input},context)=>{
            
            isAuthenticated(context);
            try{
                await createCountrySchema.validateAsync(input,input, { abortEarly: false });
            }
            catch(err){
                throw formatJoiError(err);
            }

            try{
                return await Country.query().insert(input).returning('*');
            }
            catch(err){
                throw new Error(` Error while creating the coutry:${err.message}`)
            }
        },

        deleteCountry: async(_,{id},context)=>{           
            
            isAuthenticated(context);
            try{
                await deleteCountrySchema.validateAsync({id},{abortEarly: false});
            }
            catch(err){
                throw formatJoiError(err)
            }

            try{
                return await Country.query().deleteById(id).returning('*');
            }
            catch(err){
                throw new Error(` Error while deleting the country: ${err.message}`)
            }
        },

         updateCountry: async(_,{input},context)=>{
             
            isAuthenticated(context);
            try{
                await updateCountrySchema.validateAsync(input, {abortEarly: false})
            }
            catch(err){
                throw formatJoiError(err);
            }

            try{
                let countryNoId={...input};
                delete countryNoId.id;    
                return await Country.query().patch(countryNoId).where({id:input.id}).returning('*').first();
            }
            catch(err){
                throw new Error(` Error while updating the country: ${err.message}`);
            }
    }}
}

module.exports=countryResolver;