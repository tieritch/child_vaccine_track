const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');

const baseTypeDefs=require('./SDL/base');
const directiveSDL=require('./SDL/directive');
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const zoneSDL=require('./SDL/zone');
const countrySDL=require('./SDL/country');

const typeDefs=mergeTypeDefs([baseTypeDefs,directiveSDL,userSDL,roleSDL,zoneSDL,countrySDL]);
const {userResolver,roleResolver, zoneResolver,countryResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver,roleResolver,zoneResolver,countryResolver]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
module.exports=schema;