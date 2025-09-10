const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');

const baseTypeDefs=require('./SDL/base')
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const zoneSDL=require('./SDL/zone');
const countrySDL=require('./SDL/country');

const typeDefs=mergeTypeDefs([baseTypeDefs,userSDL,roleSDL,zoneSDL,countrySDL]);
const {userResolver,roleResolver, zoneResolver,countryResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver,roleResolver,zoneResolver,countryResolver]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
module.exports=schema;