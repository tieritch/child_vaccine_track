const userResolver=require('./user-resolver');
const roleResolver=require('./role-resolver');
//const { userResolver, roleResolver} = require('../resolvers');
/*const rootResolver={
    ...userResolver,
    ...roleResolver
}
*/

module.exports={
    userResolver,
    roleResolver
}