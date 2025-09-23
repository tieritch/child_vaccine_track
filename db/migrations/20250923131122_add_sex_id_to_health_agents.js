/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.alterTable('health_agents', (table)=>{
        table.integer('sex_id').references('id').inTable('sexes').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.alterTable('health_agents', (table)=>{
        table.dropColumn('sex_id')
    })
};
