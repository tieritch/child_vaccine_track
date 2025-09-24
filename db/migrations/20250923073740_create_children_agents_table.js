/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('children_agents', (table)=>{
        table.integer('child_id').references('id').inTable('children').notNullable();
        table.integer('agent_id').references('id').inTable('health_agents').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('children_agents')
};
