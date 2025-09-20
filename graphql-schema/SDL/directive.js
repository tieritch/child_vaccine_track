
const directiveSDL=`
directive @auth on FIELD_DEFINITION
directive @rbac(actions: [String!]!, resources:[String!]!) on FIELD_DEFINITION
`
module.exports=directiveSDL;