// resolvers/date.js
const { GraphQLScalarType, Kind } = require('graphql');

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Dates',
  serialize(value) {
    // sortie -> client
    console.log(' EN DATE SCALAR SERIALIZE_____________')
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    // entrée -> mutation variables
    console.log(' EN DATE SCALAR PARSEVALUE____________')
    return new Date(value);
  },
  parseLiteral(ast) {
    // entrée -> inline string
    console.log(' EN DATE SCALAR LITERAL____________')
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = {
  Date: DateScalar,
};
