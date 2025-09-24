// resolvers/date.js
const { GraphQLScalarType, Kind } = require('graphql');

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Dates',
  
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },

  parseValue(value) {
    return new Date(value);
  },
  
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = {
  Date: DateScalar,
};
