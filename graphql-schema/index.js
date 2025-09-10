const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const zoneSDL=require('./SDL/zone');
const baseTypeDefs=require('./SDL/base')

const typeDefs=mergeTypeDefs([baseTypeDefs,userSDL,roleSDL,zoneSDL]);
const {userResolver,roleResolver, zoneResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver,roleResolver,zoneResolver]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
module.exports=schema;