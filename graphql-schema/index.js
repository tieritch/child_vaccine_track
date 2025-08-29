const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const baseTypeDefs=require('./SDL/base')

const typeDefs=mergeTypeDefs([baseTypeDefs,userSDL,roleSDL]);
const {userResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
module.exports=schema;