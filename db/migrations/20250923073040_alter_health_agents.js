/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('health_agents', (table)=>{
        table.dropColumn('zone_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('health_agents', (table)=>{
        table.integer('zone_id').references('id').inTable('zones')
    })
};
