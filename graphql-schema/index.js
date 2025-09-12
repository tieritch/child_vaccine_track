const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const {authenticate}=require('../helpers');

const baseTypeDefs=require('./SDL/base');
const directiveSDL=require('./SDL/directive');
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const zoneSDL=require('./SDL/zone');
const countrySDL=require('./SDL/country');

const typeDefs=mergeTypeDefs([baseTypeDefs,directiveSDL,userSDL,roleSDL,zoneSDL,countrySDL]);
const {userResolver,roleResolver, zoneResolver,countryResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver,roleResolver,zoneResolver,countryResolver]);

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
    const directive = getDirective(schema, fieldConfig, 'auth')?.[0];
    if (directive) {
      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        authenticate(context);
        return resolve(source, args, context, info);
      };
    }
    return fieldConfig;
  }
});
module.exports=schema;