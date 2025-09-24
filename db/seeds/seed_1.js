/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt=require('bcrypt');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vaccines').del();
  await knex('users_roles').del();
  await knex('users').del();
  await knex('roles').del();
  
  const [{id:adminUserId}]=await knex('users').insert({
    firstname:'admin',
    lastname:'',
    username:'admin',
    email:'admin@gmail.com',
    password:await bcrypt.hash('123456',10),
  }).returning('id')

  const [{id:adminRoleId}]=await knex('roles').insert({
    name:'admin'
  }).returning('id');

  await knex('users_roles').insert({
    user_id:adminUserId,role_id:adminRoleId
  })

  // Permissions (idempotent)
  const permissionNames = ['READ', 'CREATE', 'UPDATE', 'DELETE'];
  await knex('permissions')
    .insert(permissionNames.map(name => ({ name: name.toUpperCase() })))
    .onConflict('name')  //  name must be  UNIQUE
    .ignore();
  
  //  Resources
  const resourceNames = [
    'users', 'roles', 'vaccines', 'vaccinations', 'countries','zones','health_agents',
    'parents','children','permissions','resources','zone_child_enrollments',"zones_agents"
  ];
  
  await knex('resources')
    .insert(resourceNames.map(name => ({ name:name.toLowerCase() })))
    .onConflict('name')
    .ignore();

  await knex('vaccines').insert([
    { name: 'BCG', description: 'Bacillus Calmette-Guérin vaccine (tuberculosis)', required_doses: 1 },
    { name: 'Polio', description: 'Polio vaccine (oral or inactivated)', required_doses: 3 },
    { name: 'DTP', description: 'Diphtheria, Tetanus, Pertussis vaccine', required_doses: 3 },
    { name: 'Hepatitis B', description: 'Hepatitis B vaccine', required_doses: 3 },
    { name: 'Hib', description: 'Haemophilus influenzae type b vaccine', required_doses: 3 },
    { name: 'Pneumococcal', description: 'Pneumococcal conjugate vaccine (PCV)', required_doses: 3 },
    { name: 'Rotavirus', description: 'Rotavirus oral vaccine', required_doses: 2 },
    { name: 'Measles', description: 'Measles vaccine', required_doses: 2 },
    { name: 'MMR', description: 'Measles, Mumps, Rubella combined vaccine', required_doses: 2 },
    { name: 'Varicella', description: 'Varicella (chickenpox) vaccine', required_doses: 2 },
    { name: 'Meningococcal', description: 'Meningococcal conjugate vaccine (MenC/ACWY)', required_doses: 1 },
    { name: 'Influenza', description: 'Seasonal influenza vaccine (annual)', required_doses: 1 }
  ]);

  
};
