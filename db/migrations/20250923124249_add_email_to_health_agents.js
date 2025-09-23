/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.alterTable('health_agents',(table)=>{
        table.string('email').notNullable().unique();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.alterTable('health_agents', (table)=>{
        table.dropColumn('email');
    })
};
