//const { access } = require("../utils/gen_token");
//const {userRepository,permissionRepository,roleRepository}=require('.././repositories');
const Role=require('../models/role');
const User=require('../models/user');

  //  'users', 'roles', 'vaccines', 'vaccinations', 'countries','zones','health_agents',
  //  'parents','children','permissions','resources'
async function accessByRole(actions,resources,context){
  /* actions and resources parameters are arrays
     actions and ids : READ     1      resources and ids: users         1
                       CREATE   2                         roles         2
                       UPDATE   3                         vacccines     3
                       DELETE   4                         vaccinations  4
                                                          countries     5
                                                          zones         6
                                                          health_agents 7  
                                                          parents       8
                                                          children      9
                                                          permissions   10
                                                          resources     11   
                                                          zone_child_enrollments 12
                                                          zones_agents: 13           
                                        here will be more as I progress
   */

    const user = context.user;
    const userFound=await User.query().findById(user.id);
    const role=await userFound.$relatedQuery('roles').first()//.withGraphJoined('[permissions,resources]');

    if(role.name =="admin") return;
    const dbUser = await User.query()
      .findById(user.id)
      .withGraphFetched('roles.permissions.resources')
      .modifyGraph('roles.permissions.resources', builder => {
        return  builder.where('roles_permissions_resources.role_id', role.id);
      });

      const normalizedActions = actions.map(a => a.trim().toUpperCase());
      const normalizedResources = resources.map(r => r.trim().toLowerCase());
      
      const allowed = dbUser.roles.some(role =>
        normalizedActions.every(action =>
          normalizedResources.every(resource =>
            role.permissions.some(permission =>
              permission.name.toUpperCase().trim() === action.toUpperCase() &&
              permission.resources.some(r => r.name.trim() === resource &&  r.role_id === role.id)
            )
          )

        )
      );
  
    if (!allowed) {
      throw new Error('Access denied: You do not have the required permissions on these resources');
    }

}
module.exports=accessByRole;