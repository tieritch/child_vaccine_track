const dateResolver = require('./date-resolver');
const userResolver=require('./user-resolver');
const roleResolver=require('./role-resolver');
const zoneResolver=require('./zone-resolver');
const countryResolver=require('./country-resolver');
const parentResolver=require('./parent-resolver');
const childResolver=require('./child-resolver');
const agentResolver=require('./health-agent-resolver');
const zoneChildResolver=require('./zone-child-resolver');
//const { userResolver, roleResolver} = require('../resolvers');
/*const rootResolver={
    ...userResolver,
    ...roleResolver
}
*/

module.exports={
    dateResolver,
    userResolver,
    roleResolver,
    zoneResolver,
    countryResolver,
    parentResolver,
    childResolver,
    agentResolver,
    zoneChildResolver
}