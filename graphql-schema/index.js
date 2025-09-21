const {makeExecutableSchema}=require('@graphql-tools/schema');
const {mergeTypeDefs,mergeResolvers}=require('@graphql-tools/merge');
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const {authenticate,accessByRole}=require('../helpers');

const baseTypeDefs=require('./SDL/base');
const directiveSDL=require('./SDL/directive');
const userSDL=require('./SDL/user');
const roleSDL=require('./SDL/role');
const zoneSDL=require('./SDL/zone');
const countrySDL=require('./SDL/country');
const parentSDL=require('./SDL/parent');
const childSDL=require('./SDL/child');

const typeDefs=mergeTypeDefs([baseTypeDefs,directiveSDL,userSDL,roleSDL,zoneSDL,countrySDL,parentSDL,childSDL]);
const {userResolver,roleResolver, zoneResolver,countryResolver,parentResolver,childResolver}=require('../resolvers')
const resolvers = mergeResolvers([userResolver,roleResolver,zoneResolver,countryResolver,parentResolver,childResolver]);

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
    
    const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
    const rbacDirective = getDirective(schema, fieldConfig, 'rbac')?.[0];

    // Ne wrap qu'une seule fois
    if (authDirective || rbacDirective) {
      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async (source, args, context, info) => {
        // Vérifier AUTH
        if (authDirective) {
          console.log('inside AUTH');
          authenticate(context);
        }

        // Vérifier RBAC
        if (rbacDirective) {
          console.log('inside RBAC');
          let actions = rbacDirective.actions.map(a => a.trim().toUpperCase());
          let resources = rbacDirective.resources.map(r => r.trim().toLowerCase());
          await accessByRole(actions, resources, context);
        }

        // Puis exécuter le resolver original
        return resolve(source, args, context, info);
      };
    }

    return fieldConfig;
  },
});
module.exports=schema;
