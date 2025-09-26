/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   
    return knex.schema

        .createTable('users',(table)=>{
            table.increments();
            table.string('firstname').notNullable();
            table.string('lastname');
            table.string('email').notNullable().unique();
            table.check("email ~ '^[\\w.-]+@[\\w.-]+\\.\\w{2,}$'");
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true,true);
        })

        .createTable('roles',(table)=>{
            table.increments();
            table.string('name').notNullable().unique();
            table.timestamps(true,true);
        })

        .createTable('users_roles',(table)=>{
            table.integer('user_id').references('id').inTable('users');
            table.integer('role_id').references('id').inTable('roles');
        })

        .createTable('permissions',(table)=>{
            table.increments('id');
            table.string('name').notNullable().unique();
            table.timestamps(true,true);
        })

        .createTable('resources',(table)=>{
            table.increments('id');
            table.string('name').notNullable().unique();
        })

        .createTable('roles_permissions_resources',(table)=>{
            table.integer('role_id').references('id').inTable('roles').notNullable();
            table.integer('permission_id').references('id').inTable('permissions').notNullable();
            table.integer('resource_id').references('id').inTable('resources').notNullable();
        })

        .createTable('countries',(table)=>{
            table.increments();
            table.string('name');
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('zones',(table)=>{
            table.increments();
            table.string('name').notNullable();
            table.integer('country_id').references('id').inTable('countries');
            table.timestamps(true,true);
            table.integer('by');
         })

        .createTable('health_agents',(table)=>{
            table.increments();
            table.string('phone_number').notNullable().unique();
            table.integer('zone_id').references('id').inTable('zones')
            table.integer('user_id').references('id').inTable('users');
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('vaccines',(table)=>{
            table.increments();
            table.string('name').notNullable().unique();
            table.string('description')//.notNullable();
            table.integer('required_doses').notNullable();
            table.integer('interval_between').notNullable();
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('sexes',(table)=>{
            table.increments();
            table.string('name');
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('parents',(table)=>{
            table.increments();
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.string('email').notNullable().unique();
            table.string('phone_number').notNullable().unique();
            table.integer("sex_id").references('id').inTable('sexes');
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('children',(table)=>{
            table.increments();
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.date('birth_date').notNullable();
            table.string('address').notNullable();
            table.integer('zone_id').references('id').inTable('zones');
            table.integer('parent_id').references('id').inTable('parents');
            table.integer('sex_id').references('id').inTable('sexes');
            table.timestamps(true,true);
            table.integer('by');
        })

        .createTable('vaccinations',(table)=>{
            table.increments();
            table.integer('dose_number').notNullable();
            table.integer('health_agent_id').references('id').inTable('health_agents');
            table.integer('child_id').references('id').inTable('children');
            table.integer('vaccine_id').references('id').inTable('vaccines');
            table.integer('zone_id').references('id').inTable('zones');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema
        .dropTableIfExists('vaccinations')
        .dropTableIfExists('children')
        .dropTableIfExists('parents')
        .dropTableIfExists('sexes')
        .dropTableIfExists('vaccines')
        .dropTableIfExists('roles_permissions_resources')
        .dropTableIfExists('permissions')
        .dropTableIfExists('resources')
        .dropTableIfExists('users_roles')
        .dropTableIfExists('health_agents')
        .dropTableIfExists('zones')
        .dropTableIfExists('countries')
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
};
